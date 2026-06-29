export default function BreathingDot({ color = '#00C48C', className = '' }: { color?: string; className?: string }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full animate-breathe ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}
