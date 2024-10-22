/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
"use client";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";

// Define the form data type
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  token: string;
}

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(""); // Track the captcha status
  const captchaRef = useRef<TurnstileInstance | null>(null);

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
      token: formData.get("cf-turnstile-response") as string,
    };

    const endpoint = "/api/send";

    try {
      toast.dismiss();
      await toast.promise(
        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => {
          if (response.status === 200) {
            setEmailSubmitted(true);
            setEmailError(false);

            return response.json();
          } else {
            setEmailError(true);
            setEmailSubmitted(false);
            throw new Error("An error occurred. Please try again later.");
          }
        }),
        {
          loading: "Sending...",
          success: "Email sent successfully!",
          error: "An error occurred. Please try again later.",
        },
        {
          style: {
            minWidth: "250px",
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "18px",
          },
        },
      );
    } catch (error) {
      console.error("An error occurred:", error);
      setEmailError(true);
      setEmailSubmitted(false);
    } finally {
      setIsSending(false);
      setStatus("");

      // Ensure captchaRef is not null before calling reset
      if (captchaRef.current) {
        captchaRef.current.reset();
      }

      e.currentTarget.reset(); // Reset the form
    }
  };

  return (
    <section
      className="flex flex-col md:flex-row px-6 sm:px-10 md:px-28 lg:px-40 py-16 md:py-24 gap-8 md:gap-12 relative z-20"
      id="contact"
    >
      <div className="rounded-full h-40 w-40 sm:h-60 sm:w-60 lg:h-80 lg:w-80 z-0 blur-lg absolute top-[90%] md:top-3/4 left-0 md:left-[-20%] transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0" />
      <div className="z-5 w-full md:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold text-white my-2">
          Let&apos;s Connect
        </h2>
        <p className="text-[#ADB7BE] mb-4 max-w-md text-sm md:text-base">
          "I love to code and I'm always looking for new opportunities to learn
          and grow. Currently, I'm working on several projects, and I'm always
          open to fresh ideas and collaborations. If you have any questions or
          would like to work together, feel free to reach out!".
        </p>
        <p className="text-lg md:text-xl font-semibold my-5 text-white">
          <a className="hover:underline" href="mailto:contact@kavishka.com">
            contact@kavishka.com
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
                Name
              </label>
              <input
                required
                autoComplete="name"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
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
                Your email
              </label>
              <input
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                id="email"
                name="email"
                placeholder="jacob@google.com"
                type="email"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="text-white block text-sm mb-2 font-medium"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
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
              Message
            </label>
            <textarea
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              id="message"
              name="message"
              placeholder="Let's talk about..."
            />
          </div>
          <Turnstile
            ref={captchaRef}
            className="mb-6"
            options={{
              theme: "dark",
            }}
            siteKey="0x4AAAAAAANZ9isw01CpEZ7d"
            onError={() => setStatus("error")}
            onExpire={() => setStatus("expired")}
            onSuccess={() => setStatus("solved")}
          />

          <button
            className="bg-primary-700 hover:bg-primary-800 disabled:bg-primary-900 text-white font-medium py-2.5 px-5 rounded-lg w-full md:w-auto"
            disabled={isSending || status !== "solved"}
            type="submit"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
          {emailSubmitted && (
            <p className="text-green-400 text-sm md:text-base mt-2 font-bold">
              Email sent successfully!
            </p>
          )}
          {emailError && (
            <p className="text-red-400 text-sm md:text-base mt-2 font-bold">
              An error occurred. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
