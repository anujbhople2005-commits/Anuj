import React, { useState } from 'react';
import {
  Leaf,
  Sliders,
  Printer,
  ExternalLink,
  Cpu,
  CheckCircle,
} from 'lucide-react';

interface PosterGeneratorProps {
  onSimulateScan: () => void;
  onToast: (msg: string) => void;
}

export const PosterGenerator: React.FC<PosterGeneratorProps> = ({
  onSimulateScan,
  onToast,
}) => {
  const [hospitalName, setHospitalName] = useState(
    'All India Institute of Ayurveda (AIIA), Sarita Vihar'
  );
  const [department, setDepartment] = useState(
    'Kayachikitsa (Internal Medicine & General OPD)'
  );
  const [selectedLangPill, setSelectedLangPill] = useState('Bilingual (Hindi + English)');

  const handlePrint = () => {
    window.print();
    onToast('Preparing high-resolution waiting room poster for printing...');
  };

  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Downloadable Hospital Poster Preview (7 Cols) */}
        <div
          id="printable-poster"
          className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl relative overflow-hidden"
        >
          {/* Poster Header Decorative Ribbon */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="border-4 border-teal-600 rounded-2xl p-5 sm:p-6 text-center space-y-4 bg-gradient-to-b from-white to-teal-50/30">
            {/* Ministry Banner in Poster */}
            <div className="flex items-center justify-center space-x-2 pb-2 border-b border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white text-base">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black tracking-widest text-teal-800 uppercase">
                  Ministry of Ayush &amp; AIIA
                </p>
                <p className="text-xs font-extrabold text-slate-900">{hospitalName}</p>
              </div>
            </div>

            {/* Department Tag & Big Poster Headline */}
            <div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-1.5">
                <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider border border-amber-200">
                  Zero-Wait OPD Desk
                </span>
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                  {department.split(' ')[0]}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Scan to Speak Your Health History
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                अपनी भाषा में बोलें • No typing required • Instant Doctor Sync
              </p>
            </div>

            {/* Live Generated QR Canvas Card */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-inner border border-slate-200 inline-block">
              {/* SVG QR Code Emulation with high contrast */}
              <svg
                className="w-44 h-44 mx-auto"
                viewBox="0 0 100 100"
                fill="currentColor"
                aria-label="QR Code to open patient intake portal"
              >
                {/* Outer Corners */}
                <path
                  d="M5 5 h30 v30 h-30 z M10 10 h20 v20 h-20 z M15 15 h10 v10 h-10 z"
                  fill="#00A896"
                />
                <path
                  d="M65 5 h30 v30 h-30 z M70 10 h20 v20 h-20 z M75 15 h10 v10 h-10 z"
                  fill="#00A896"
                />
                <path
                  d="M5 65 h30 v30 h-30 z M10 70 h20 v20 h-20 z M15 75 h10 v10 h-10 z"
                  fill="#00A896"
                />
                {/* Inner Data Matrix Dots */}
                <rect x="42" y="10" width="6" height="6" fill="#1D2A44" />
                <rect x="52" y="15" width="6" height="6" fill="#1D2A44" />
                <rect x="45" y="25" width="6" height="6" fill="#1D2A44" />
                <rect x="10" y="42" width="6" height="6" fill="#1D2A44" />
                <rect x="25" y="45" width="6" height="6" fill="#1D2A44" />
                <rect x="45" y="45" width="10" height="10" fill="#00A896" />
                <rect x="65" y="42" width="6" height="6" fill="#1D2A44" />
                <rect x="80" y="45" width="6" height="6" fill="#1D2A44" />
                <rect x="42" y="65" width="6" height="6" fill="#1D2A44" />
                <rect x="52" y="75" width="6" height="6" fill="#1D2A44" />
                <rect x="65" y="65" width="6" height="6" fill="#1D2A44" />
                <rect x="75" y="70" width="6" height="6" fill="#1D2A44" />
                <rect x="85" y="80" width="6" height="6" fill="#1D2A44" />
              </svg>
              <div className="mt-2 text-[10px] font-mono font-bold text-slate-500">
                https://aiia.gov.in/sphts/opd-waiting-portal
              </div>
            </div>

            {/* Steps for Patient in Waiting Room */}
            <div className="grid grid-cols-3 gap-2 text-left text-xs pt-1">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-[10px] mb-1">
                  1
                </span>
                <p className="font-bold text-slate-800 text-[11px]">Scan QR</p>
                <p className="text-[10px] text-slate-500">Open on your smartphone camera</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-[10px] mb-1">
                  2
                </span>
                <p className="font-bold text-slate-800 text-[11px]">Speak Symptoms</p>
                <p className="text-[10px] text-slate-500">Hindi, Tamil, Marathi, English</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-[10px] mb-1">
                  3
                </span>
                <p className="font-bold text-slate-800 text-[11px]">Instant Doctor Review</p>
                <p className="text-[10px] text-slate-500">No time lost inside the cabin</p>
              </div>
            </div>

            {/* Footer Compliance */}
            <div className="text-[10px] text-slate-400 pt-2 flex items-center justify-between border-t border-slate-200">
              <span>National Health Authority (NHA) &amp; Ayush Certified</span>
              <span className="font-mono">Smart Triage ID: SIH-26047</span>
            </div>
          </div>
        </div>

        {/* Poster Controls & Configuration (5 Cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-700" />
              Hospital Poster Customizer
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Hospital / Clinic Name
                </label>
                <input
                  type="text"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  OPD Department / Wing
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-slate-50 cursor-pointer focus:ring-2 focus:ring-teal-600 focus:outline-none"
                >
                  <option value="Kayachikitsa (Internal Medicine & General OPD)">
                    Kayachikitsa (Internal Medicine &amp; General OPD)
                  </option>
                  <option value="Panchakarma Department">Panchakarma Department</option>
                  <option value="Shalya Tantra (Surgical OPD)">Shalya Tantra (Surgical OPD)</option>
                  <option value="Prasuti & Stri Roga">Prasuti &amp; Stri Roga</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Target Language Posters
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Bilingual (Hindi + English)',
                    'Tamil',
                    'Telugu',
                    'Bengali',
                    'Marathi',
                  ].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSelectedLangPill(p)}
                      className={`px-2 py-1 rounded text-[11px] font-semibold transition cursor-pointer ${
                        selectedLangPill === p
                          ? 'bg-teal-100 text-teal-800 border border-teal-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Download High-Res Waiting Room Poster (PDF)</span>
              </button>
              <button
                type="button"
                onClick={onSimulateScan}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Simulate Scanning QR (Open Patient App)</span>
              </button>
            </div>
          </div>

          {/* Architecture & Engine Insights */}
          <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl space-y-3 text-xs shadow-md">
            <h4 className="font-bold text-amber-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              Under-The-Hood Architecture (SIH-26047)
            </h4>
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <p>
                <strong className="text-teal-400">1. Multilingual Audio:</strong> Bhashini
                Speech-to-Text API streams vernacular audio.
              </p>
              <p>
                <strong className="text-teal-400">2. Deterministic Safety Guard:</strong> Regex/Rule
                safety triggers immediate doctor bypass before LLM calls.
              </p>
              <p>
                <strong className="text-teal-400">3. AI Entity Extraction:</strong> Llama-3-8b maps
                clinical symptoms to SNOMED CT &amp; Ayurvedic Prakriti/Agni tokens.
              </p>
              <p>
                <strong className="text-teal-400">4. Interoperability:</strong> ABDM FHIR standard
                bundles push directly to electronic health records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
