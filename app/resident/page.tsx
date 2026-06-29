'use client';

import { useState, useRef } from 'react';
import { Flame, Mic, Send } from 'lucide-react';
import PhoneFrame, { PhoneBottomNav } from '@/components/PhoneFrame';
import { ChatBubble } from '@/components/ChatBubble';
import BreathingDot from '@/components/BreathingDot';

const REPLIES: Record<string, string> = {
  order: '📦 您当前有 2 个配送中订单：<br>1. 保密订单 — 预计15:20到达<br>2. 麦当劳 — 预计15:35到达<br><br>骑手已进入小区，请留意门口。',
  answer: '📞 暖接听已开启。<br>当前设置：AI 代理接听 → 告知骑手"请放门口鞋柜"。<br>如您无法按时接听，系统会自动触发。',
  elevator: '🛗 南苑花园电梯状态：<br>A栋1号 正常·12F上行<br>A栋2号 正常·1F空闲<br>建议从A栋2号电梯上楼最快。',
  task: '📋 发布微任务：<br>您可以在社区发布取快递、买药、扔垃圾等互助任务，骑手接单后帮您代办。',
  pickup: '🤝 代接服务：<br>如果您不方便亲自取件，可授权暖行者AI通知骑手将物品放指定位置。',
  notice: '📢 社区公告：<br>1. B栋1号电梯维修中，预计16:00恢复<br>2. 社区志愿活动本周六举行(+15积分)<br>3. 垃圾分类新规已生效',
};

const MOCK_ORDERS = [
  { shop: '保密订单', addr: '南苑花园A座1单元502', status: '配送中', eta: '预计15:20到达' },
  { shop: '麦当劳', addr: '南苑花园B座2单元301', status: '配送中', eta: '预计15:35到达' },
  { shop: '阳光花园A座', addr: '1单元502', status: '已完成', eta: '14:50 已签收' },
];

export default function ResidentPage() {
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const addAi = (text: string) => {
    setMessages(prev => [...prev, { role: 'ai', text }]);
    setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }), 50);
  };

  const quickReply = (type: string) => {
    const reply = REPLIES[type] || '收到，让我帮你看看…';
    addAi(reply);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setTimeout(() => addAi('收到！如需查看订单、设置暖接听或发布任务，可以使用下方的快捷按钮哦～'), 500);
  };

  return (
    <div className="flex page-split h-[calc(100vh-4rem)]">
      {/* Left: Phone */}
      <PhoneFrame>
        <div className="px-4 py-2 text-sm text-[#B0B3BA]">
          未登录 · <span className="text-warm font-medium">南苑花园</span>
        </div>
        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {MOCK_ORDERS.map((o, i) => (
            <div key={i} className="glass p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">{o.shop}</div>
                  <div className="text-xs text-[#6B6F76] mt-0.5">{o.addr}</div>
                  <div className="text-xs text-fn-green mt-0.5">{o.eta}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${o.status === '配送中' ? 'bg-fn-green/10 text-fn-green' : 'bg-[#6B6F76]/10 text-[#6B6F76]'}`}>
                  {o.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-3 my-2 h-28 bg-[#0F1115]/60 rounded-lg border border-[#2A2D35] relative overflow-hidden">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <rect x="0" y="40" width="200" height="20" fill="#1A1D23" stroke="#2A2D35" strokeWidth="0.5" />
            <rect x="80" y="0" width="20" height="100" fill="#1A1D23" stroke="#2A2D35" strokeWidth="0.5" />
            <rect x="20" y="10" width="40" height="25" rx="2" fill="#2A2D35" /><text x="40" y="26" textAnchor="middle" fill="#B0B3BA" fontSize="8">A座</text>
            <rect x="20" y="65" width="40" height="25" rx="2" fill="#2A2D35" /><text x="40" y="81" textAnchor="middle" fill="#B0B3BA" fontSize="8">B座</text>
            <rect x="140" y="55" width="45" height="30" rx="2" fill="#1A1D23" stroke="#1890FF" strokeWidth="2" /><text x="162" y="74" textAnchor="middle" fill="#1890FF" fontSize="9" fontWeight="bold">南苑</text>
            <circle cx="155" cy="60" r="4" fill="#1890FF" opacity="0.8"><animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" /></circle>
            <circle cx="100" cy="50" r="3" fill="#FF7A00"><animate attributeName="cx" values="100;140;100" dur="4s" repeatCount="indefinite" /></circle>
          </svg>
        </div>
        <div className="px-3 pb-2">
          <button className="w-full py-2 rounded-lg bg-warm text-white text-sm font-medium hover:bg-warm-dark transition">🔔 敲门派</button>
        </div>
        <PhoneBottomNav />
      </PhoneFrame>

      {/* Right: AI Panel */}
      <div className="flex-1 flex flex-col border-l border-[#2A2D35]">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2A2D35]">
          <Flame className="w-5 h-5 text-warm" />
          <span className="font-semibold">暖行者AI</span>
          <span className="text-[#6B6F76] text-sm">我的外卖到哪了 / 设置暖接听 / 发布任务</span>
        </div>

        <div ref={chatRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <div className="chat-bubble ai">欢迎体验居民端！我是您的社区智能助手 👋</div>
          <div className="glass p-4 space-y-2 mt-3">
            <div className="flex items-center gap-2 text-fn-green text-sm font-medium"><BreathingDot /> 暖接听已开启</div>
            <div className="text-xs text-[#B0B3BA] space-y-1">
              <div>AI 代理：<span className="text-white">暖行者AI</span></div>
              <div>默认回复：<span className="text-white">"请放门口鞋柜"</span></div>
              <div>特殊条件：<span className="text-fn-yellow">无法按时接听时自动触发</span></div>
            </div>
          </div>
          {messages.map((msg, i) => <ChatBubble key={i} role={msg.role}>{msg.text}</ChatBubble>)}
        </div>

        <div className="px-4 py-2 border-t border-[#2A2D35]/50">
          <div className="flex flex-wrap gap-2">
            {Object.keys(REPLIES).map(k => (
              <button key={k} className="quick-btn" onClick={() => quickReply(k)}>
                {k === 'order' ? '📦 查订单' : k === 'answer' ? '📞 暖接听' : k === 'elevator' ? '🛗 电梯' : k === 'task' ? '📋 发任务' : k === 'pickup' ? '🤝 代接' : '📢 公告'}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-[#2A2D35] flex items-center gap-2">
          <button className="text-[#6B6F76] hover:text-warm transition"><Mic className="w-5 h-5" /></button>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="输入你想说的话…" className="flex-1 bg-[#0F1115] border border-[#2A2D35] rounded-lg px-3 py-2 text-sm text-white placeholder-[#6B6F76] outline-none focus:border-warm/50 transition" />
          <button onClick={handleSend} className="text-warm hover:text-warm-light transition"><Send className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}
