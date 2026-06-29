'use client';

import { Flame } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { href: '/', label: '项目故事' },
  { href: '/rider', label: '骑手对话' },
  { href: '/resident', label: '居民端' },
  { href: '/screen', label: '社区大屏' },
  { href: '/platform', label: '平台展示' },
  { href: '/tech', label: '技术架构' },
  { href: '/business', label: '商业模式' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [privacyOn, setPrivacyOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nxz-privacy');
    if (saved === 'on') setPrivacyOn(true);
  }, []);

  const togglePrivacy = () => {
    const next = !privacyOn;
    setPrivacyOn(next);
    localStorage.setItem('nxz-privacy', next ? 'on' : 'off');
    window.dispatchEvent(new CustomEvent('privacy-change', { detail: { on: next } }));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#1A1D23]/80 backdrop-blur-md border-b border-[#2A2D35] flex items-center px-6">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[#FF7A00] hover:text-[#FF9A3C] transition-colors no-underline">
        <Flame className="w-6 h-6" />
        <span>暖行者AI</span>
      </Link>

      <div className="flex items-center gap-1 ml-6">
        {NAV_ITEMS.map(item => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-[#B0B3BA] text-sm">隐私模式</span>
        <button
          onClick={togglePrivacy}
          className={`w-11 h-6 rounded-full relative transition-colors ${privacyOn ? 'bg-[#FF7A00]' : 'bg-[#2A2D35]'}`}
          aria-label="隐私模式开关"
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${privacyOn ? 'translate-x-[22px]' : 'left-0.5'}`} />
        </button>
      </div>
    </nav>
  );
}
