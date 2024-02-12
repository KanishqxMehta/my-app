import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import onAuthStateChanged and signOut
import { auth } from "../utils/firebase";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged Out", user);
        setUser(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      <nav className="px-2 py-2 bg-rose-900 flex rounded-2xl hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500">
        <Link to="/">
          <h1 className="mr-4 text-rose-100 hover:font-extrabold hover:-translate-x-0.5 hover:text-rose-100 duration-300">
            Dev@Deakin
          </h1>
        </Link>
        <input
          className="px-2 rounded-md flex-grow bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out delay-100 hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
          type="text"
          placeholder="Search . . ."
        />
        <button className="mx-1 px-2 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300">
          Search
        </button>

        {user ? (
          <>
          <Link to="/plans">
              <button className="mx-1 px-2 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300">
                Plans
              </button>
            </Link>

            <Link to="/postTypeSelector">
              <button className="mx-1 px-2 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300">
                Post
              </button>
            </Link>

            <button
              className="mx-1 px-2 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <ul className="flex text-rose-500 ml-3">
            <Link to="/login">
              <button className="mx-1 px-2 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300">
                Login
              </button>
            </Link>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
