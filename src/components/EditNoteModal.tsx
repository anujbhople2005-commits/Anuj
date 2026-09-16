import React, { useState } from 'react';
import { Edit3, X, Check } from 'lucide-react';
import { Patient } from '../types';

interface EditNoteModalProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: {
    complaint: string;
    severity: string;
    ayushPlan: string[];
    westernPlan: string[];
  }) => void;
}

export const EditNoteModal: React.FC<EditNoteModalProps> = ({
  patient,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [complaint, setComplaint] = useState(patient.complaint);
  const [severity, setSeverity] = useState(
    patient.severity.includes('Severe')
      ? 'Severe'
      : patient.severity.includes('Moderate')
      ? 'Moderate'
      : 'Mild'
  );
  const [ayushText, setAyushText] = useState(patient.ayushPlan.join('\n'));
  const [westernText, setWesternText] = useState(patient.westernPlan.join('\n'));

  const handleSave = () => {
    onSave({
      complaint,
      severity:
        severity === 'Severe'
          ? '8 / 10 (Severe - Red Flag)'
          : severity === 'Moderate'
          ? '5 / 10 (Moderate)'
          : '3 / 10 (Mild)',
      ayushPlan: ayushText.split('\n').filter((l) => l.trim().length > 0),
      westernPlan: westernText.split('\n').filter((l) => l.trim().length > 0),
    });
  };

  return (
    <div
      id="modal-edit"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-teal-700" />
            Doctor Clinical Oversight &amp; Quick Adjustment
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close edit modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Chief Complaint Override:
            </label>
            <input
              type="text"
              id="edit-complaint-input"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Severity &amp; Triage Tier:
            </label>
            <select
              id="edit-severity-input"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-teal-600 focus:outline-none cursor-pointer"
            >
              <option value="Severe">High Priority (Red Flag Triage)</option>
              <option value="Moderate">Moderate / Standard OPD</option>
              <option value="Mild">Mild / Routine</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Ayurvedic Treatment Directives:
            </label>
            <textarea
              rows={3}
              value={ayushText}
              onChange={(e) => setAyushText(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none font-sans"
              placeholder="e.g. Arjuna Ksheerapaka 50ml BD, Prabhakar Vati 1 tab BD..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Western Medicine Directives:
            </label>
            <textarea
              rows={3}
              value={westernText}
              onChange={(e) => setWesternText(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none font-sans"
              placeholder="e.g. STAT Sublingual Sorbitrate (5mg) + Aspirin 325mg..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow transition cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save &amp; Apply to Record</span>
          </button>
        </div>
      </div>
    </div>
  );
};
