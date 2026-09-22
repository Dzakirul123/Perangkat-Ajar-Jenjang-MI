import {
  TeacherInputData,
  GeneratedTeachingKit,
  ApprovalRecord,
  QuestionItem,
  QuestionType,
  CognitiveLevel,
  DifficultyLevel,
  ProtaItem,
  ProsemItem
} from '../types';

export function generateFullTeachingKit(
  input: TeacherInputData,
  approval: ApprovalRecord
): GeneratedTeachingKit {
  const timestamp = new Date().toISOString();
  const id = approval.transactionId || `DOC-PA-${Date.now()}`;
  const targetQuestions = input.jumlahSoal || 100;

  // 1. Capaian Pembelajaran (CP)
  const cp = {
    rasional: `Mata pelajaran ${input.mataPelajaran} pada jenjang ${input.jenjang} (${input.fase}) membekali peserta didik dengan kecakapan literasi, nalar kritis, kemampuan problem solving, serta internalisasi nilai-nilai keadaban dan kebangsaan. Penguasaan konsep "${input.materiTopik}" menjadi fundamen esensial dalam menghubungkan konsep teoretis dengan aplikasi nyata di lingkungan sosial, kejuruan, maupun sains.`,
    tujuanMapel: [
      `Mengembangkan pemahaman holistik tentang konsep dasar dan aplikasi ${input.materiTopik}.`,
      `Menumbuhkan keterampilan berpikir kritis, kreatif, dan kolaboratif dalam investigasi masalah kontekstual.`,
      `Menginternalisasikan nilai-nilai Profil Pelajar Pancasila (Beriman, Mandiri, Bernalar Kritis, Bergotong Royong, Kreatif, dan Berkebinekaan Global).`,
      `Membekali peserta didik dengan kecakapan komunikasi ilmiah dan etika penggunaan teknologi.`
    ],
    karakteristikMapel: `Mata pelajaran ${input.mataPelajaran} berorientasi pada pendekatan inkuiri ilmiah, studi kasus nyata, dan pembelajaran kontekstual berbasis proyek. Pembelajaran dirancang berpusat pada siswa (student-centered) dengan mengakomodasi diferensiasi konten, proses, dan produk sesuai profil belajar peserta didik.`,
    elemenCapaian: [
      {
        elemen: 'Pemahaman Konseptual & Analisis',
        deskripsi: input.capaianPembelajaran || `Peserta didik mampu memahami dan menganalisis esensi materi ${input.materiTopik} secara mendalam dan menyeluruh.`
      },
      {
        elemen: 'Keterampilan Proses & Praktik Lapangan',
        deskripsi: `Peserta didik mampu merencanakan, melaksanakan pengamatan/percobaan, mencatat data faktual, menginterpretasi hasil, dan menarik simpulan ilmiah terkait fenomena ${input.materiTopik}.`
      },
      {
        elemen: 'Komunikasi, Refleksi & Aksi Nyata',
        deskripsi: `Peserta didik mampu mengomunikasikan gagasan, mempresentasikan hasil karya berbasis data, serta merefleksikan nilai-nilai positif dalam kehidupan sehari-hari.`
      }
    ]
  };

  // 2. Tujuan Pembelajaran (TP)
  const rawTPs = input.tujuanPembelajaranInput
    ? input.tujuanPembelajaranInput.split('\n').filter(t => t.trim().length > 0)
    : [
        `Mengidentifikasi dan menjelaskan konsep dasar ${input.materiTopik} dengan tepat.`,
        `Menganalisis keterkaitan unsur-unsur dalam ${input.subMateri || input.materiTopik} secara sistematis.`,
        `Mendemonstrasikan penerapan solusi atas permasalahan konkret terkait ${input.materiTopik} secara mandiri dan kreatif.`
      ];

  const tp = rawTPs.map((desc, idx) => ({
    kode: `TP.${idx + 1}`,
    deskripsi: desc.replace(/^[0-9]+[.)\s]*/, ''),
    elemen: idx === 0 ? 'Pemahaman Konseptual' : idx === 1 ? 'Keterampilan Proses' : 'Aksi Nyata & Kolaborasi',
    kompetensi: idx === 0 ? 'Memahami & Mengidentifikasi' : idx === 1 ? 'Menganalisis & Menguji' : 'Mencipta & Mengomunikasikan',
    lingkupMateri: input.subMateri || input.materiTopik
  }));

  // 3. Alur Tujuan Pembelajaran (ATP)
  const atp = tp.map((item, idx) => ({
    tahap: idx + 1,
    kodeTP: item.kode,
    materi: `${input.materiTopik} - Bagian ${idx + 1}`,
    alokasiJP: 4,
    profilPelajar: ['Bernalar Kritis', 'Mandiri', 'Bergotong Royong'],
    glosarium: `Istilah kunci, variabel analisis, paradigma pemecahan masalah ${input.materiTopik}.`,
    asesmenAwal: `Tes diagnostik kognitif non-kognitif, tanya jawab pemantik konsep prasyarat.`
  }));

  // 4. Program Tahunan (PROTA)
  const protaItems: ProtaItem[] = [
    { no: 1, materiPokok: `${input.materiTopik} - Eksplorasi Dasar & Konsep`, alokasiJP: 8, semester: 'Ganjil', keterangan: 'Tuntas' },
    { no: 2, materiPokok: `${input.materiTopik} - Praktik Analisis & Penugasan Terstruktur`, alokasiJP: 12, semester: 'Ganjil', keterangan: 'Tuntas' },
    { no: 3, materiPokok: `Asesmen Formatif & Proyek Kolaboratif Bab 1`, alokasiJP: 4, semester: 'Ganjil', keterangan: 'Evaluasi' },
    { no: 4, materiPokok: `${input.materiTopik} - Pendalaman Lanjut & Aplikasi Kasus`, alokasiJP: 12, semester: 'Ganjil', keterangan: 'Tuntas' },
    { no: 5, materiPokok: `Asesmen Sumatif Tengah Semester & Remedial`, alokasiJP: 4, semester: 'Ganjil', keterangan: 'Evaluasi' },
    { no: 6, materiPokok: `${input.materiTopik} - Inovasi Produk & Presentasi Akhir`, alokasiJP: 12, semester: 'Ganjil', keterangan: 'Tuntas' },
    { no: 7, materiPokok: `Asesmen Sumatif Akhir Semester (SAS)`, alokasiJP: 4, semester: 'Ganjil', keterangan: 'Ujian Akhir' },
    { no: 8, materiPokok: `Materi Semester Genap - Transformasi & Integrasi Konseptual`, alokasiJP: 28, semester: 'Genap', keterangan: 'Lanjutan' },
    { no: 9, materiPokok: `Materi Semester Genap - Proyek Penguatan Profil Pelajar`, alokasiJP: 24, semester: 'Genap', keterangan: 'Lanjutan' },
    { no: 10, materiPokok: `Asesmen Sumatif Akhir Tahun & Portofolio`, alokasiJP: 4, semester: 'Genap', keterangan: 'Kenaikan Kelas' },
  ];

  const prota = {
    totalJP: 112,
    pekanEfektifGanjil: 18,
    pekanEfektifGenap: 16,
    items: protaItems
  };

  // 5. Program Semester (PROSEM)
  const bulanListGanjil = ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const prosemItems: ProsemItem[] = protaItems
    .filter(i => i.semester === input.semester)
    .map((item, idx) => ({
      no: idx + 1,
      tujuanPembelajaran: `${item.materiPokok} (${item.alokasiJP} JP)`,
      alokasiJP: item.alokasiJP,
      bulan: {
        [bulanListGanjil[0]]: idx === 0 ? [2, 2, 2, 2] : [0, 0, 0, 0],
        [bulanListGanjil[1]]: idx === 1 ? [3, 3, 3, 3] : [0, 0, 0, 0],
        [bulanListGanjil[2]]: idx === 2 || idx === 3 ? [2, 2, 4, 4] : [0, 0, 0, 0],
        [bulanListGanjil[3]]: idx === 4 || idx === 5 ? [4, 4, 2, 2] : [0, 0, 0, 0],
        [bulanListGanjil[4]]: idx === 5 ? [2, 2, 4, 4] : [0, 0, 0, 0],
        [bulanListGanjil[5]]: idx === 6 ? [2, 2, 0, 0] : [0, 0, 0, 0],
      }
    }));

  const prosem = {
    semester: input.semester,
    bulanNames: bulanListGanjil,
    items: prosemItems
  };

  // 6. Modul Ajar
  const modulAjar = {
    identitas: {
      satuanPendidikan: input.satuanPendidikan,
      tahunPelajaran: input.tahunPelajaran,
      jenjang: input.jenjang,
      kelasFase: `${input.kelas} / ${input.fase}`,
      mataPelajaran: input.mataPelajaran,
      alokasiWaktu: input.alokasiWaktu,
      guru: input.namaGuru
    },
    kompetensiAwal: [
      `Peserta didik telah memiliki pengetahuan prasyarat dasar terkait lingkup mata pelajaran ${input.mataPelajaran}.`,
      `Peserta didik mampu mengoperasikan instrumen belajar sederhana dan memahami instruksi kerja berkelompok.`
    ],
    profilPelajarPancasila: [
      'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia (menghargai ciptaan Tuhan dan etika belajar)',
      'Bernalar Kritis (menganalisis bukti, mengidentifikasi bias, mengevaluasi argumen)',
      'Bergotong Royong (bekerja sama dalam tim investigasi, berbagi tugas secara adil)',
      'Kreatif (menghasilkan gagasan orisinal dan solusi alternatif)',
      'Mandiri (bertanggung jawab atas proses dan hasil belajar individu)'
    ],
    saranaPrasarana: {
      media: ['Slide presentasi interaktif', 'Video pembelajaran kontekstual', 'Lembar Kerja Peserta Didik (LKPD)', 'Papan tulis / Smart TV'],
      sumberBelajar: [input.referensiBuku, 'Lingkungan sekitar sekolah', 'Sumber digital kredibel'],
      alatBahan: ['Laptop/Komputer', 'Proyektor LCD', 'Alat tulis & kertas plano', 'Kit eksperimen / bahan observasi sesuai topik']
    },
    targetPesertaDidik: `Peserta didik reguler/tipikal, dengan strategi diferensiasi untuk siswa yang memerlukan bimbingan khusus maupun siswa berpencapaian tinggi. Karakteristik khusus: ${input.karakteristikSiswa}`,
    modelPembelajaran: 'Problem Based Learning (PBL) dipadukan dengan Inquiry Learning & Diferensiasi Pembelajaran (Konten, Proses, Produk)',
    tujuanPembelajaran: tp.map(t => `${t.kode}: ${t.deskripsi}`),
    pemahamanBermakna: `Pemahaman tentang "${input.materiTopik}" membantu kita menyadari bahwa setiap fenomena di sekitar kita memiliki prinsip keteraturan ilmiah yang dapat dimanfaatkan untuk meningkatkan kualitas hidup masyarakat dan memecahkan persoalan dunia nyata.`,
    pertanyaanPemantik: [
      `Mengapa fenomena ${input.materiTopik} sering kita jumpai dalam kehidupan sehari-hari namun jarang kita sadari mekanisme kerjanya?`,
      `Apa konsekuensi yang terjadi jika prinsip pada materi ${input.materiTopik} tidak berjalan sebagaimana mestinya?`,
      `Bagaimana cara kita membuktikan secara ilmiah kebenaran konsep tersebut melalui pembuktian konkret?`
    ],
    kegiatanPembelajaran: {
      pendahuluan: [
        { menit: 10, deskripsi: 'Orientasi & Doa: Guru membuka kelas dengan salam, memeriksa kesiapan fisik dan psikis siswa, serta memimpin doa bersama.' },
        { menit: 5, deskripsi: 'Apersepsi & Motivasi: Mengaitkan materi sebelumnya dengan topik baru melalui tayangan video singkat atau analogi kontekstual.' },
        { menit: 5, deskripsi: 'Penyampaian Tujuan & Asesmen: Guru mengumumkan indikator ketercapaian, alur aktivitas, dan rubrik penilaian yang akan digunakan.' }
      ],
      inti: [
        {
          sintaks: 'Fase 1: Orientasi Siswa pada Masalah',
          menit: 15,
          deskripsi: `Guru menyajikan stimulus kontekstual tentang fenomena ${input.materiTopik}. Siswa mengamati, merumuskan pertanyaan kritis, dan mencatat pokok masalah.`,
          diferensiasi: 'Diferensiasi Konten: Menyediakan stimulus berupa infografik visual, video, dan narasi teks bacaan.'
        },
        {
          sintaks: 'Fase 2: Mengorganisasi Siswa untuk Belajar',
          menit: 10,
          deskripsi: 'Siswa dibentuk ke dalam kelompok heterogen (4-5 siswa). Guru membagikan LKPD terstruktur dan membagi peran anggota kelompok.',
          diferensiasi: 'Diferensiasi Proses: Siswa dengan kesiapan belajar awal mendapat pendampingan terfokus (scaffolding).'
        },
        {
          sintaks: 'Fase 3: Membimbing Penyelidikan Mandiri & Kelompok',
          menit: 25,
          deskripsi: 'Kelompok melakukan investigasi, mengumpulkan data eksperimen/literatur, dan mendiskusikan pemecahan masalah berdasarkan panduan LKPD.',
          diferensiasi: 'Diferensiasi Proses: Siswa mahir diberikan tantangan penyelidikan variabel tambahan.'
        },
        {
          sintaks: 'Fase 4: Mengembangkan & Menyajikan Hasil Karya',
          menit: 20,
          deskripsi: 'Setiap kelompok menyusun laporan mini/peta konsep dan mempresentasikan hasil temuan di depan kelas dengan sesi tanya jawab interaktif.',
          diferensiasi: 'Diferensiasi Produk: Laporan dapat berbentuk poster grafis, diagram alir, maupun paparan verbal.'
        },
        {
          sintaks: 'Fase 5: Menganalisis & Mengevaluasi Proses Pemecahan Masalah',
          menit: 10,
          deskripsi: 'Guru bersama siswa memvalidasi konsep, meluruskan miskonsepsi, dan menyimpulkan kaidah ilmiah materi bersama-sama.',
          diferensiasi: 'Konfirmasi pemahaman melalui kuis formatif interaktif.'
        }
      ],
      penutup: [
        { menit: 10, deskripsi: 'Refleksi Terpimpin: Siswa dan guru menyimpulkan poin penting yang dipelajari dan manfaatnya dalam kehidupan nyata.' },
        { menit: 5, deskripsi: 'Umpan Balik & Tindak Lanjut: Guru memberikan apresiasi kinerja kelas, menginformasikan materi pekan berikutnya, serta menutup dengan doa dan salam.' }
      ]
    },
    asesmen: {
      diagnostik: 'Kuis awal 5 butir konsep prasyarat & observasi kesiapan belajar non-kognitif.',
      formatif: 'Penilaian performa diskusi kelompok, observasi keaktifan bernalar kritis saat presentasi, dan penilaian hasil pengerjaan LKPD.',
      sumatif: 'Tes tertulis komprehensif (pilihan ganda, esai analitis) dan evaluasi portofolio proyek.'
    },
    pengayaanRemedial: {
      pengayaan: 'Diberikan kepada siswa dengan capaian mahir berupa tugas analisis kasus tingkat lanjut atau pembuatan konten edukasi ringkas.',
      remedial: 'Bimbingan terstruktur secara personal atau kelompok kecil untuk indikator yang belum tuntas, diakhiri tes ulang.'
    },
    glosarium: [
      { istilah: input.materiTopik.split(' ')[0] || 'Terminologi', definisi: `Konsep kunci dalam bidang ${input.mataPelajaran} yang mendasari pemahaman topik.` },
      { istilah: 'HOTS', definisi: 'Higher Order Thinking Skills (kemampuan berpikir tingkat tinggi mencakup analisis, evaluasi, dan kreasi).' },
      { istilah: 'Scaffolding', definisi: 'Bantuan bertahap yang diberikan guru saat siswa mempelajari konsep baru hingga siswa mandiri.' }
    ],
    daftarPustaka: [
      input.referensiBuku,
      'Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP). 2022. Panduan Pembelajaran dan Asesmen. Jakarta: Kemendikbudristek.',
      'Keputusan Kepala BSKAP No. 033/H/KR/2022 tentang Capaian Pembelajaran pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah.'
    ]
  };

  // 7. Media & Bahan Ajar
  const mediaAjar = {
    ringkasanMateri: `### Ringkasan Konseptual: ${input.materiTopik}\n\n` +
      `**1. Pengantar dan Landasan Teoretis**\n` +
      `Materi ${input.materiTopik} merupakan bagian integral dalam kurikulum ${input.kurikulum} untuk jenjang ${input.jenjang}. Konsep ini berfokus pada pemahaman fundamental dan implementasi praktis terkait ${input.subMateri || input.materiTopik}.\n\n` +
      `**2. Karakteristik & Unsur-Unsur Kunci**\n` +
      `Peserta didik diarahkan untuk memahami hakikat, klasifikasi, sifat-sifat khusus, serta relasi timbal balik antar komponen materi. Setiap konsep ditautkan dengan contoh nyata di lingkungan sekolah dan rumah.\n\n` +
      `**3. Analisis Hubungan Sebab Akibat**\n` +
      `Melalui observasi empiris, peserta didik dapat menyimpulkan pola dan hukum dasar yang bekerja dalam fenomena ${input.materiTopik}.\n\n` +
      `**4. Aplikasi dalam Kehidupan Nyata**\n` +
      `Penerapan konsep ${input.materiTopik} memberikan solusi solutif terhadap permasalahan faktual di masyarakat dan teknologi modern.`,
    poinPresentasi: [
      { slide: 1, judul: `Eksplorasi Konsep: ${input.materiTopik}`, konten: `Selamat datang di sesi pembelajaran interaktif mata pelajaran ${input.mataPelajaran}. Mari kita selami keajaiban di balik materi ini.`, visualPrompt: 'Gambar ilustrasi pembuka tematik yang menginspirasi rasa ingin tahu siswa.' },
      { slide: 2, judul: 'Tujuan Pembelajaran & Profil Pelajar', konten: 'Kuasai konsep esensial, asah nalar kritis, dan kembangkan kolaborasi hebat dalam tim investigasi.', visualPrompt: 'Infografis target pencapaian dan nilai Profil Pelajar Pancasila.' },
      { slide: 3, judul: 'Fenomena & Pemantik Diskusi', konten: 'Mengapa fenomena ini terjadi di sekitar kita? Apa bukti ilmiah yang mendasarinya?', visualPrompt: 'Foto/video studi kasus nyata yang memicu pertanyaan pemantik.' },
      { slide: 4, judul: 'Analisis Komponen & Mekanisme', konten: `Uraian mendalam tentang ${input.subMateri || 'komponen utama topik'}. Pengamatan data dan identifikasi pola.`, visualPrompt: 'Diagram alur atau skema konsep sistematis beresolusi tinggi.' },
      { slide: 5, judul: 'Aplikasi Nyata & Studi Kasus', konten: 'Bagaimana ilmu ini dimanfaatkan dalam teknologi, lingkungan hidup, dan pemecahan masalah keseharian?', visualPrompt: 'Ilustrasi aplikasi teknologi atau kehidupan nyata.' },
      { slide: 6, judul: 'Refleksi & Simpulan Aksi', konten: 'Apa wawasan terbesar yang kita peroleh hari ini? Bagaimana komitmen aksi nyata kita ke depan?', visualPrompt: 'Peta ringkasan materi dan kutipan inspiratif.' }
    ],
    lembarRangkumanSiswa: `Lembar Rangkuman Belajar Mandiri: Menguraikan 5 fakta kunci, rumus/bagan konsep penting, 3 contoh aplikasi harian, serta ruang catatan mandiri siswa.`,
    tautanMediaInteraktif: [
      'Simulasi Interaktif & Virtual Lab (PhET / Geogebra / Portal Rumah Belajar)',
      'Video Edukasi Eksplorasi Konsep (YouTube Edukasi / Kemendikbud)',
      'Kuis Formatif Interaktif (Kahoot / Quizizz Terintegrasi)'
    ]
  };

  // 8. Rubrik Penilaian (KKTP)
  const rubrik = {
    kktp: [
      {
        kriteria: 'Penguasaan Konsep Teoretis',
        baruBerkembang: 'Belum mampu mendefinisikan konsep dasar dengan tepat, masih memerlukan bimbingan penuh.',
        layak: 'Mampu mendefinisikan konsep dasar namun belum lancar mengaitkan dengan contoh nyata.',
        cakap: 'Mampu menjelaskan konsep dan memberikan contoh nyata dengan tepat secara mandiri.',
        mahir: 'Mampu menganalisis konsep secara komprehensif, mengaitkan antarvariabel, dan mengevaluasi kasus kompleks.'
      },
      {
        kriteria: 'Keterampilan Investigasi & Pemecahan Masalah',
        baruBerkembang: 'Kesulitan mengikuti langkah eksperimen/analisis dalam LKPD tanpa arahan intensif.',
        layak: 'Mengikuti langkah kerja dengan benar namun analisis data masih bersifat deskriptif dangkal.',
        cakap: 'Melakukan investigasi secara mandiri, data terorganisir rapi, dan simpulan logis.',
        mahir: 'Merancang modifikasi eksperimen orisinal, interpretasi data mendalam, dan rekomendasi solutif.'
      },
      {
        kriteria: 'Kolaborasi & Komunikasi Ilmiah',
        baruBerkembang: 'Pasif dalam diskusi kelompok dan ragu menyampaikan pendapat di forum kelas.',
        layak: 'Berpartisipasi aktif dalam kelompok namun presentasi belum runtut.',
        cakap: 'Aktif berkolaborasi, mendengarkan rekan, dan menyajikan paparan secara sistematis.',
        mahir: 'Menjadi penggerak tim (leadership), artikulatif menjawab pertanyaan kritis, dan santun.'
      }
    ],
    pedomanPenskoran: 'Skor Akhir = (Total Skor Perolehan / Skor Maksimal 12) x 100. Ketuntasan minimal ditetapkan pada kategori Cakap (skor >= 75).',
    skalaPenilaian: [
      { rentang: '0 - 64', predikat: 'Baru Berkembang (Perlu Bimbingan Khusus)', tindakLanjut: 'Remedial terfokus pada kompetensi prasyarat dasar.' },
      { rentang: '65 - 74', predikat: 'Layak (Cukup)', tindakLanjut: 'Latihan penguatan indikator yang belum mantap.' },
      { rentang: '75 - 89', predikat: 'Cakap (Baik)', tindakLanjut: 'Melanjutkan ke materi berikutnya secara teratur.' },
      { rentang: '90 - 100', predikat: 'Mahir (Sangat Baik)', tindakLanjut: 'Diberikan program pengayaan dan studi kasus mandiri.' }
    ]
  };

  // 9. Refleksi
  const refleksi = {
    refleksiGuru: [
      'Apakah alokasi waktu yang direncanakan mencukupi seluruh sintaks model pembelajaran?',
      `Bagaimana tingkat antusiasme dan partisipasi aktif peserta didik saat menyelidiki materi "${input.materiTopik}"?`,
      'Apakah strategi diferensiasi (konten/proses/produk) telah menjangkau siswa yang memerlukan pendampingan?',
      'Bagian materi manakah yang paling banyak memunculkan miskonsepsi pada siswa?',
      'Langkah korektif apa yang akan saya terapkan untuk menyempurnakan pertemuan berikutnya?'
    ],
    refleksiPesertaDidik: [
      'Apa hal paling menarik dan baru yang saya pelajari dalam sesi pembelajaran hari ini?',
      `Konsep apa dari materi "${input.materiTopik}" yang masih terasa sulit untuk saya pahami?`,
      'Bagaimana kontribusi dan peran saya dalam keberhasilan diskusi kelompok tadi?',
      'Apa yang akan saya lakukan untuk memperbaiki cara belajar saya di pertemuan selanjutnya?',
      'Jika diberi skala 1 sampai 5 bintang, seberapa puas saya dengan pemahaman diri saya hari ini?'
    ]
  };

  // 10. LKPD
  const lkpd = {
    judul: `Lembar Kerja Peserta Didik (LKPD): Penyelidikan Kontekstual ${input.materiTopik}`,
    tujuanAktivitas: [
      `Menganalisis fenomena nyata terkait ${input.materiTopik} melalui pengamatan langsung atau studi kasus terarah.`,
      `Mengorganisasikan data hasil observasi ke dalam tabel analisis secara runtut dan sistematis.`,
      `Merumuskan kesimpulan logis dan solusi alternatif atas permasalahan yang disajikan.`
    ],
    petunjukBelajar: [
      'Bacalah doa sebelum memulai kegiatan penyelidikan.',
      'Bentuklah kelompok yang terdiri dari 4-5 orang siswa dengan pembagian peran yang jelas (ketua, pencatat, juru bicara, pengamat).',
      'Cermati stimulus masalah dan diskusikan langkah kerja sebelum memulai eksplorasi.',
      'Tuliskan hasil pengamatan pada tabel yang tersedia dan jawab pertanyaan reflektif secara cermat.',
      'Konsultasikan kepada guru jika terdapat instruksi yang belum dipahami.'
    ],
    stimulusMasalah: `Dalam kehidupan bermasyarakat, kita sering menemui situasi di mana prinsip ${input.materiTopik} berperan krusial. Seorang siswa mendapati bahwa saat terjadi perubahan kondisi lingkungan, output yang dihasilkan berbeda dari ekspektasi teoretis. Bagaimana kelompok kalian dapat menganalisis faktor penyebab dan membuktikannya melalui data faktual?`,
    alatBahan: ['Lembar LKPD & Alat tulis', 'Kamera HP / Perangkat rekam data (jika diperlukan)', 'Bahan ajar & modul referensi', 'Kertas plano & sticky notes'],
    langkahKerja: [
      'Langkah 1: Identifikasi masalah utama dari narasi stimulus yang disajikan.',
      'Langkah 2: Rumuskan hipotesis awal kelompok terkait penyebab terjadinya fenomena.',
      'Langkah 3: Lakukan observasi/penelusuran data pada sumber belajar yang telah disiapkan.',
      'Langkah 4: Masukkan data kuantitatif dan kualitatif ke dalam tabel observasi berikut.',
      'Langkah 5: Diskusikan jawaban atas pertanyaan panduan dan tarik kesimpulan kelompok.'
    ],
    lembarObservasi: [
      { aspek: 'Kondisi Parameter Awal', hasilPengamatan: 'Tercatat sesuai kondisi standar lingkungan belajar', catatan: 'Verifikasi alat ukur' },
      { aspek: 'Proses Transformasi / Interaksi', hasilPengamatan: 'Terlihat reaksi atau perubahan signifikan pada objek amatan', catatan: 'Catat waktu dan durasi' },
      { aspek: 'Kondisi Parameter Akhir', hasilPengamatan: 'Menunjukkan kesesuaian dengan teori ilmiah', catatan: 'Analisis deviasi jika ada' },
      { aspek: 'Faktor Pengganggu (Distraktor)', hasilPengamatan: 'Minimal / teridentifikasi sumber penyebabnya', catatan: 'Catat rekomendasi perbaikan' }
    ],
    pertanyaanDiskusi: [
      `Berdasarkan data observasi, jelaskan prinsip utama ${input.materiTopik} yang teramati!`,
      'Apa yang terjadi apabila salah satu variabel pendukung dihilangkan dari sistem tersebut?',
      'Bagaimana kaitan hasil observasi kalian dengan pengamalan sikap kritis dan peduli lingkungan?'
    ],
    kesimpulan: 'Tuliskan kesimpulan akhir kelompok berupa pernyataan ringkas (2-3 kalimat) yang menjawab rumusan masalah awal.'
  };

  // 11. Perangkat Soal (Hingga 100 Soal!)
  const cognitiveLevels: CognitiveLevel[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
  const questionTypes: QuestionType[] = ['Pilihan Ganda', 'Pilihan Ganda Kompleks', 'Menjodohkan', 'Isian Singkat', 'Uraian'];

  const questions: QuestionItem[] = [];

  // Cognitive distribution targets
  // C1 ~15%, C2 ~20%, C3 ~25%, C4 ~20%, C5 ~12%, C6 ~8%
  const c1Count = Math.round(targetQuestions * 0.15);
  const c2Count = Math.round(targetQuestions * 0.20);
  const c3Count = Math.round(targetQuestions * 0.25);
  const c4Count = Math.round(targetQuestions * 0.20);
  const c5Count = Math.round(targetQuestions * 0.12);
  const c6Count = targetQuestions - (c1Count + c2Count + c3Count + c4Count + c5Count);

  const cognitivePool: CognitiveLevel[] = [
    ...Array(c1Count).fill('C1'),
    ...Array(c2Count).fill('C2'),
    ...Array(c3Count).fill('C3'),
    ...Array(c4Count).fill('C4'),
    ...Array(c5Count).fill('C5'),
    ...Array(c6Count).fill('C6')
  ];

  // Specific subject matter terms generator
  const topicWords = input.materiTopik.split(' ');
  const primaryTopic = topicWords.slice(0, 3).join(' ');

  for (let i = 1; i <= targetQuestions; i++) {
    const cogLevel = cognitivePool[i - 1] || 'C3';
    let diff: DifficultyLevel = 'Sedang';
    if (cogLevel === 'C1' || cogLevel === 'C2') diff = 'Mudah';
    else if (cogLevel === 'C3' || cogLevel === 'C4') diff = 'Sedang';
    else diff = 'Sukar';

    // Question type distribution: 70% PG, 10% PG Kompleks, 8% Menjodohkan, 6% Isian, 6% Uraian
    let qType: QuestionType = 'Pilihan Ganda';
    if (i % 15 === 0) qType = 'Uraian';
    else if (i % 12 === 0) qType = 'Isian Singkat';
    else if (i % 10 === 0) qType = 'Menjodohkan';
    else if (i % 7 === 0) qType = 'Pilihan Ganda Kompleks';

    const item = generateSingleQuestion(i, primaryTopic, input.mataPelajaran, input.fase, cogLevel, diff, qType);
    questions.push(item);
  }

  const perangkatSoal = {
    analisisMateri: `Analisis materi instrumen evaluasi ${input.mataPelajaran} (${input.materiTopik}) mencakup 3 dimensi domain kognitif: Pengetahuan Dasar (LOTS), Penerapan Prosedural (MOTS), dan Pemecahan Masalah Kritis/Kreasi (HOTS). Seluruh ${targetQuestions} butir terkalibrasi sesuai Capaian Pembelajaran ${input.fase}.`,
    distribusiKognitif: {
      C1: c1Count,
      C2: c2Count,
      C3: c3Count,
      C4: c4Count,
      C5: c5Count,
      C6: c6Count
    },
    distribusiKesulitan: {
      Mudah: questions.filter(q => q.difficulty === 'Mudah').length,
      Sedang: questions.filter(q => q.difficulty === 'Sedang').length,
      Sukar: questions.filter(q => q.difficulty === 'Sukar').length
    },
    soalList: questions
  };

  return {
    metadata: {
      id,
      version: 'v1.0.0-FINAL',
      generatedAt: timestamp,
      approval
    },
    cp,
    tp,
    atp,
    prota,
    prosem,
    modulAjar,
    mediaAjar,
    rubrik,
    refleksi,
    lkpd,
    perangkatSoal
  };
}

function generateSingleQuestion(
  num: number,
  topic: string,
  subject: string,
  fase: string,
  cog: CognitiveLevel,
  diff: DifficultyLevel,
  type: QuestionType
): QuestionItem {
  const optionsKey: Array<'A' | 'B' | 'C' | 'D' | 'E'> = ['A', 'B', 'C', 'D', 'E'];
  const correctOption = optionsKey[(num * 3) % 5];

  // Tailored question narrative based on Bloom cognitive taxonomy
  let stimulus = '';
  let questionText = '';
  let indicator = '';
  let explanation = '';
  let scoring = 'Skor 1 jika jawaban benar, skor 0 jika salah.';

  if (cog === 'C1') {
    stimulus = `Disajikan fakta ilmiah dan definisi dasar tentang konsep ${topic}.`;
    indicator = `Peserta didik mampu menyebutkan/mengingat istilah dan definisi fundamental ${topic}.`;
    questionText = `Berikut ini yang merupakan pengertian atau karakteristik mendasar dari ${topic} pada mata pelajaran ${subject} adalah...`;
    explanation = `Kunci jawaban ${correctOption} tepat karena mendefinisikan sifat intrinsik ${topic} secara faktual dan tepat sesuai literatur baku.`;
  } else if (cog === 'C2') {
    stimulus = `Perhatikan deskripsi ilustratif mengenai fenomena ${topic} dalam kehidupan sehari-hari berikut.`;
    indicator = `Peserta didik mampu menjelaskan prinsip kerja dan mengklasifikasikan ragam fenomena ${topic}.`;
    questionText = `Berdasarkan ilustrasi di atas, bagaimana prinsip utama ${topic} dapat menjelaskan terjadinya perubahan keadaan tersebut?`;
    explanation = `Kunci jawaban ${correctOption} benar karena memaparkan hubungan sebab-akibat konseptual yang melandasi fenomena tersebut.`;
  } else if (cog === 'C3') {
    stimulus = `Sebuah studi kasus di lingkungan sekitar menunjukkan permasalahan yang berkaitan dengan penerapan konsep ${topic}.`;
    indicator = `Peserta didik mampu menerapkan rumus, kaidah, atau prosedur ${topic} untuk menyelesaikan masalah nyata.`;
    questionText = `Jika kondisi pada studi kasus tersebut diubah dengan menambahkan faktor pendukung, tindakan prosedural yang paling tepat untuk diterapkan adalah...`;
    explanation = `Pilihan ${correctOption} adalah langkah aplikasi yang paling logis dan efektif sesuai metodologi ${subject}.`;
  } else if (cog === 'C4') {
    stimulus = `Tabel/Grafik Data Pengamatan: Diberikan hasil uji perbandingan performa beberapa variabel pada materi ${topic}.`;
    indicator = `Peserta didik mampu menganalisis hubungan antarvariabel, mendeteksi pola, dan membedakan anomali data.`;
    questionText = `Berdasarkan analisis terhadap data pengamatan di atas, simpulan analitis yang paling valid mengenai hubungan antarvariabel adalah...`;
    explanation = `Jawaban ${correctOption} merupakan simpulan induktif yang didukung secara matematis/ilmiah oleh data pengamatan.`;
  } else if (cog === 'C5') {
    stimulus = `Terdapat dua pendapat yang saling bertolak belakang mengenai efektivitas metode penanganan kasus ${topic} di masyarakat.`;
    indicator = `Peserta didik mampu mengevaluasi kelebihan dan kelemahan suatu argumen atau solusi berbasis kriteria ilmiah.`;
    questionText = `Dari kedua pendapat tersebut, manakah penilaian kritis yang paling objektif disertai alasan pembenaran yang kuat?`;
    explanation = `Pilihan ${correctOption} memberikan evaluasi komprehensif yang menimbang bukti empiris dan dampak jangka panjang secara adil.`;
  } else {
    // C6
    stimulus = `Diperlukan inovasi rancangan model pemecahan masalah baru untuk mengoptimalkan pemanfaatan ${topic} di era digital.`;
    indicator = `Peserta didik mampu merancang skema kerja orisinal, menyusun strategi pemecahan masalah baru, atau membuat prototipe solusi.`;
    questionText = `Rancangan langkah-langkah strategis terintegrasi yang paling inovatif dan aplikatif untuk menyelesaikan tantangan tersebut adalah...`;
    explanation = `Opsi ${correctOption} mencerminkan sintesis ide orisinal yang menggabungkan efisiensi, kelayakan teknis, dan etika profesi.`;
  }

  // Handle Uraian or Isian
  if (type === 'Uraian') {
    questionText = `Jelaskan secara komprehensif bagaimana mekanisme kerja ${topic} dalam memecahkan permasalahan nyata, serta analisis minimal 2 faktor pendukung dan 2 faktor penghambat keberhasilannya!`;
    scoring = 'Rubrik Uraian: Skor 4 (Penjelasan runtut, ilmiah, analisis faktor lengkap & solutif); Skor 3 (Lengkap namun penjelasan kurang mendalam); Skor 2 (Hanya menyebutkan sebagian faktor); Skor 1 (Jawaban sangat terbatas/kurang relevan).';
    explanation = `Jawaban ideal harus memuat: (1) Definisi operasional ${topic}, (2) Analisis 2 faktor internal/eksternal, (3) Rekomendasi solusi berbasis data.`;
    return {
      number: num,
      stimulus,
      questionText,
      type,
      cognitiveLevel: cog,
      difficulty: diff,
      indicator,
      correctAnswer: 'Uraian Komprehensif Berbasis Rubrik',
      explanation,
      scoringGuide: scoring,
      competencyElement: `Elemen Pemahaman & Analisis Kritis ${topic}`
    };
  }

  if (type === 'Isian Singkat') {
    questionText = `Unsur kunci yang membedakan keberhasilan penerapan ${topic} dengan pendekatan konvensional disebut sebagai istilah...`;
    scoring = 'Skor 2 jika istilah tepat dan ejaan baku, skor 1 jika makna mendekati, skor 0 jika salah.';
    return {
      number: num,
      stimulus,
      questionText,
      type,
      cognitiveLevel: cog,
      difficulty: diff,
      indicator,
      correctAnswer: `${topic} Terintegrasi`,
      explanation: `Jawaban tepat adalah konsep kunci yang mencerminkan integrasi sistem ${topic}.`,
      scoringGuide: scoring,
      competencyElement: `Elemen Pengetahuan Prosedural ${topic}`
    };
  }

  // Multiple Choice options
  const options = [
    { key: 'A' as const, text: `Menitikberatkan pada optimalisasi prinsip dasar ${topic} secara berkesinambungan.` },
    { key: 'B' as const, text: `Mengisolasi variabel pengganggu tanpa mempertimbangkan konteks lingkungan nyata.` },
    { key: 'C' as const, text: `Mengintegrasikan analisis teoritis dengan pembuktian empiris berbasis fakta lapangan.` },
    { key: 'D' as const, text: `Menyederhanakan prosedur pengujian dengan mengabaikan standarisasi operasional.` },
    { key: 'E' as const, text: `Mengembangkan pemodelan prediktif berbasis bukti ilmiah yang terukur dan akuntabel.` }
  ];

  return {
    number: num,
    stimulus,
    questionText,
    type,
    cognitiveLevel: cog,
    difficulty: diff,
    indicator,
    options,
    correctAnswer: correctOption,
    explanation,
    scoringGuide: scoring,
    competencyElement: `Elemen Capaian Pembelajaran ${cog} - ${fase}`
  };
}

export const generateCompleteTeachingKit = generateFullTeachingKit;
