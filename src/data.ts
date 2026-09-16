import { Patient } from './types';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 1,
    token: '#OPD-041',
    name: 'Ramesh Chandra Verma',
    initials: 'RC',
    age: 58,
    gender: 'Male',
    abha: '91-8204-1290-34',
    badge: 'High Priority Triage',
    badgeColor: 'bg-red-100 text-red-700 border-red-200',
    isRedFlag: true,
    waitTime: 'Direct Bypass',
    audioLang: 'Hindi Audio (Translated)',
    prakritiSummary: 'Triage Bypass',
    complaint: 'Central chest tightness (Angina pectoris), radiating to left arm & scapula',
    duration: '4 Hours acute',
    severity: '8 / 10 (Severe)',
    snomed: '29857009',
    followups: [
      'Pain exacerbated by exertion; not relieved by deep breathing.',
      'Associated with diaphoresis (cold sweats) and nausea.',
      'No fever or productive cough reported.'
    ],
    prakriti: 'Vata - Pitta',
    prakritiDetail: 'High restlessness, dry skin tendencies',
    agni: 'Tikshnagni (Hyper-Acidic)',
    agniDetail: 'Irregular meals, late dinner schedule',
    ama: 'Saama (Moderate Toxins)',
    amaDetail: 'Coated tongue reported, morning lethargy',
    nidra: 'Anidra (Disturbed <5 hrs)',
    nidraDetail: 'High stress / Rajasic state',
    history: 'Hypertension (7 yrs), Type 2 Diabetes',
    meds: 'Under Telmisartan 40mg, Metformin 500mg',
    allergies: 'Penicillin (Severe Rash / Anaphylactoid)',
    ayushSensitivity: 'Ayurvedic oils: No known hypersensitivity',
    labFbs: '142 mg/dL (High)',
    labBp: '154/98 mmHg',
    vitals: {
      bp: '154/98',
      bpState: 'Stage 2 HTN',
      heartRate: '108 bpm',
      heartRateState: 'Tachycardia',
      spo2: '93%',
      spo2State: 'Borderline',
      painScore: '8 / 10',
      painScoreState: 'Crushing'
    },
    deterministicRuleMatch: {
      rule: 'ACS_CRITICAL_CHEST_PAIN_v2',
      quote: 'severe central chest compression + left radiating arm ache + diaphoresis',
      latency: '12ms',
      icd10: 'I20.9',
      snomed: '29857009'
    },
    westernPlan: [
      '1. STAT Sublingual Sorbitrate (5mg) + Aspirin 325mg chewable.',
      '2. 12-Lead ECG within 10 minutes; Cardiac Troponin I test.'
    ],
    ayushPlan: [
      '1. Arjuna Ksheerapaka (Terminalia arjuna bark in cow milk).',
      '2. Prabhakar Vati 1 tab BD post acute clearance.'
    ]
  },
  {
    id: 2,
    token: '#OPD-042',
    name: 'Ananya Sundaram',
    initials: 'AS',
    age: 34,
    gender: 'Female',
    abha: '22-9011-4560-19',
    badge: 'Ready',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    isRedFlag: false,
    waitTime: 'Ready',
    audioLang: 'Tamil Voice Input',
    prakritiSummary: 'Pitta-Vata',
    complaint: 'Severe heartburn, burning epigastric discomfort (Amlapitta), acid regurgitation',
    duration: '3 Months',
    severity: '5 / 10 (Moderate)',
    snomed: '373894002',
    followups: [
      'Aggravated by sour, spicy foods and irregular meal times.',
      'No hematemesis or dark tarry stools.',
      'Relieved temporarily by cold milk.'
    ],
    prakriti: 'Pitta - Vata',
    prakritiDetail: 'Warm body temperature, acidity prone, irritable when hungry',
    agni: 'Tikshnagni / Amlapitta',
    agniDetail: 'Rapid hyper-acidic digestion with sour eructations',
    ama: 'Niraama (Low AMA)',
    amaDetail: 'Clean pink tongue, mild burning sensation',
    nidra: 'Alpanidra (6 hrs, fitful)',
    nidraDetail: 'Occupational screen stress, delayed sleep onset',
    history: 'No previous surgical history, Occasional episodic migraine',
    meds: 'Occasional antacid gel self-medicated',
    allergies: 'Sulfa drugs (Mild urticaria)',
    ayushSensitivity: 'No known herbal sensitivities',
    labFbs: '94 mg/dL (Normal)',
    labBp: '118/76 mmHg',
    vitals: {
      bp: '118/76',
      bpState: 'Normal',
      heartRate: '74 bpm',
      heartRateState: 'Normal',
      spo2: '99%',
      spo2State: 'Optimal',
      painScore: '5 / 10',
      painScoreState: 'Burning'
    },
    westernPlan: [
      '1. Proton pump inhibitor (Pantoprazole 40mg OD before breakfast).',
      '2. Routine Upper GI Endoscopy if symptoms persist past 4 weeks.'
    ],
    ayushPlan: [
      '1. Avipattikar Churna 3g before meals with lukewarm water.',
      '2. Kamadudha Rasa (Mukta yukta) 1 tab BD after meals.'
    ]
  },
  {
    id: 3,
    token: '#OPD-043',
    name: 'Gurpreet Singh',
    initials: 'GS',
    age: 42,
    gender: 'Male',
    abha: '44-7721-9903-88',
    badge: 'In Waiting (12m)',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    isRedFlag: false,
    waitTime: 'In Waiting (12m)',
    audioLang: '1 OCR Report',
    prakritiSummary: 'Prakriti: Pitta',
    complaint: 'Hemicranial throbbing headache (Ardhavabhedaka) with photophobia and neck tension',
    duration: '2 Weeks episodic',
    severity: '6 / 10 (Moderate)',
    snomed: '37796009',
    followups: [
      'Attacks triggered by bright sunlight and prolonged screen fatigue.',
      'Cervical paraspinal tightness identified via inquiry.',
      'Visual aura present prior to headache onset.'
    ],
    prakriti: 'Pitta Dominant',
    prakritiDetail: 'Prone to facial flushing, sharp temper under deadline pressure',
    agni: 'Samagni (Normal)',
    agniDetail: 'Regular 2 meals daily, occasional caffeine reliance',
    ama: 'Low',
    amaDetail: 'Tongue clear, appetite steady',
    nidra: 'Disturbed sleep (<6 hrs)',
    nidraDetail: 'Frequent awakening around 3 AM',
    history: 'Cervical Spondylosis suspected on preliminary X-Ray',
    meds: 'Paracetamol 650mg SOS',
    allergies: 'No known drug allergies',
    ayushSensitivity: 'Tolerates medicated tailas well',
    labFbs: '108 mg/dL (Normal)',
    labBp: '128/84 mmHg',
    vitals: {
      bp: '128/84',
      bpState: 'Pre-HTN',
      heartRate: '82 bpm',
      heartRateState: 'Normal',
      spo2: '98%',
      spo2State: 'Optimal',
      painScore: '6 / 10',
      painScoreState: 'Throbbing'
    },
    westernPlan: [
      '1. Naproxen 250mg SOS with Domperidone for acute migraine attacks.',
      '2. Ergonomic posture evaluation & cervical spine radiograph review.'
    ],
    ayushPlan: [
      '1. Shirashooladi Vajra Rasa 1 tab BD with milk.',
      '2. Ksheerabala 101 Taila Nasya (2 drops in each nostril at bedtime).'
    ]
  },
  {
    id: 4,
    token: '#OPD-044',
    name: 'Sunita Devi',
    initials: 'SD',
    age: 62,
    gender: 'Female',
    abha: '11-3094-8821-04',
    badge: 'Waiting (18m)',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    isRedFlag: false,
    waitTime: 'Waiting (18m)',
    audioLang: 'Bhojpuri / Hindi',
    prakritiSummary: 'Vata-Kapha',
    complaint: 'Bilateral knee joint pain with stiffness (Sandhivata / Osteoarthritis)',
    duration: '2 Years progressive',
    severity: '7 / 10 (High Pain)',
    snomed: '239872002',
    followups: [
      'Crepitus on bending, severe difficulty climbing stairs.',
      'Morning joint stiffness lasting approximately 45 minutes.',
      'No active local heat or erythema in knee joints.'
    ],
    prakriti: 'Vata - Kapha',
    prakritiDetail: 'Cold intolerance, stiff connective tissue, dry skin',
    agni: 'Mandagni (Sluggish appetite)',
    agniDetail: 'Bloating and gas after heavy grains, sluggish metabolism',
    ama: 'Saama (Moderate)',
    amaDetail: 'White coated tongue, morning heaviness in limbs',
    nidra: 'Interrupted due to knee ache',
    nidraDetail: 'Waking up whenever changing side during sleep',
    history: 'Osteopenia, Hypothyroidism (25mcg Thyroxine)',
    meds: 'Thyroxine 25mcg OD, Calcium + Vit D3 supplements',
    allergies: 'NSAID induced severe gastritis',
    ayushSensitivity: 'No known herbal sensitivities',
    labFbs: '112 mg/dL',
    labBp: '134/86 mmHg',
    vitals: {
      bp: '134/86',
      bpState: 'Borderline',
      heartRate: '76 bpm',
      heartRateState: 'Normal',
      spo2: '97%',
      spo2State: 'Optimal',
      painScore: '7 / 10',
      painScoreState: 'Stiff Aching'
    },
    westernPlan: [
      '1. Topical Diclofenac gel application TDS + Glucosamine sulfate.',
      '2. Weight-bearing bilateral knee AP/Lateral X-rays & Quadriceps physiotherapy.'
    ],
    ayushPlan: [
      '1. Yogaraj Guggulu 2 tabs BD with warm water.',
      '2. Janu Basti with Mahanarayana Taila (Panchakarma OPD referral).'
    ]
  }
];
