"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Minus,
  Send,
  Building2,
  LayoutGrid,
  MapPin,
  Phone,
  ChevronRight,
} from "lucide-react";

const WELCOME =
  "Welcome to Ajay Homes & Estates. How can we help you with your dream home today?";

const AUTO_REPLY =
  "Thank you. We have received your message and will get back to you shortly.";

const QUICK_ACTIONS = [
  { label: "Explore Properties", href: "#services", icon: Building2 },
  { label: "View Projects", href: "#projects", icon: LayoutGrid },
  { label: "Book a Site Visit", href: "tel:+919840012345", icon: MapPin },
  { label: "Contact Us", href: "footer", icon: Phone, scrollTo: "footer" },
];

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ id: 1, role: "brand", text: WELCOME }]);
  const bodyRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const hasUserMessage = messages.some((m) => m.role === "user");
    if (hasUserMessage) {
      scrollToBottom();
    } else if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [isOpen, messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const minimize = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const navigate = (action) => {
    close();
    requestAnimationFrame(() => {
      if (action.scrollTo) {
        document.querySelector(action.scrollTo)?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (action.href.startsWith("#")) {
        document.querySelector(action.href)?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (action.href.startsWith("tel:")) {
        window.location.href = action.href;
      }
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text },
      { id: Date.now() + 1, role: "brand", text: AUTO_REPLY },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-[55] font-sans">
      {/* Panel */}
      <div
        role="dialog"
        aria-label="Chat with Ajay Homes & Estates"
        aria-hidden={!isOpen}
        className={`chat-panel absolute bottom-[calc(100%+0.625rem)] right-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/50 ${
          isOpen ? "chat-panel--open" : "chat-panel--closed"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 bg-primary px-3.5 py-3 sm:px-4">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold tracking-tight text-white sm:text-sm">
              Ajay Homes &amp; Estates
            </p>
            <p className="text-[10px] font-medium text-white/65 sm:text-[11px]">
              We&apos;re here to assist you
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={minimize}
              aria-label="Minimize chat"
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/12 hover:text-white"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/12 hover:text-white"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Body — scrollable middle row */}
        <div
          ref={bodyRef}
          className="chat-panel__body px-3.5 pt-3.5 pb-3 sm:px-4 sm:pt-4"
        >
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] px-3 py-2.5 text-[12px] leading-relaxed sm:max-w-[88%] sm:text-[13px] ${
                    msg.role === "user"
                      ? "rounded-2xl rounded-br-md bg-primary text-white"
                      : "rounded-2xl rounded-bl-md border border-slate-200/90 bg-slate-50 text-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 space-y-1.5 sm:mt-3.5">
            <p className="px-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Quick actions
            </p>
            <ul className="space-y-1.5">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <li key={action.label}>
                    <button
                      type="button"
                      onClick={() => navigate(action)}
                      className="group flex w-full items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-2.5 py-1.5 text-left transition-all hover:border-primary/25 hover:bg-slate-50/80 sm:gap-2.5 sm:px-3 sm:py-2"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/12 sm:h-8 sm:w-8">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </span>
                      <span className="min-w-0 flex-1 text-[12px] font-medium text-slate-700 sm:text-[13px]">
                        {action.label}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-primary" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div ref={messagesEndRef} aria-hidden="true" className="h-px" />
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="shrink-0 border-t border-slate-200/80 bg-white px-3 py-2.5 sm:px-3 sm:py-3"
        >
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              aria-label="Message"
              className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 sm:px-3.5 sm:py-2.5 sm:text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-white shadow-sm transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
            >
              <Send className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </form>
      </div>

      {/* Trigger */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        className={`chat-float-btn relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] sm:h-[52px] sm:w-[52px] ${
          isOpen ? "chat-float-btn--open" : ""
        }`}
      >
        <span
          className={`absolute transition-all duration-200 ease-out ${
            isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <MessageCircle className="h-5 w-5" strokeWidth={2} />
        </span>
        <span
          className={`absolute transition-all duration-200 ease-out ${
            isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </span>
      </button>
    </div>
  );
}
