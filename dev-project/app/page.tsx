import Event, { IEvent } from "@/app/database/event.model";
import EventCard from "@/components/EventCard";
import connectDB from "@/lib/db.server";
import { headers } from "next/headers";

const Home = async () => {
  await headers(); // Opt into dynamic rendering
  await connectDB();
  const events = await Event.find({}).sort({ createdAt: -1 });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event: IEvent) => (
              <EventCard
                key={String(event._id)}
                title={event.title}
                image={event.image}
                slug={event.slug}
                location={event.location}
                date={event.date}
                time={event.time}
              />
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
