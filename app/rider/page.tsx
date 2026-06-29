'use client';

import { useState, useRef, useEffect } from 'react';
import { Flame, Mic, Send } from 'lucide-react';
import PhoneFrame, { PhoneBottomNav } from '@/components/PhoneFrame';
import { ChatBubble, LoadingBubble } from '@/components/ChatBubble';
import BreathingDot from '@/components/BreathingDot';
import { orders, dialogScripts } from '@/lib/data';

export default function RiderPage() {
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatAreaRef.current?.scrollTo({ top: chatAreaRef.current.scrollHeight });
  }, [messages, loading]);

  const addMessage = (role: 'ai' | 'user', text: string) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  const handleQuickBtn = async (trigger: string) => {
    const script = dialogScripts[trigger];
    if (!script) return;
    for (const msg of script.messages) {
      if (msg.role === 'user') {
        addMessage('user', msg.text);
      } else {
        setLoading(true);
        await sleep(600 + Math.random() * 400);
        setLoading(false);
        addMessage('ai', msg.text);
      }
    }
  };

  const handleOrderClick = (orderId: string) => {
    const script = dialogScripts[orderId];
    if (!script) return;
    for (const msg of script.messages) {
      if (msg.role === 'user') addMessage('user', msg.text);
      else addMessage('ai', msg.text);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    addMessage('user', text);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      addMessage('ai', data.reply || '收到，让我想想…');
    } catch {
      // Fallback to scripted reply
      await sleep(600);
      addMessage('ai', '💡 你可以点击左侧订单卡片或下方快捷按钮获取精准配送指引。');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex page-split h-[calc(100vh-4rem)]">
      {/* Left: Phone */}
      <PhoneFrame>
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-fn-green flex items-center gap-1">
            <BreathingDot /> 配送中 · {orders.filter(o => o.status === 'delivering').length} 单
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {orders.map(o => (
            <div
              key={o.id}
              onClick={() => handleOrderClick(o.id)}
              className="glass p-3 rounded-lg cursor-pointer hover:border-warm/30 transition border border-transparent"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">{o.restaurant}</div>
                  <div className="text-xs text-[#8E8E8E] mt-0.5">{o.address}</div>
                  <div className="text-xs text-warm mt-0.5">{o.distance} · {o.entrance}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${o.status === 'delivering' ? 'bg-fn-green/10 text-fn-green' : 'bg-fn-yellow/10 text-fn-yellow'}`}>
                  {o.status === 'delivering' ? '配送中' : '取餐中'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Map */}
        <div className="mx-3 my-2 h-28 bg-[#FAF8F5]/60 rounded-lg border border-[#E8E5E1] relative overflow-hidden">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <rect x="0" y="40" width="200" height="20" fill="#FFFFFF" stroke="#E8E5E1" strokeWidth="0.5" />
            <rect x="80" y="0" width="20" height="100" fill="#FFFFFF" stroke="#E8E5E1" strokeWidth="0.5" />
            <rect x="20" y="10" width="40" height="25" rx="2" fill="#E8E5E1" stroke="#D97706" strokeWidth="1" />
            <text x="40" y="26" textAnchor="middle" fill="#5C5C5C" fontSize="8">A栋</text>
            <rect x="20" y="65" width="40" height="25" rx="2" fill="#E8E5E1" />
            <text x="40" y="81" textAnchor="middle" fill="#5C5C5C" fontSize="8">B栋</text>
            <rect x="140" y="10" width="45" height="25" rx="2" fill="#E8E5E1" />
            <text x="162" y="26" textAnchor="middle" fill="#5C5C5C" fontSize="8">C栋</text>
            <rect x="120" y="55" width="55" height="30" rx="2" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
            <text x="147" y="74" textAnchor="middle" fill="#D97706" fontSize="9" fontWeight="bold">17栋</text>
            <text x="100" y="18" textAnchor="middle" fill="#059669" fontSize="7">北门→</text>
            <circle cx="100" cy="70" r="4" fill="#D97706" opacity="0.8">
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="px-3 pb-2">
          <button className="w-full py-2 rounded-lg bg-warm text-white text-sm font-medium hover:bg-warm-dark transition">切换</button>
        </div>
        <PhoneBottomNav />
      </PhoneFrame>

      {/* Right: AI Chat */}
      <div className="flex-1 flex flex-col border-l border-[#E8E5E1]">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8E5E1]">
          <Flame className="w-5 h-5 text-warm" />
          <span className="font-semibold">暖行者AI</span>
          <span className="flex items-center gap-1 text-fn-green text-xs"><BreathingDot /> 在线</span>
        </div>

        <div ref={chatAreaRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.length === 0 && (
            <div className="chat-bubble ai">
              你好，我是暖行者AI 👋<br />试试点击下方按钮，或点击左侧订单，我来帮你高效完成配送！
            </div>
          )}
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} typewriter={i === messages.length - 1 && msg.role === 'ai'}>
              {msg.text}
            </ChatBubble>
          ))}
          {loading && <LoadingBubble />}
        </div>

        {/* Quick Buttons */}
        <div className="px-4 py-2 space-y-2 border-t border-[#E8E5E1]/50">
          <div className="flex flex-wrap gap-2">
            {['building-17-entrance', 'elevator-broken', 'answer-phone'].map(t => (
              <button key={t} className="quick-btn" onClick={() => handleQuickBtn(t)}>
                {t === 'building-17-entrance' ? '🚪 17号楼从哪进' : t === 'elevator-broken' ? '🛗 电梯坏了怎么办' : '📞 帮我接电话'}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {['elevator-speed', 'best-pickup', 'micro-tasks'].map(t => (
              <button key={t} className="quick-btn" onClick={() => handleQuickBtn(t)}>
                {t === 'elevator-speed' ? '⚡ 电梯快不快' : t === 'best-pickup' ? '📍 最佳取餐点' : '📋 有微任务吗'}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-[#E8E5E1] flex items-center gap-2">
          <button className="text-[#8E8E8E] hover:text-warm transition"><Mic className="w-5 h-5" /></button>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你想说的话…"
            className="flex-1 bg-[#FAF8F5] border border-[#E8E5E1] rounded-lg px-3 py-2 text-sm text-[#141414] placeholder-[#8E8E8E] outline-none focus:border-warm/50 transition"
          />
          <button onClick={handleSend} className="text-warm hover:text-warm-light transition"><Send className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }
