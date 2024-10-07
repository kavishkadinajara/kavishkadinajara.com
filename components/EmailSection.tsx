/* eslint-disable no-console */
"use client";
import { useRef, useState, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

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
  const [status, setStatus] = useState<string>("");
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
      captchaRef.current?.reset();
      e.currentTarget.reset(); // Reset the form
    }
  };

  return (
    <section
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
      id="contact"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-[80%] md:-translate-x-1/2 -translate-1/2" />
      {/* <div className="z-5">
        <h2 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h2>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I love to code and I&apos;m always looking for new opportunities to
          learn and grow. I&apos;m currently working on a few projects and
          I&apos;m always open to new ideas and collaborations. If you have any
          questions or want to work with me, feel free to contact me.
        </p>
        <p className="text-lg font-semibold my-5 text-white">
          <EnvelopeIcon className="inline-block mr-2 h-6 w-6 text-white" />
          <a
            className="hover:underline"
            href="mailto:contact@supunsathsara.com"
          >
            contact@supunsathsara.com
          </a>
        </p>
        <div className="socials flex flex-row gap-2">
          <Link
            href="https://github.com/supunsathsara"
            rel="noopener noreferrer"
            target="_blank"
            title="Supun Sathsara on github"
          >
            <Image alt="Github Icon" src={GithubIcon} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/supunsathsara/"
            rel="noopener noreferrer"
            target="_blank"
            title="Supun Sathsara on LinkedIn"
          >
            <Image alt="Linkedin Icon" src={LinkedinIcon} />
          </Link>
          <Link
            href="https://twitter.com/ssupunsathsara"
            rel="noopener noreferrer"
            target="_blank"
            title="Supun Sathsara on Twitter"
          >
            <Image
              alt="X Icon"
              className="p-2"
              height={48}
              src={XIcon}
              width={48}
            />
          </Link>
          <Link
            href="https://www.instagram.com/s_supun_sathsara"
            rel="noopener noreferrer"
            target="_blank"
            title="Supun Sathsara on Instagram"
          >
            <Image
              alt="Instagram Icon"
              className="p-1"
              height={48}
              src={InstaIcon}
            />
          </Link>
        </div>
      </div> */}
      <div className="z-5">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6 md:grid md:grid-cols-2 gap-4">
            <div className="mb-6 md:mb-0">
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
            className="bg-primary-700 hover:bg-primary-800 disabled:bg-primary-900 text-white font-medium py-2.5 px-5 rounded-lg w-full"
            disabled={isSending || status !== "solved"}
            type="submit"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
          {emailSubmitted && (
            <p className="text-green-400 text-sm md:text-base mt-2 z-5 mx-auto font-bold">
              Email sent successfully!
            </p>
          )}
          {emailError && (
            <p className="text-red-400 text-sm md:text-base mt-2 z-5 mx-auto font-bold">
              An error occurred. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
