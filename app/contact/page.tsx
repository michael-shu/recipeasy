import React from 'react';
import Link from 'next/link';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const page = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-slate-100 rounded-xl shadow-lg p-8 relative">

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Get in Touch
          </h1>
          <p className="text-gray-500 mb-6">
            Have questions or want to work together? Drop a message or check out my
            website!
          </p>
          <Link
            href="https://michael-shu.com/"
            target="_blank"
            className="text-blue-700 underline hover:text-blue-900"
          >
            michael-shu.com
          </Link>
        </div>

        <form className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-fit p-3 bg-black text-white rounded-lg py-2 hover:text-black hover:bg-white transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Connect with me on:</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/michael-shu-nyc/"
              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-blue-400 hover:text-white transition"
            >
              <FaLinkedin />
            </Link>
            <Link
              target="_blank"
              href="https://github.com/michael-shu"
              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-slate-600 hover:text-white transition"
            >
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default page;