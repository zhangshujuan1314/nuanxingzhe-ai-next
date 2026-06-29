import { TrendingUp, Calculator } from 'lucide-react';
import { revenue, costs, roadmap } from '@/lib/data';

const ROADMAP_COLORS = ['#D97706', '#2563EB', '#059669'];

export default function BusinessPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
      <h1 className="text-3xl font-bold text-center mb-10">商业模式</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-fn-green" /> 盈利模式</h2>
          <div className="space-y-3">
            {revenue.map(r => (
              <div key={r.title} className="flex items-start gap-3 p-2">
                <span className="text-fn-green mt-0.5">●</span>
                <div><div className="text-sm font-medium">{r.title}</div><div className="text-xs text-[#8E8E8E]">{r.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Calculator className="w-5 h-5 text-fn-yellow" /> 成本结构</h2>
          <div className="space-y-3">
            {costs.map(c => (
              <div key={c.title} className="flex items-start gap-3 p-2">
                <span className="text-fn-yellow mt-0.5">●</span>
                <div><div className="text-sm font-medium">{c.title}</div><div className="text-xs text-[#8E8E8E]">{c.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Value */}
      <div className="glass p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4 text-center">🌍 社会价值（公益赛道核心）</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-sm">
          {[{ v: '20%+', d: '骑手提效与减负' }, { v: '2000万', d: '社区互助网络覆盖' }, { v: '98.5%', d: '治安辅助安全评分' }, { v: '∞', d: '弱势群体关怀（独居老人代接代办）' }].map(s => (
            <div key={s.d} className="p-3">
              <div className="text-warm text-2xl font-bold mb-1">{s.v}</div>
              <div className="text-[#5C5C5C]">{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <h2 className="text-xl font-bold text-center mb-6">发展路线图</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {roadmap.map((r, i) => (
          <div key={r.phase} className="glass p-5 relative">
            <div className="text-xs font-semibold mb-1" style={{ color: ROADMAP_COLORS[i] }}>{r.time}</div>
            <div className="text-lg font-bold mb-2" style={{ color: ROADMAP_COLORS[i] }}>{r.phase}</div>
            <p className="text-[#5C5C5C] text-sm">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
