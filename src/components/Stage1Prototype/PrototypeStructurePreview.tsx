import React from 'react';
import { TeacherInputData, QCValidationReport } from '../../types';
import {
  FileText,
  Layers,
  Calendar,
  Sparkles,
  ClipboardList,
  CheckSquare,
  ShieldAlert,
  ArrowRight,
  Edit3,
  SearchCheck,
  AlertCircle
} from 'lucide-react';

interface PrototypeStructurePreviewProps {
  data: TeacherInputData;
  qcReport: QCValidationReport;
  onEditForm: () => void;
  onOpenQCModal: () => void;
  onProceedToApproval: () => void;
}

export const PrototypeStructurePreview: React.FC<PrototypeStructurePreviewProps> = ({
  data,
  qcReport,
  onEditForm,
  onOpenQCModal,
  onProceedToApproval,
}) => {
  const documentsBlueprint = [
    {
      no: 1,
      code: 'CP',
      title: 'Capaian Pembelajaran',
      desc: 'Rasional mata pelajaran, tujuan esensial, karakteristik, dan elemen capaian kognitif-proses.',
      status: 'Terpetakan',
      tag: 'Landasan Fondasi',
    },
    {
      no: 2,
      code: 'TP',
      title: 'Tujuan Pembelajaran',
      desc: 'Formulasi kompetensi KKO Bloom revisi & lingkup materi spesifik berbasis ABCD.',
      status: 'Terumus',
      tag: 'Operasional',
    },
    {
      no: 3,
      code: 'ATP',
      title: 'Alur Tujuan Pembelajaran',
      desc: 'Urutan linier sekuensial tahapan belajar, alokasi jam pelajaran (JP), dan profil pelajar.',
      status: 'Sekuensial',
      tag: 'Alur Pembelajaran',
    },
    {
      no: 4,
      code: 'PROTA',
      title: 'Program Tahunan',
      desc: 'Distribusi materi pokok per semester, pekan efektif kalender pendidikan (18 & 16 pekan).',
      status: 'Terjadwal',
      tag: 'Manajemen Tahunan',
    },
    {
      no: 5,
      code: 'PROSEM',
      title: 'Program Semester',
      desc: 'Matriks mingguan bulanan (Juli-Desember / Januari-Juni) alokasi jam tatap muka.',
      status: 'Terpetakan',
      tag: 'Distribusi Waktu',
    },
    {
      no: 6,
      code: 'MODUL AJAR',
      title: 'Modul Ajar Kurikulum Merdeka',
      desc: 'Informasi umum, kompetensi awal, P3/P5RA, pemahaman bermakna, pertanyaan pemantik, sintaks PBL/Diferensiasi, asesmen.',
      status: 'Komprehensif',
      tag: 'Pedoman Kelas',
    },
    {
      no: 7,
      code: 'MEDIA AJAR',
      title: 'Media & Bahan Ajar',
      desc: 'Ringkasan materi komprehensif, kerangka tayangan slide 6 halaman, dan lembar referensi siswa.',
      status: 'Konseptual',
      tag: 'Dukungan Pembelajaran',
    },
    {
      no: 8,
      code: 'RUBRIK',
      title: 'Rubrik Penilaian & KKTP',
      desc: 'Kriteria ketercapaian tujuan (KKTP), rubrik analitik performa, interval skala nilai & tindak lanjut.',
      status: 'Terstandar',
      tag: 'Asesmen Otentik',
    },
    {
      no: 9,
      code: 'REFLEKSI',
      title: 'Instrumen Refleksi',
      desc: 'Lembar evaluasi diri guru (5 butir pedagogik) dan lembar refleksi bermakna siswa (5 butir).',
      status: 'Tersedia',
      tag: 'Evaluasi Diri',
    },
    {
      no: 10,
      code: 'LKPD',
      title: 'Lembar Kerja Peserta Didik',
      desc: 'Aktivitas investigasi terstruktur: stimulus masalah, alat bahan, langkah eksplorasi, tabel observasi & diskusi.',
      status: 'Interaktif',
      tag: 'Lembar Siswa',
    },
    {
      no: 11,
      code: 'SOAL 100',
      title: `Perangkat Asesmen (${data.jumlahSoal || 100} Butir Soal)`,
      desc: 'Analisis materi, kisi-kisi soal, kartu soal, distribusi C1-C6, naskah butir PG/Uraian, kunci jawaban, dan pembahasan.',
      status: 'Lengkap & Valid',
      tag: 'Bank Evaluasi',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                STATUS: PROTOTYPE SIAP DIPERIKSA
              </span>
              <span className="text-xs font-medium text-slate-500">
                Tahap 1 dari 2
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Blueprint Arsitektur Perangkat Ajar Terintegrasi
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Seluruh rancangan alur CP → TP → ATP → Modul Ajar → LKPD → Asesmen telah tersinkronisasi. Dokumen final belum digenerate hingga persetujuan resmi Tahap 2 diberikan.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={onEditForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-xl transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit / Revisi Data
            </button>

            <button
              onClick={onOpenQCModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors"
            >
              <SearchCheck className="w-4 h-4 text-emerald-600" />
              Validasi Prototype (QC: {qcReport.overallScore}%)
            </button>

            <button
              onClick={onProceedToApproval}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <span>Lanjut ke Persetujuan (Tahap 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Warning Note */}
        <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <b>Aturan Ketat Sistem:</b> Sesuai ketentuan, aplikasi tidak menghasilkan dokumen final pada tahap ini. Silakan periksa validasi kontrol kualitas (QC), kemudian berikan persetujuan digital di Tahap 2 untuk memulai eksekusi pembuatan paket perangkat ajar lengkap.
          </div>
        </div>
      </div>

      {/* Snapshot Identity Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xs">
        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
          Ringkasan Identitas Dokumen
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 text-xs">
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
            <span className="text-slate-400 block text-[10px]">Guru Pengampu</span>
            <span className="font-semibold text-white truncate block">{data.namaGuru || '-'}</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
            <span className="text-slate-400 block text-[10px]">Satuan Pendidikan</span>
            <span className="font-semibold text-white truncate block">{data.satuanPendidikan || '-'}</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
            <span className="text-slate-400 block text-[10px]">Mata Pelajaran</span>
            <span className="font-semibold text-white truncate block">{data.mataPelajaran || '-'}</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
            <span className="text-slate-400 block text-[10px]">Fase & Kelas</span>
            <span className="font-semibold text-white truncate block">{data.kelas} ({data.fase})</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
            <span className="text-slate-400 block text-[10px]">Tahun Pelajaran</span>
            <span className="font-semibold text-white truncate block">{data.tahunPelajaran} ({data.semester})</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
            <span className="text-slate-400 block text-[10px]">Target Asesmen</span>
            <span className="font-semibold text-emerald-300 block">{data.jumlahSoal || 100} Soal C1-C6</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
            <span className="text-slate-400 block text-[10px]">Format Kertas Word</span>
            <span className="font-semibold text-amber-300 block">
              {data.ukuranKertas === 'Kuarto' ? 'Kuarto (21.59x27.94)' : 'A4 (21.0x29.7)'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 11 Documents Blueprint */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Struktur 11 Dokumen Yang Akan Dihasilkan
          </h3>
          <span className="text-xs text-slate-500">
            Terintegrasi linier tanpa loncatan kompetensi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentsBlueprint.map((doc) => (
            <div
              key={doc.no}
              className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200/60">
                    {doc.no}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {doc.tag}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  {doc.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {doc.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {doc.status}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  SIAP EKSEKUSI
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Spec Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-emerald-600" />
          Rancangan Matriks Bank Asesmen ({data.jumlahSoal || 100} Soal)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              Sebaran Taksonomi Kognitif
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">LOTS (C1-C2):</span>
                <span className="font-bold text-slate-800">~35% (35 Soal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">MOTS (C3-C4):</span>
                <span className="font-bold text-slate-800">~45% (45 Soal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">HOTS (C5-C6):</span>
                <span className="font-bold text-emerald-700">~20% (20 Soal)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              Proporsi Tingkat Kesulitan
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Mudah:</span>
                <span className="font-bold text-emerald-600">25% (25 Soal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sedang:</span>
                <span className="font-bold text-blue-600">50% (50 Soal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sukar:</span>
                <span className="font-bold text-amber-600">25% (25 Soal)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              Bentuk Soal Bervariasi
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Pilihan Ganda A-E:</span>
                <span className="font-bold text-slate-800">70 Soal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">PG Kompleks:</span>
                <span className="font-bold text-slate-800">10 Soal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Menjodohkan & Isian:</span>
                <span className="font-bold text-slate-800">14 Soal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Uraian / Analisis:</span>
                <span className="font-bold text-slate-800">6 Soal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
