import React, { useState } from 'react';
import { TeacherInputData, ApprovalRecord } from '../../types';
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  FileSignature,
  Lock,
  ArrowLeft
} from 'lucide-react';

interface ApprovalModalProps {
  inputData: TeacherInputData;
  isOpen: boolean;
  onClose: () => void;
  onApproveAndExecute: (record: ApprovalRecord) => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  inputData,
  isOpen,
  onClose,
  onApproveAndExecute,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [approverName, setApproverName] = useState(inputData.namaGuru || 'Dzakirul Husni, S.Pd');
  const [approverRole, setApproverRole] = useState('Guru Kelas');
  const [notes, setNotes] = useState('');
  const [currentDate] = useState(() => {
    return new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !approverName.trim()) return;

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const transactionId = `DOC-PA-${new Date().getFullYear()}-${randomSuffix}`;

    const record: ApprovalRecord = {
      transactionId,
      approverName,
      approverRole,
      approvedAt: new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' }),
      prototypeVersion: 'v1.0.0-PROTOTYPE',
      notes,
      agreed: true,
      status: 'DISETUJUI — PROSES EKSEKUSI DIMULAI',
      dataSnapshot: { ...inputData },
    };

    onApproveAndExecute(record);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <FileSignature className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                Tahap 2: Legalitas & Eksekusi Final
              </span>
              <h3 className="text-lg font-bold tracking-tight mt-1">
                Konfirmasi dan Persetujuan Eksekusi
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Explicit Approval Declaration Statement */}
          <div className="bg-emerald-50/80 rounded-xl p-5 border border-emerald-200 text-emerald-950">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              Pernyataan Persetujuan Resmi Pengguna
            </h4>
            <blockquote className="text-sm font-medium leading-relaxed italic border-l-4 border-emerald-600 pl-4 py-1 text-slate-800">
              "Saya telah memeriksa prototype, struktur perangkat ajar, data input, materi, jumlah soal, dan format output. Saya menyetujui aplikasi melanjutkan proses pembuatan perangkat ajar secara lengkap berdasarkan data yang telah diberikan."
            </blockquote>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Pengguna / Penyetuju <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={approverName}
                onChange={(e) => setApproverName(e.target.value)}
                placeholder="Nama Lengkap Penyetuju"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jabatan Penyetuju <span className="text-rose-500">*</span>
              </label>
              <select
                value={approverRole}
                onChange={(e) => {
                  const role = e.target.value;
                  setApproverRole(role);
                  if (role === 'Kepala Madrasah' && inputData.kepalaSekolah) {
                    setApproverName(inputData.kepalaSekolah);
                  } else if (role === 'Guru Kelas' && inputData.namaGuru) {
                    setApproverName(inputData.namaGuru);
                  }
                }}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              >
                <option value="Guru Kelas">Guru Kelas</option>
                <option value="Kepala Madrasah">Kepala Madrasah ({inputData.kepalaSekolah || 'Ismail, S.Ag'})</option>
                <option value="Guru Pengampu Mata Pelajaran">Guru Pengampu Mata Pelajaran</option>
                <option value="Wakil Kepala Madrasah / Sekolah Bidang Kurikulum">Wakil Kepala Madrasah / Bidang Kurikulum</option>
                <option value="Ketua Tim Pengembang Kurikulum (TPK)">Ketua Tim Pengembang Kurikulum (TPK)</option>
                <option value="Pengawas Pembina Madrasah">Pengawas Pembina Madrasah</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Persetujuan
              </label>
              <input
                type="text"
                disabled
                value={currentDate}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Output Berkas & Format Kertas
              </label>
              <input
                type="text"
                disabled
                value={`11 Dokumen Word (.doc) | Kertas: ${inputData.ukuranKertas === 'Kuarto' ? 'Kuarto (21.59 x 27.94 cm)' : 'A4 (21.0 x 29.7 cm)'}`}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 cursor-not-allowed font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kolom Catatan Khusus / Revisi (Opsional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tambahkan catatan khusus, misal: 'Disesuaikan dengan SK Tim Kurikulum No. 12/2024'..."
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Lock className="w-4 h-4 text-emerald-600" />
              Aturan Legalitas & Bukti Persetujuan Digital
            </div>
            <p className="leading-relaxed">
              Persetujuan pengguna menjadi <b>bukti persetujuan digital terhadap proses eksekusi aplikasi</b>, bukan pengganti tanda tangan elektronik tersertifikasi atau legalitas dokumen resmi apabila secara hukum diperlukan. Log persetujuan, waktu ISO, dan versi snapshot akan diarsip secara permanen dalam sistem.
            </p>
          </div>

          {/* Mandatory Checkbox */}
          <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/50 flex items-start gap-3">
            <input
              type="checkbox"
              id="approval-checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer accent-emerald-600"
            />
            <label
              htmlFor="approval-checkbox"
              className="text-xs md:text-sm font-bold text-slate-900 cursor-pointer select-none"
            >
              Saya telah memeriksa dan menyetujui.
              <span className="block text-xs font-normal text-slate-600 mt-0.5">
                Dengan mencentang kotak ini, saya memberikan otorisasi resmi kepada sistem untuk memulai eksekusi pembuatan seluruh dokumen perangkat ajar lengkap.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Prototype
            </button>

            <button
              type="submit"
              disabled={!agreed || !approverName.trim()}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition-all ${
                agreed && approverName.trim()
                  ? 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-md cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>SETUJUI & EKSEKUSI</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
