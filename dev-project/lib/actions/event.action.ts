"use server";
import Event from "@/app/database/event.model";
import connectDB from "../db.server";

export const getSimilarEvents = async (slug: string) => {
  try {
    await connectDB();
    const events = await Event.findOne({ slug });
    const similarEvents = await Event.find({
      _id: {
        $ne: events._id,
      },
      tags: {
        $in: events.tags,
      },
    }).lean();
    // Serialize to plain JSON to avoid Mongoose ObjectId serialization issues
    return JSON.parse(JSON.stringify(similarEvents));
  } catch {
    return [];
  }
};
