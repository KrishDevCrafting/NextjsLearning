import React from "react";

const EventsDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <section>
      <h1>Events Details: {slug}</h1>
    </section>
  );
};

export default EventsDetailsPage;
