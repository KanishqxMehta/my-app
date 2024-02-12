import React from "react";
import { Link } from "react-router-dom";


export default function StripePage() {
  return (
    <div className="m-4 py-5 px-20 bg-rose-900 rounded-2xl hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500">
      <h1 className="flex w-full justify-center text-rose-200 text-5xl hover:text-rose-50 duration-300">
        Subscriptions
      </h1>
      <div className="flex flex-row w-full justify-evenly">
        <div className="m-4 p-5 flex flex-col justify-center align-center bg-stone-400 flex text-center rounded-2xl hover:scale-105 hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500">
          <h3 className="flex w-full justify-center text-stone-50 text-xl duration-300">
            Free Plan
          </h3>
          <div className="m-4 p-5 w-80 bg-stone-100 h-full rounded-2xl hover:drop-shadow-xl hover:scale-110 hover:translate-y-px duration-500">
            <h4 className="flex w-full mb-2 justify-start text-stone-900 text-xl duration-300">
              Features
            </h4>
            <ul className="text-left list-disc">
              <li>Custom Posts</li>
              <li>Send Emails</li>
              <li>Add Tags</li>
            </ul>
          </div>
          <Link to="/">
          <button className="m-4 p-3 rounded-md focus:cursor-grab bg-stone-100 text-stone-900 hover:scale-110 hover:bg-stone-50 hover:drop-shadow-2xl active:bg-stone-500 active:cursor-grabbing duration-500">
            Enroll Free
          </button>
          </Link>
        </div>
        <div className="m-4 p-5 flex flex-col justify-center align-center bg-amber-400 flex text-center rounded-2xl hover:scale-105 hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500">
          <h3 className="flex w-full justify-center text-amber-50 text-xl duration-300">
            Premium Plan
          </h3>
          <div className="m-4 p-5 w-80 bg-amber-100 rounded-2xl text-amber-900 hover:scale-110 hover:drop-shadow-2xl hover:translate-y-px duration-500">
            <h4 className="flex w-full mb-2 justify-start text-xl duration-300">
              Features
            </h4>
            <ul className="text-left list-disc">
              <li>Custom Posts</li>
              <li>Send Emails</li>
              <li>Add Tags</li>
              <li>Custom Messages</li>
              <li>Themes</li>
              <li>Highlighted Posts</li>
              <li>Control Content</li>
              <li>Admin Support</li>
            </ul>
          </div>
          <button className="m-4 p-3 rounded-md focus:cursor-grab bg-amber-100 text-amber-900 hover:scale-110 hover:bg-amber-50 hover:drop-shadow-2xl active:bg-amber-500 active:cursor-grabbing duration-500">
            <a href="https://buy.stripe.com/test_fZe14rce0eAK4fe000">
            Enroll
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
