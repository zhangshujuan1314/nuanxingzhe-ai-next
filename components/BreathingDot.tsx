export default function BreathingDot({ color = '#059669', className = '' }: { color?: string; className?: string }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full animate-breathe ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}
