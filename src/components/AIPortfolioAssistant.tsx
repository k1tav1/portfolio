"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const EXAMPLE_PROMPTS = [
  "Tell me about Kaya project",
  "What cloud experience does he have?",
  "What skills and where did he use them?",
  "What roles is he looking for?",
  "What is he currently building?",
  "Who is Derick Kitavi?",
];

export default function AIPortfolioAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Derick's AI portfolio assistant — built to demonstrate his interest in agent engineering. I answer only from verified portfolio data (no hallucinations). Try asking about Kaya, cloud experience, skills evidence, or open roles.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = await res.json();
      const assistantMsg: Message = { role: "assistant", content: data.answer || data.error || "Failed to get response" };
      setMessages((m) => [...m, assistantMsg]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Error contacting AI assistant. Please try again or email derekdek57@gmail.com" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[24px] bg-[#0E0E12] border border-white/[0.08] overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-gradient-to-r from-[#0E0E12] to-[#130E1F]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-[12px] font-bold">AI</div>
          <div>
            <div className="font-semibold text-[14px] tracking-tight">ASK DERICK'S AI</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-white/40">ONLINE</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={listRef} className="h-[360px] overflow-y-auto p-5 space-y-4 bg-[#07080A]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-6 whitespace-pre-wrap ${
                m.role === "user" ? "bg-white text-black rounded-br-sm" : "bg-white/[0.06] border border-white/[0.08] text-white/80 rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 bg-white/[0.06] border border-white/[0.08] text-white/40 text-[13px] rounded-bl-sm flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
              Searching verified portfolio data...
            </div>
          </div>
        )}
      </div>

      {/* Examples */}
      <div className="px-5 py-3 border-y border-white/[0.06] bg-[#0E0E12]">
        <div className="font-mono text-[10px] tracking-widest text-white/30 mb-2">TRY THESE (recruiter-tested):</div>
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLE_PROMPTS.map((p) => (
            <button key={p} onClick={() => send(p)} className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-white/50 hover:text-white hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 transition text-left">
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-[#0E0E12] flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask about Kaya, cloud, skills evidence, roles..."
          className="flex-1 h-11 rounded-full bg-white/[0.06] border border-white/[0.08] px-4 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-[#8B5CF6]/40"
          maxLength={500}
        />
        <button onClick={() => send(input)} disabled={loading || !input.trim()} className="h-11 px-5 rounded-full bg-white text-black font-medium text-[13px] disabled:opacity-50 hover:bg-white/90 transition">
          Send
        </button>
      </div>


    </div>
  );
}
