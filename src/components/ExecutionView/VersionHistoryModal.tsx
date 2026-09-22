import React from 'react';
import { VersionHistoryItem } from '../../types';
import { History, X, CheckCircle, FileText, Calendar, User, ShieldCheck } from 'lucide-react';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: VersionHistoryItem[];
  onSelectVersion: (item: VersionHistoryItem) => void;
  currentVersionId?: string;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectVersion,
  currentVersionId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <History className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Riwayat Versi & Audit Log Legalitas</h3>
              <p className="text-slate-400 text-xs">
                Rekaman transaksi persetujuan digital dan riwayat eksekusi perangkat ajar
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

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              Belum ada riwayat eksekusi yang tersimpan.
            </div>
          ) : (
            history.map((item, idx) => {
              const isCurrent = item.id === currentVersionId;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {item.approval.transactionId}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                          Sedang Aktif
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.createdAt}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Penyetuju: <b>{item.approval.approverName}</b> ({item.approval.approverRole})
                      </span>
                    </div>
                    <div>
                      Mata Pelajaran: <b>{item.data.metadata.approval.dataSnapshot.mataPelajaran}</b> ({item.data.metadata.approval.dataSnapshot.kelas})
                    </div>
                    {item.approval.notes && (
                      <div className="italic text-slate-500 bg-slate-50 p-2 rounded mt-1 border border-slate-100">
                        Catatan: "{item.approval.notes}"
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Status: {item.approval.status}
                    </span>
                    {!isCurrent && (
                      <button
                        onClick={() => {
                          onSelectVersion(item);
                          onClose();
                        }}
                        className="px-3 py-1 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        Buka Versi Ini
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
