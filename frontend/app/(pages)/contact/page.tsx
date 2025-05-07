'use client';

import { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [messageSent, setMessageSent] = useState(false); // ✅ Feedback state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(form)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessageSent(true);                   
        setForm({ name: '', email: '', message: '' }); 

        setTimeout(() => setMessageSent(false), 3000); 
      } else {
        alert('Something went wrong. Try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center px-6 bg-transparent text-[#FAF9F6]">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-md">Contact</h1>

      <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
        Have questions, feedback, or just want to say hey? Drop a message below.
      </p>

      <form onSubmit={handleSubmit} className="bg-transparent backdrop-blur-md rounded-xl p-8 shadow-lg">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full border-[#FAF9F6] border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#770737] mb-4"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Your Email"
          onChange={handleChange}
          className="w-full border-[#FAF9F6] border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#770737] mb-4"
          required
        />
        <textarea
          name="message"
          value={form.message}
          placeholder="Your Message"
          onChange={handleChange}
          rows={5}
          className="w-full border-[#FAF9F6] border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#770737] mb-4"
          required
        />

        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-[#770737] hover:bg-[#5a0530] shadow-md transition-all duration-200"
        >
          Send Message
        </button>

        {messageSent && (
          <p className="text-green-400 mt-4 transition-all duration-300">
            Message sent successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactPage;
