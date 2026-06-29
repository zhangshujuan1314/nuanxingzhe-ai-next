import { Monitor, Shield, Code2 } from 'lucide-react';

export default function TechPage() {
  const layers = [
    { y: 20, label: '前端展示层', color: '#FF7A00', items: ['响应式Web', 'iOS', 'Android', '小程序', '桌面端', '地图插件'] },
    { y: 105, label: 'AI 对话层', color: '#1890FF', items: ['意图识别', '场景路由', '大模型对话生成', '安全风控'] },
    { y: 190, label: '数据服务层', color: '#00C48C', items: ['楼栋/电梯实时数据', '订单数据', '信用积分引擎', '微任务调度', '治安事件流'] },
    { y: 275, label: '硬件接入层', color: '#6B6F76', items: ['电梯物联网', '门禁系统', '社区摄像头(脱敏)', '骑手定位'] },
  ];

  const rects = layers.map(l => {
    const itemW = 112, gap = 8, totalW = l.items.length * itemW + (l.items.length - 1) * gap;
    const startX = (800 - totalW) / 2;
    return `<rect x="0" y="${l.y}" width="800" height="70" rx="8" fill="${l.color}08" stroke="${l.color}30" stroke-width="1"/>
      <text x="15" y="${l.y + 20}" fill="${l.color}" font-size="11" font-weight="600">${l.label}</text>
      ${l.items.map((item, i) => `<rect x="${startX + i * (itemW + gap)}" y="${l.y + 30}" width="${itemW}" height="30" rx="6" fill="${l.color}15" stroke="${l.color}25" stroke-width="0.5"/>
      <text x="${startX + i * (itemW + gap) + itemW / 2}" y="${l.y + 50}" text-anchor="middle" fill="#B0B3BA" font-size="10">${item}</text>`).join('')}`;
  }).join('');

  const arrows = [1, 2, 3].map(i =>
    `<line x1="400" y1="${layers[i - 1].y + 70}" x2="400" y2="${layers[i].y}" stroke="#2A2D35" stroke-width="1.5" marker-end="url(#arrow)"/>`
  ).join('');

  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
      <h1 className="text-3xl font-bold text-center mb-10">技术架构</h1>
      <div className="glass p-6 mb-8">
        <svg viewBox="0 0 800 340" className="w-full" dangerouslySetInnerHTML={{
          __html: `<defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2A2D35"/></marker></defs>${rects}${arrows}<text x="400" y="85" text-anchor="middle" fill="#2A2D35" font-size="10">↓ 由 LLM 驱动的自然语言交互</text>`
        }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><Monitor className="w-4 h-4 text-warm" /> 核心技术栈</h3>
          <ul className="text-sm text-[#B0B3BA] space-y-1.5">
            <li><span className="text-white">前端：</span>响应式 Web / iOS / Android / 小程序 / 桌面端 / 地图插件</li>
            <li><span className="text-white">对话与风控：</span>LLM 驱动自然语言交互 + 意图识别 + 场景路由 + 安全风控</li>
            <li><span className="text-white">数据与物联：</span>实时电梯状态、门禁系统、社区摄像头（脱敏）、骑手定位</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-warm" /> 数据安全与隐私</h3>
          <ul className="text-sm text-[#B0B3BA] space-y-1.5">
            <li>📱 手机号自动脱敏（138****5678）</li>
            <li>👤 姓名脱敏（李**）</li>
            <li>🔒 地址需验证后查看</li>
            <li>📋 最小权限原则</li>
            <li>⚠️ 页面数据显示"模拟数据声明"</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><Code2 className="w-4 h-4 text-warm" /> 核心 API 设计概述</h3>
          <ul className="text-sm text-[#B0B3BA] space-y-1.5">
            <li><code className="text-fn-green text-xs">GET /api/navigate</code> — 楼栋引路</li>
            <li><code className="text-fn-green text-xs">GET /api/elevator</code> — 电梯查询</li>
            <li><code className="text-fn-green text-xs">POST /api/warm-answer</code> — 暖接听</li>
            <li><code className="text-fn-green text-xs">GET/POST /api/micro-tasks</code> — 微任务 CRUD</li>
          </ul>
          <p className="text-[#6B6F76] text-xs mt-3">以上为概念示意，不实现后端。</p>
        </div>
      </div>
    </div>
  );
}
