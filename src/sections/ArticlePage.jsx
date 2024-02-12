import React, { useEffect, useState } from "react";
import PostTypeSelector from "./PostTypeSelector";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage, db } from "../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  abstract: "",
  description: "",
};

function ArticlePage() {
  const [data, setData] = useState(initialState);
  const { title, abstract, description } = data;
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const Navigate = useNavigate();

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

  const validate = () => {
    if (!title || !abstract || !description) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    validate();

    if (!title || !abstract || !description || tags.length === 0 || !imgURL) {
      return;
    }

    try {
      setIsLoading(true); // Start loading

      // Add the document to the Firestore collection with the image URL
      await addDoc(collection(db, "articles"), {
        ...data,
        tags,
        image: imgURL,
        timestamp: serverTimestamp(),
      });

      setTimeout(() => {
        setIsLoading(false); // Stop loading after 5 seconds
        Navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setIsLoading(false); // Stop loading in case of an error
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, imageUpload);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setImageUpload(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
            // Handle other cases here, if needed
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    if (imageFile) {
      uploadFile();
    }
  }, [imageUpload, imageFile]);
  
  const handleImageUpload = async () => {
    if (imageFile) {
      const name = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, name);

      try {
        // Upload the image to Firebase Storage
        await uploadBytes(storageRef, imageFile);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);
        console.log("Image uploaded successfully:", imageUrl);

        // Store the image URL in state
        setImgURL(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
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
              Make Sure tht you entered all the details!
            </div>
          )}

          <div className="m-4 p-5 bg-rose-900 flex rounded-2xl hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full">
                <h1 className="mr-4 text-rose-100 text-3xl flex justify-start hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                  Article detail
                </h1>

                <h3 className="my-3 text-rose-100 text-lg flex justify-start hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                  What do you want to post or share?
                </h3>

                <div className="flex items-center w-full mt-4">
                  <h5 className="mr-4 flex text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                    Image:
                  </h5>
                  <label className="my-2 p-1 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </label>
                  <button
                    id="upload_btn"
                    htmlFor="image-input"
                    type="button" // Set the type to "button"
                    className="m-4 p-1 rounded-md focus:cursor-grab bg-rose-400 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-300"
                    tabIndex="0"
                    onClick={handleImageUpload}
                    disabled={imageUpload !== null && imageUpload < 100}
                  >
                    Upload
                  </button>

                  {imageFile && (
                    <p className="mx-4 text-rose-100 text-lg flex justify-start hover:font-bold hover:-translate-x-1 hover:text-rose-100 duration-100">
                      {imageFile.name}
                    </p>
                  )}
                </div>

                <div className="flex items-center w-full">
                  <h5 className=" flex text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                    Title:
                  </h5>
                  <input
                    className="m-2 px-2 flex-grow rounded-md bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
                    type="text"
                    label="Title"
                    placeholder="Name a title"
                    name="title"
                    onChange={handleChange}
                    value={title}
                    autoFocus
                  />
                </div>

                <div className="flex items-center">
                  <h5 className="mr-5 flex text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                    Abstract:
                  </h5>
                  <textarea
                    className="m-2 px-2 flex-grow rounded-md bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
                    type="text"
                    label="Abstract"
                    placeholder="Abstract here . . ."
                    name="abstract"
                    rows={5}
                    onChange={handleChange}
                    value={abstract}
                  />
                </div>

                <div className="flex items-center">
                  <h5 className=" flex text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                    Description:
                  </h5>
                  <textarea
                    className="m-2 px-2 flex-grow rounded-md bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
                    type="text"
                    label="Description"
                    placeholder="Article here . . ."
                    rows={5}
                    name="description"
                    onChange={handleChange}
                    value={description}
                  />
                </div>

                <div className="flex items-center w-full">
                  <h5 className=" flex text-rose-100 hover:font-bold hover:-translate-x-0.5 hover:text-rose-100 duration-100">
                    Tags:
                  </h5>
                  <div className="flex items-center flex-wrap">
                    <input
                      className="m-2 px-2 flex-grow rounded-md bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none relative"
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
                    onClick={handleSubmit}
                    disabled={imageUpload !== null && imageUpload < 100}
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

export default ArticlePage;
