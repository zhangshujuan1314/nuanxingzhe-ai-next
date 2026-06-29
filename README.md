# 暖行者AI — 骑手智能配送助手 🏍️

> 有些路，不用再让骑手一个人摸黑找。

面向即时配送骑手的 AI 智能助手，通过 AI 对话解决"最后一公里"难题——不做更冷的技术，做更贴心的陪伴。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 复制环境变量（填入 API 密钥）
cp .env.local.example .env.local

# 启动开发服务器
npm run dev
```

打开 http://localhost:3000 查看效果。

## 🧱 技术栈

| 层 | 技术 |
|---|------|
| 框架 | Next.js 16（App Router） |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + 自定义 Claude 风格暖白主题 |
| 图标 | Lucide React |
| AI | OpenAI 兼容接口（已接入 DeepSeek） |
| 数据库 | 待定（SQLite/Drizzle） |
| 部署 | Vercel |

## 📁 项目结构

```
nuanxingzhe-ai-next/
├── app/                    # Next.js App Router
│   ├── page.tsx           # / 项目故事
│   ├── rider/page.tsx     # /rider 骑手对话
│   ├── resident/page.tsx  # /resident 居民端
│   ├── screen/page.tsx    # /screen 社区大屏
│   ├── platform/page.tsx  # /platform 平台展示
│   ├── tech/page.tsx      # /tech 技术架构
│   ├── business/page.tsx  # /business 商业模式
│   └── api/chat/route.ts  # AI 对话 API
├── components/            # 共享组件
├── lib/                   # 工具库（AI客户端、数据、类型）
└── ROADMAP.md             # 开发路线图
```

## 🔑 环境变量

```env
OPENAI_API_KEY=sk-xxx          # AI API 密钥
AI_BASE_URL=https://api.openai.com/v1  # API 地址
AI_MODEL=gpt-4o-mini           # 模型名称
```

## 📄 七页导航

| 页面 | 路由 | 说明 |
|------|------|------|
| 项目故事 | `/` | Hero、数据卡、成长体系、三维积分 |
| 骑手对话 | `/rider` | 分屏手机框 + AI 对话、打字机效果 |
| 居民端 | `/resident` | 外卖追踪、暖接听设置 |
| 社区大屏 | `/screen` | 电梯监控、楼栋导航、微任务、治安事件流 |
| 平台展示 | `/platform` | 6 平台覆盖卡片 |
| 技术架构 | `/tech` | SVG 四层架构图 |
| 商业模式 | `/business` | 盈利模式、成本结构、发展路线图 |
