"use client";

import { useState } from "react";
import Image from "next/image";

export default function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    alert("Feedback sent!");
  };

  return (
    <main className=" flex items-center bg-white text-black">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* LEFT - FORM */}
        <div>
          <h1 className="text-5xl font-bold mb-4">
            Feedback
          </h1>

          <p className="text-gray-600 mb-8 text-lg">
            Have suggestions or found an issue? I’d love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="message"
              rows={5}
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Feedback
            </button>

          </form>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="flex justify-center lg:justify-end">
        <div className="relative w-full max-w-lg h-[500px] lg:h-[600px]">
          <Image
            src="/feedback.png"
            alt="Feedback illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      </section>
    </main>
  );
}