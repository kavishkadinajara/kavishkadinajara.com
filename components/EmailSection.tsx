/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
"use client";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

// Define the form data type
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setEmailError(false);
    setEmailSubmitted(false);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const data: FormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // Validate form data
    if (!data.name || !data.email || !data.subject || !data.message) {
      toast.error("Please fill in all fields");
      setIsSending(false);
      return;
    }

    const endpoint = "/api/send";

    try {
      toast.dismiss();
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEmailSubmitted(true);
        setEmailError(false);
        toast.success(result.message || "Email sent successfully!");
        e.currentTarget.reset(); // Reset the form only on success
      } else {
        setEmailError(true);
        setEmailSubmitted(false);
        const errorMessage = result.message || "An error occurred. Please try again later.";
        toast.error(errorMessage);
        console.error("API Error:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
      setEmailError(true);
      setEmailSubmitted(false);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      className="flex flex-col md:flex-row px-6 sm:px-10 md:px-28 lg:px-40 py-16 md:py-24 gap-8 md:gap-12 relative z-50"
      id="contact"
    >
      <div className="rounded-full h-40 w-40 sm:h-60 sm:w-60 lg:h-80 lg:w-80 z-0 blur-lg absolute top-[90%] md:top-3/4 left-0 md:left-[-20%] transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0" />
      <div className="z-5 w-full md:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold text-white my-2">
          Let&apos;s Connect
        </h2>
        <p className="text-[#ADB7BE] mb-4 max-w-md text-sm md:text-base">
          "As an Associate Software Engineer with expertise in modern web development and ERP systems, 
          I'm always excited to collaborate on innovative projects. Whether you're looking for technical 
          consultation, development services, or just want to discuss technology trends, I'd love to connect 
          and explore how we can work together to build something amazing!"
        </p>
        <p className="text-lg md:text-xl font-semibold my-5 text-white">
          <a className="hover:underline" href="mailto:kavishkadinajara@gmail.com">
            kavishkadinajara@gmail.com
          </a>
        </p>
      </div>

      <div className="z-5 w-full md:w-1/2">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                className="text-white block text-sm mb-2 font-medium"
                htmlFor="name"
              >
                Name *
              </label>
              <input
                required
                autoComplete="name"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                id="name"
                name="name"
                placeholder="John Doe"
                type="text"
              />
            </div>
            <div>
              <label
                className="text-white block mb-2 text-sm font-medium"
                htmlFor="email"
              >
                Your email *
              </label>
              <input
                required
                autoComplete="email"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                id="email"
                name="email"
                placeholder="john@example.com"
                type="email"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="text-white block text-sm mb-2 font-medium"
              htmlFor="subject"
            >
              Subject *
            </label>
            <input
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              id="subject"
              name="subject"
              placeholder="Just saying hi"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label
              className="text-white block text-sm mb-2 font-medium"
              htmlFor="message"
            >
              Message *
            </label>
            <textarea
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 h-32 resize-vertical focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              id="message"
              name="message"
              placeholder="Let's talk about..."
            />
          </div>

          <button
            className="bg-cyan-700 hover:bg-cyan-600 text-white font-medium py-2.5 px-5 rounded-lg w-full md:w-auto z-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={isSending}
            type="submit"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
          {emailSubmitted && (
            <p className="text-green-400 text-sm md:text-base mt-2 font-bold">
              ✅ Email sent successfully!
            </p>
          )}
          {emailError && (
            <p className="text-red-400 text-sm md:text-base mt-2 font-bold">
              ❌ An error occurred. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailSection;