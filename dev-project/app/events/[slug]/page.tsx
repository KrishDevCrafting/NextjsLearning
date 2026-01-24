import { notFound } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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
        {/* {Right Side Booking form} */}
      </div>
    </section>
  );
};

export default EventsDetailsPage;
