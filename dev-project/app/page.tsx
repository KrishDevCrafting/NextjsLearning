import Explorebtn from "@/components/Explorebtn";
import React from "react";

const page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev
        <br />
        Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackonthons,Meetups, and Conferences , All in one Place
      </p>

      <Explorebtn />

      <div className="mt-20 space-y-7">
        <h3>Features Events</h3>
        <ul className="events">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((events) => (
            <li key={events}>Events {events}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
