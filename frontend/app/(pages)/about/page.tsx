'use client';

import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center px-6 bg-transparent text-[#FAF9F6]">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-md">About FocusFlow</h1>
      
      <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
        FocusFlow is a minimal Pomodoro timer designed to help you stay focused, productive, and in control of your time. Whether you&apos;re working, studying, or just need structured breaks — this app has your back.
      </p>

      <p className="text-md md:text-lg max-w-2xl mb-4">
        Built using modern tech like <span className="font-semibold">Next.js, Tailwind, and React</span>, it&apos;s fast, responsive, and works beautifully on all devices.
      </p>

      <p className="text-md md:text-lg max-w-2xl mb-12">
        Created with 🤍 by Shoeb
      </p>

      <Link href="/" className="px-5 py-2 rounded-md bg-[#770737] hover:bg-[#5a0530] shadow-md transition-all duration-200">
        Back to Home
      </Link>
    </div>
  );
};

export default About;
