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
  HardHat,
  Layers,
  Briefcase,
  Paintbrush,
  KeyRound,
  CheckCircle2,
  Sparkles,
  RotateCcw,
} from "lucide-react";

const WELCOME =
  "Welcome to Ajay Homes & Estates. How can we help you with your dream home today?";

const AUTO_REPLY =
  "Thank you for contacting Ajay Homes & Estates. We have received your message and will get back to you shortly.";

export const SERVICES = [
  {
    id: "construction",
    title: "Construction",
    desc: "Turnkey residential & commercial building",
    icon: HardHat,
  },
  {
    id: "layout-promote",
    title: "Layout promote",
    desc: "Land development & prime layout promotion",
    icon: Layers,
  },
  {
    id: "project-management",
    title: "Project management",
    desc: "End-to-end site execution & supervision",
    icon: Briefcase,
  },
  {
    id: "property-developer",
    title: "Property developer",
    desc: "Bespoke luxury residences & joint ventures",
    icon: Building2,
  },
  {
    id: "interior-designing",
    title: "Interior designing",
    desc: "Premium modular & architectural interiors",
    icon: Paintbrush,
  },
  {
    id: "real-estate-selling-buy",
    title: "Real estate selling and buy",
    desc: "Buying, selling & prime estate advisory",
    icon: KeyRound,
  },
];

const INITIAL_QUICK_ACTIONS = [
  { label: "Services", type: "services", icon: Layers, highlight: true },
  { label: "Explore Properties", href: "#services", icon: Building2 },
  { label: "View Projects", href: "#projects", icon: LayoutGrid },
  { label: "Book a Site Visit", href: "tel:+919840012345", icon: MapPin },
  { label: "Contact Us", href: "footer", icon: Phone, scrollTo: "footer" },
];

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "brand",
      text: WELCOME,
      isInitialWelcome: true,
    },
  ]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback((behavior = "smooth") => {
    requestAnimationFrame(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTo({
          top: bodyRef.current.scrollHeight,
          behavior,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => scrollToBottom("smooth"), 100);
    return () => clearTimeout(timer);
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
      if (action.href?.startsWith("#")) {
        document.querySelector(action.href)?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (action.href?.startsWith("tel:")) {
        window.location.href = action.href;
      }
    });
  };

  const handleShowServices = () => {
    setSelectedServiceId(null);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text: "Services" },
      {
        id: Date.now() + 1,
        role: "brand",
        text: "Please select a service you would like to enquire about:",
        isServicesMenu: true,
      },
    ]);
  };

  const handleSelectService = (service) => {
    setSelectedServiceId(service.id);
    const userMsgId = Date.now();
    const botMsgId = Date.now() + 1;

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: "user", text: service.title },
      {
        id: botMsgId,
        role: "brand",
        text: `Submitted successfully! We have received your inquiry for ${service.title} and our team at Ajay Homes & Estates will get back to you shortly.`,
        isConfirmation: true,
        serviceName: service.title,
      },
    ]);
  };

  const handleQuickAction = (action) => {
    if (action.type === "services") {
      handleShowServices();
      return;
    }
    navigate(action);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const lower = text.toLowerCase();
    const matchedService = SERVICES.find(
      (s) => lower.includes(s.title.toLowerCase()) || lower.includes(s.id)
    );

    if (lower.includes("service")) {
      handleShowServices();
    } else if (matchedService) {
      handleSelectService(matchedService);
    } else {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "user", text },
        { id: Date.now() + 1, role: "brand", text: AUTO_REPLY },
      ]);
    }
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

        {/* Body — Pure conversational top-to-bottom stream */}
        <div
          ref={bodyRef}
          className="chat-panel__body px-3.5 pt-3.5 pb-4 sm:px-4 sm:pt-4"
        >
          <div className="space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Chat Bubble */}
                <div
                  className={`max-w-[92%] px-3.5 py-2.5 text-[12.5px] leading-relaxed sm:max-w-[90%] sm:text-[13px] ${
                    msg.role === "user"
                      ? "rounded-2xl rounded-br-sm bg-primary text-white font-medium shadow-2xs"
                      : msg.isConfirmation
                      ? "rounded-2xl rounded-bl-sm border border-emerald-200/90 bg-emerald-50/95 text-emerald-950 font-medium shadow-2xs"
                      : "rounded-2xl rounded-bl-sm border border-slate-200/90 bg-slate-50 text-slate-700"
                  }`}
                >
                  {/* Verified Confirmation Header */}
                  {msg.isConfirmation && (
                    <div className="mb-1.5 flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px] sm:text-[12px]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>Request Submitted Successfully</span>
                    </div>
                  )}

                  <p>{msg.text}</p>

                  {/* Quick follow-ups after confirmation */}
                  {msg.isConfirmation && (
                    <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleShowServices}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-emerald-300/80 px-2.5 py-1 text-[11px] font-semibold text-[#003a70] hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors shadow-2xs"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Select another service</span>
                      </button>
                      <a
                        href="tel:+919840012345"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700 transition-colors shadow-2xs"
                      >
                        <Phone className="h-3 w-3" />
                        <span>Call directly</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* 1. Initial Quick Actions shown once right below the first Welcome Message */}
                {msg.isInitialWelcome && messages.length === 1 && (
                  <div className="mt-2.5 w-full space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="px-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Quick actions
                    </p>
                    <ul className="space-y-1.5">
                      {INITIAL_QUICK_ACTIONS.map((action) => {
                        const Icon = action.icon;
                        return (
                          <li key={action.label}>
                            <button
                              type="button"
                              onClick={() => handleQuickAction(action)}
                              className={`group flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition-all ${
                                action.highlight
                                  ? "border-[#ff8c00]/50 bg-orange-50/40 hover:border-[#ff8c00] hover:bg-orange-50/80 hover:shadow-2xs"
                                  : "border-slate-200/90 bg-white hover:border-primary/30 hover:bg-slate-50/80"
                              }`}
                            >
                              <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                  action.highlight
                                    ? "bg-[#ff8c00]/15 text-[#ff8c00] group-hover:bg-[#ff8c00]/25"
                                    : "bg-primary/8 text-primary group-hover:bg-primary/12"
                                }`}
                              >
                                <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                              </span>
                              <span className="min-w-0 flex-1 text-[12.5px] font-semibold text-slate-700 sm:text-[13px]">
                                {action.label}
                              </span>
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-primary" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* 2. Interactive Services Selector (Appears strictly BELOW "Services" prompt) */}
                {msg.isServicesMenu && (
                  <div className="mt-2.5 w-full space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-[#003a70]">
                      Select a Service:
                    </p>
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {SERVICES.map((srv) => {
                        const Icon = srv.icon;
                        const isSelected = selectedServiceId === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleSelectService(srv)}
                            className={`group flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border text-left transition-all active:scale-[0.98] ${
                              isSelected
                                ? "border-[#ff8c00] bg-orange-50/90 shadow-xs ring-1 ring-[#ff8c00]/40"
                                : "border-slate-200/90 bg-white hover:border-[#ff8c00]/70 hover:bg-orange-50/50 hover:shadow-2xs"
                            }`}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-[#ff8c00]/15 group-hover:text-[#ff8c00]">
                              <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[12px] font-bold text-slate-800 leading-tight group-hover:text-[#003a70]">
                                {srv.title}
                              </p>
                              <p className="text-[10px] text-slate-500 leading-tight mt-0.5 group-hover:text-slate-600 truncate">
                                {srv.desc}
                              </p>
                            </div>
                            {isSelected ? (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ff8c00]" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 group-hover:text-[#ff8c00]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div aria-hidden="true" className="h-3" />
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
              placeholder="Type a message or select a service…"
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

