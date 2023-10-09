import React from "react";
import { useState } from "react";

const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };
  return (
    <div
      className="w-full bg-slate-900 bg-opacity-10 max-h-40 rounded-lg px-4
    py-4 overflow-auto relative"
    >
      {loading ? (
        <img src="./images/loader.gif" className="w-8 m-auto" />
      ) : (
        <>
          <input
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            className="border-0 w-[88%] bg-transparent outline-none "
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />

          <img
            onClick={handleSubmit}
            src="./images/send.png"
            width={20}
            alt="send-button"
            className="absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125"
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;
