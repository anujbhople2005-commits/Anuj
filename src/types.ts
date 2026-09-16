export interface PatientVitals {
  bp: string;
  bpState: string;
  heartRate: string;
  heartRateState: string;
  spo2: string;
  spo2State: string;
  painScore: string;
  painScoreState: string;
}

export interface Patient {
  id: number;
  token: string;
  name: string;
  initials: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  abha: string;
  badge: string;
  badgeColor: string;
  isRedFlag: boolean;
  waitTime: string;
  audioLang: string;
  prakritiSummary: string;
  complaint: string;
  duration: string;
  severity: string;
  snomed: string;
  followups: string[];
  prakriti: string;
  prakritiDetail: string;
  agni: string;
  agniDetail: string;
  ama: string;
  amaDetail: string;
  nidra: string;
  nidraDetail: string;
  history: string;
  meds: string;
  allergies: string;
  ayushSensitivity: string;
  labFbs: string;
  labBp: string;
  vitals: PatientVitals;
  deterministicRuleMatch?: {
    rule: string;
    quote: string;
    latency: string;
    icd10: string;
    snomed: string;
  };
  westernPlan: string[];
  ayushPlan: string[];
}

export type ActiveTab = 'doctor' | 'patient' | 'qr';

export interface ToastMessage {
  id: number;
  message: string;
  type?: 'success' | 'alert' | 'info';
}
