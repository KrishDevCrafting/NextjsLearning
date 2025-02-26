import React from "react";

export default function Login() {
  return (
    <div>
      <h1 className="text-5xl text-center">Login-here!!</h1>

      <form className="text-center border border-light p-5">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className=" border-2 border-red-700  rounded-md focus:ring-2 focus:ring-blue-500 border border-gray-300 m-4 bg-red-700"
        />
        <br></br>
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter your email" className="border-2 border-red-700  rounded-md focus:ring-2 focus:ring-blue-500 border border-gray-300 m-4 bg-red-700" />
        <br></br>
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="border-2 border-red-700  rounded-md focus:ring-2 focus:ring-blue-500 border border-gray-300 m-4 bg-red-700"
          placeholder="Enter your password"
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
