import React from 'react';
import { Leaf, UserCheck, Smartphone, QrCode, Activity, AlertTriangle } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  criticalAlertActive: boolean;
  onOpenEmergencyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  criticalAlertActive,
  onOpenEmergencyModal,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Ministry Emblem & App Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                SIH-26047 Prototype
              </span>
              <span className="text-xs text-slate-500 font-medium">
                All India Institute of Ayurveda (AIIA) | Ministry of Ayush
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Smart Patient History &amp; Triage System (SPHTS)
              <span className="text-[11px] font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                Dual Modern + Ayush Engine
              </span>
            </h1>
          </div>
        </div>

        {/* Global Navigation Controls & Live Status */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          {criticalAlertActive && (
            <button
              onClick={onOpenEmergencyModal}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition animate-pulse"
              title="View Critical Triage Bypass Modal"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Emergency Modal</span>
            </button>
          )}

          {/* Tab Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200 text-xs font-semibold">
            <button
              id="btn-tab-doctor"
              onClick={() => setActiveTab('doctor')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'doctor'
                  ? 'bg-white shadow-xs text-teal-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Doctor OPD Hub (10s)</span>
            </button>

            <button
              id="btn-tab-patient"
              onClick={() => setActiveTab('patient')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'patient'
                  ? 'bg-white shadow-xs text-teal-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Waiting-Room Kiosk / Mobile</span>
            </button>

            <button
              id="btn-tab-qr"
              onClick={() => setActiveTab('qr')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'qr'
                  ? 'bg-white shadow-xs text-teal-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Poster &amp; QR Entry</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center text-xs text-slate-500 pl-2 border-l border-slate-200">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
            <span>ABDM FHIR Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
};
