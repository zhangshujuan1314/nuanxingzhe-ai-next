// ====== 暖行者AI — Core Types ======

export interface Order {
  id: string;
  restaurant: string;
  address: string;
  building: string;
  unit: string;
  room: string;
  distance: string;
  status: 'delivering' | 'picking' | 'completed';
  elevatorStatus: 'normal' | 'maintenance' | 'busy';
  entrance: string;
}

export interface Rider {
  level: number;
  levelName: string;
  realNameVerified: boolean;
  goodRate: string;
  points: number;
  serviceScore: number;
  safetyScore: number;
  communityScore: number;
}

export interface MicroTask {
  id: string;
  type: 'delivery' | 'medicine' | 'trash' | 'other';
  typeName: string;
  location: string;
  deadline: string;
  reward: string;
  publisher: string;
  status: 'pending' | 'ongoing' | 'completed';
}

export interface Elevator {
  building: string;
  name: string;
  status: 'normal' | 'maintenance';
  floor: number;
  direction: 'up' | 'down' | 'idle';
  eta: string;
}

export interface ScreenEvent {
  time: string;
  text: string;
  type: 'help' | 'security' | 'notice';
}

export interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
}

export interface DialogScript {
  trigger?: string;
  messages: ChatMessage[];
}

export interface LevelInfo {
  lv: number;
  name: string;
  tagline: string;
  desc: string;
  requirement: string;
}

export interface ScoreDimension {
  name: string;
  pct: number;
  score: number;
  color: string;
  items: string;
}

export interface PointTag {
  label: string;
  val: string;
}

export interface Platform {
  name: string;
  desc: string;
  preview: string;
}

export interface BusinessItem {
  title: string;
  desc: string;
}

export interface RoadmapPhase {
  phase: string;
  time: string;
  desc: string;
}
