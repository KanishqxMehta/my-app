import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import ModalComp from "../sections/ModalComp";

function QuestionCard() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "questions"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setQuestions(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async (questionId) => {
    try {
      const questionDocRef = doc(db, "questions", questionId);
      await deleteDoc(questionDocRef);
      console.log(`Question with ID ${questionId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // Function to open a question in the modal
  const openQuestionInModal = (question) => {
    setSelectedQuestion(question);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedQuestion(null);
  };

  // Function to filter questions based on search query
  const filteredQuestions = questions.filter((question) => {
    return (
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <>
      <h1 className="mx-4 mt-4 w-max text-rose-700 font-bold text-4xl flex justify-start hover:font-black duration-100">
        ---=-=- Questions -=-=---
      </h1>
      <div className="w-full flex justify-center">
        <div className="m-3 p-2 flex bg-rose-900 justify-center w-7/12 hover:scale-105 rounded-2xl hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500">
          <h4 className="mx -4 w-max text-rose-100 font-bold text-xl flex justify-start duration-100">
            Search Questions:
          </h4>
          <input
            className="px-2 rounded-md flex-grow bg-rose-200 placeholder-rose-500 text-rose-500 hover:translate-y-1 hover:bg-rose-100 transition ease-in-out delay-100 hover:scale-105 hover:drop-shadow-2xl duration-500 outline-none"
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            className="m-4 p-5 flex flex-col justify-center align-center bg-rose-400 flex text-center rounded-2xl hover:scale-105 hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500"
            onClick={() => openQuestionInModal(question)} // Open question in modal when clicked
          >
            <div className="flex">
              <h1 className="my-1 text-rose-100 text-2xl font-bold flex justify-start duration-100">
                Question
              </h1>
              <p className="my-2 text-rose-100 text-xl flex justify-start duration-100">
                : {question.title}
              </p>
            </div>

            <div className="flex">
              <h3 className="my-3 text-rose-100 text-xl font-bold flex justify-start duration-100">
                Description
              </h3>
              <p className="my-3 text-rose-100 text-lg flex justify-start duration-100">
                : {question.description}
              </p>
            </div>

            <div className="flex">
              <h3 className="my-3 text-rose-100 text-xl font-bold flex justify-start duration-100">
                Tags:-
              </h3>
              <div className="my-3 w-full flex justify-center gap-2">
                {question.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-rose-600 text-rose-100 py-1 px-2 rounded-lg text-sm hover:font-bold hover:-translate-x-0.5 hover:text-rose-600 hover:drop-shadow-2xl hover:scale-125 hover:bg-rose-100 duration-300"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex justify-center">
              <button
                className="m-4 p-3 w-1/2 rounded-md focus:cursor-grab bg-rose-900 text-rose-50 hover:scale-125 hover:bg-rose-100 hover:text-rose-950 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-500"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from bubbling up
                  handleDelete(question.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedQuestion && (
        <ModalComp question={selectedQuestion} onClose={closeModal} />
      )}
    </>
  );
}

export default QuestionCard;
