import { useState } from "react";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useMutation } from "react-query";
import { fetchResponse } from "./api";

const chatbot = () => {
  const [chat, setChat] = useState([]);
  const [show, setShow] = useState(false);
  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (message) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  return (
    <>
      {show ? (
        <div
          className={`fixed z-10 right-10 bottom-10 bg-slate-800 border border-violet-900 rounded-xl max-w-[27%] h-[70%] text-white overflow-hidden flex flex-col justify-between align-middle transition-transform duration-1000 ease-in-out transform translate-y-0`}
        >
          {/* header */}
          <div className="w-full bg-slate-900 border border-violet-900 flex items-center justify-between text-lg text-center py-2 px-4">
            <h3>How can I help you?</h3>
            <div
              className=" text-xl px-4 py-2 rounded bg-blue-950 font-bold text-[#915eff] cursor-pointer"
              onClick={() => setShow(!show)}
            >
              X
            </div>
          </div>

          {/* body */}
          <div
            className="h-[70%] overflow-auto w-[28vw] min-w-[20rem] py-8 px-4 self-center
      scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-rounded-md
      "
          >
            <ChatBody chat={chat} />
          </div>

          {/* input */}
          <div className="w-full border border-violet-900 rounded-lg min-w-[20rem] self-center">
            <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
          </div>
        </div>
      ) : (
        <div
          onClick={() => setShow(true)}
          className="z-10 fixed right-10 bottom-10 w-16 h-16 p-2 bg-slate-900 rounded-full flex justify-center items-center cursor-pointer transform translate-y-0 transition-transform duration-1000 ease-in-out hover:translate-y-[-5px]"
        >
          <img src="https://ibb.co/Kx3XwzK" alt="chatbot" />
        </div>
      )}
    </>
  );
};

export default chatbot;
