import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { sendMessage } from "../services/chatService";

const Chat = () => {
  const [inputData, setInputData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "Ai",
      message: "Hello! How can I help you?",
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const formHandler = async (e) => {
    e.preventDefault();

    // Empty message অথবা AI response চলাকালীন submit prevent
    if (!inputData.trim() || isLoading) return;

    const userMessage = inputData.trim();

    // User message UI-তে যোগ করা
    setMessages((prev) => [
      ...prev,
      {
        role: "User",
        message: userMessage,
      },
    ]);

    setInputData("");

    // Loading শুরু
    setIsLoading(true);

    try {
      // Backend-এ request
      const data = await sendMessage(userMessage);

      // AI response UI-তে যোগ
      setMessages((prev) => [
        ...prev,
        {
          role: "Ai",
          message: data.AI,
        },
      ]);
    } catch (error) {
      console.log("Chat error:", error);
      console.log("Backend response:", error.response?.data);

      setMessages((prev) => [
        ...prev,
        {
          role: "Ai",
          message:
            error.response?.data?.message ||
            "Something went wrong",
        },
      ]);
    } finally {
      // Loading শেষ
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-4">
      <div className="flex flex-col w-full max-w-[560px] h-[88vh] rounded-3xl bg-white shadow-[0_8px_40px_-8px_rgba(15,23,42,0.25)] border border-slate-200/70 overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-900 to-teal-800 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/20">
            <Bot className="w-5 h-5 text-teal-300" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-semibold text-white tracking-tight">
              AI Assistant
            </h1>
            <span className="flex items-center gap-1.5 text-xs text-teal-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Online
            </span>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex flex-col gap-4 w-full flex-1 overflow-y-auto px-5 py-6 bg-slate-50/60 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent]">

          {/* Messages */}
          {messages.map((message, index) => {
            const isAi = message.role === "Ai";
            return (
              <div
                key={index}
                className={`flex items-end gap-2 max-w-[85%] animate-[fadeIn_0.25s_ease-out] ${
                  isAi ? "self-start flex-row" : "self-end flex-row-reverse"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 ${
                    isAi ? "bg-teal-100 text-teal-700" : "bg-slate-800 text-white"
                  }`}
                >
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <p
                  className={`rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap break-words ${
                    isAi
                      ? "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
                      : "bg-teal-700 text-white rounded-br-sm"
                  }`}
                >
                  {message.message}
                </p>
              </div>
            );
          })}

          {/* Thinking Indicator */}
          {isLoading && (
            <div className="flex items-end gap-2 self-start max-w-[85%]">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 text-teal-700 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {/* Auto Scroll Target */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={formHandler}
          className="flex items-center gap-2 px-4 py-4 bg-white border-t border-slate-200 shrink-0"
        >
          <input
            ref={inputRef}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            type="text"
            placeholder="Message AI Assistant..."
            className="flex-1 px-4 py-3 text-[15px] outline-none rounded-full bg-slate-100 text-slate-800 placeholder:text-slate-400 border border-transparent focus:border-teal-500 focus:bg-white transition-colors"
          />

          <button
            type="submit"
            disabled={isLoading || !inputData.trim()}
            aria-label="Send message"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-teal-700 text-white shrink-0 cursor-pointer transition-all hover:bg-teal-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-teal-700"
          >
            <Send className="w-4.5 h-4.5" strokeWidth={2.2} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Chat;