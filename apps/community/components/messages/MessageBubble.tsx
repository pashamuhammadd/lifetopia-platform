type Message = {
  id: string;
  sender: string;
  text: string;
};

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-[22px] px-4 py-3 text-sm font-bold leading-6 ${
          isMe
            ? "rounded-br-md bg-[#4f8124] text-white"
            : "rounded-bl-md bg-white text-[#2f2418]"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}