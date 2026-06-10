import { createBrowserRouter } from "react-router-dom";
import { ChatPage } from "./features/chat/pages/chat_page";

export const router = 
  createBrowserRouter([
    {
      path: "/",
      element: <ChatPage />
    },
  ]);