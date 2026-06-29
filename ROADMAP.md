# 暖行者AI — 开发路线图

## 已完成 ✅

- [x] 静态演示版（`nuanxingzhe-ai`）— M1-M8 全部里程碑
- [x] Next.js 16 全栈框架搭建（App Router + TypeScript + Tailwind）
- [x] 7 页面全部实现（故事/骑手/居民/大屏/平台/技术/商业）
- [x] AI 对话 API（`/api/chat`）— DeepSeek 已接入，无 key 时规则引擎兜底
- [x] Claude 风格暖白主题（`#FAF8F5` 底色 + `#D97706` 琥珀橙）
- [x] 响应式基础适配
- [x] 隐私模式全局切换
- [x] GitHub 仓库 https://github.com/zhangshujuan1314/nuanxingzhe-ai-next

## 待开发 📋

### P0 — 核心功能闭环
- [ ] **数据库** — SQLite（推荐 `better-sqlite3` 或纯 JS `sql.js`）+ Drizzle ORM，替换 `lib/data.ts` mock 数据
- [ ] **用户认证** — NextAuth.js v5，骑手/居民/管理员三种角色
- [ ] **AI 增强** — 流式响应（Server-Sent Events）、多轮对话上下文记忆

### P1 — 体验升级
- [ ] **真实地图** — 高德地图 JS API 2.0 替换 SVG 示意图
- [ ] **骑手端功能** — 真实订单创建/状态流转、微任务接单/完成
- [ ] **居民端功能** — 暖接听规则配置持久化、微任务发布
- [ ] **社区大屏** — WebSocket 实时数据推送，替换前端 setInterval

### P2 — 部署与运维
- [ ] **Vercel 部署** — 配置环境变量、自定义域名
- [ ] **错误监控** — Sentry 或 Vercel Analytics
- [ ] **CI/CD** — GitHub Actions 自动构建部署

### P3 — 扩展
- [ ] **移动端适配** — PWA + 响应式完善
- [ ] **多语言** — i18n（中英）
- [ ] **管理后台** — 骑手审核、任务管理、数据看板

## 本地开发

```bash
cd nuanxingzhe-ai-next
cp .env.local.example .env.local  # 填入 API 密钥
npm install
npm run dev                        # http://localhost:3000
```

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `OPENAI_API_KEY` | AI API 密钥 | - |
| `AI_BASE_URL` | AI API 地址 | `https://api.openai.com/v1` |
| `AI_MODEL` | 模型名 | `gpt-4o-mini` |
| `DATABASE_URL` | 数据库连接 | 待定 |

## 仓库

| 项目 | 地址 | 说明 |
|------|------|------|
| 静态演示版 | https://github.com/zhangshujuan1314/nuanxingzhe-ai | 纯 HTML/CSS/JS，双击即开 |
| 全栈版 | https://github.com/zhangshujuan1314/nuanxingzhe-ai-next | Next.js 16，本仓库 |
