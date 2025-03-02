"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:7001/user/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      console.log(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login Here</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="text-center">
          <label className="block text-left">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-2 mb-4 text-black"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block text-left">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-2 mb-4 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-left">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 p-2 mb-4 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
