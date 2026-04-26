import { notFound } from "next/navigation";
import { connection } from "next/server";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import Event, { IEvent } from "@/app/database/event.model";
import { getSimilarEvents } from "@/lib/actions/event.action";
import EventCard from "@/components/EventCard";
import connectDB from "@/lib/db.server";

const EventTags = ({ tags }: { tags: string[] }) => (
  <div>
    {tags.map((tag) => (
      <div className="pill mt-2 flex justify-center items-center" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventAgenda = ({ agendaItem }: { agendaItem: string[] }) => {
  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Agenda</h2>
      <ul className="flex flex-col gap-3">
        {agendaItem.map((item, index) => (
          <li
            key={item}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300"
          >
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-mono mt-0.5">
              {index + 1}
            </span>
            <span className="text-white/80 leading-relaxed max-w-[90%]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventsDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  await connection();
  await connectDB();
  const event = await Event.findOne({ slug: slug.trim().toLowerCase() }).lean();

  if (!event) {
    return notFound();
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;
  if (!description) return notFound();

  const booking = 10;
  const similarEvents: IEvent[] = await getSimilarEvents(slug);
  return (
    <section id="event">
      <div>
        <h1>Events Details: {slug}</h1>
        <p className="mt-2">{description}</p>
      </div>
      <div className="details">
        {/* {Left Side Event-content} */}

        <div>
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Events Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />

            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItem={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the organizer</h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags={tags} />
        </div>

        {/* {Right Side Booking form} */}
        <aside className="w-full p-4 lg:border-l lg:border-gray-700 flex justify-center">
          {/* <p className="text-lg font-semibold">Book Events</p> */}
          <div className="flex w-full flex-col gap-6 rounded-[10px] border border-dark-200 bg-dark-100 px-5 py-6 shadow-[0px_4px_40px_0px_#00000066]">
            <h2>Book Your Spot</h2>
            {booking > 0 ? (
              <p className="text-sm">
                Join {booking} people who have already booked there spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((event: IEvent) => (
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
        </div>
      </div>
    </section>
  );
};

export default EventsDetailsPage;
