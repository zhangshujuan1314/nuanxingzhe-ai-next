import Link from 'next/link';
import { Flame, Quote } from 'lucide-react';
import CountUp from '@/components/CountUp';
import { levels, scoreDimensions, pointTags, userStory } from '@/lib/data';

export default function StoryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-glow" />
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            有些路，<span className="text-warm">不用再让骑手</span>一个人摸黑找
          </h1>
          <p className="text-[#B0B3BA] text-lg max-w-3xl mx-auto mb-4 leading-relaxed">
            全国 2000 万即时配送骑手，约 1600 万运力消耗在找楼栋、等电梯、绕远路这些「无效空耗」上——每单平均多花 5 分钟。
          </p>
          <p className="text-[#B0B3BA] max-w-3xl mx-auto leading-relaxed">
            这 5 分钟，是骑手的汗，是居民等凉的饭，也是被浪费的社会效率。<br />
            <span className="text-warm font-semibold">暖行者AI 把这 5 分钟还给骑手：单均提效 20%+，让每一次配送少走弯路、少受委屈。</span>
          </p>

          {/* Data Cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="card w-48 text-center">
              <div className="text-3xl font-bold text-warm"><CountUp target={2000} />万</div>
              <div className="text-[#6B6F76] text-sm mt-1">即时配送骑手</div>
            </div>
            <div className="card w-48 text-center">
              <div className="text-3xl font-bold text-warm"><CountUp target={1600} />万</div>
              <div className="text-[#6B6F76] text-sm mt-1">运力无效空耗</div>
            </div>
            <div className="card w-48 text-center">
              <div className="text-3xl font-bold text-warm"><CountUp target={5} />分钟/单</div>
              <div className="text-[#6B6F76] text-sm mt-1">平均绕路时间</div>
            </div>
          </div>

          <Link href="/rider" className="btn-primary mt-10 text-base">立即体验 AI 引路 →</Link>
        </div>
      </section>

      {/* User Story */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="glass p-8 relative">
          <Quote className="w-10 h-10 text-warm/30 absolute top-4 left-4" />
          <p className="text-[#B0B3BA] text-lg leading-relaxed italic pl-8">"{userStory}"</p>
          <p className="text-[#6B6F76] text-sm mt-3 pl-8">— 阳光花园社区居民 王女士</p>
        </div>
      </section>

      {/* Growth System */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-2 text-center">骑手成长体系</h2>
        <p className="text-[#6B6F76] text-center mb-8">从新手到社区信赖，每一步都有暖行者相伴</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map(l => (
            <div key={l.lv} className="card flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-warm/20 flex items-center justify-center text-warm font-bold text-lg mb-3">Lv{l.lv}</div>
              <h3 className="text-lg font-semibold mb-1">{l.name}</h3>
              <p className="text-warm text-sm font-medium mb-2">「{l.tagline}」</p>
              <p className="text-[#B0B3BA] text-sm mb-3">{l.desc}</p>
              <span className="text-[#6B6F76] text-xs bg-[#2A2D35]/30 px-3 py-1 rounded-full">{l.requirement}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Score Dimensions */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-2 text-center">三维度信用积分</h2>
        <p className="text-[#6B6F76] text-center mb-8">全面衡量骑手贡献，让信任看得见</p>
        <div className="space-y-5">
          {scoreDimensions.map(d => (
            <div key={d.name} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{d.name} <span className="text-[#6B6F76] text-xs">({d.pct}%)</span></span>
                <span className="text-sm font-semibold" style={{ color: d.color }}>{d.score}分</span>
              </div>
              <div className="progress-bar mb-1"><div className="progress-fill" style={{ width: `${d.score}%`, background: d.color }} /></div>
              <p className="text-[#6B6F76] text-xs">{d.items}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {pointTags.map(t => (
            <span key={t.label} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-fn-green/10 text-fn-green border border-fn-green/20">
              {t.label} <span className="font-bold">{t.val}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
