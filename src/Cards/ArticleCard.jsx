import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";

export default function ArticleCard() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "articles"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setArticles(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async (articleId) => {
    try {
      const articleDocRef = doc(db, "articles", articleId);
      await deleteDoc(articleDocRef);
      // Remove the deleted article from the local state
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== articleId)
      );
      console.log(`Article with ID ${articleId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <>
      <h1 className="mx-4 mt-4 w-max text-rose-700 font-bold text-4xl flex justify-start hover:font-black duration-100">
        ---=-=- Articles -=-=---
      </h1>
      <div className="grid grid-cols-3">
        {articles &&
          articles.map((article) => (
            <div
              key={article.id}
              className="m-4 p-5 flex flex-col justify-center align-center bg-rose-400 flex text-center rounded-2xl hover:scale-105 hover:drop-shadow-[0_15px_15px_rgba(159,18,57,0.25)] hover:translate-y-px duration-500"
            >
              <div className="w-full flex justify-center">
                <img
                  className="my-2 rounded-3xl w-11/12 hover:rounded-xl ease-in-out hover:drop-shadow-xl hover:w-full hover:translate-y-px hover:scale-105 duration-500"
                  src={article.image}
                  alt=""
                />
              </div>

              <div className="flex">
                <h1 className="my-1 text-rose-100 text-2xl font-bold flex justify-start duration-100">
                  Article
                </h1>
                <p className="my-2 text-rose-100 text-xl flex justify-start duration-100">
                  : {article.title}
                </p>
              </div>

              <div className="flex">
                <h3 className="my-3 text-rose-100 font-bold text-xl flex justify-start duration-100">
                  Description
                </h3>
                <p className="my-3 text-rose-100 text-lg flex justify-start duration-100">
                  : {article.description}
                </p>
              </div>

              <div className="flex">
                <h3 className="my-3 text-rose-100 text-xl font-bold flex justify-start duration-100">
                  Tags:-
                </h3>
                <div className="my-3 flex w-full justify-center flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
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
                  onClick={() => handleDelete(article.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
