export const PILIHAN_MATA_PELAJARAN = [
  'Matematika',
  'IPAS',
  'Bahasa Indonesia',
  'Pendidikan Pancasila',
  'Akidah Akhlak',
  'Fiqih',
  "Qur'an Hadits",
  'SKI',
  'Bahasa Arab',
  'PJOK',
] as const;

export type MataPelajaranType = (typeof PILIHAN_MATA_PELAJARAN)[number];

export const PILIHAN_TAHUN_PELAJARAN = [
  '2026/2027',
  '2027/2028',
  '2028/2029',
  '2029/2030',
] as const;

export type TahunPelajaranType = (typeof PILIHAN_TAHUN_PELAJARAN)[number];
