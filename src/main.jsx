import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import chatbot from "./chatbot/chatbot";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient()

const root = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <React.StrictMode>
    <>
    <QueryClientProvider client={queryClient}>
        <chatbot />
      </QueryClientProvider>

      <App />
    </>
  </React.StrictMode>
);
