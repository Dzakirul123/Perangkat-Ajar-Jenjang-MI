import React, { useState, useEffect } from 'react';
import { TeacherInputData } from '../../types';
import { CURRICULUM_PRESETS } from '../../data/presets';
import { PILIHAN_MATA_PELAJARAN, PILIHAN_TAHUN_PELAJARAN } from '../../data/curriculumConstants';
import {
  generateCurriculumWithAI,
  fetchCurriculumChapters
} from '../../utils/aiCurriculumService';
import { KurikulumElementSet } from '../../data/kemendikdasmenDatabase';
import {
  Sparkles,
  School,
  GraduationCap,
  Calendar,
  BookMarked,
  UserCheck,
  CheckCircle,
  HelpCircle,
  FileQuestion,
  BookOpen,
  Loader2,
  Wand2,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Layers,
  RefreshCw,
  Info
} from 'lucide-react';

interface InputFormProps {
  data: TeacherInputData;
  onChange: (updated: Partial<TeacherInputData>) => void;
  onProceedToReview: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  data,
  onChange,
  onProceedToReview
}) => {
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [aiStatusMessage, setAiStatusMessage] = useState<string>('');
  const [lastGeneratedSource, setLastGeneratedSource] = useState<string | null>(null);
  const [customTopicInput, setCustomTopicInput] = useState<string>('');
  const [availableChapters, setAvailableChapters] = useState<KurikulumElementSet[]>([]);
  const [activeGeneratingField, setActiveGeneratingField] = useState<string | null>(null);

  // Synchronize available Kemendikdasmen chapters whenever Mata Pelajaran or Fase changes
  useEffect(() => {
    let isMounted = true;
    fetchCurriculumChapters(data.mataPelajaran, data.fase).then((chapters) => {
      if (isMounted) {
        setAvailableChapters(chapters);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [data.mataPelajaran, data.fase]);

  const handleApplyPreset = (presetKey: string) => {
    const preset = CURRICULUM_PRESETS[presetKey];
    if (preset) {
      onChange(preset);
    }
  };

  const handleTriggerAIGeneration = async (
    specificTopic?: string,
    targetField: 'all' | 'materi' | 'cp' | 'tp' | 'referensi' = 'all'
  ) => {
    setIsGeneratingAI(true);
    setActiveGeneratingField(targetField);
    setAiStatusMessage(
      specificTopic
        ? `Menyinkronkan Bab "${specificTopic}" dengan standar Kemendikdasmen...`
        : targetField === 'cp'
        ? `Mengambil rumusan Capaian Pembelajaran resmi BSKAP Kemendikdasmen...`
        : targetField === 'tp'
        ? `Merumuskan Tujuan Pembelajaran berbasis Taksonomi Bloom...`
        : targetField === 'referensi'
        ? `Mencari Buku Teks Utama resmi Kemendikdasmen & Kemenag...`
        : `Menyusun Materi, CP, TP & Referensi Buku berbasis AI Kemendikdasmen...`
    );

    try {
      const result = await generateCurriculumWithAI(
        data,
        specificTopic || customTopicInput || data.materiTopik
      );

      if (result.data) {
        if (targetField === 'all') {
          onChange({
            materiTopik: result.data.materiTopik,
            subMateri: result.data.subMateri,
            capaianPembelajaran: result.data.capaianPembelajaran,
            tujuanPembelajaranInput: result.data.tujuanPembelajaranInput,
            referensiBuku: result.data.referensiBuku,
            ...(result.data.karakteristikSiswa ? { karakteristikSiswa: result.data.karakteristikSiswa } : {}),
            ...(result.data.alokasiWaktu ? { alokasiWaktu: result.data.alokasiWaktu } : {})
          });
        } else if (targetField === 'materi') {
          onChange({
            materiTopik: result.data.materiTopik,
            subMateri: result.data.subMateri
          });
        } else if (targetField === 'cp') {
          onChange({
            capaianPembelajaran: result.data.capaianPembelajaran
          });
        } else if (targetField === 'tp') {
          onChange({
            tujuanPembelajaranInput: result.data.tujuanPembelajaranInput
          });
        } else if (targetField === 'referensi') {
          onChange({
            referensiBuku: result.data.referensiBuku
          });
        }

        setLastGeneratedSource(
          result.source === 'gemini_kemendikdasmen_ai'
            ? 'AI Gemini (Terintegrasi Standar BSKAP Kemendikdasmen & Kemenag)'
            : 'Standar Resmi SK BSKAP Kemendikdasmen No. 032/H/KR/2024 & KMA 450/2024'
        );
      }
    } catch (err) {
      console.error('Failed to generate curriculum with AI:', err);
    } finally {
      setIsGeneratingAI(false);
      setActiveGeneratingField(null);
      setAiStatusMessage('');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Top Banner with Presets */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              TAHAP 1: INPUT DATA & PROTOTYPE
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Formulir Identitas & Kurikulum Perangkat Ajar
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              Lengkapi data berikut untuk menyusun rancangan terintegrasi. Anda juga dapat memilih contoh kurikulum siap pakai untuk pengujian cepat.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>Preset Kurikulum MI Negeri 1 Paser (TP 2026/2027):</span>
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('min1_paser_fase_a')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/40 transition-colors text-white shadow-xs"
              >
                Fase A: B. Indonesia
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('min1_paser_fase_b')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/40 transition-colors text-white shadow-xs"
              >
                Fase B: IPAS
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('min1_paser_fase_c')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/40 transition-colors text-white shadow-xs"
              >
                Fase C: Matematika
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('min1_paser_fiqih')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-600 border border-teal-400/40 transition-colors text-white shadow-xs"
              >
                Fase B: Fiqih
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('min1_paser_akidah')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-600 border border-teal-400/40 transition-colors text-white shadow-xs"
              >
                Fase A: Akidah Akhlak
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('matematika_smp')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/15 transition-colors text-slate-200"
              >
                SMP (Fase D)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('pai_sma')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/15 transition-colors text-slate-200"
              >
                SMA (Fase E)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Fields */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onProceedToReview();
        }}
        className="p-6 md:p-8 space-y-8"
      >
        {/* Section 1: Identitas Guru & Satuan Pendidikan */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
            <School className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              1. Identitas Guru & Satuan Pendidikan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Guru Kelas / Pengampu <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={data.namaGuru}
                onChange={(e) => onChange({ namaGuru: e.target.value })}
                placeholder="Contoh: Dzakirul Husni, S.Pd"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NIP / NUPTK Guru
              </label>
              <input
                type="text"
                value={data.nipNuptk}
                onChange={(e) => onChange({ nipNuptk: e.target.value })}
                placeholder="Contoh: 197003062003121002"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Satuan Pendidikan (Madrasah / Sekolah) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={data.satuanPendidikan}
                onChange={(e) => onChange({ satuanPendidikan: e.target.value })}
                placeholder="Contoh: MI Negeri 1 Paser"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NPSN Satuan Pendidikan
              </label>
              <input
                type="text"
                value={data.npsn}
                onChange={(e) => onChange({ npsn: e.target.value })}
                placeholder="Contoh: 60723231"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tempat / Kota / Kabupaten
              </label>
              <input
                type="text"
                value={data.kotaKabupaten}
                onChange={(e) => onChange({ kotaKabupaten: e.target.value })}
                placeholder="Contoh: Paser"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Dokumen / Pengesahan
              </label>
              <input
                type="text"
                value={data.tanggalPengesahan}
                onChange={(e) => onChange({ tanggalPengesahan: e.target.value })}
                placeholder="Contoh: 15 Juli 2024"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Kurikulum & Kelas */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              2. Parameter Kurikulum & Kelas (Fase A, B, C MI)
            </h3>
          </div>

          {/* Quick Fase Selector Buttons */}
          <div className="mb-4 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
            <span className="block text-xs font-bold text-emerald-900 mb-2">
              Pilih Cepat Fase SD/MI (Madrasah Ibtidaiyah):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onChange({
                  jenjang: 'SD/MI',
                  fase: 'Fase A (Kelas 1-2)',
                  kelas: data.kelas.includes('2') ? 'Kelas 2' : 'Kelas 1'
                })}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-left flex items-center justify-between ${
                  data.fase.includes('Fase A')
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="font-bold">Fase A</div>
                  <div className="text-[10px] opacity-80">Kelas 1 & 2 SD/MI</div>
                </div>
                {data.fase.includes('Fase A') && <CheckCircle className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => onChange({
                  jenjang: 'SD/MI',
                  fase: 'Fase B (Kelas 3-4)',
                  kelas: data.kelas.includes('3') ? 'Kelas 3' : 'Kelas 4'
                })}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-left flex items-center justify-between ${
                  data.fase.includes('Fase B')
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="font-bold">Fase B</div>
                  <div className="text-[10px] opacity-80">Kelas 3 & 4 SD/MI</div>
                </div>
                {data.fase.includes('Fase B') && <CheckCircle className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => onChange({
                  jenjang: 'SD/MI',
                  fase: 'Fase C (Kelas 5-6)',
                  kelas: data.kelas.includes('6') ? 'Kelas 6' : 'Kelas 5'
                })}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-left flex items-center justify-between ${
                  data.fase.includes('Fase C')
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="font-bold">Fase C</div>
                  <div className="text-[10px] opacity-80">Kelas 5 & 6 SD/MI</div>
                </div>
                {data.fase.includes('Fase C') && <CheckCircle className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Selection for Mata Pelajaran (10 Mapel) */}
          <div className="mb-4 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                Pilihan 10 Mata Pelajaran:
              </span>
              <span className="text-[11px] text-slate-500">
                Klik mapel atau pilih pada dropdown
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PILIHAN_MATA_PELAJARAN.map((mapel) => {
                const isSelected = data.mataPelajaran === mapel;
                return (
                  <button
                    key={mapel}
                    type="button"
                    onClick={() => onChange({ mataPelajaran: mapel })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 border-slate-200'
                    }`}
                  >
                    {mapel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jenjang Pendidikan <span className="text-rose-500">*</span>
              </label>
              <select
                value={data.jenjang}
                onChange={(e) => onChange({ jenjang: e.target.value as any })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              >
                <option value="SD/MI">SD / MI (Madrasah Ibtidaiyah)</option>
                <option value="SMP/MTs">SMP / MTs</option>
                <option value="SMA/MA">SMA / MA</option>
                <option value="SMK">SMK</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fase Kurikulum <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={data.fase}
                onChange={(e) => onChange({ fase: e.target.value })}
                placeholder="Contoh: Fase A (Kelas 1-2) / Fase B / Fase C"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-semibold text-emerald-900 bg-emerald-50/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kelas <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={data.kelas}
                onChange={(e) => onChange({ kelas: e.target.value })}
                placeholder="Contoh: Kelas 1, Kelas 4, Kelas 5"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mata Pelajaran <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={data.mataPelajaran}
                onChange={(e) => onChange({ mataPelajaran: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white font-medium text-slate-800"
              >
                <option value="" disabled>-- Pilih Mata Pelajaran --</option>
                {PILIHAN_MATA_PELAJARAN.map((mapel) => (
                  <option key={mapel} value={mapel}>
                    {mapel}
                  </option>
                ))}
                {!PILIHAN_MATA_PELAJARAN.includes(data.mataPelajaran as any) && data.mataPelajaran && (
                  <option value={data.mataPelajaran}>{data.mataPelajaran}</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tahun Pelajaran <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={data.tahunPelajaran}
                onChange={(e) => onChange({ tahunPelajaran: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white font-medium text-slate-800"
              >
                <option value="" disabled>-- Pilih Tahun Pelajaran --</option>
                {PILIHAN_TAHUN_PELAJARAN.map((tp) => (
                  <option key={tp} value={tp}>
                    {tp}
                  </option>
                ))}
                {!PILIHAN_TAHUN_PELAJARAN.includes(data.tahunPelajaran as any) && data.tahunPelajaran && (
                  <option value={data.tahunPelajaran}>{data.tahunPelajaran}</option>
                )}
              </select>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] text-slate-500 font-medium">Cepat:</span>
                {PILIHAN_TAHUN_PELAJARAN.map((tp) => (
                  <button
                    key={tp}
                    type="button"
                    onClick={() => onChange({ tahunPelajaran: tp })}
                    className={`px-1.5 py-0.5 text-[10px] rounded transition-colors ${
                      data.tahunPelajaran === tp
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pilihan Kurikulum
              </label>
              <select
                value={data.kurikulum}
                onChange={(e) => onChange({ kurikulum: e.target.value as any })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              >
                <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                <option value="Kurikulum 2013">Kurikulum 2013 (K13)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Semester
              </label>
              <select
                value={data.semester}
                onChange={(e) => onChange({ semester: e.target.value as any })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              >
                <option value="Ganjil">Semester Ganjil</option>
                <option value="Genap">Semester Genap</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alokasi Waktu
              </label>
              <input
                type="text"
                value={data.alokasiWaktu}
                onChange={(e) => onChange({ alokasiWaktu: e.target.value })}
                placeholder="Contoh: 4 Pertemuan (8 JP x 35 Menit)"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Materi, Karakteristik & Capaian (Terintegrasi AI & Kemendikdasmen) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">
                3. Lingkup Materi, Capaian & Karakteristik Peserta Didik
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              SK BSKAP Kemendikdasmen 032/H/KR/2024 & KMA 450/2024
            </span>
          </div>

          {/* AI Automated Curriculum Engine Box */}
          <div className="bg-gradient-to-br from-emerald-50/80 via-slate-50 to-teal-50/40 border border-emerald-200/90 rounded-xl p-4.5 mb-5 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-600 text-white shrink-0 shadow-xs">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900">
                      Otomatisasi Kurikulum dengan AI Valid & Kemendikdasmen
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Terverifikasi Resmi
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Menghasilkan Materi Pokok, Sub-Materi, Capaian Pembelajaran (CP) standar BSKAP Kemendikdasmen/Kemenag, Tujuan Pembelajaran (TP) berbasis Taksonomi Bloom, dan Referensi Buku Teks Utama secara otomatis untuk{' '}
                    <span className="font-semibold text-emerald-900">
                      {data.mataPelajaran} ({data.fase} - {data.kelas})
                    </span>
                    .
                  </p>
                </div>
              </div>

              {/* Main AI Generation Button */}
              <button
                type="button"
                disabled={isGeneratingAI}
                onClick={() => handleTriggerAIGeneration()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-60 shrink-0"
              >
                {isGeneratingAI && activeGeneratingField === 'all' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                    <span>{aiStatusMessage || 'Memproses AI Kemendikdasmen...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Generate Otomatis Semua (AI & CP Valid)</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Available Chapters from Kemendikdasmen */}
            {availableChapters.length > 0 && (
              <div className="mt-3.5 pt-3 border-t border-emerald-200/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-800">
                    Pilih Bab / Topik Standar Kemendikdasmen ({data.mataPelajaran} - {data.fase}):
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableChapters.map((ch, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isGeneratingAI}
                      onClick={() => handleTriggerAIGeneration(ch.materiTopik, 'all')}
                      className={`text-left px-3 py-1.5 rounded-lg text-xs transition-all border ${
                        data.materiTopik === ch.materiTopik
                          ? 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-xs'
                          : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <span className="font-semibold">{ch.materiTopik}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Custom Topic input */}
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={customTopicInput}
                onChange={(e) => setCustomTopicInput(e.target.value)}
                placeholder={`Atau ketik topik khusus di sini (misal: Bab tertentu atau tema lokal), lalu klik Generate Otomatis...`}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {customTopicInput && (
                <button
                  type="button"
                  disabled={isGeneratingAI}
                  onClick={() => handleTriggerAIGeneration(customTopicInput, 'all')}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-md shrink-0 cursor-pointer disabled:opacity-50"
                >
                  Terapkan Topik
                </button>
              )}
            </div>

            {/* Success or Active Indicator */}
            {lastGeneratedSource && (
              <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-emerald-100/80 border border-emerald-300 rounded-lg text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Terverifikasi:</strong> Materi, Sub-Materi, CP resmi, TP Taksonomi Bloom, dan Referensi Buku telah diselaraskan dengan <strong>{lastGeneratedSource}</strong>.
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Materi Pokok / Topik Pembelajaran <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  disabled={isGeneratingAI}
                  onClick={() => handleTriggerAIGeneration(undefined, 'materi')}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer disabled:opacity-50"
                >
                  <Wand2 className="w-3 h-3" />
                  {isGeneratingAI && activeGeneratingField === 'materi' ? 'Memuat...' : 'AI Materi'}
                </button>
              </div>
              <input
                type="text"
                required
                value={data.materiTopik}
                onChange={(e) => onChange({ materiTopik: e.target.value })}
                placeholder="Contoh: Wujud Zat dan Perubahannya"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Sub-Materi / Rincian Materi
                </label>
                <button
                  type="button"
                  disabled={isGeneratingAI}
                  onClick={() => handleTriggerAIGeneration(undefined, 'materi')}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className="w-3 h-3" />
                  {isGeneratingAI && activeGeneratingField === 'materi' ? 'Memuat...' : 'Rincikan'}
                </button>
              </div>
              <input
                type="text"
                value={data.subMateri}
                onChange={(e) => onChange({ subMateri: e.target.value })}
                placeholder="Contoh: Massa & Volume, Mencair, Membeku, Menguap, Menyublim"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Karakteristik & Profil Peserta Didik
              </label>
              <textarea
                rows={2}
                value={data.karakteristikSiswa}
                onChange={(e) => onChange({ karakteristikSiswa: e.target.value })}
                placeholder="Deskripsikan keragaman gaya belajar, kesiapan belajar awal, atau kebutuhan diferensiasi..."
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Capaian Pembelajaran (CP) Kemendikdasmen <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  disabled={isGeneratingAI}
                  onClick={() => handleTriggerAIGeneration(undefined, 'cp')}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {isGeneratingAI && activeGeneratingField === 'cp' ? 'Menyelaraskan...' : 'Ambil CP Kemendikdasmen'}
                </button>
              </div>
              <textarea
                rows={3}
                required
                value={data.capaianPembelajaran}
                onChange={(e) => onChange({ capaianPembelajaran: e.target.value })}
                placeholder="Tuliskan rumusan Capaian Pembelajaran fase bersangkutan (otomatis sesuai SK BSKAP No. 032/H/KR/2024)..."
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white leading-relaxed text-slate-800"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Tujuan Pembelajaran (TP) Taksonomi Bloom <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  disabled={isGeneratingAI}
                  onClick={() => handleTriggerAIGeneration(undefined, 'tp')}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  {isGeneratingAI && activeGeneratingField === 'tp' ? 'Merumuskan...' : 'Rumuskan TP Bloom'}
                </button>
              </div>
              <textarea
                rows={3}
                required
                value={data.tujuanPembelajaranInput}
                onChange={(e) => onChange({ tujuanPembelajaranInput: e.target.value })}
                placeholder="1. Menyebutkan...\n2. Mendemonstrasikan...\n3. Menganalisis..."
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono text-xs bg-white text-slate-800"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Referensi Buku / Sumber Materi Ajar Resmi Kemendikdasmen & Kemenag
                </label>
                <button
                  type="button"
                  disabled={isGeneratingAI}
                  onClick={() => handleTriggerAIGeneration(undefined, 'referensi')}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer disabled:opacity-50"
                >
                  <BookOpen className="w-3 h-3 text-emerald-600" />
                  {isGeneratingAI && activeGeneratingField === 'referensi' ? 'Mencari...' : 'Cari Buku Resmi'}
                </button>
              </div>
              <input
                type="text"
                value={data.referensiBuku}
                onChange={(e) => onChange({ referensiBuku: e.target.value })}
                placeholder="Contoh: Buku Panduan Guru & Buku Siswa Kemendikdasmen 2022, Modul Ajar BSKAP, Portal SIKURMA Kemenag"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Konfigurasi Asesmen & Identitas Tambahan */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-100">
            <FileQuestion className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              4. Target Evaluasi Soal & Pengesahan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Jumlah Soal Asesmen <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[25, 50, 100].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => onChange({ jumlahSoal: num })}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      data.jumlahSoal === num
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num} Soal {num === 100 && '⭐'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Mencakup kisi-kisi, kartu soal, C1-C6, kunci & pembahasan lengkap.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Kepala Madrasah / Sekolah
              </label>
              <input
                type="text"
                value={data.kepalaSekolah}
                onChange={(e) => onChange({ kepalaSekolah: e.target.value })}
                placeholder="Contoh: Ismail, S.Ag"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NIP Kepala Madrasah / Sekolah
              </label>
              <input
                type="text"
                value={data.nipKepalaSekolah}
                onChange={(e) => onChange({ nipKepalaSekolah: e.target.value })}
                placeholder="Contoh: 197405102005011010"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Format Ukuran Kertas Dokumen Word (.doc/.docx) <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ukuranKertas: 'A4' })}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all flex flex-col items-center justify-center text-center ${
                    (data.ukuranKertas || 'A4') === 'A4'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Kertas A4</span>
                  <span className="text-[10px] font-normal opacity-85">21.0 x 29.7 cm</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ukuranKertas: 'Kuarto' })}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all flex flex-col items-center justify-center text-center ${
                    data.ukuranKertas === 'Kuarto'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Kertas Kuarto</span>
                  <span className="text-[10px] font-normal opacity-85">21.59 x 27.94 cm (Letter)</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Mengatur setup halaman printer & dokumen Word otomatis ke Kuarto atau A4.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Margin Tata Letak Halaman
              </label>
              <select
                value={data.marginKertas || 'Standar (3-2.5-2.5-2.5)'}
                onChange={(e) => onChange({ marginKertas: e.target.value as any })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              >
                <option value="Standar (3-2.5-2.5-2.5)">Standar Dinas (Atas 3, Kiri 3, Bawah 2.5, Kanan 2.5 cm)</option>
                <option value="Resmi (4-4-3-3)">Resmi Arsip / Portofolio (Atas 4, Kiri 4, Bawah 3, Kanan 3 cm)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit & Next Action */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Sistem akan memvalidasi kesesuaian data pada Prototype sebelum persetujuan resmi Tahap 2.
            </span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all hover:shadow"
          >
            <span>Periksa Struktur Prototype (11 Dokumen)</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
