import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  CreditCard,
  Mic,
  Sparkles,
  Leaf,
  UploadCloud,
  ArrowRight,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

interface PatientKioskProps {
  onSubmitIntake: (intakeData: {
    rawAudio: string;
    englishOutput: string;
    language: string;
    lifestyle: {
      agni: string;
      nidra: string;
      koshtha: string;
      stress: string;
    };
  }) => void;
  onToast: (msg: string) => void;
}

export const PatientKiosk: React.FC<PatientKioskProps> = ({ onSubmitIntake, onToast }) => {
  const [lang, setLang] = useState<'hi' | 'en' | 'ta' | 'te' | 'mr' | 'bn'>('hi');
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [rawText, setRawText] = useState(
    'सीने में बहुत तेज दबाव और दर्द हो रहा है जो बाएं हाथ तक जा रहा है, सांस फूल रही है।'
  );
  const [englishText, setEnglishText] = useState(
    'Severe central chest pressure radiating to left arm with acute shortness of breath.'
  );

  // Dynamic answers for inquiry
  const [exertionPain, setExertionPain] = useState<'yes' | 'no' | null>('yes');
  const [coldSweats, setColdSweats] = useState<'yes' | 'no' | null>('yes');

  // Lifestyle parameters
  const [agni, setAgni] = useState('Tikshnagni (Always excessive / Acidic reflux)');
  const [nidra, setNidra] = useState('Disturbed < 5 hours (Frequent wake-ups)');
  const [koshtha, setKoshtha] = useState('Krura (Constipated / Hard / Irregular)');
  const [stress, setStress] = useState('High Anxiety / Palpitation / Restless');

  // OCR Uploaded File
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } else {
      setRecordSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleLanguageChange = (newLang: typeof lang) => {
    setLang(newLang);
    if (newLang === 'hi') {
      setRawText('सीने में बहुत तेज दबाव और दर्द हो रहा है जो बाएं हाथ तक जा रहा है, सांस फूल रही है।');
      setEnglishText('Severe central chest pressure radiating to left arm with acute shortness of breath.');
    } else if (newLang === 'ta') {
      setRawText('நெஞ்சில் கடுமையான அழுத்தம் மற்றும் வலி இடது கை வரை பரவுகிறது, மூச்சுத் திணறல் உள்ளது.');
      setEnglishText('Severe retrosternal chest compression with left arm radiation and breathlessness.');
    } else if (newLang === 'te') {
      setRawText('ఛాతీలో విపరీతమైన నొప్పి మరియు ఒత్తిడి ఎడమ చేతికి వ్యాపిస్తోంది, శ్వాస తీసుకోవడం కష్టంగా ఉంది.');
      setEnglishText('Acute central chest pain with left upper limb radiation and acute dyspnea.');
    } else if (newLang === 'mr') {
      setRawText('छातीत प्रचंड दाटून आल्यासारखे दुखत आहे जे डाव्या हाताकडे जात आहे, श्वास भरून येत आहे.');
      setEnglishText('Severe chest constriction radiating to left extremity with breathless sensation.');
    } else if (newLang === 'bn') {
      setRawText('বুকে প্রচণ্ড চাপ এবং ব্যথা যা বাম হাত পর্যন্ত ছড়িয়ে পড়ছে, শ্বাস নিতে কষ্ট হচ্ছে।');
      setEnglishText('Crushing central chest heaviness with left arm referral and respiratory distress.');
    } else {
      setRawText('Severe pain and heavy pressure across my chest that shoots down my left arm, hard to breathe.');
      setEnglishText('Severe central chest compression radiating to left arm with acute dyspnea.');
    }
    onToast(`Bhashini Speech Engine configured for: ${newLang.toUpperCase()}`);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      onToast('Listening via Bhashini Speech-to-Text streaming pipeline...');
    } else {
      setIsRecording(false);
      onToast('Transcribed successfully in 1.2s! Clinical English generated.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setUploadedFile(f.name);
      onToast(`OCR Vision digested: ${f.name} (Extracted 2 past meds + lab metrics)`);
    }
  };

  const handleSubmit = () => {
    onSubmitIntake({
      rawAudio: rawText,
      englishOutput: englishText,
      language: lang,
      lifestyle: { agni, nidra, koshtha, stress },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Patient Kiosk Container Mockup */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Mobile App Bar */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">AIIA Patient Pre-Consultation</h3>
                <p className="text-[11px] text-teal-100">AIIA New Delhi • Smart Intake Portal</p>
              </div>
            </div>

            {/* Bhashini Language Selector Dropdown */}
            <div className="relative">
              <select
                id="patient-lang"
                value={lang}
                onChange={(e) => handleLanguageChange(e.target.value as typeof lang)}
                className="bg-teal-950/70 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-teal-400/40 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              >
                <option value="en">English (Clinical)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>
          </div>

          {/* Step Progress bar */}
          <div className="mt-4 flex items-center justify-between text-[11px] text-teal-100 font-medium">
            <span>Step 2 of 4: Symptoms &amp; Ayush Vitals</span>
            <span>Estimated time: 90s</span>
          </div>
          <div className="w-full bg-teal-950/40 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-amber-400 h-full w-1/2 rounded-full transition-all duration-500"></div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Patient Identity / ABHA Field */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-base">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block">
                  Ayushman Bharat Health Account (ABHA)
                </label>
                <input
                  type="text"
                  defaultValue="91-8204-1290-34"
                  className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none font-mono"
                />
              </div>
            </div>
            <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
              ABDM Linked
            </span>
          </div>

          {/* 2. Voice-First Multilingual Input (Bhashini Engine) */}
          <div className="text-center space-y-3 py-2">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
              {lang === 'hi' && 'अपनी समस्या बोलकर बताएं (Tap & Speak in Hindi)'}
              {lang === 'ta' && 'உங்கள் உடல்நலப் பிரச்சனைகளைப் பேசுங்கள் (Speak in Tamil)'}
              {lang === 'te' && 'మీ ఆరోగ్య సమస్యను మాట్లాడండి (Speak in Telugu)'}
              {lang === 'mr' && 'आपली लक्षणे बोलून सांगा (Speak in Marathi)'}
              {lang === 'bn' && 'আপনার সমস্যার কথা বলুন (Speak in Bengali)'}
              {lang === 'en' && 'Speak your symptoms clearly into the microphone'}
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Bhashini AI will automatically translate regional speech into structured medical
              English and extract Ayurvedic indicators.
            </p>

            {/* Big Accessible Microphone Button */}
            <div className="pt-2 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={toggleRecording}
                className={`relative w-20 h-20 rounded-full text-white shadow-xl flex items-center justify-center text-2xl transition duration-200 focus:outline-none cursor-pointer ${
                  isRecording
                    ? 'bg-gradient-to-tr from-red-600 to-rose-500 animate-redflag'
                    : 'bg-gradient-to-tr from-teal-600 to-teal-500 hover:scale-105 active:scale-95'
                }`}
                aria-label={isRecording ? 'Stop recording' : 'Start speech recording'}
              >
                <Mic className="w-8 h-8" />
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></div>
                )}
              </button>

              {/* Audio Wave Visualizer Bars */}
              {isRecording ? (
                <div className="flex items-center gap-1.5 h-8 mt-3">
                  <span className="wave-bar w-1 bg-red-600 rounded-full"></span>
                  <span className="wave-bar w-1 bg-red-600 rounded-full"></span>
                  <span className="wave-bar w-1 bg-red-600 rounded-full"></span>
                  <span className="wave-bar w-1 bg-red-600 rounded-full"></span>
                  <span className="wave-bar w-1 bg-red-600 rounded-full"></span>
                  <span className="text-xs font-bold text-red-700 ml-2 font-mono">
                    00:0{recordSeconds} Listening ({lang.toUpperCase()})...
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 h-8 mt-3 opacity-30">
                  <span className="w-1 h-3 bg-teal-600 rounded-full"></span>
                  <span className="w-1 h-4 bg-teal-600 rounded-full"></span>
                  <span className="w-1 h-2 bg-teal-600 rounded-full"></span>
                  <span className="w-1 h-5 bg-teal-600 rounded-full"></span>
                  <span className="w-1 h-3 bg-teal-600 rounded-full"></span>
                </div>
              )}
              <span className="text-xs font-semibold text-slate-600 mt-1">
                {isRecording
                  ? 'Tap button to stop and run AI clinical translation'
                  : 'Tap button to start recording'}
              </span>
            </div>

            {/* Live Speech Transcribed & Translated Preview */}
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold border-b border-slate-200 pb-1.5">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Bhashini ASR &amp; MT Pipeline
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Confidence: 97.4%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  Raw Patient Audio ({lang.toUpperCase()}):
                </span>
                <p className="text-slate-700 italic mt-0.5 font-medium">"{rawText}"</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  Clinical English Output:
                </span>
                <p className="text-slate-900 font-semibold mt-0.5">"{englishText}"</p>
              </div>
            </div>
          </div>

          {/* 3. Adaptive Clinical Inquiry Engine (Dynamic follow-up questions) */}
          <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Adaptive Clinical Inquiry (Dynamic Smart Prompt)
              </h5>
              <span className="text-[10px] bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded font-semibold">
                AI Generated
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Based on your chest pressure, please answer these quick safety questions:
            </p>

            <div className="space-y-2 text-xs">
              <div className="bg-white p-3 rounded-xl border border-teal-100 flex items-center justify-between gap-2">
                <span>Does the chest discomfort increase with physical exertion or walking?</span>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setExertionPain('yes')}
                    className={`px-3 py-1 rounded font-bold text-xs transition cursor-pointer ${
                      exertionPain === 'yes'
                        ? 'bg-teal-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setExertionPain('no')}
                    className={`px-3 py-1 rounded text-xs transition cursor-pointer ${
                      exertionPain === 'no'
                        ? 'bg-teal-700 text-white font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-teal-100 flex items-center justify-between gap-2">
                <span>Are you experiencing cold sweating or feeling nauseous?</span>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setColdSweats('yes')}
                    className={`px-3 py-1 rounded font-bold text-xs transition cursor-pointer ${
                      coldSweats === 'yes'
                        ? 'bg-teal-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setColdSweats('no')}
                    className={`px-3 py-1 rounded text-xs transition cursor-pointer ${
                      coldSweats === 'no'
                        ? 'bg-teal-700 text-white font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Holistic Ayush Data Capture (Agni, Nidra, Prakriti) */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-amber-600" />
                Ayurvedic Daily Lifestyle &amp; Vital Indicators
              </h5>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-semibold">
                Ayush OPD Mandate
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Agni / Appetite */}
              <div className="bg-white p-3 rounded-xl border border-amber-100 space-y-1">
                <label className="font-bold text-slate-800 block text-[11px]">
                  Agni (Appetite &amp; Digestion)
                </label>
                <select
                  value={agni}
                  onChange={(e) => setAgni(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer"
                >
                  <option value="Tikshnagni (Always excessive / Acidic reflux)">
                    Tikshnagni (Always excessive / Acidic reflux)
                  </option>
                  <option value="Mandagni (Sluggish / Heavy after food)">
                    Mandagni (Sluggish / Heavy after food)
                  </option>
                  <option value="Vishmagni (Irregular / Bloating)">
                    Vishmagni (Irregular / Bloating)
                  </option>
                  <option value="Samagni (Balanced appetite)">Samagni (Balanced appetite)</option>
                </select>
              </div>

              {/* Sleep / Nidra */}
              <div className="bg-white p-3 rounded-xl border border-amber-100 space-y-1">
                <label className="font-bold text-slate-800 block text-[11px]">
                  Nidra (Sleep Duration &amp; Quality)
                </label>
                <select
                  value={nidra}
                  onChange={(e) => setNidra(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer"
                >
                  <option value="Disturbed < 5 hours (Frequent wake-ups)">
                    Disturbed &lt; 5 hours (Frequent wake-ups)
                  </option>
                  <option value="Excessive > 9 hours with heaviness">
                    Excessive &gt; 9 hours with heaviness
                  </option>
                  <option value="Sound restful sleep (6-8 hours)">
                    Sound restful sleep (6-8 hours)
                  </option>
                </select>
              </div>

              {/* Koshtha / Bowel */}
              <div className="bg-white p-3 rounded-xl border border-amber-100 space-y-1">
                <label className="font-bold text-slate-800 block text-[11px]">
                  Koshtha (Bowel Movements)
                </label>
                <select
                  value={koshtha}
                  onChange={(e) => setKoshtha(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer"
                >
                  <option value="Krura (Constipated / Hard / Irregular)">
                    Krura (Constipated / Hard / Irregular)
                  </option>
                  <option value="Mridu (Loose / Frequent stools)">
                    Mridu (Loose / Frequent stools)
                  </option>
                  <option value="Madhyama (Regular once daily)">
                    Madhyama (Regular once daily)
                  </option>
                </select>
              </div>

              {/* Stress / Manas */}
              <div className="bg-white p-3 rounded-xl border border-amber-100 space-y-1">
                <label className="font-bold text-slate-800 block text-[11px]">
                  Mental Stress / Rajasic State
                </label>
                <select
                  value={stress}
                  onChange={(e) => setStress(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer"
                >
                  <option value="High Anxiety / Palpitation / Restless">
                    High Anxiety / Palpitation / Restless
                  </option>
                  <option value="Moderate occupational tension">Moderate occupational tension</option>
                  <option value="Calm / Sattvic state">Calm / Sattvic state</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fallback OCR Document Upload for Old Prescriptions */}
          <label className="block border-2 border-dashed border-slate-300 hover:border-teal-600 rounded-2xl p-4 text-center cursor-pointer transition bg-slate-50/50 hover:bg-teal-50/20">
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} />
            <div className="flex items-center justify-center space-x-2 text-teal-700">
              {uploadedFile ? (
                <FileCheck className="w-5 h-5 text-emerald-600" />
              ) : (
                <UploadCloud className="w-5 h-5" />
              )}
              <span className="text-xs font-bold">
                {uploadedFile
                  ? `Uploaded: ${uploadedFile} (Digested)`
                  : 'Upload Previous Prescription or Lab Report (OCR Fallback)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Automatic extraction of past medications, diabetes records, and allergies via vision
              models.
            </p>
          </label>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-teal-800 hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
            >
              <span>Submit to OPD Doctor Queue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Zero wait in consultation room • Privacy compliant under ABDM guidelines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
