import Header from "../../../lib/components/header/header";
import Messages from "../components/message/messages";
import Input from "../../../lib/components/input/input";
import { ThemeToggle } from "@/shared/components/theme-toggle/theme-toggle";
import { DEFAULT_WINDOW_TITLE, INPUT_PLACEHOLDER } from "@/lib/constants/app.constants";

export function ChatPage() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <Header title={DEFAULT_WINDOW_TITLE} />
        <ThemeToggle />
      </div>
      <Messages />
      <Input placeholder={INPUT_PLACEHOLDER} />
    </div>
  );
}