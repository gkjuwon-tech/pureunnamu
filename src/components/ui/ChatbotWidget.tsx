"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "안녕하세요! 푸른나무 심리센터 AI 안내 도우미입니다.\n상담 프로그램, 운영시간, 위치 등 궁금한 점을 편하게 물어봐 주세요.",
};

const QUICK_QUESTIONS = [
  "상담 예약은 어떻게 하나요?",
  "어떤 프로그램이 있나요?",
  "운영시간이 궁금해요",
  "찾아가는 길 알려주세요",
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 3초 후 말풍선 툴팁 표시 (한 번만)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !tooltipDismissed) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, tooltipDismissed]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function openChat() {
    setIsOpen(true);
    setShowTooltip(false);
    setTooltipDismissed(true);
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const historyForApi = newMessages.slice(1);

      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyForApi }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.error ||
              "죄송합니다, 오류가 발생했어요. 센터에 직접 문의해 주세요. 📞 043-288-4040",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "네트워크 오류가 발생했어요. 잠시 후 다시 시도해 주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  // 첫 대화인지 (웰컴 메시지만 있는 상태)
  const isFirstInteraction = messages.length === 1;

  return (
    <>
      {/* ── 말풍선 툴팁 (3초 후 자동 표시) ── */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-[108px] right-6 z-50 animate-fade-in-up">
          <div className="relative bg-[rgba(255,253,250,0.97)] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] rounded-2xl shadow-xl px-5 py-3.5 max-w-[240px] border border-[#2D5016]/10">
            <p className="text-sm text-[#2c2c2c] font-medium leading-snug flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
              궁금한 점이 있으신가요?
            </p>
            <p className="text-xs text-[#888] mt-1" style={{ fontFamily: "var(--font-body)" }}>
              AI 도우미가 24시간 안내해드려요
            </p>
            {/* 말풍선 꼬리 */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[rgba(255,253,250,0.97)] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] border-r border-b border-[#2D5016]/10 rotate-45" />
            <button
              onClick={() => {
                setShowTooltip(false);
                setTooltipDismissed(true);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#eee] rounded-full flex items-center justify-center text-[#999] text-xs hover:bg-[#ddd] transition-colors"
              aria-label="닫기"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── 플로팅 버튼 ── */}
      <button
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        className={`fixed bottom-6 right-6 z-50 rounded-full text-white shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? "w-14 h-14 bg-[#555] hover:bg-[#444]"
            : "w-16 h-16 bg-[#2D5016] hover:bg-[#3a6b1e] hover:scale-105 chatbot-pulse"
        }`}
        aria-label={isOpen ? "채팅 닫기" : "AI 상담 도우미"}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        )}
      </button>

      {/* ── 채팅 패널 ── */}
      {isOpen && (
        <div className="fixed bottom-[100px] right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-[#2D5016]/15 animate-chat-open">
          {/* 헤더 */}
          <div className="green-gradient text-white px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22V14" />
                <path d="M12 14C8.5 14 6 11 6 8.5C6 6 8 3 12 2C16 3 18 6 18 8.5C18 11 15.5 14 12 14Z" />
                <path d="M9 18C7 17.5 5.5 16 5.5 14" />
                <path d="M15 18C17 17.5 18.5 16 18.5 14" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[15px] heading-serif tracking-tight">
                푸른나무 AI 도우미
              </p>
              <p className="text-[11px] text-white/50 mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block animate-pulse" />
                24시간 상담 안내
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="닫기"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FFFDF8] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-msg-in`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-[#2D5016]/10 flex items-center justify-center shrink-0 mr-2 mt-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 22V14" />
                      <path d="M12 14C8.5 14 6 11 6 8.5C6 6 8 3 12 2C16 3 18 6 18 8.5C18 11 15.5 14 12 14Z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#2D5016] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] bg-blend-overlay text-white rounded-2xl rounded-br-md shadow-sm"
                      : "bg-[rgba(255,253,250,0.97)] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] text-[#2c2c2c] rounded-2xl rounded-bl-md shadow-sm border border-[#2D5016]/5"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-msg-in">
                <div className="w-7 h-7 rounded-full bg-[#2D5016]/10 flex items-center justify-center shrink-0 mr-2 mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 22V14" />
                    <path d="M12 14C8.5 14 6 11 6 8.5C6 6 8 3 12 2C16 3 18 6 18 8.5C18 11 15.5 14 12 14Z" />
                  </svg>
                </div>
                <div className="bg-[rgba(255,253,250,0.97)] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] text-[#2c2c2c] px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-[#2D5016]/5">
                  <span className="inline-flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-[#2D5016]/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#2D5016]/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#2D5016]/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 질문 버튼 (첫 대화일 때만) */}
          {isFirstInteraction && !isLoading && (
            <div className="px-4 py-3 bg-[rgba(255,253,250,0.97)] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] border-t border-[#2D5016]/5 shrink-0">
              <p className="text-[11px] text-[#999] mb-2 font-medium" style={{ fontFamily: "var(--font-body)" }}>자주 묻는 질문</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="px-3 py-1.5 bg-[#2D5016]/5 hover:bg-[#2D5016]/10 text-[#2D5016] text-xs rounded-full transition-colors border border-[#2D5016]/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 입력 영역 */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-[#2D5016]/10 px-4 py-3 flex gap-2.5 items-end bg-[rgba(255,253,250,0.97)] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] shrink-0"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="궁금한 점을 물어보세요..."
              rows={1}
              className="flex-1 resize-none bg-[#f8f6f2] rounded-xl px-3.5 py-2.5 text-sm text-[#2c2c2c] placeholder:text-[#aaa] outline-none max-h-20 leading-relaxed focus:ring-1 focus:ring-[#2D5016]/20 transition-shadow"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="shrink-0 w-10 h-10 rounded-xl bg-[#2D5016] text-white flex items-center justify-center disabled:opacity-30 hover:bg-[#3a6b1e] transition-all active:scale-95"
              aria-label="전송"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
