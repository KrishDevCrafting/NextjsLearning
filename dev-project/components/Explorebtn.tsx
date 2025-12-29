"use client";
import React from "react";
import Image from "next/image";
const Explorebtn = () => {
  return (
    <button
      id="explore-btn"
      role="button"
      className="mt-7 mx-auto  px-4 py-2 rounded-full  text-black"
    >
      <a
        href="#events"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        Explore button
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-img"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};

export default Explorebtn;

// kasnd
