import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for controlling the alert
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password) 
      .then((userCredential) => {
        console.log("User logged in successfully", userCredential.user);

        navigate("/");
      })
      .catch((error) => {
        console.log("Error: ", error);
        setShowAlert(true); // Show the alert for login errors
        setTimeout(() => {
          setShowAlert(false); // Hide the alert after 5 seconds
        }, 1000);
      });
  };

  return (
    <div className="mx-60 my-10 p-10 bg-rose-800 rounded-2xl hover:drop-shadow-[-5px_35px_35px_rgba(159,18,57,0.30)] hover:translate-y-1 hover:scale-105 duration-500">
      {/* Overlay for blurred background */}
      {showAlert && <div className="fixed inset-0 bg-black opacity-40 z-10"></div>}

      {/* Alert */}
      {showAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-2 rounded-md z-20">
          Invalid email or password!
        </div>
      )}

      {/* Rest of the login form */}
      <div className="my-2 w-full flex justify-end">
        <Link to="/signup">
          <button className="mx-1 p-2 rounded-md focus:cursor-grab bg-rose-200 text-rose-950 hover:scale-110 hover:bg-rose-400 hover:text-rose-50 hover:drop-shadow-2xl active:bg-rose-500 active:font-semibold active:translate-x-0.5 active:cursor-grabbing duration-300">
            SignUp
          </button>
        </Link>
      </div>

      <div className="my-2 p-1 inline-flex w-full hover:translate-y-1 hover:scale-105 duration-300 rounded-xl bg-rose-400">
        <h3 className="mx-2">Your Email</h3>
        <input
          className="px-2 rounded-md flex grow bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
          type="text"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="my-2 p-1 inline-flex w-full hover:translate-y-1 hover:scale-105 duration-300 rounded-xl bg-rose-400">
        <h3 className="mx-2">Password</h3>
        <input
          className="px-2 rounded-md flex grow bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="">
        <Link to="/">
          <button className="mx-1 my-2 p-2 w-full rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-105 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:font-semibold  active:cursor-grabbing duration-300"
          onClick={logIn}
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}