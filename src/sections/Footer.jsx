import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import axios from "axios";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page.

    if (email) {
      axios
  .post("http://localhost:8080/sendEmail", {
    email,
  })
  .then((response) => {
    console.log(response.data); // Log the response data
    alert("Message sent successfully");
  })
  .catch((error) => alert("Error while sending: " + error.message));

    } else {
      setMessage("Please enter the email");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <form
          onSubmit={sendEmail}
          className="m-5 p-2 bg-rose-900 w-8/12 flex hover:scale-105 rounded-2xl hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500"
        >
          <h1 className="mr-4 text-rose-100 text-2xl font-semibold hover:text-rose-100 duration-100">
            Sign Up for Daily Insider
          </h1>

          <input
            className="px-2 rounded-md flex-grow bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out delay-100 hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="mx-2 px-2 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>

      {message && (
        <div className="flex justify-center">
          <div className="text-rose-100">{message}</div>
        </div>
      )}

      <div className="p-1 bg-rose-900 rounded-2xl hover:scale-95 hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] duration-500">
        <div className="w-full flex justify-evenly">
          <div className="mx-3">
            <h2 className="text-rose-100 font-bold text-3xl">Explore</h2>
            <ul className="text-rose-100">
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                Home
              </li>
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                Questions
              </li>
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                Articles
              </li>
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                Tutorials
              </li>
            </ul>
          </div>
          <div className="mx-3">
            <h2 className="text-rose-100 font-bold text-3xl">Support</h2>
            <ul className="text-rose-100">
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                FAQs
              </li>
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                Help
              </li>
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                Contact Us
              </li>
            </ul>
          </div>
          <div className="mx-3">
            <h2 className="text-rose-100 font-bold text-3xl">Stay Connected</h2>
            <div className="flex my-2 justify-evenly ">
              <SocialIcon
                className="hover:scale-125 duration-300"
                url="https://twitter.com"
              />
              <SocialIcon
                className="hover:scale-125 duration-300"
                url="https://instagram.com"
              />
              <SocialIcon
                className="hover:scale-125 duration-300"
                url="https://whatsapp.com"
              />
            </div>
          </div>
        </div>
        <div className="w-full my-4 flex justify-center">
          <div className="lwr">
            <h2 className="text-rose-100 font-bold text-3xl">
              DEV@Deakin 2023
            </h2>
            <ul className="text-rose-100 flex justify-between">
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                Privacy Policy
              </li>
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                Help
              </li>
              <li className="hover:font-semibold  hover:-translate-px hover:text-rose-50 duration-100">
                Contact Us
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
