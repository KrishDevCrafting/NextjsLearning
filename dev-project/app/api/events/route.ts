import { NextResponse, NextRequest } from "next/server";

import connectDB from "@/lib/mongoosedb";
import Event from "@/app/database/event.model";
import { v2 as cloudinary } from "cloudinary";
// import { events } from "@/lib/constant";
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid JSON data format" },
        { status: 400 },
      );
    }
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        {
          message: "Image file is required",
        },
        {
          status: 400,
        },
      );
    }
    let tags = JSON.parse(formData.get("tags") as string);
    let agenda = JSON.parse(formData.get("agenda") as string);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "DevEvent",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });
    event.image = (uploadResult as { secure_url: string }).secure_url;
    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });
    return NextResponse.json({
      message: "Events created Successfully!",
      events: createdEvent,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({
      created: -1,
    });
    return NextResponse.json(
      {
        message: "Events fetched succesfully",
        events,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Events fetching failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      {
        status: 500,
      },
    );
  }
}

// A route that accepts a slug  as input ->return the events details.
