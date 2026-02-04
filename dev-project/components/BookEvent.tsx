"use client";
import { useState } from "react";
import { createBooking } from "@/lib/actions/booking.action";
const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    const { success, error } = await createBooking({
      eventId,
      slug,
      email,
    });

    if (success) {
      setSubmitted(true);
    } else {  
      console.log("Booking creation Error!", error);
    }

    e.preventDefault();

    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };
  return (
    <div id="book-event">
      {submitted ? (
        <p>Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              placeholder="Enter your email address"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="button-submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
