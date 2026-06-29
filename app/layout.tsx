import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: '暖行者AI — 骑手智能配送助手',
  description: '有些路，不用再让骑手一个人摸黑找。AI对话帮骑手解决最后一公里难题。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#FAF8F5] text-[#141414] antialiased">
        <NavBar />
        <main className="mt-16">
          <div className="page-enter">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
