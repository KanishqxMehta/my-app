import React from "react";
import { Link } from "react-router-dom";

function PostTypeSelector() {
  return (
    <div className="w-full flex justify-evenly">
      <nav className="m-4 p-5 bg-rose-900 flex rounded-2xl hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500">
        <Link to="/postTypeSelector/">
          <h1 className="mr-4 text-rose-100 text-4xl translate-y-2 flex justify-start hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-200">
            Post
          </h1>
        </Link>
        <div className="mr-10 flex justify-end content-center w-full">
          <h1 className="mr-4 text-rose-100 translate-y-3.5 text-2xl hover:font-bold hover:translate-x-1 hover:text-rose-100 duration-100">
            Select Post
          </h1>

          <div className="btns flex flex-col align-center">
            <Link to="/article">
              <button className="m-1 px-2 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300">
                Article
              </button>
            </Link>

            <Link to="/question">
              <button className="m-1 px-2 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300">
                Question
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default PostTypeSelector;
