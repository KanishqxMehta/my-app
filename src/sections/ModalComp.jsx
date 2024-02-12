import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function QuestionModal({ question, onClose }) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-rose-100 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-rose-400 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-extrabold leading-6 text-rose-100"
                      >
                        {question.title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-md text-rose-50">
                          {question.description}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-rose-50">
                          Tags: {question.tags.join(", ")}
                        </p>
                      </div>

                      <div className="mt-2">
                        <p className="text-md text-rose-50">
                          {question.code}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center text-center text-sm text-rose-50">
                    <p className="p-1 rounded-lg bg-rose-600 hover:scale-105 hover:bg-rose-100 hover:text-rose-600 hover:translate-y-0.5 hover:drop-shadow-2xl duration-300">
                      Date Added: {question.timestamp.toDate().toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="bg-rose-400 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="m-1 p-2 w-1/2 flex justify-center text-rose-100 rounded-md focus:cursor-grab bg-rose-800 text-rose-50 hover:translate-y-0.5 hover:scale-110 hover:bg-rose-100 hover:text-rose-900 hover:drop-shadow-2xl active:bg-rose-500 active:cursor-grabbing duration-500"
                    onClick={() => {
                      setOpen(false);
                      onClose();
                    }}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
