import { ChatRequest } from "@/interfaces/ChatRequest";
import { ChatResponse } from "@/interfaces/ChatResponse";
import Head from "next/head";
import { useState } from "react";

let conversationId = "";
let parentMessageId = "";

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);

  const callChatGPT = async (message: ChatRequest) => {
    console.log(JSON.stringify(message));

    const response = await fetch(
      "https://chatgpt-api.filavents.com/conversation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );
    const data = (await response.json()) as ChatResponse;
    return data;
  };

  const getAnswer = () => {
    const input = document.getElementById(
      "user_input_text"
    ) as HTMLTextAreaElement;
    const conversation = document.getElementById(
      "conversation"
    ) as HTMLDivElement;
    const newMessage = document.createElement("div");
    newMessage.className = "border-gray-100 rounded mb-2 border p-3";
    const newMessageText = document.createElement("span");
    newMessageText.className = "";
    newMessageText.innerText = input.value;
    newMessage.appendChild(newMessageText);
    conversation.appendChild(newMessage);
    input.value = "";

    setIsLoading(true);
    let chatRequest: ChatRequest = {
      message: newMessageText.innerText,
      conversationId: conversationId,
      parentMessageId: parentMessageId,
    };
    callChatGPT(chatRequest).then((data) => {
      const newMessage = document.createElement("div");
      newMessage.className = "border-gray-100 rounded mb-2 border p-3";
      const newMessageText = document.createElement("span");
      newMessageText.className = "";
      newMessageText.innerText = data.response!;
      newMessage.appendChild(newMessageText);
      conversation.appendChild(newMessage);

      conversationId = data.conversationId || "";
      parentMessageId = data.messageId || "";

      setIsLoading(false);
    });
  };

  return (
    <>
      <Head>
        <title>ChatGPT Web</title>
        <meta name="description" content="ChatGPT alternative web client" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-1 p-3 container mx-auto">
        <div id="conversation" className="overflow-scroll">
          <div className="border-gray-100 rounded mb-2 border p-3">
            <span className="">Hello, welcome.</span>
          </div>
        </div>
      </div>
      <div className="mt-1 p-3 container mx-auto">
        <div id="user_input" className="">
          <textarea
            id="user_input_text"
            className="w-full h-20 border-gray-100 rounded border p-3"
            placeholder="Type your message here..."
          ></textarea>
          <button
            onClick={getAnswer}
            className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}