import React, { useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect } from "react";


const ChatBody = ({ chat }) => {
  const aiStyle =
    "bg-slate-600 bg-opacity-50 backdrop-blur-lg dropshadow-md mr-auto";

    const parent = useRef(null);
    const bottomRef = useRef(null);

    // only for aut animations
    useEffect(()=>{
        parent.current && autoAnimate(parent.current);
    }, [parent])

    //for scrolling bottom
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: "smooth"})
    }, [chat])

  return (
    <div className=" text-sm flex flex-col gap-4" ref={parent}>
      {chat.map((message, i) => {
        return (
          <div
            key={i}
            className={`max-w-[90%] border-[#999999] break-words border-2 rounded-xl self-end px-3.5 py-2 ${
              message.sender === "ai" && aiStyle
            }`}
          >
            <pre className="whitespace-pre-wrap">
              <span>{message.message}</span>
            </pre>
          </div>
        );
      })}

      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

export default ChatBody;
