import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for controlling the alert
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowAlert(true); // Show the alert if passwords don't match
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 5 seconds
      }, 1000);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered successfully", userCredential.user);
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="relative mx-60 my-10 p-10 bg-rose-800 rounded-2xl hover:drop-shadow-[-5px_35px_35px_rgba(159,18,57,0.30)] hover:translate-y-1 hover:scale-105 duration-500">
      <div className="flex justify-center">
        <h1 className="mb-4 text-2xl font-medium text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
          Create a Dev@Deakin Account
        </h1>
      </div>

      {/* Overlay for blurred background */}
      {showAlert && <div className="fixed inset-0 bg-black opacity-40 z-10"></div>}

      {/* Alert */}
      {showAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-2 rounded-md z-20">
          Passwords do not match!
        </div>
      )}

      <div className="my-2 p-1 inline-flex w-full hover:translate-y-1 hover:scale-105 duration-300 rounded-xl bg-rose-400">
        <h3 className="mx-2">Name:</h3>
        <input
          className="px-2 rounded-md flex grow bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
          type="text"
          placeholder="Enter Your Name"
        />
      </div>


      <div className="my-2 p-1 inline-flex w-full hover:translate-y-1 hover:scale-105 duration-300 rounded-xl bg-rose-400">
        <h3 className="mx-2">Email:</h3>
        <input
          className="px-2 rounded-md flex grow bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
          type="text"
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="my-2 p-1 inline-flex w-full hover:translate-y-1 hover:scale-105 duration-300 rounded-xl bg-rose-400">
        <h3 className="mx-2">Password:</h3>
        <input
          className="px-2 rounded-md flex grow bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
          type="text"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="my-2 p-1 inline-flex w-full hover:translate-y-1 hover:scale-105 duration-300 rounded-xl bg-rose-400">
        <h3 className="mx-2">Confirm Password:</h3>
        <input
          className="px-2 rounded-md flex grow bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
          type="text"
          placeholder="Confirm your Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="">
        <Link to="/login">
          <button
            className="mx-1 my-2 p-2 w-full rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-105 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:font-semibold  active:cursor-grabbing duration-300"
            name="Create"
            onClick={signUp}
          >
            SignUp
          </button>
        </Link>
      </div>
    </div>
  );
}