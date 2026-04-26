import Event, { IEvent } from "@/app/database/event.model";
import EventCard from "@/components/EventCard";
import connectDB from "@/lib/db.server";
import { connection } from "next/server";
import { Suspense } from "react";

const EventsGrid = async () => {
  await connection();
  await connectDB();
  const events = await Event.find({}).sort({ createdAt: -1 }).lean();

  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <>
      {events.map((event: IEvent) => (
        <EventCard
          key={String(event._id)}
          title={event.title}
          image={event.image}
          slug={event.slug}
          location={event.location}
          date={event.date}
          time={event.time}
        />
      ))}
    </>
  );
};

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<p>Loading events...</p>}>
            <EventsGrid />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Home;
