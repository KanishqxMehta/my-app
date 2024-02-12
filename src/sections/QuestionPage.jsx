import React, { useState } from "react";
import PostTypeSelector from "./PostTypeSelector";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import MonacoEditor from "react-monaco-editor";

const initialState = {
  title: "",
  description: "",
};

function QuestionPage() {
  const [data, setData] = useState(initialState);
  const { title, description } = data;
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data, `Tags: ${tags}`);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const validate = () => {
    if (!title || !description) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return false; // Return false to indicate validation failure
    }
    return true; // Return true to indicate validation success
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate() || tags.length === 0) {
      return;
    }

    try {
      // Add the document to the Firestore collection with the image URL
      await addDoc(collection(db, "questions"), {
        ...data,
        tags,
        code,
        timestamp: serverTimestamp(),
      });
      setIsSubmit(true);

      // Navigate to the desired page (e.g., home page)
      navigate("/");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <>
      {isSubmit ? (
        <div class="my-20 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-700 h-10 w-10"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-slate-700 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <PostTypeSelector />

          {showAlert && (
            <div className="fixed inset-0 bg-black opacity-40 z-10"></div>
          )}

          {/* Alert */}
          {showAlert && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-2 rounded-md z-20">
              Make sure that you entered all the details!
            </div>
          )}

          <div className="m-4 p-5 bg-rose-900 flex rounded-2xl hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full">
                <h1 className="mr-4 text-rose-100 text-3xl flex justify-start hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                  Question Detail
                </h1>

                <h3 className="my-3 text-rose-100 text-lg flex justify-start hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                  What do you want to ask or share?
                </h3>

                <div className="flex items-center">
                  <h5 className="mr-4 flex text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                    Title:
                  </h5>
                  <input
                    className="m-2 ml-14 px-2 flex-grow rounded-md bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
                    type="text"
                    name="title"
                    placeholder="Name a title"
                    value={title}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center">
                  <h5 className="mr-4 flex text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                    Description:
                  </h5>
                  <textarea
                    className="m-2 ml-1 px-2 flex-grow rounded-md bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
                    type="text"
                    name="description"
                    placeholder="Description here . . ."
                    rows={5}
                    value={description}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex">
                  <h5 className="mr-14 flex text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                    Code:
                  </h5>
                    <MonacoEditor
                    className="w-full h-full"
                    height={300}
                      language="javascript"
                      theme="vs-dark"
                      value={code}
                      options={{
                        selectOnLineNumbers: true,
                      }}
                      onChange={handleCodeChange}
                    />
                </div>

                <div className="flex mt-5 items-center w-full">
                  <h5 className="mr-3 flex text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                    Tags:
                  </h5>
                  <div className="flex items-center flex-wrap">
                    <input
                      className="m-2 ml-14 px-2 flex-grow rounded-md bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none relative"
                      type="text"
                      placeholder="Add tags"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleKeyPress}
                    />

                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="m-1 px-2 py-1 flex bg-rose-300 rounded-l-lg rounded-bl-full text-rose-800 hover:bg-rose-400 cursor-pointer"
                      >
                        <span className="mr-2 text-rose-400"></span>
                        {tag}
                        <span
                          className="ml-2 text-rose-400 hover:text-rose-200 cursor-pointer"
                          onClick={() => removeTag(index)}
                        >
                          &#x2716;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="submit w-full flex justify-center">
                  <button
                    className="m-1 p-2 w-1/2 flex justify-center rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-110 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-500"
                    type="submit"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default QuestionPage;
