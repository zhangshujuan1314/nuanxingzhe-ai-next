// ====== 暖行者AI — Seed Data ======
import type { Order, Rider, MicroTask, Elevator, ScreenEvent, DialogScript, LevelInfo, ScoreDimension, PointTag, Platform, BusinessItem, RoadmapPhase } from './types';

export const orders: Order[] = [
  { id: 'o1', restaurant: '好再来快餐', address: '幸福小区17栋3单元502', building: '17', unit: '3', room: '502', distance: '200m', status: 'delivering', elevatorStatus: 'normal', entrance: '北门' },
  { id: 'o2', restaurant: '麦当劳', address: '幸福小区17栋3单元', building: '17', unit: '3', room: '', distance: '450m', status: 'picking', elevatorStatus: 'busy', entrance: '东门' },
  { id: 'o3', restaurant: '星巴克', address: '幸福小区5栋2单元', building: '5', unit: '2', room: '', distance: '300m', status: 'picking', elevatorStatus: 'normal', entrance: '南门' },
];

export const rider: Rider = {
  level: 2, levelName: '进阶级', realNameVerified: true, goodRate: '98.5%',
  points: 85, serviceScore: 82, safetyScore: 90, communityScore: 72,
};

export const microTasks: MicroTask[] = [
  { id: 't1', type: 'delivery', typeName: '帮取快递', location: 'A栋1单元', deadline: '16:00', reward: '+10', publisher: '李**', status: 'pending' },
  { id: 't2', type: 'medicine', typeName: '帮买药', location: 'B栋3单元', deadline: '17:00', reward: '+20', publisher: '王**', status: 'pending' },
  { id: 't3', type: 'trash', typeName: '帮扔垃圾', location: 'C栋2单元', deadline: '18:00', reward: '+5', publisher: '张**', status: 'ongoing' },
  { id: 't4', type: 'delivery', typeName: '帮取快递', location: 'A栋3单元', deadline: '16:30', reward: '+10', publisher: '赵**', status: 'completed' },
];

export const elevators: Elevator[] = [
  { building: 'A', name: 'A栋1号', status: 'normal', floor: 12, direction: 'up', eta: '约7分钟' },
  { building: 'A', name: 'A栋2号', status: 'normal', floor: 1, direction: 'idle', eta: '可直乘' },
  { building: 'B', name: 'B栋1号', status: 'maintenance', floor: 0, direction: 'idle', eta: '16:00恢复' },
  { building: 'C', name: 'C栋货梯', status: 'normal', floor: 6, direction: 'down', eta: '约5分钟' },
];

export const screenEvents: ScreenEvent[] = [
  { time: '15:42', text: '李师傅协助A栋3单元搬运重物，获居民好评', type: 'help' },
  { time: '15:38', text: '李师傅在B栋1单元门口捡到钱包(含18元现金)，已交门岗并获授权', type: 'security' },
  { time: '15:30', text: 'B栋1号电梯维护中，已通知附近骑手改走楼梯', type: 'notice' },
  { time: '15:25', text: '张师傅完成C栋2单元帮扔垃圾微任务，积分+5', type: 'help' },
];

export const dialogScripts: Record<string, DialogScript> = {
  'o1': { trigger: 'order-o1', messages: [{ role: 'ai', text: '📍 好再来快餐 → 幸福小区17栋3单元502\n\n来的时候走北门，离17栋最近，进门右转30秒到电梯口。A栋1号电梯目前正常，约7分钟到12楼。' }] },
  'building-17-entrance': { messages: [{ role: 'user', text: '17号楼从哪进？' }, { role: 'ai', text: '🚪 17号楼建议走北门。进门后右手边第二栋就是17栋。如果骑车可以直接骑到楼下，有专门的外卖停车区。' }] },
  'elevator-broken': { messages: [{ role: 'user', text: '电梯坏了怎么办？' }, { role: 'ai', text: '🛗 B栋1号电梯正在维修中，预计16:00恢复。17栋可以用A栋1号或2号电梯，目前都正常运行。走A栋货梯更快，人少不等。' }] },
  'answer-phone': { messages: [{ role: 'user', text: '帮我接电话' }, { role: 'ai', text: '📞 暖接听已开启 — 当居民来电时，AI会自动接听并告知您的预计到达时间。当前默认回复："骑手正在路上，预计5分钟后到达，请稍等。"' }] },
  'elevator-speed': { messages: [{ role: 'user', text: '电梯快不快？' }, { role: 'ai', text: '⚡ A栋2号电梯最快，目前停在1楼可直乘，约30秒到对应楼层。A栋1号在12楼上行中，等它下来要7分钟。建议走2号。' }] },
  'best-pickup': { messages: [{ role: 'user', text: '最佳取餐点在哪？' }, { role: 'ai', text: '📍 17栋附近最佳取餐点：\n1. 北门外「美食城」集中取餐，步行2分钟到电梯\n2. 东门「麦当劳」单独取餐点在B栋旁\n当前订单从北门进效率最高。' }] },
  'micro-tasks': { messages: [{ role: 'user', text: '有微任务吗？' }, { role: 'ai', text: '📋 当前社区微任务：\n1. 🏃 A栋1单元 帮取快递 +10分（截16:00）\n2. 💊 B栋3单元 帮买药 +20分（截17:00）\n3. 🗑️ C栋2单元 帮扔垃圾 +5分（截18:00）\n\n顺路的话可以接一单～' }] },
};

export const userStory = '骑手打电话问我路时我正在洗澡，AI帮我接了电话，告诉骑手放门口柜子里，还提醒我洗完澡记得拿。等我洗完，外卖刚好到，还是热的。';

export const levels: LevelInfo[] = [
  { lv: 1, name: '公开级', tagline: '先把大路走稳', desc: '基础路况、夜间协力、主入口导航', requirement: '注册即用' },
  { lv: 2, name: '进阶级', tagline: '开始看见拐角与细节', desc: '电梯实时状态、门禁类型与楼梯精确导航、微任务接单', requirement: '实名 + 好评率>95%' },
  { lv: 3, name: '金牌级', tagline: '被社区记住的人', desc: '微任务优先派单、专属提醒、居民信任标识、协作信息全解锁', requirement: '金牌认证+治安联盟审核+积分>100' },
];

export const scoreDimensions: ScoreDimension[] = [
  { name: '服务维度', pct: 40, score: 82, color: '#FF7A00', items: '准时率、好评率、微任务数、投诉负分' },
  { name: '安全维度', pct: 30, score: 90, color: '#00C48C', items: '无犯罪记录、居住证、治安培训、AI行为风控' },
  { name: '社区维度', pct: 30, score: 72, color: '#1890FF', items: '社区服务积分、居民点赞、志愿活动、异常上报' },
];

export const pointTags: PointTag[] = [
  { label: '帮取快递', val: '+10' }, { label: '帮买药', val: '+20' },
  { label: '帮扔垃圾', val: '+5' }, { label: '居民点赞', val: '+5' },
  { label: '志愿活动', val: '+50' }, { label: '异常上报', val: '+30' },
];

export const platforms: Platform[] = [
  { name: 'iOS 版', desc: '灵动岛交互 / 毛玻璃UI', preview: '前方路口施工，骑行绕行3分钟...' },
  { name: 'Android 版', desc: 'Material Design / 地图SDK接入', preview: '快捷指令 / 锁屏通知' },
  { name: 'Windows 桌面版', desc: 'Win11 Fluent / 后台运行', preview: '多端同步 / 离线地图 悬浮窗' },
  { name: '微信小程序', desc: '轻量入口 / 免安装', preview: '订单推送 / 取件码 / 任务提醒' },
  { name: '地图 App 嵌入', desc: '插件嵌入主流地图平台', preview: '概念演示，不代表实际合作关系' },
  { name: 'AI Agent 插件', desc: '接入 Claude / ChatGPT / MCP 生态', preview: '通过自然对话调用暖行者能力' },
];

export const revenue: BusinessItem[] = [
  { title: '平台订阅', desc: '骑手/骑手站点会员制订阅' },
  { title: '增值服务', desc: '优先派单、专属功能、高级分析' },
  { title: '数据授权', desc: '脱敏聚合数据授权物业/平台' },
  { title: '政企合作', desc: '社区治理、公益项目合作' },
];

export const costs: BusinessItem[] = [
  { title: 'AI 调用成本', desc: '大模型 API 调用费用' },
  { title: '数据/物联接入', desc: '电梯/门禁等硬件数据接入' },
  { title: '运营与地推', desc: '骑手入驻、社区推广' },
  { title: '合规与安全', desc: '数据安全、隐私合规' },
];

export const roadmap: RoadmapPhase[] = [
  { phase: '短期', time: '2026 Q3-Q4', desc: '单社区试点，跑通核心场景（引路+电梯+暖接听）' },
  { phase: '中期', time: '2027', desc: '城市级铺开，多端覆盖，信用体系上线' },
  { phase: '长期', time: '2028+', desc: '开放平台，行业标准制定，全国网络' },
];
