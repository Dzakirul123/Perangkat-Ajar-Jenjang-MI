import React from 'react';
import { QCValidationReport } from '../../types';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Award,
  BarChart3
} from 'lucide-react';

interface QualityControlPanelProps {
  report: QCValidationReport;
  isOpen: boolean;
  onClose: () => void;
  onRevalidate: () => void;
  onProceedToApproval: () => void;
}

export const QualityControlPanel: React.FC<QualityControlPanelProps> = ({
  report,
  isOpen,
  onClose,
  onRevalidate,
  onProceedToApproval,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Laporan Kontrol Kualitas (QC) Prototype</h3>
              <p className="text-slate-400 text-xs">
                Audit keselarasan pedagogik, kurikulum, kebahasaan, dan instrumen asesmen
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Banner */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-emerald-500 shadow-xs flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-emerald-600 leading-tight">
                {report.overallScore}
              </span>
              <span className="text-[10px] font-bold text-slate-500">DARI 100</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  Status Kelayakan Prototype:
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {report.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Diaudit pada: {report.validatedAt} | 8 Parameter Kritis Terpenuhi
              </p>
            </div>
          </div>

          <button
            onClick={onRevalidate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Audit Ulang
          </button>
        </div>

        {/* Checklist of 8 QC Items */}
        <div className="p-6 max-h-[55vh] overflow-y-auto space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Daftar Pemeriksaan Standar Kelayakan (8 Indikator)
          </h4>

          <div className="space-y-3">
            {report.items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {item.status === 'passed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : item.status === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-bold text-slate-900">{item.name}</h5>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.score >= 80
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          Skor: {item.score}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      <p className="text-xs font-medium text-slate-800 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {item.feedback}
                      </p>

                      {item.details && item.details.length > 0 && (
                        <div className="mt-2 text-[11px] text-slate-500 space-y-0.5 pl-2 border-l-2 border-emerald-400">
                          {item.details.map((d, dIdx) => (
                            <div key={dIdx}>• {d}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Semua parameter telah memenuhi prasyarat untuk legalitas Tahap 2.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
            >
              Tutup QC
            </button>
            <button
              onClick={() => {
                onClose();
                onProceedToApproval();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <span>Lanjut ke Persetujuan & Eksekusi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
