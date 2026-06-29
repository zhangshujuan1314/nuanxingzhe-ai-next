import { NextRequest, NextResponse } from 'next/server';
import { chat } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'message required' }, { status: 400 });
    }
    const reply = await chat(message);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ reply: '抱歉，服务暂不可用，请稍后再试。' }, { status: 500 });
  }
}
