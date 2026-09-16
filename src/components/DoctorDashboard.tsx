import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  Clock,
  Keyboard,
  ListOrdered,
  Mic,
  Languages,
  FileText,
  Stethoscope,
  Sparkles,
  Sprout,
  FileSpreadsheet,
  Camera,
  Pill,
  Check,
  CheckCheck,
  Edit3,
  ExternalLink,
} from 'lucide-react';
import { Patient } from '../types';

interface DoctorDashboardProps {
  patients: Patient[];
  selectedPatient: Patient;
  onSelectPatient: (patient: Patient) => void;
  onOpenEmergencyModal: () => void;
  onOpenEditModal: () => void;
  onApproveNote: () => void;
  onSendEmergency: () => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  patients,
  selectedPatient,
  onSelectPatient,
  onOpenEmergencyModal,
  onOpenEditModal,
  onApproveNote,
  onSendEmergency,
}) => {
  const [filter, setFilter] = useState<'all' | 'red_flags' | 'vata_pitta'>('all');

  const filteredPatients = patients.filter((p) => {
    if (filter === 'red_flags') return p.isRedFlag;
    if (filter === 'vata_pitta')
      return (
        p.prakriti.toLowerCase().includes('vata') ||
        p.prakriti.toLowerCase().includes('pitta')
      );
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Quick Status & Alert Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Live OPD Queue</p>
            <h3 className="text-2xl font-black text-slate-800">
              14 <span className="text-xs font-normal text-slate-400">waiting</span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div
          onClick={onOpenEmergencyModal}
          className="bg-red-50 p-3.5 rounded-xl border border-red-200 shadow-xs flex items-center justify-between cursor-pointer hover:bg-red-100/70 transition"
          role="button"
          tabIndex={0}
          title="Click to inspect Critical Triage Bypass details"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide">
                Red Flag Alerts
              </p>
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            </div>
            <h3 className="text-2xl font-black text-red-600">
              1 Critical{' '}
              <span className="text-xs font-medium text-red-700 underline decoration-red-300">
                Triage Bypass
              </span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg">
            <AlertTriangle className="w-5 h-5 animate-bounce" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Avg Consultation Time</p>
            <h3 className="text-2xl font-black text-emerald-600">
              2m 45s{' '}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                -58%
              </span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">History Pre-Filled</p>
            <h3 className="text-2xl font-black text-slate-800">
              92.8%{' '}
              <span className="text-xs font-medium text-slate-500">Zero Typing</span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg">
            <Keyboard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Split Layout: OPD Patient Queue + 10-Second Scannable Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COL: Patient Queue (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[750px]">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-teal-700" />
                OPD Waiting Room Stream
              </h2>
              <p className="text-xs text-slate-500">Voice-transcribed via Bhashini &amp; AI Triage</p>
            </div>
            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded font-mono font-medium text-slate-700">
              Dr. Sharma (Room 104)
            </span>
          </div>

          {/* Filter Pills */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex gap-1.5 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All ({patients.length})
            </button>
            <button
              onClick={() => setFilter('red_flags')}
              className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition cursor-pointer ${
                filter === 'red_flags'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Red Flags (1)
            </button>
            <button
              onClick={() => setFilter('vata_pitta')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                filter === 'vata_pitta'
                  ? 'bg-amber-600 text-white font-medium'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Vata/Pitta
            </button>
          </div>

          {/* Queue Patient List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scroll">
            {filteredPatients.map((p) => {
              const isSelected = selectedPatient.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectPatient(p)}
                  className={`p-4 cursor-pointer transition border-l-4 ${
                    isSelected
                      ? p.isRedFlag
                        ? 'border-red-600 bg-red-50/70'
                        : 'border-teal-600 bg-teal-50/40'
                      : p.isRedFlag
                      ? 'border-red-500 bg-red-50/30 hover:bg-red-50/60'
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{p.name}</span>
                        {p.isRedFlag ? (
                          <span className="bg-red-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded uppercase animate-redflag">
                            EMERGENCY
                          </span>
                        ) : (
                          <span
                            className={`font-semibold text-[10px] px-1.5 py-0.5 rounded ${p.badgeColor}`}
                          >
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {p.age}y / {p.gender === 'Male' ? 'M' : 'F'} • ABHA: {p.abha}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-mono font-bold ${
                        p.isRedFlag ? 'text-red-600' : 'text-slate-500'
                      }`}
                    >
                      {p.token}
                    </span>
                  </div>

                  {p.isRedFlag ? (
                    <div className="mt-2 text-xs bg-white/90 p-2 rounded border border-red-200 text-slate-700">
                      <span className="font-bold text-red-700">Deterministic Safety Flag:</span>
                      <p className="mt-0.5 italic text-slate-800">"{p.deterministicRuleMatch?.quote}"</p>
                    </div>
                  ) : (
                    <div className="mt-2 text-xs text-slate-600 line-clamp-2">{p.complaint}</div>
                  )}

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-slate-600">
                      {p.audioLang.includes('Hindi') ? (
                        <Mic className="w-3.5 h-3.5 text-teal-600" />
                      ) : p.audioLang.includes('Tamil') ? (
                        <Languages className="w-3.5 h-3.5 text-amber-600" />
                      ) : p.audioLang.includes('OCR') ? (
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <Mic className="w-3.5 h-3.5 text-teal-600" />
                      )}
                      {p.audioLang}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-medium ${
                        p.isRedFlag
                          ? 'font-semibold text-red-600 bg-red-100'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {p.prakritiSummary}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COL: 10-Second Scannable Doctor Summary Card (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Emergency Banner (Conditional) */}
          {selectedPatient.isRedFlag && (
            <div
              id="patient-alert-banner"
              className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-white text-red-700 font-black text-xs px-2 py-0.5 rounded uppercase tracking-wider">
                      CRITICAL RED-FLAG ALERT
                    </span>
                    <span className="text-xs text-red-100 font-mono">
                      ICD-10: I20.9 (Suspected Angina/ACS)
                    </span>
                  </div>
                  <p className="text-sm font-semibold mt-0.5">
                    Patient reported acute central chest compression + left radiating arm ache. ECG &amp; crash cart prioritized!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={onOpenEmergencyModal}
                  className="bg-red-800/80 hover:bg-red-900 border border-red-300 text-white px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap cursor-pointer"
                >
                  View Triage Log
                </button>
                <button
                  onClick={onSendEmergency}
                  className="bg-white text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-extrabold shadow uppercase tracking-wider transition whitespace-nowrap cursor-pointer"
                >
                  Send to Emergency Ward
                </button>
              </div>
            </div>
          )}

          {/* The 10-Second Executive Summary Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
            {/* Patient Header + Quick Vitals Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold ${
                    selectedPatient.isRedFlag
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {selectedPatient.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {selectedPatient.name}
                    </h2>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${selectedPatient.badgeColor}`}
                    >
                      {selectedPatient.badge}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                    <span>
                      {selectedPatient.age} Years • {selectedPatient.gender}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      ABHA: <strong className="text-slate-700">{selectedPatient.abha}</strong>
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      ABDM Synced
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action Over-Sight (Zero Typing Approval) */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenEditModal}
                  className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Quick Adjust Note</span>
                </button>
                <button
                  onClick={onApproveNote}
                  className="px-5 py-2 bg-gradient-to-r from-teal-600 to-teal-800 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition cursor-pointer"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span>Approve &amp; Sign Note (0 Typing)</span>
                </button>
              </div>
            </div>

            {/* 10-Second Scannable Grid: Dual Allopathic + Ayurvedic Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* BOX 1: Chief Complaint & Modern HPI (SNOMED / ICD-10) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
                    Chief Complaint &amp; Modern HPI
                  </h3>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                    FastAPI Groq-Llama3
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Primary Symptom:</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">
                      {selectedPatient.complaint}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 text-slate-600">
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                        ONSET / DURATION
                      </span>
                      <strong className="text-slate-800">{selectedPatient.duration}</strong>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                        SEVERITY SCALE
                      </span>
                      <strong
                        className={`font-bold ${
                          selectedPatient.isRedFlag ? 'text-red-600' : 'text-slate-800'
                        }`}
                      >
                        {selectedPatient.severity}
                      </strong>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                        SNOMED CODE
                      </span>
                      <strong className="text-slate-800 font-mono">
                        {selectedPatient.snomed}
                      </strong>
                    </div>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-500 font-medium">Adaptive Follow-Up AI Answers:</span>
                    <ul className="mt-1 list-disc list-inside text-slate-700 space-y-1 bg-white p-2.5 rounded border border-slate-200">
                      {selectedPatient.followups.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* BOX 2: Holistic Ayush Clinical Parameters */}
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Sprout className="w-3.5 h-3.5 text-amber-700" />
                    Holistic Ayush Clinical Parameters
                  </h3>
                  <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
                    AIIA Protocol
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  {/* Prakriti */}
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">
                      Prakriti (Dosha)
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <strong className="text-slate-800 text-sm">
                        {selectedPatient.prakriti}
                      </strong>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {selectedPatient.prakritiDetail}
                    </p>
                  </div>

                  {/* Agni (Digestive Fire) */}
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">
                      Agni (Digestion/Metabolism)
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-3 h-3 rounded-full bg-red-400"></span>
                      <strong className="text-slate-800 text-sm">{selectedPatient.agni}</strong>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {selectedPatient.agniDetail}
                    </p>
                  </div>

                  {/* Ama */}
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">
                      Ama (Metabolic Toxins)
                    </span>
                    <strong className="text-slate-800 text-sm block mt-1">
                      {selectedPatient.ama}
                    </strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {selectedPatient.amaDetail}
                    </p>
                  </div>

                  {/* Sleep & Stress */}
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">
                      Nidra &amp; Manas (Sleep/Stress)
                    </span>
                    <strong className="text-slate-800 text-sm block mt-1">
                      {selectedPatient.nidra}
                    </strong>
                    <p className="text-[11px] text-red-600 font-medium mt-0.5">
                      {selectedPatient.nidraDetail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOX 3: Past History, Allergies & OCR Physical Record Digest */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-teal-700" />
                  Past Medical History, Allergies &amp; OCR Physical Record Digest
                </h3>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  2 Prescriptions Extracted
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Chronic Conditions
                  </span>
                  <p className="font-semibold text-slate-800 mt-1">{selectedPatient.history}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{selectedPatient.meds}</p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-red-500 uppercase">
                    Documented Allergies
                  </span>
                  <p className="font-bold text-red-600 mt-1">{selectedPatient.allergies}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {selectedPatient.ayushSensitivity}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-teal-700 uppercase">
                    OCR Verified Lab Trends
                  </span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-slate-600">Blood Sugar (Fasting):</span>
                    <strong className="text-slate-900">{selectedPatient.labFbs}</strong>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-slate-600">BP Record (Old):</span>
                    <strong className="text-red-600 font-bold">{selectedPatient.labBp}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Quick Prescription & Treatment Plan Generator */}
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-teal-700" />
                  One-Click Integrated Clinical Decision Suggestion
                </h4>
                <span className="text-[11px] text-teal-700 font-medium">
                  AIIA Evidence-Based Ayurvedic Formulary
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-teal-100">
                  <span className="font-bold text-slate-800 block text-xs">
                    Emergency Western Stabilization
                  </span>
                  {selectedPatient.westernPlan.map((plan, idx) => (
                    <p key={idx} className="text-slate-600 mt-1">
                      {plan}
                    </p>
                  ))}
                </div>
                <div className="bg-white p-3 rounded-lg border border-teal-100">
                  <span className="font-bold text-slate-800 block text-xs">
                    Ayurvedic Cardioprotective (Hridya) Adjunct
                  </span>
                  {selectedPatient.ayushPlan.map((plan, idx) => (
                    <p key={idx} className="text-slate-600 mt-1">
                      {plan}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
