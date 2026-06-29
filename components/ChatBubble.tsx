'use client';

import { useEffect, useState, useRef } from 'react';

interface Props {
  role: 'ai' | 'user';
  children: string;
  /** Enable typewriter effect for AI messages */
  typewriter?: boolean;
}

export function ChatBubble({ role, children, typewriter }: Props) {
  if (role === 'ai' && typewriter) {
    return <TypewriterBubble text={children} />;
  }

  return (
    <div className={`chat-bubble ${role}`}>
      {children.split('\n').map((line, i) => (
        <span key={i}>{line}{i < children.split('\n').length - 1 && <br />}</span>
      ))}
    </div>
  );
}

function TypewriterBubble({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  const index = useRef(0);

  useEffect(() => {
    index.current = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      if (index.current < text.length) {
        setDisplayed(text.slice(0, index.current + 1));
        index.current++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="chat-bubble ai">
      {displayed.split('\n').map((line, i) => (
        <span key={i}>{line}{i < displayed.split('\n').length - 1 && <br />}</span>
      ))}
    </div>
  );
}

export function LoadingBubble() {
  return (
    <div className="chat-bubble ai flex gap-1 px-4 py-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#6B6F76] animate-dot-pulse" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#6B6F76] animate-dot-pulse [animation-delay:0.2s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#6B6F76] animate-dot-pulse [animation-delay:0.4s]" />
    </div>
  );
}
