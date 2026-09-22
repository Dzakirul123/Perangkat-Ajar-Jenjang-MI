import React from 'react';
import { BookOpen, ShieldCheck, CheckCircle2, History, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentStage: 1 | 2;
  executionStatus: 'draft' | 'prototype_ready' | 'executing' | 'completed';
  onOpenHistory: () => void;
  onReset: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  executionStatus,
  onOpenHistory,
  onReset,
  historyCount
}) => {
  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Generator Perangkat Ajar
                </h1>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  Kurikulum Merdeka / K13
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Sistem 2 Tahap: Prototype & Perancangan → Legalitas Persetujuan → Eksekusi 11 Dokumen Terintegrasi
              </p>
            </div>
          </div>

          {/* Stage & Status Badge */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Stage indicator */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/80 text-xs font-medium">
              <div
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  currentStage === 1
                    ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                    : 'text-slate-500'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  1
                </span>
                Tahap 1: Prototype
              </div>
              <div
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  currentStage === 2
                    ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                    : 'text-slate-500'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                Tahap 2: Eksekusi Final
              </div>
            </div>

            {/* Status Pill */}
            {executionStatus === 'completed' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                DOKUMEN SIAP PAKAI
              </span>
            ) : executionStatus === 'executing' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                DISETUJUI — PROSES EKSEKUSI
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                PROTOTYPE SIAP DIPERIKSA
              </span>
            )}

            {/* Version History Button */}
            <button
              onClick={onOpenHistory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs"
              title="Lihat Riwayat Versi & Log Legalitas"
            >
              <History className="w-3.5 h-3.5 text-slate-500" />
              Riwayat ({historyCount})
            </button>

            {/* Reset Form */}
            {executionStatus === 'completed' && (
              <button
                onClick={onReset}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Buat Perangkat Ajar Baru"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Baru
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
