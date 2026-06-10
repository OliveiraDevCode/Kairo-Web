import Header from "../../../lib/components/header/header";
import Messages from "../components/message/messages";
import Input from "../../../lib/components/input/input";
import { DEFAULT_WINDOW_TITLE, INPUT_PLACEHOLDER } from "@/lib/constants/app.constants";

export function ChatPage() {
  return (
    <div>
        <Header title={DEFAULT_WINDOW_TITLE} />
        <Messages />
        <Input placeholder={INPUT_PLACEHOLDER} />
    </div>
  );
}