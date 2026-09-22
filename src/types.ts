export type EducationalLevel = 'SD/MI' | 'SMP/MTs' | 'SMA/MA' | 'SMK';

export type CurriculumType = 'Kurikulum Merdeka' | 'Kurikulum 2013';

export type SemesterType = 'Ganjil' | 'Genap';

export type CognitiveLevel = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';

export type QuestionType = 'Pilihan Ganda' | 'Pilihan Ganda Kompleks' | 'Menjodohkan' | 'Isian Singkat' | 'Uraian';

export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Sukar';

export interface TeacherInputData {
  namaGuru: string;
  nipNuptk: string;
  satuanPendidikan: string;
  npsn: string;
  jenjang: EducationalLevel;
  fase: string; // e.g. "Fase B (Kelas 3-4)"
  kelas: string; // e.g. "Kelas 4"
  mataPelajaran: string;
  tahunPelajaran: string; // e.g. "2024/2025"
  kurikulum: CurriculumType;
  semester: SemesterType;
  materiTopik: string;
  subMateri: string;
  alokasiWaktu: string; // e.g. "4 Pertemuan (8 JP x 35 Menit)"
  karakteristikSiswa: string;
  capaianPembelajaran: string;
  tujuanPembelajaranInput: string;
  referensiBuku: string;
  // Identitas Tambahan
  kepalaSekolah: string;
  nipKepalaSekolah: string;
  kotaKabupaten: string;
  tanggalPengesahan: string;
  jumlahSoal: number; // e.g. 25, 50, 100
  ukuranKertas?: 'A4' | 'Kuarto'; // A4 (210 x 297 mm) atau Kuarto / Letter (215.9 x 279.4 mm)
  marginKertas?: 'Standar (3-2.5-2.5-2.5)' | 'Resmi (4-4-3-3)';
}

export interface QCValidationItem {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'warning' | 'failed';
  score: number; // 0-100
  feedback: string;
  details?: string[];
}

export interface QCValidationReport {
  overallScore: number;
  status: 'PROTOTYPE SIAP DIPERIKSA' | 'PERLU REVISI';
  validatedAt: string;
  items: QCValidationItem[];
  cognitiveDistribution: {
    c1: number;
    c2: number;
    c3: number;
    c4: number;
    c5: number;
    c6: number;
  };
  difficultyDistribution: {
    mudah: number;
    sedang: number;
    sukar: number;
  };
}

export interface ApprovalRecord {
  transactionId: string;
  approverName: string;
  approverRole: string;
  approvedAt: string;
  prototypeVersion: string;
  notes: string;
  agreed: boolean;
  status: 'DISETUJUI — PROSES EKSEKUSI DIMULAI';
  dataSnapshot: TeacherInputData;
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface QuestionItem {
  number: number;
  stimulus?: string;
  questionText: string;
  type: QuestionType;
  cognitiveLevel: CognitiveLevel;
  difficulty: DifficultyLevel;
  indicator: string;
  options?: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  scoringGuide: string;
  competencyElement: string;
}

export interface ProtaItem {
  no: number;
  materiPokok: string;
  alokasiJP: number;
  semester: SemesterType;
  keterangan: string;
}

export interface ProsemItem {
  no: number;
  tujuanPembelajaran: string;
  alokasiJP: number;
  bulan: {
    [key: string]: number[]; // e.g., 'Juli': [2, 2, 0, 0]
  };
}

export interface GeneratedTeachingKit {
  metadata: {
    id: string;
    version: string;
    generatedAt: string;
    approval: ApprovalRecord;
  };
  cp: {
    rasional: string;
    tujuanMapel: string[];
    karakteristikMapel: string;
    elemenCapaian: Array<{ elemen: string; deskripsi: string }>;
  };
  tp: Array<{
    kode: string;
    deskripsi: string;
    elemen: string;
    kompetensi: string;
    lingkupMateri: string;
  }>;
  atp: Array<{
    tahap: number;
    kodeTP: string;
    materi: string;
    alokasiJP: number;
    profilPelajar: string[];
    glosarium: string;
    asesmenAwal: string;
  }>;
  prota: {
    totalJP: number;
    pekanEfektifGanjil: number;
    pekanEfektifGenap: number;
    items: ProtaItem[];
  };
  prosem: {
    semester: SemesterType;
    bulanNames: string[];
    items: ProsemItem[];
  };
  modulAjar: {
    identitas: {
      satuanPendidikan: string;
      tahunPelajaran: string;
      jenjang: string;
      kelasFase: string;
      mataPelajaran: string;
      alokasiWaktu: string;
      guru: string;
    };
    kompetensiAwal: string[];
    profilPelajarPancasila: string[];
    saranaPrasarana: {
      media: string[];
      sumberBelajar: string[];
      alatBahan: string[];
    };
    targetPesertaDidik: string;
    modelPembelajaran: string;
    tujuanPembelajaran: string[];
    pemahamanBermakna: string;
    pertanyaanPemantik: string[];
    kegiatanPembelajaran: {
      pendahuluan: Array<{ menit: number; deskripsi: string }>;
      inti: Array<{ sintaks: string; menit: number; deskripsi: string; diferensiasi: string }>;
      penutup: Array<{ menit: number; deskripsi: string }>;
    };
    asesmen: {
      diagnostik: string;
      formatif: string;
      sumatif: string;
    };
    pengayaanRemedial: {
      pengayaan: string;
      remedial: string;
    };
    glosarium: Array<{ istilah: string; definisi: string }>;
    daftarPustaka: string[];
  };
  mediaAjar: {
    ringkasanMateri: string;
    poinPresentasi: Array<{ slide: number; judul: string; konten: string; visualPrompt: string }>;
    lembarRangkumanSiswa: string;
    tautanMediaInteraktif: string[];
  };
  rubrik: {
    kktp: Array<{ kriteria: string; baruBerkembang: string; layak: string; cakap: string; mahir: string }>;
    pedomanPenskoran: string;
    skalaPenilaian: Array<{ rentang: string; predikat: string; tindakLanjut: string }>;
  };
  refleksi: {
    refleksiGuru: string[];
    refleksiPesertaDidik: string[];
  };
  lkpd: {
    judul: string;
    tujuanAktivitas: string[];
    petunjukBelajar: string[];
    stimulusMasalah: string;
    alatBahan: string[];
    langkahKerja: string[];
    lembarObservasi: Array<{ aspek: string; hasilPengamatan: string; catatan: string }>;
    pertanyaanDiskusi: string[];
    kesimpulan: string;
  };
  perangkatSoal: {
    analisisMateri: string;
    distribusiKognitif: { [key in CognitiveLevel]: number };
    distribusiKesulitan: { [key in DifficultyLevel]: number };
    soalList: QuestionItem[];
  };
}

export interface VersionHistoryItem {
  id: string;
  version: string;
  createdAt: string;
  approval: ApprovalRecord;
  data: GeneratedTeachingKit;
}
