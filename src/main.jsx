import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Chatbot from "./chatbot/chatbot";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Chatbot />
    </QueryClientProvider>
    <App />
  </React.StrictMode>
);
