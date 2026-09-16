import React from 'react';
import {
  AlertTriangle,
  X,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Pill,
  Heart,
  Activity,
  ShieldAlert,
} from 'lucide-react';
import { Patient } from '../types';

interface EmergencyModalProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onDispatchCathLab: () => void;
  onAdministerMeds: () => void;
  onAcknowledge: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  patient,
  isOpen,
  onClose,
  onDispatchCathLab,
  onAdministerMeds,
  onAcknowledge,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-emergency-alert"
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-red-600 shadow-2xl overflow-hidden animate-redflag relative my-auto">
        {/* Alert Header Banner */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-4 sm:p-5 flex items-start justify-between">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl animate-bounce shrink-0 mt-0.5">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white text-red-700 text-[11px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                  CRITICAL TRIAGE BYPASS ACTIVATED
                </span>
                <span className="bg-red-900/60 border border-red-400 text-red-100 text-[10px] font-mono px-2 py-0.5 rounded-full">
                  ICD-10: I20.9 • SNOMED: 29857009
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight mt-1 text-white">
                IMMEDIATE CLINICAL ACTION REQUIRED
              </h3>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-red-100 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>AUDIO ALARM BROADCASTING: ROOM 104 &amp; CRASH CART BAY</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl font-bold p-1 leading-none rounded-lg hover:bg-white/10 transition"
            aria-label="Close emergency modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto custom-scroll">
          {/* Deterministic Safety Match Box */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-red-700" />
                DETERMINISTIC SAFETY ENGINE TRIGGER MATCH
              </span>
              <span className="text-[10px] font-mono font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded border border-red-200">
                LATENCY: 12ms
              </span>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              Matched Rule{' '}
              <code className="bg-white px-1.5 py-0.5 rounded font-mono text-red-700 font-bold border border-red-200">
                ACS_CRITICAL_CHEST_PAIN_v2
              </code>
              :{' '}
              <span className="font-bold text-red-700 italic">
                "severe central chest compression + left radiating arm ache + diaphoresis"
              </span>
            </p>
            <p className="text-[11px] text-slate-500 leading-normal">
              Safety mechanism triggered priority bypass prior to LLM summarization. Verbal consent captured via Bhashini audio stream.
            </p>
          </div>

          {/* Patient Snapshot & Vitals Strip */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 font-black flex items-center justify-center text-sm">
                  {patient.initials}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    {patient.name}{' '}
                    <span className="text-xs font-normal text-slate-500">
                      ({patient.age}y / {patient.gender})
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    ABHA: {patient.abha} • Token: {patient.token} revisit
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-100 border border-red-200 px-2 py-0.5 rounded-full">
                High Risk ACS Suspect
              </span>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                  BP (AUTOMATED)
                </span>
                <strong className="text-red-600 font-black text-sm block">
                  {patient.vitals.bp}
                </strong>
                <span className="block text-[9px] text-red-500 font-medium">
                  {patient.vitals.bpState}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                  HEART RATE
                </span>
                <strong className="text-red-600 font-black text-sm block">
                  {patient.vitals.heartRate}
                </strong>
                <span className="block text-[9px] text-red-500 font-medium">
                  {patient.vitals.heartRateState}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                  SPO2
                </span>
                <strong className="text-amber-600 font-black text-sm block">
                  {patient.vitals.spo2}
                </strong>
                <span className="block text-[9px] text-amber-600 font-medium">
                  {patient.vitals.spo2State}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                  PAIN SCORE
                </span>
                <strong className="text-red-700 font-black text-sm block">
                  {patient.vitals.painScore}
                </strong>
                <span className="block text-[9px] text-red-600 font-medium">
                  {patient.vitals.painScoreState}
                </span>
              </div>
            </div>

            {/* Allergy Banner */}
            <div className="mt-3 bg-red-100/80 border border-red-200 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
              <span className="font-bold text-red-800 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
                DOCUMENTED SEVERE ALLERGY: {patient.allergies}
              </span>
              <span className="text-[10px] font-bold text-red-700 uppercase bg-red-200 px-1.5 py-0.5 rounded">
                Contraindicated
              </span>
            </div>
          </div>

          {/* Automated Actions Pipeline */}
          <div className="space-y-2 text-xs">
            <h5 className="text-[11px] font-black uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Automated Interventions In Progress
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Queue Bypassed
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Moved from OPD Stream #041 to Resuscitation Bay 1.
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Crash Cart Alerted
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  RRT paged (Elapsed:{' '}
                  <span className="font-mono font-bold text-slate-900">00:24s</span>). Defib prepped.
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  STAT ECG Dispatched
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  12-Lead ECG bedside tech mobilized immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Immediate Doctor Action CTAs */}
          <div className="pt-2 space-y-2 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={onDispatchCathLab}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Direct Dispatch to Resuscitation Bay / Cath Lab</span>
              </button>
              <button
                onClick={onAdministerMeds}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Pill className="w-4 h-4 text-emerald-400" />
                <span>Administer STAT Aspirin 325mg + Sorbitrate 5mg</span>
              </button>
            </div>
            <button
              onClick={onAcknowledge}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 font-semibold text-xs rounded-xl transition text-center cursor-pointer"
            >
              Acknowledge Alert &amp; Continue Doctor Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
