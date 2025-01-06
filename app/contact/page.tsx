import React from 'react';
import Link from 'next/link';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Contact from './Contact';

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

        <Contact/>

        

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