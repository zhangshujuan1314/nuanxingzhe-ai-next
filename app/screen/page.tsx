'use client';

import { useState, useEffect } from 'react';
import { ArrowUpDown, MapPin, ClipboardList, ShieldCheck } from 'lucide-react';
import BreathingDot from '@/components/BreathingDot';
import { elevators, microTasks, screenEvents } from '@/lib/data';

export default function ScreenPage() {
  const [time, setTime] = useState('');
  const [riders, setRiders] = useState(12);
  const [events, setEvents] = useState(screenEvents);
  const [taskTab, setTaskTab] = useState<'pending' | 'ongoing' | 'completed'>('pending');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('zh-CN', { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    const r = setInterval(() => setRiders(11 + Math.floor(Math.random() * 3)), 5000);
    return () => { clearInterval(t); clearInterval(r); };
  }, []);

  const filteredTasks = microTasks.filter(t => t.status === taskTab);

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2D35]">
        <h1 className="text-xl font-bold">社区运营大屏 · <span className="text-warm">阳光花园社区</span> · 实时数据</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-fn-green"><BreathingDot /> 运行中</span>
          <span className="text-[#B0B3BA] font-mono">{time}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-7xl mx-auto">
        {/* Elevators */}
        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-[#B0B3BA] mb-3 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-warm" /> 电梯状态监控（实时）
          </h3>
          <div className="space-y-3">
            {elevators.map(e => (
              <div key={e.name} className="flex items-center justify-between p-3 rounded-lg bg-[#0F1115]/40 border border-[#2A2D35]/50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{e.name}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${e.status === 'normal' ? 'bg-fn-green/10 text-fn-green' : 'bg-fn-yellow/10 text-fn-yellow'}`}>
                    {e.status === 'normal' ? '正常' : '维修中'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#B0B3BA]">
                  <span>{e.floor}F</span>
                  <span>{e.direction === 'up' ? '▲ 上行' : e.direction === 'down' ? '▼ 下行' : '— 停留'}</span>
                  <span className="text-[#6B6F76]">{e.eta}</span>
                  <BreathingDot color={e.status === 'normal' ? '#00C48C' : '#FFB800'} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buildings */}
        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-[#B0B3BA] mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-warm" /> 楼栋导航大屏
          </h3>
          {[{ name: 'A栋', units: 286, status: '正常', color: '#00C48C', pct: 85 },
            { name: 'B栋', units: 368, status: '维修中', color: '#FFB800', pct: 60 },
            { name: 'C栋', units: 184, status: '畅通', color: '#00C48C', pct: 95 }].map(b => (
            <div key={b.name} className="flex items-center justify-between p-3 rounded-lg bg-[#0F1115]/40 border border-[#2A2D35]/50 mb-2">
              <span className="text-sm font-medium">{b.name}</span>
              <div className="flex items-center gap-3 text-xs">
                <span style={{ color: b.color }}>{b.units}户</span>
                <span className="px-2 py-0.5 rounded" style={{ background: `${b.color}15`, color: b.color }}>{b.status}</span>
                <div className="progress-bar w-20"><div className="progress-fill" style={{ width: `${b.pct}%`, background: b.color }} /></div>
              </div>
            </div>
          ))}
          <div className="mt-3 text-xs text-warm bg-warm/5 rounded-lg p-2 border border-warm/10">
            💡 B栋2单元设备处有"帮取快递"微任务待接单
          </div>
        </div>

        {/* Micro Tasks */}
        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-[#B0B3BA] mb-3 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-warm" /> 社区微任务
          </h3>
          <div className="flex gap-2 mb-3">
            {(['pending', 'ongoing', 'completed'] as const).map(tab => (
              <button key={tab} className={`task-tab ${taskTab === tab ? 'active' : ''}`} onClick={() => setTaskTab(tab)}>
                {tab === 'pending' ? '待接单' : tab === 'ongoing' ? '进行中' : '已完成'}
              </button>
            ))}
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filteredTasks.map(t => (
              <div key={t.id} className="flex items-center justify-between p-2 rounded-lg bg-[#0F1115]/40 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-fn-green font-medium">{t.reward}</span>
                  <span>{t.typeName}</span>
                  <span className="text-[#6B6F76]">{t.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B6F76]">
                  <span>截{t.deadline}</span>
                  <span>{t.publisher}</span>
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && <div className="text-[#6B6F76] text-xs text-center py-4">暂无数据</div>}
          </div>
        </div>

        {/* Security Events */}
        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-[#B0B3BA] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-warm" /> 治安联盟监控
          </h3>
          <div className="flex items-center gap-4 mb-3 text-sm">
            <span>在线骑手 <span className="text-fn-green font-semibold">{riders}</span></span>
            {riders > 12 && <span className="text-fn-red">（异常↑）</span>}
            <span>异常上报 <span className="text-fn-yellow font-semibold">3</span></span>
            <span>安全评分 <span className="text-fn-green font-semibold">98.5%</span></span>
          </div>
          <div className="space-y-2 max-h-44 overflow-y-auto text-xs">
            {events.map((e, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded bg-[#0F1115]/30">
                <span className="text-[#6B6F76] flex-shrink-0">{e.time}</span>
                <span className="text-[#B0B3BA]">{e.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-[#6B6F76] border-t border-[#2A2D35]">
        ⚠️ 隐私模式已开启 — 本页为概念演示，居民手机号均脱敏，数据均为模拟，仅用于展示产品效果。
      </div>
    </div>
  );
}
