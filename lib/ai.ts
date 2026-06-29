// ====== 暖行者AI — AI Client ======
// ponytail: lazy init to avoid build-time crash when no API key set

import OpenAI from 'openai';

let _client: OpenAI | null = null;
function getClient(): OpenAI | null {
  const key = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
  if (!key) return null;
  if (!_client) {
    _client = new OpenAI({
      apiKey: key,
      baseURL: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
    });
  }
  return _client;
}

const SYSTEM_PROMPT = `你是暖行者AI，一名经验丰富的即时配送骑手助手。你的风格是：
- 亲切、直接、实用，像老骑手给新人指路
- 回答简短，开门见山，不说废话
- 了解小区楼栋分布、电梯状态、最佳路线
- 帮骑手高效完成配送，少走弯路

当前社区：阳光花园/幸福小区。楼栋分布：A栋、B栋、C栋、17栋。
北门离17栋最近，东门适合取餐（麦当劳在那边），南门是主入口。`;

export async function chat(userMessage: string): Promise<string> {
  const client = getClient();
  if (!client) {
    return fallbackReply(userMessage);
  }

  try {
    const response = await client.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    return response.choices[0]?.message?.content || '抱歉，我没理解你的问题，换个方式问？';
  } catch (err) {
    console.error('AI chat error:', err);
    return fallbackReply(userMessage);
  }
}

function fallbackReply(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('电梯') || lower.includes('lift')) {
    return '🛗 当前A栋1号电梯在12楼上行中（约7分钟），A栋2号在1楼空闲可直乘，B栋1号维修中预计16:00恢复。走A栋2号最快。';
  }
  if (lower.includes('门') || lower.includes('进') || lower.includes('入口')) {
    return '🚪 建议走北门，离17栋最近，进门右转30秒到电梯口。骑车可以直接骑到楼下，有外卖停车区。';
  }
  if (lower.includes('楼') || lower.includes('栋') || lower.includes('building')) {
    return '📍 幸福小区楼栋分布：A栋（286户，正常）、B栋（368户，部分维修）、C栋（184户，畅通）、17栋（北门旁）。17栋建议走北门。';
  }
  if (lower.includes('任务') || lower.includes('微任务')) {
    return '📋 当前可接微任务：A栋1单元帮取快递(+10分，截16:00)、B栋3单元帮买药(+20分，截17:00)、C栋2单元帮扔垃圾(+5分，截18:00)。';
  }
  if (lower.includes('电话') || lower.includes('接听') || lower.includes('暖接')) {
    return '📞 暖接听功能：当居民来电时AI自动接听，告知预计到达时间。可在居民端设置默认回复和触发条件。';
  }
  return '💡 你可以问我：楼栋怎么走、电梯状态、最佳取餐点、微任务接单、暖接听设置。也可以点击左侧订单或下方快捷按钮获取精准指引。';
}
