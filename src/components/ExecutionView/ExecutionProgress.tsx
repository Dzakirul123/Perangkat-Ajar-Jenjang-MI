import React from 'react';
import { CheckCircle2, Loader2, Sparkles, FileText } from 'lucide-react';

interface ExecutionProgressProps {
  currentStepIndex: number;
  totalSteps: number;
}

export const EXECUTION_STEPS = [
  'Generate Capaian Pembelajaran (CP)',
  'Generate Tujuan Pembelajaran (TP)',
  'Generate Alur Tujuan Pembelajaran (ATP)',
  'Generate Program Tahunan (PROTA)',
  'Generate Program Semester (PROSEM)',
  'Generate Modul Ajar Kurikulum Merdeka',
  'Generate Media dan Bahan Ajar',
  'Generate Rubrik Penilaian & KKTP',
  'Generate Instrumen Refleksi Guru & Siswa',
  'Generate Lembar Kerja Peserta Didik (LKPD)',
  'Generate Perangkat Asesmen (Hingga 100 Soal)',
  'Generate Matriks Kisi-Kisi Soal',
  'Generate Format Kartu Soal',
  'Generate Kunci Jawaban',
  'Generate Pembahasan Ilmiah & Rasional',
  'Validasi Otomatis & Konsolidasi Paket Dokumen'
];

export const ExecutionProgress: React.FC<ExecutionProgressProps> = ({
  currentStepIndex,
  totalSteps,
}) => {
  const percent = Math.min(100, Math.round(((currentStepIndex + 1) / totalSteps) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-3xl mx-auto my-12">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-3 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          STATUS: DISETUJUI — PROSES EKSEKUSI DIMULAI
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Membuat Perangkat Ajar Pendidikan Lengkap
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Sistem sedang menyusun 16 modul terpadu secara otomatis dan real-time berdasarkan data input yang telah disetujui.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-slate-700">Kemajuan Eksekusi:</span>
          <span className="text-emerald-700 font-mono text-sm">{percent}% ({currentStepIndex + 1}/{totalSteps} Tahapan)</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-300 ease-out shadow-xs"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Active step display */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/90 mb-6">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Langkah {currentStepIndex + 1} dari {totalSteps}:
            </span>
            <span className="text-sm font-bold text-slate-900">
              {EXECUTION_STEPS[currentStepIndex] || 'Menyelesaikan berkas...'}
            </span>
          </div>
        </div>
      </div>

      {/* Pipeline Grid preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {EXECUTION_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border flex items-center gap-2.5 transition-all ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-medium'
                  : isCurrent
                  ? 'bg-amber-50 border-amber-300 text-amber-950 font-bold shadow-xs'
                  : 'bg-white border-slate-100 text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center text-slate-400">
                  {idx + 1}
                </div>
              )}
              <span className="truncate">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
