import mongoose from "mongoose";

// Define the connection cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include our mongoose cache
declare global {
  var mongoose: MongooseCache;
}

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize the cache on the global object to persist across hot reloads in development
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections during development hot reloads.
 * @returns Promise resolving to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Validate MongoDB URI exists
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  // Return existing connection promise if one is in progress
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable Mongoose buffering
    };

    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI, options);
  }

  try {
    // Wait for the connection to establish
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    // Reset promise on error to allow retry
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }

  return cached.conn;
}

// Optional: Add connection event listeners for better debugging
if (process.env.NODE_ENV === "development") {
  mongoose.connection.on("connected", () => {
    console.log("🔌 Mongoose connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ Mongoose disconnected from MongoDB");
  });
}

export default connectDB;
