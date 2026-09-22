import {
  getAuthoritativeCurriculum,
  getAvailableCurriculumChapters,
  KurikulumElementSet
} from '../data/kemendikdasmenDatabase';
import { TeacherInputData } from '../types';

export interface CurriculumGenerationResult {
  status: 'success' | 'partial' | 'error';
  source: 'gemini_kemendikdasmen_ai' | 'kemendikdasmen_official_database' | 'default_fallback';
  message: string;
  data: KurikulumElementSet;
}

export async function generateCurriculumWithAI(
  formData: Partial<TeacherInputData>,
  customTopicHint?: string
): Promise<CurriculumGenerationResult> {
  const payload = {
    mataPelajaran: formData.mataPelajaran || 'Matematika',
    jenjang: formData.jenjang || 'SD/MI',
    fase: formData.fase || 'Fase B',
    kelas: formData.kelas || 'Kelas 4',
    satuanPendidikan: formData.satuanPendidikan || 'MI Negeri 1 Paser',
    kurikulum: formData.kurikulum || 'Kurikulum Merdeka',
    semester: formData.semester || 'Ganjil',
    topikSpesifik: customTopicHint || formData.materiTopik || ''
  };

  try {
    const response = await fetch('/api/ai/generate-curriculum-elements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      if (result.data) {
        return {
          status: 'success',
          source: result.source || 'gemini_kemendikdasmen_ai',
          message:
            result.message ||
            'Berhasil digenerate secara otomatis dengan AI Kemendikdasmen & Kemenag!',
          data: result.data
        };
      }
    }
  } catch (err) {
    console.warn('Network request to /api/ai/generate-curriculum-elements failed, using authoritative database:', err);
  }

  // Client-side authoritative fallback
  const fallback = getAuthoritativeCurriculum(
    payload.mataPelajaran,
    payload.fase,
    payload.topikSpesifik
  );

  if (fallback) {
    return {
      status: 'success',
      source: 'kemendikdasmen_official_database',
      message: 'Berhasil memuat rumusan resmi BSKAP Kemendikdasmen & KMA Kemenag RI.',
      data: fallback
    };
  }

  // Generative default
  return {
    status: 'partial',
    source: 'default_fallback',
    message: 'Data kurikulum dirumuskan menggunakan kerangka standar.',
    data: {
      materiTopik: payload.topikSpesifik || `Konsep Esensial ${payload.mataPelajaran}`,
      subMateri: `Pemahaman Konseptual, Penyelidikan Ilmiah Terbimbing, Penerapan Nyata ${payload.mataPelajaran}`,
      capaianPembelajaran: `Pada akhir ${payload.fase}, peserta didik menguasai konsep dan kompetensi esensial ${payload.mataPelajaran} pada jenjang ${payload.kelas} ${payload.satuanPendidikan} sesuai standar Kemendikdasmen.`,
      tujuanPembelajaranInput: `1. Memahami prinsip utama materi ${payload.mataPelajaran} dengan cermat.\n2. Menganalisis contoh kontekstual dalam lingkungan sekitar.\n3. Memecahkan persoalan terstruktur secara mandiri dan bertanggung jawab.`,
      referensiBuku: `Buku Siswa & Guru ${payload.mataPelajaran} ${payload.kelas} Kemendikdasmen/Kemenag RI; Modul BSKAP 2024.`,
      karakteristikSiswa: `Peserta didik ${payload.kelas} memiliki antusiasme eksplorasi yang tinggi dan membutuhkan pengalaman belajar bermakna.`,
      alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
      dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024'
    }
  };
}

export async function fetchCurriculumChapters(
  subject: string,
  fase: string
): Promise<KurikulumElementSet[]> {
  try {
    const res = await fetch(`/api/curriculum/chapters?subject=${encodeURIComponent(subject)}&fase=${encodeURIComponent(fase)}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.chapters) && data.chapters.length > 0) {
        return data.chapters;
      }
    }
  } catch (e) {
    console.warn('Could not fetch chapters from API, reading local database:', e);
  }

  return getAvailableCurriculumChapters(subject, fase);
}
