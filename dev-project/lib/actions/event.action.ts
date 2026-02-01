"use server";
import Event from "@/app/database/event.model";
import connectDB from "../mongoosedb";

export const getSimilarEvents = async (slug: string) => {
  try {
    await connectDB();
    const events = await Event.findOne({ slug });
    return await Event.find({
      _id: {
        $ne: events._id,
        tags: {
          $in: events.tags,
        },
      },
    });
  } catch {
    return [];
  }
};
