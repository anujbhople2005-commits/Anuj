/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { DoctorDashboard } from './components/DoctorDashboard';
import { PatientKiosk } from './components/PatientKiosk';
import { PosterGenerator } from './components/PosterGenerator';
import { EmergencyModal } from './components/EmergencyModal';
import { EditNoteModal } from './components/EditNoteModal';
import { Toast } from './components/Toast';
import { INITIAL_PATIENTS } from './data';
import { ActiveTab, Patient, ToastMessage } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('doctor');
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<number>(1);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const selectedPatient =
    patients.find((p) => p.id === selectedPatientId) || patients[0];

  const showToast = (message: string, type: 'success' | 'alert' | 'info' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3400);
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatientId(patient.id);
    showToast(`Switched to Patient: ${patient.name} (${patient.token})`);
  };

  const handleApproveNote = () => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id
          ? {
              ...p,
              badge: 'Signed & Approved (ABDM)',
              badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            }
          : p
      )
    );
    showToast('Signed: 100% Zero-typing OPD note added to ABDM EHR!', 'success');
  };

  const handleDispatchCathLab = () => {
    setIsEmergencyModalOpen(false);
    showToast(
      'DIRECT DISPATCH: Patient routed to Resuscitation Bay 1 / Cath Lab. RRT Mobilized!',
      'alert'
    );
  };

  const handleAdministerMeds = () => {
    setIsEmergencyModalOpen(false);
    showToast(
      'Administered STAT Aspirin 325mg + Sorbitrate 5mg sublingually. Vitals monitoring active.',
      'success'
    );
  };

  const handleAcknowledgeEmergency = () => {
    setIsEmergencyModalOpen(false);
    showToast('Alert acknowledged. Reviewing patient file on OPD dashboard.', 'info');
  };

  const handleSaveDoctorEdit = (updatedData: {
    complaint: string;
    severity: string;
    ayushPlan: string[];
    westernPlan: string[];
  }) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id
          ? {
              ...p,
              complaint: updatedData.complaint,
              severity: updatedData.severity,
              ayushPlan: updatedData.ayushPlan,
              westernPlan: updatedData.westernPlan,
            }
          : p
      )
    );
    setIsEditModalOpen(false);
    showToast('Doctor clinical oversight saved and authenticated to electronic record!', 'success');
  };

  const handlePatientIntakeSubmit = (intakeData: {
    rawAudio: string;
    englishOutput: string;
    language: string;
    lifestyle: {
      agni: string;
      nidra: string;
      koshtha: string;
      stress: string;
    };
  }) => {
    showToast('Pre-consultation intake registered via Bhashini pipeline! Transferring to Doctor Queue...');
    setTimeout(() => {
      setActiveTab('doctor');
      showToast('New patient data synced with Room 104 OPD Hub.', 'success');
    }, 900);
  };

  return (
    <div className="bg-slate-100 text-slate-800 font-sans antialiased min-h-screen flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        criticalAlertActive={selectedPatient.isRedFlag}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {activeTab === 'doctor' && (
          <DoctorDashboard
            patients={patients}
            selectedPatient={selectedPatient}
            onSelectPatient={handleSelectPatient}
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
            onOpenEditModal={() => setIsEditModalOpen(true)}
            onApproveNote={handleApproveNote}
            onSendEmergency={handleDispatchCathLab}
          />
        )}

        {activeTab === 'patient' && (
          <PatientKiosk
            onSubmitIntake={handlePatientIntakeSubmit}
            onToast={showToast}
          />
        )}

        {activeTab === 'qr' && (
          <PosterGenerator
            onSimulateScan={() => {
              setActiveTab('patient');
              showToast('Opened Waiting-Room Kiosk Portal via QR Scan simulation!');
            }}
            onToast={showToast}
          />
        )}
      </main>

      {/* Emergency Bypass Modal */}
      <EmergencyModal
        patient={selectedPatient}
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onDispatchCathLab={handleDispatchCathLab}
        onAdministerMeds={handleAdministerMeds}
        onAcknowledge={handleAcknowledgeEmergency}
      />

      {/* Doctor Quick Adjust Modal */}
      <EditNoteModal
        patient={selectedPatient}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveDoctorEdit}
      />

      {/* Notification Toast */}
      <Toast toast={toast} />
    </div>
  );
}
