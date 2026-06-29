export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[375px] flex-shrink-0 flex items-center justify-center p-4">
      <div className="glass w-full h-[700px] rounded-[36px] border-2 border-[#E8E5E1] overflow-hidden flex flex-col relative shadow-2xl">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs text-[#5C5C5C]">
          <span>9:41</span>
          <span className="flex items-center gap-1">📶 🔋 85%</span>
        </div>
        {children}
        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#8E8E8E]/30 rounded-full" />
      </div>
    </div>
  );
}

export function PhoneBottomNav() {
  return (
    <div className="flex items-center justify-around py-2 border-t border-[#E8E5E1] text-[#8E8E8E] text-xs">
      <span className="flex flex-col items-center gap-0.5 text-[#D97706]">🏠<span>首页</span></span>
      <span className="flex flex-col items-center gap-0.5">📦<span>订单</span></span>
      <span className="flex flex-col items-center gap-0.5">👤<span>我的</span></span>
    </div>
  );
}
