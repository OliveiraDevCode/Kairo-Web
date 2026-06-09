import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { PokerSplashScreen } from "@/ui/SplashScreen/PokerSplashScreen";

export default function App() {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return <PokerSplashScreen onComplete={() => setReady(true)} />;
  }

  return <RouterProvider router={router} />;
}
