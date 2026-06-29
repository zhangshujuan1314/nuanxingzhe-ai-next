import { platforms } from '@/lib/data';

const ICONS = ['🍎', '🤖', '🪟', '💬', '🗺️', '🤖'];

export default function PlatformPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
      <h1 className="text-3xl font-bold text-center mb-2">全平台覆盖，一处体验</h1>
      <p className="text-[#5C5C5C] text-center mb-10">暖行者AI 可嵌入各大地图平台，也可独立运行</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {platforms.map((p, i) => (
          <div key={p.name} className="card flex flex-col items-center text-center p-5">
            <div className="w-10 h-10 rounded-lg bg-warm/10 flex items-center justify-center text-lg mb-3">{ICONS[i]}</div>
            <h3 className="font-semibold mb-1">{p.name}</h3>
            <p className="text-[#5C5C5C] text-sm mb-2">{p.desc}</p>
            <p className="text-[#8E8E8E] text-xs bg-[#FAF8F5]/40 px-3 py-2 rounded-lg w-full">"{p.preview}"</p>
            {i >= 4 && <span className="text-[#8E8E8E] text-xs mt-2 opacity-60">概念演示，不代表实际合作关系</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
