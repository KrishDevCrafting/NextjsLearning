import { notFound } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import Image from "next/image";

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
    <div className="agenda">
      <h2>
        {agendaItem.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </h2>
    </div>
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
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
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
    },
  } = await request.json();
  if (!description) return notFound();
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

          <EventAgenda agendaItem={JSON.parse(agenda[0])} />

          <section className="flex-col-gap-2">
            <h2>About the organizer</h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags={JSON.parse(tags[0])} />
        </div>

        {/* {Right Side Booking form} */}

        <aside className="booking">
          <p className="text-lg font-semibold">Book Events</p>
        </aside>
      </div>
    </section>
  );
};

export default EventsDetailsPage;
