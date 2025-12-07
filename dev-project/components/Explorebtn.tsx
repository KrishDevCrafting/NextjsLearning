"use client";
import React from "react";

import Image from "next/image";

const Explorebtn = () => {
  return (
    <button
      className="mt-7 mx-auto flex items-center gap-2"
      id="explore-btn"
      type="button"
      onClick={() => {
        const el = document.getElementById("event");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else alert("Hello Dear!");
      }}
    >
      <span>Explore Events</span>
      <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
    </button>
  );
};

export default Explorebtn;
