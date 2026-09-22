export interface KurikulumElementSet {
  materiTopik: string;
  subMateri: string;
  capaianPembelajaran: string;
  tujuanPembelajaranInput: string;
  referensiBuku: string;
  karakteristikSiswa?: string;
  alokasiWaktu?: string;
  dasarHukumCP: string;
}

export interface SubjectCurriculumData {
  [faseOrKelas: string]: KurikulumElementSet[];
}

export const KEMENDIKDASMEN_CP_DATABASE: Record<string, SubjectCurriculumData> = {
  Matematika: {
    'Fase A': [
      {
        materiTopik: 'Bilangan Cacah sampai 100 dan Nilai Tempat',
        subMateri: 'Membilang Banyak Benda, Membaca dan Menulis Lambang Bilangan, Nilai Tempat Puluhan dan Satuan, Penjumlahan dan Pengurangan Bersusun Sederhana',
        capaianPembelajaran: 'Pada akhir Fase A, peserta didik dapat membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan bilangan cacah sampai 100. Peserta didik dapat melakukan operasi penjumlahan dan pengurangan menggunakan benda-benda konkret dan gambar representatif sesuai standar BSKAP Kemendikdasmen No. 032/H/KR/2024.',
        tujuanPembelajaranInput: '1. Membaca dan menuliskan lambang bilangan cacah sampai 100 dengan tepat berdasarkan representasi benda konkret.\n2. Menguraikan nilai tempat puluhan dan satuan pada bilangan dua angka secara mandiri.\n3. Menyelesaikan operasi hitung penjumlahan dan pengurangan dalam konteks kehidupan sehari-hari di madrasah/sekolah.',
        referensiBuku: 'Buku Panduan Guru & Buku Siswa Matematika Kelas I & II Kemendikdasmen/Kemendikbudristek 2022; Alat Peraga Blok Dienes; Modul Numerasi Awal BSKAP.',
        karakteristikSiswa: 'Peserta didik Fase A berada pada tahap operasional konkret, membutuhkan manipulasi media fisik (batu kerikil, lidi, kartu bilangan) serta aktivitas bermain terstruktur.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Bilangan Fase A)'
      },
      {
        materiTopik: 'Pengukuran Panjang dan Berat dengan Satuan Tidak Baku & Baku',
        subMateri: 'Membandingkan Panjang Benda (Jengkal, Langkah, Depa), Pengenalan Penggaris Sederhana (cm), Membandingkan Berat Ringan Benda',
        capaianPembelajaran: 'Pada akhir Fase A, peserta didik dapat membandingkan panjang dan berat benda secara langsung, dan membandingkan tinggi serta estimasi ukuran menggunakan satuan tidak baku dan satuan baku sederhana.',
        tujuanPembelajaranInput: '1. Membandingkan dan mengurutkan panjang benda di lingkungan sekitar menggunakan satuan ukuran tidak baku secara teliti.\n2. Mengukur panjang benda menggunakan mistar/penggaris sentimeter secara tepat.\n3. Mengidentifikasi benda yang lebih berat atau lebih ringan menggunakan timbangan sederhana.',
        referensiBuku: 'Buku Siswa Matematika Kelas I Kemendikdasmen 2022; Pita Ukur; Neraca Sederhana BSKAP.',
        alokasiWaktu: '3 Pertemuan (6 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Pengukuran Fase A)'
      }
    ],
    'Fase B': [
      {
        materiTopik: 'Pecahan Senilai dan Operasi Hitung Bilangan Desimal Sederhana',
        subMateri: 'Pecahan Biasa dan Pecahan Campuran, Pecahan Senilai melalui Gambar dan Garis Bilangan, Pecahan Desimal Persepuluhan dan Perseratusan, Persen',
        capaianPembelajaran: 'Pada akhir Fase B, peserta didik dapat mengenali pecahan senilai menggunakan gambar dan simbol matematika, membandingkan dan mengurutkan antarpecahan, serta mengubah pecahan biasa ke bentuk desimal dan persen dalam pemecahan masalah konkret.',
        tujuanPembelajaranInput: '1. Menjelaskan konsep pecahan senilai dengan representasi visual konkret dan garis bilangan secara runtut.\n2. Mengubah bentuk pecahan biasa menjadi desimal dan persen serta melakukan perbandingan antarpecahan dengan tepat.\n3. Menyelesaikan soal cerita kontekstual yang melibatkan pecahan dalam kehidupan sehari-hari.',
        referensiBuku: 'Buku Siswa Matematika Kelas IV Kemendikdasmen/Kemendikbudristek 2022; Modul Numerasi Terapan BSKAP; Alat Peraga Pecahan Transparan.',
        karakteristikSiswa: 'Peserta didik Fase B aktif dan memiliki rasa ingin tahu tinggi, mampu berpikir logis awal dengan visualisasi diagramatis dan diskusi kelompok terbimbing.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Bilangan Fase B)'
      },
      {
        materiTopik: 'Keliling dan Luas Bangun Datar (Persegi, Persegi Panjang, Segitiga)',
        subMateri: 'Konsep Keliling Bangun Datar, Menemukan Luas dengan Persegi Satuan, Rumus Luas Persegi & Persegi Panjang, Penyelesaian Masalah Luas Kebun/Lantai',
        capaianPembelajaran: 'Pada akhir Fase B, peserta didik dapat mengukur panjang dan keliling berbagai bangun datar menggunakan satuan baku (cm, m), serta menentukan dan menaksir luas bangun datar menggunakan petak persegi dan rumus baku.',
        tujuanPembelajaranInput: '1. Menghitung keliling persegi, persegi panjang, dan segitiga menggunakan satuan baku panjang secara cermat.\n2. Menemukan formula luas bangun datar melalui eksplorasi petak satuan persegi.\n3. Menerapkan perhitungan luas dan keliling untuk menyelesaikan masalah penataan ruang nyata.',
        referensiBuku: 'Buku Siswa Matematika Kelas IV Kemendikdasmen 2022; Papan Berpaku (Geoboard); Kertas Berpetak BSKAP.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Pengukuran & Geometri Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Operasi Hitung Pecahan dan Perbandingan Skala',
        subMateri: 'Penjumlahan dan Pengurangan Pecahan Berbeda Penyebut, Perkalian dan Pembagian Pecahan, Perbandingan Senilai dan Konsep Skala pada Peta',
        capaianPembelajaran: 'Pada akhir Fase C, peserta didik dapat melakukan operasi hitung penjumlahan, pengurangan, perkalian, dan pembagian pecahan dengan berbagai penyebut, serta menggunakan rasio dan proporsi untuk menentukan skala pada peta dan denah.',
        tujuanPembelajaranInput: '1. Menganalisis prosedur penjumlahan dan pengurangan pecahan berpenyebut berbeda melalui penyamaan KPK secara presisi.\n2. Melakukan operasi perkalian dan pembagian pecahan dalam penyelesaian masalah kontekstual.\n3. Menghitung jarak sebenarnya dan jarak pada denah menggunakan konsep rasio dan skala peta.',
        referensiBuku: 'Buku Teks Matematika Kelas V Kemendikdasmen/Kemendikbudristek 2022; Atlas Nusantara; Modul Pembelajaran Matematika Kontekstual BSKAP.',
        karakteristikSiswa: 'Peserta didik Fase C mampu berpikir analitis dan abstrak, antusias menghubungkan matematika dengan geografi, sains, dan sains data sederhana.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Bilangan & Pengukuran Fase C)'
      }
    ]
  },

  IPAS: {
    'Fase A': [
      {
        materiTopik: 'Aku dan Lingkungan Sekitarku (Bagian Tubuh dan Panca Indra)',
        subMateri: 'Mengenal Panca Indra dan Fungsinya, Cara Menjaga Kebersihan Tubuh, Mengenal Benda Hidup dan Tak Hidup di Sekitar',
        capaianPembelajaran: 'Pada akhir Fase A, peserta didik mengamati dan mengidentifikasi bagian-bagian tubuh manusia dan fungsinya, merawat kebersihan tubuh, serta membedakan benda hidup dan tak hidup di lingkungan sekitar.',
        tujuanPembelajaranInput: '1. Menyebutkan fungsi panca indra manusia dalam mengenali lingkungan sekitar dengan benar.\n2. Mempraktikkan cara merawat kebersihan diri dan organ tubuh secara mandiri.\n3. Mengelompokkan benda hidup dan benda mati di halaman sekolah/madrasah.',
        referensiBuku: 'Buku Siswa IPAS Dasar Fase A Kemendikdasmen 2022; Poster Panca Indra Anak; Panduan PHBS Madrasah.',
        alokasiWaktu: '3 Pertemuan (6 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Pemahaman IPAS Fase A)'
      }
    ],
    'Fase B': [
      {
        materiTopik: 'Wujud Zat dan Perubahannya di Lingkungan Sekitar',
        subMateri: 'Karakteristik Materi Padat, Cair, dan Gas; Eksperimen Perubahan Wujud Mencair, Membeku, Menguap, Mengembun, dan Menyublim; Pengaruh Kalor',
        capaianPembelajaran: 'Pada akhir Fase B, peserta didik mengidentifikasi wujud zat (padat, cair, gas), mendeskripsikan karakteristik perubahannya, serta menganalisis pengaruh kalor terhadap perubahan wujud zat dalam kehidupan sehari-hari dan pemanfaatannya di lingkungan lokal.',
        tujuanPembelajaranInput: '1. Mengidentifikasi sifat dan karakteristik materi padat, cair, dan gas melalui pengamatan eksperimen konkret.\n2. Mendemonstrasikan proses perubahan wujud zat akibat penyerapan dan pelepasan kalor secara runtut dan aman.\n3. Menghubungkan peristiwa perubahan wujud zat dengan siklus air alami dan kearifan teknologi pengolahan pangan lokal.',
        referensiBuku: 'Buku Panduan Guru & Siswa IPAS Kelas IV Kemendikdasmen 2022; Kit Percobaan Sains SD/MI BSKAP; Ensiklopedia IPA Tematik Nusantara.',
        karakteristikSiswa: 'Peserta didik senang mencoba eksperimen langsung (hands-on experiment), aktif mencatat data pengamatan dan berdiskusi secara interaktif.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Pemahaman IPAS Fase B)'
      },
      {
        materiTopik: 'Gaya dan Pengaruhnya terhadap Gerak dan Bentuk Benda',
        subMateri: 'Gaya Otot, Gaya Gesek, Gaya Magnet, Gaya Gravitasi, Pengaruh Gaya terhadap Benda Diam/Bergerak, Pemanfaatan Gaya Magnet',
        capaianPembelajaran: 'Peserta didik memanfaatkan ragam jenis gaya (otot, pegas, magnet, gravitasi, dan gesek) untuk menyelesaikan tantangan gerak benda dan menjelaskan prinsip kerjanya dalam teknologi sederhana.',
        tujuanPembelajaranInput: '1. Mengidentifikasi ragam gaya (otot, gesek, magnet, gravitasi) melalui percobaan sains sederhana.\n2. Menganalisis pengaruh gaya terhadap perubahan arah, kecepatan, dan bentuk benda.\n3. Merancang alat sederhana yang memanfaatkan gaya magnet atau pegas.',
        referensiBuku: 'Buku Siswa IPAS Kelas IV Kemendikdasmen 2022; Kit Magnet & Dinamometer; Modul Pembelajaran Berbasis Inkuiri.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Pemahaman IPAS Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Harmoni Ekosistem dan Keseimbangan Jaring-Jaring Makanan',
        subMateri: 'Komponen Biotik dan Abiotik, Rantai Makanan & Jaring-Jaring Makanan, Aliran Energi dan Piramida Makanan, Konservasi Keanekaragaman Hayati',
        capaianPembelajaran: 'Pada akhir Fase C, peserta didik menyelidiki bagaimana hubungan saling ketergantungan antar komponen biotik dan abiotik mempengaruhi keseimbangan ekosistem, serta menganalisis dampak aktivitas manusia dan merumuskan upaya pelestariannya.',
        tujuanPembelajaranInput: '1. Menganalisis peran produsen, konsumen primer-tersier, dan pengurai dalam jaring-jaring makanan secara komprehensif.\n2. Memprediksi dampak kepunahan salah satu spesies terhadap kestabilan ekosistem darat dan perairan.\n3. Merancang kampanye aksi konservasi lingkungan hidup lokal untuk menjaga keanekaragaman hayati.',
        referensiBuku: 'Buku Siswa IPAS Kelas V Kemendikdasmen 2022; Atlas Ekosistem Hutan Hujan Tropis; Dokumen Konservasi Alam BSKAP.',
        karakteristikSiswa: 'Peserta didik kritis dalam menyikapi isu kerusakan lingkungan, mampu mengumpulkan data faktual dan menyajikan ide solutif.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Pemahaman IPAS Fase C)'
      }
    ]
  },

  'Bahasa Indonesia': {
    'Fase A': [
      {
        materiTopik: 'Mengenal Bunyi Huruf dan Suku Kata di Sekitarku',
        subMateri: 'Pelafalan Bunyi Vokal dan Konsonan, Membaca Suku Kata Terbuka & Tertutup, Menyimak Cerita Fabel Bergambar, Menulis Kata Bermakna',
        capaianPembelajaran: 'Pada akhir Fase A, peserta didik memiliki kemampuan berbahasa untuk berkomunikasi dan bernalar, bersikap menjadi penyimak yang baik, mengenali dan melafalkan lambang dan bunyi huruf, membaca suku kata dan kata sederhana dengan intonasi wajar, serta mengekspresikan gagasan secara lisan dan tulisan.',
        tujuanPembelajaranInput: '1. Mengidentifikasi dan melafalkan bunyi huruf alfabet (vokal dan konsonan) secara fasih dan artikulatif.\n2. Merangkai huruf menjadi suku kata serta membaca kata-kata benda bermakna di lingkungan kelas.\n3. Menceritakan kembali isi bacaan bergambar dengan kosakata santun dan ekspresi percaya diri.',
        referensiBuku: 'Buku Siswa Bahasa Indonesia: Aku Bisa! Kelas I Kemendikdasmen/Kemendikbudristek 2022; Kartu Baca Awal Bergambar; Panduan Literasi Menyenangkan BSKAP.',
        karakteristikSiswa: 'Peserta didik antusias dengan lagu rima abjad, gambar ilustrasi berwarna cerah, dan kegiatan membaca bersama guru.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Menyimak, Membaca & Menulis Fase A)'
      }
    ],
    'Fase B': [
      {
        materiTopik: 'Teks Deskripsi dan Cerita Pengalaman Pribadi',
        subMateri: 'Unsur Ide Pokok dan Ide Pendukung, Menulis Teks Deskripsi Objek Wisata/Budaya, Penggunaan Tanda Baca Titik, Koma, dan Huruf Kapital Baku',
        capaianPembelajaran: 'Pada akhir Fase B, peserta didik mampu memahami ide pokok dan ide pendukung pada teks informatif dan naratif, menulis teks deskripsi dengan kaidah ejaan bahasa Indonesia yang benar, serta menyampaikan gagasan melalui presentasi lisan yang santun.',
        tujuanPembelajaranInput: '1. Menemukan ide pokok dan informasi rinci dari teks deskripsi lingkungan sekitar secara tepat.\n2. Menulis karangan deskripsi 2-3 paragraf menggunakan kaidah PUEBI (huruf kapital dan tanda baca) secara tertib.\n3. Mempresentasikan hasil karya tulisan di hadapan teman dengan intonasi jelas dan runtut.',
        referensiBuku: 'Buku Siswa Bahasa Indonesia: Lihat Sekitar Kelas IV Kemendikdasmen 2022; Kamus Besar Bahasa Indonesia (KBBI V Daring); Panduan PUEBI.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Membaca dan Menulis Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Teks Eksplanasi Ilmiah dan Wawancara Jurnalistik Cilik',
        subMateri: 'Struktur Teks Eksplanasi (Pernyataan Umum, Sebab-Akibat, Interpretasi), Merancang Daftar Pertanyaan 5W+1H untuk Wawancara Tokoh Masyarakat',
        capaianPembelajaran: 'Pada akhir Fase C, peserta didik mampu menganalisis informasi dan struktur teks eksplanasi ilmiah sederhana, melakukan teknik wawancara etis dengan narasumber, serta menyusun laporan hasil wawancara dalam bahasa Indonesia yang efektif.',
        tujuanPembelajaranInput: '1. Menganalisis bagian struktur pernyataan umum, rangkaian sebab-akibat, dan simpulan dalam teks eksplanasi ilmiah.\n2. Menyusun pedoman wawancara berkaidah 5W+1H untuk menggali informasi dari tokoh masyarakat/guru.\n3. Mengolah hasil wawancara menjadi laporan tertulis yang terstruktur dan objektif.',
        referensiBuku: 'Buku Siswa Bahasa Indonesia Kelas V Kemendikdasmen 2022; Pedoman Menulis Laporan Eksplanasi BSKAP; Buku Pintar Wartawan Cilik.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Membaca, Memirsa & Berbicara Fase C)'
      }
    ]
  },

  'Pendidikan Pancasila': {
    'Fase A': [
      {
        materiTopik: 'Simbol-Simbol Pancasila dan Penerapannya di Rumah dan Madrasah',
        subMateri: 'Mengenal Garuda Pancasila, 5 Lambang Sila Pancasila (Bintang, Rantai, Pohon Beringin, Kepala Banteng, Padi & Kapas), Nilai Kasih Sayang & Gotong Royong',
        capaianPembelajaran: 'Peserta didik mampu mengenal dan menceritakan simbol-simbol sila Pancasila pada lambang negara Garuda Pancasila, serta mengidentifikasi dan mempraktikkan hubungan antarsila dalam kehidupan sehari-hari.',
        tujuanPembelajaranInput: '1. Mengidentifikasi lima lambang sila Pancasila pada perisai Garuda Pancasila dengan tepat.\n2. Menjelaskan arti penting sikap tolong-menolong dan rukun sesuai nilai Pancasila di lingkungan keluarga dan madrasah.\n3. Menunjukkan perilaku taat aturan dan menghargai teman yang berbeda.',
        referensiBuku: 'Buku Siswa Pendidikan Pancasila Kelas I Kemendikdasmen 2022; Gambar Lambang Garuda Pancasila Resmi; Modul Penguatan Profil Pelajar Pancasila.',
        alokasiWaktu: '3 Pertemuan (6 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Pancasila Fase A)'
      }
    ],
    'Fase B': [
      {
        materiTopik: 'Hak dan Kewajiban sebagai Warga Madrasah dan Masyarakat',
        subMateri: 'Pengertian Hak dan Kewajiban, Penerapan Aturan Norma di Sekolah/Madrasah, Musyawarah untuk Mufakat dalam Menyelesaikan Perbedaan',
        capaianPembelajaran: 'Peserta didik mampu mengklasifikasikan hak dan kewajiban sebagai anggota keluarga, warga sekolah/madrasah, dan warga masyarakat, serta menerapkan prinsip musyawarah mufakat.',
        tujuanPembelajaranInput: '1. Membedakan antara hak dan kewajiban peserta didik di lingkungan madrasah dan rumah secara komparatif.\n2. Memberikan contoh pemenuhan kewajiban menjaga fasilitas belajar sebelum menuntut hak.\n3. Mempraktikkan tata cara musyawarah dalam pemilihan ketua kelas dengan menjunjung adab demokratis.',
        referensiBuku: 'Buku Siswa Pendidikan Pancasila Kelas IV Kemendikdasmen 2022; UUD NRI 1945; Modul Harmoni Kebangsaan BSKAP.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen UUD NRI 1945 Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Menghargai Keragaman Budaya, Agama, dan Suku Bangsa dalam Bingkai NKRI',
        subMateri: 'Semboyan Bhinneka Tunggal Ika, Ragam Rumah Adat, Pakaian Adat, Tarian, dan Upacara Adat Nusantara, Menolak Diskriminasi dan Sikap Toleransi Moderat',
        capaianPembelajaran: 'Peserta didik mampu menelaah makna Bhinneka Tunggal Ika, menyajikan keanekaragaman suku, budaya, agama, dan ras di Indonesia, serta memupuk sikap toleransi moderat dalam persatuan kebangsaan.',
        tujuanPembelajaranInput: '1. Menganalisis faktor penyebab keberagaman sosial budaya masyarakat Indonesia secara sosiologis-historis.\n2. Mengidentifikasi kekayaan adat istiadat, tarian, dan rumah adat nusantara khususnya daerah Kalimantan Timur.\n3. Merancang aksi kampanye toleransi antarteman dan menolak segala bentuk perundungan (bullying) atas dasar SARA.',
        referensiBuku: 'Buku Siswa Pendidikan Pancasila Kelas V Kemendikdasmen 2022; Peta Sebaran Budaya Nusantara; Panduan Moderasi Beragama Kemenag RI.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Bhinneka Tunggal Ika & NKRI Fase C)'
      }
    ]
  },

  'Akidah Akhlak': {
    'Fase A': [
      {
        materiTopik: 'Mengenal Asmaul Husna: Al-Wahhab dan Ar-Razzaq',
        subMateri: 'Arti dan Makna Al-Wahhab dan Ar-Razzaq, Bukti Kasih Sayang Allah dalam Kehidupan Sehari-hari, Adab Bersyukur dan Gemar Berbagi',
        capaianPembelajaran: 'Peserta didik mampu melafalkan, menghafalkan, dan memahami makna Asmaul Husna (Al-Wahhab, Ar-Razzaq) serta menunjukkan sikap bersyukur dan suka menolong sesama teman di madrasah sesuai standar KMA No. 450 Tahun 2024.',
        tujuanPembelajaranInput: '1. Melafalkan dan menjelaskan arti Asmaul Husna Al-Wahhab dan Ar-Razzaq dengan intonasi fasih.\n2. Memberikan contoh nikmat rezeki Allah SWT yang dirasakan dalam kehidupan sehari-hari.\n3. Membiasakan sikap gemar bersedekah, berbagi bekal, dan mengucapkan kalimat thoyyibah hamdalah.',
        referensiBuku: 'Buku Siswa Akidah Akhlak MI Kelas II Kemenag RI 2020/2024; Kisah Teladan Asmaul Husna; Kartu Karakter Mulia SIKURMA Kemenag.',
        karakteristikSiswa: 'Peserta didik ceria, gemar mendengarkan kisah teladan nabi dan rasul, membutuhkan keteladanan konkret (uswah hasanah) dari guru.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 & KMA No. 347 Tahun 2022 Kurikulum Merdeka Madrasah (Elemen Akidah Akhlak Fase A)'
      }
    ],
    'Fase B': [
      {
        materiTopik: 'Adab Bertamu dan Menghormati Tetangga dalam Islam',
        subMateri: 'Adab Mengucapkan Salam, Mengetuk Pintu, Waktu Bertamu, Menjamu Tamu, Hak-Hak Tetangga dalam Hadits Rasulullah SAW',
        capaianPembelajaran: 'Peserta didik mampu memahami dan membiasakan adab bertamu, menerima tamu, serta memperlakukan tetangga dengan santun sebagai cerminan akhlak karimah.',
        tujuanPembelajaranInput: '1. Menguraikan dalil naqli dan kaidah adab bertamu dan menghormati tetangga secara syar\'i.\n2. Menganalisis hikmah menjaga kerukunan antartetangga dalam kehidupan bermasyarakat majemuk.\n3. Memperagakan simulasi adab bertamu yang beradab dan santun di ruang kelas madrasah.',
        referensiBuku: 'Buku Siswa Akidah Akhlak MI Kelas IV Kemenag RI 2020/2024; Kitab Akhlaq lil Banin/Banat; Modul Moderasi Akhlak Kemenag.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Akhlak Terpuji Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Meneladani Sifat Rasul Ulul Azmi dan Menghindari Sifat Mazmumah (Riya dan Sum\'ah)',
        subMateri: 'Kisah Ketabahan 5 Rasul Ulul Azmi (Nuh, Ibrahim, Musa, Isa, Muhammad SAW), Bahaya Sifat Riya dan Sum\'ah terhadap Ibadah, Ikhlas Beramal',
        capaianPembelajaran: 'Peserta didik mampu menganalisis kisah keteladanan para Rasul Ulul Azmi dalam menghadapi ujian dakwah serta membiasakan sikap sabar, ikhlas, dan menghindari sifat tercela riya dan sum\'ah.',
        tujuanPembelajaranInput: '1. Menganalisis mukjizat dan kesabaran luar biasa lima Rasul Ulul Azmi dalam berdakwah menegakkan tauhid.\n2. Mengidentifikasi ciri-ciri penyakit hati riya dan sum\'ah serta bahayanya menggugurkan pahala amal.\n3. Menumbuhkan komitmen internal untuk senantiasa ikhlas semata karena mengharap ridha Allah SWT.',
        referensiBuku: 'Buku Siswa Akidah Akhlak MI Kelas V Kemenag RI 2024; Tarikh Nabawiyah Ibnu Katsir; Modul Penanaman Integritas Madrasah.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Kisah Teladan & Akhlak Fase C)'
      }
    ]
  },

  Fiqih: {
    'Fase A': [
      {
        materiTopik: 'Tata Cara Wudhu yang Sempurna dan Rukun-Rukunnya',
        subMateri: 'Pengertian Wudhu dan Syarat Sah, Bacaan Doa Sebelum dan Sesudah Wudhu, Praktik Rukun dan Sunnah Wudhu, Hal yang Membatalkan Wudhu',
        capaianPembelajaran: 'Peserta didik mampu memahami tata cara bersuci (thaharah) dari hadats kecil melalui wudhu secara tertib, melafalkan doa, dan mempraktikkannya dengan sempurna.',
        tujuanPembelajaranInput: '1. Menyebutkan urutan rukun wudhu dari niat hingga membasuh kaki secara tertib dan benar.\n2. Melafalkan bacaan niat dan doa sesudah wudhu dengan makhraj yang fasih.\n3. Mempraktikkan tata cara berwudhu yang hemat air dan sah secara syariat di tempat wudhu madrasah.',
        referensiBuku: 'Buku Siswa Fiqih MI Kelas I Kemenag RI 2020/2024; Poster Rukun Wudhu Bergambar; Kitab Mabadiul Fiqhiyyah Juz 1.',
        alokasiWaktu: '3 Pertemuan (6 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Fiqih Ibadah Fase A)'
      }
    ],
    'Fase B': [
      {
        materiTopik: 'Tanda-Tanda Baligh dan Kewajiban Mandi Wajib (Thaharah Hadats Besar)',
        subMateri: 'Tanda Baligh Menurut Biologi dan Fiqih Islam (Mimpi Basah, Haid, Usia 15 Tahun), Rukun dan Sunnah Mandi Wajib, Larangan bagi Orang Berhadats Besar',
        capaianPembelajaran: 'Peserta didik memahami tanda-tanda baligh dalam pandangan ilmu fiqih dan medis, serta terbiasa menjalankan kewajiban thaharah (mandi wajib) dan shalat fardhu secara istiqamah sesuai standar KMA No. 450 Tahun 2024.',
        tujuanPembelajaranInput: '1. Mengidentifikasi tanda-tanda baligh laki-laki dan perempuan berdasarkan perspektif fiqih Islam dan ilmu biologi secara ilmiah dan santun.\n2. Menjelaskan rukun, niat, dan tata cara mandi wajib bersuci dari hadats besar secara sistematis.\n3. Menyadari konsekuensi hukum taklif (kewajiban syariat) shalat fardhu dan puasa Ramadhan pasca baligh.',
        referensiBuku: 'Buku Siswa Fiqih MI Kelas IV Kemenag RI 2020/2024; Kitab Safinatun Najah; Panduan Thaharah Praktis Kemenag.',
        karakteristikSiswa: 'Peserta didik memasuki masa pra-remaja, memerlukan bimbingan fiqih kesucian diri dengan bahasa edukatif dan tanpa rasa malu.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Fiqih Ibadah Fase B)'
      },
      {
        materiTopik: 'Shalat Berjamaah dan Tata Cara Masbuq',
        subMateri: 'Keutamaan Shalat Berjamaah 27 Derajat, Syarat Menjadi Imam dan Makmum, Posisi Shaf Shalat, Tata Cara Makmum Masbuq',
        capaianPembelajaran: 'Peserta didik mampu menjelaskan ketentuan shalat berjamaah, tata cara imam dan makmum, serta mempraktikkan tata cara shalat makmum masbuq dengan benar.',
        tujuanPembelajaranInput: '1. Menjelaskan keutamaan dan syarat sah shalat berjamaah menurut tuntunan sunnah nabi.\n2. Mengatur kerapian shaf shalat berjamaah sesuai tata cara fiqih shalat.\n3. Memperagakan tata cara menjadi makmum masbuq ketika tertinggal rakaat bersama imam.',
        referensiBuku: 'Buku Siswa Fiqih MI Kelas IV Kemenag 2024; Panduan Praktik Ibadah Shalat MI.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Fiqih Ibadah Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Ketentuan Zakat Fitrah dan Zakat Mal dalam Menyucikan Jiwa dan Harta',
        subMateri: 'Pengertian dan Dasar Hukum Zakat, Perbedaan Zakat Fitrah dan Zakat Mal, Syarat Wajib, Nisab, dan 8 Asnaf Penerima Zakat (Mustahiq)',
        capaianPembelajaran: 'Peserta didik mampu menganalisis konsep zakat fitrah, zakat mal, infak, dan sedekah, menghitung nisab sederhana, serta menginternalisasikan kepedulian sosial terhadap 8 asnaf.',
        tujuanPembelajaranInput: '1. Menganalisis perbedaan esensial antara zakat fitrah, zakat mal, infak, dan sedekah berlandaskan Al-Qur\'an dan Hadits.\n2. Menghitung takaran zakat fitrah makanan pokok beras (2,5 kg / 3,5 liter) dan nisab emas/perak untuk zakat harta.\n3. Mengidentifikasi kriteria delapan golongan mustahiq zakat di lingkungan madrasah dan masyarakat sekitar.',
        referensiBuku: 'Buku Siswa Fiqih MI Kelas V Kemenag RI 2024; Kitab Fathul Qorib; Panduan Pengelolaan Zakat BAZNAS & Kemenag RI.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Fiqih Muamalah & Ibadah Sosial Fase C)'
      }
    ]
  },

  "Qur'an Hadits": {
    'Fase A': [
      {
        materiTopik: 'Membaca dan Menghafal Surat Al-Fatihah dan An-Nas secara Tartil',
        subMateri: 'Kaidah Makharijul Huruf Hijaiyah, Makna Kandungan Surat Al-Fatihah (Ummul Kitab) dan An-Nas (Perlindungan dari Godaan Setan)',
        capaianPembelajaran: 'Peserta didik mampu membaca dan menghafal Surat Al-Fatihah dan An-Nas dengan makhraj dan tajwid dasar yang benar, serta memahami pesan pokoknya.',
        tujuanPembelajaranInput: '1. Melafalkan ayat demi ayat Surat Al-Fatihah dan An-Nas dengan tartil dan harakat yang presisi.\n2. Menghafal Surat Al-Fatihah dan An-Nas secara lancar dan mutqin.\n3. Menjelaskan pesan pokok meminta pertolongan dan perlindungan semata-mata kepada Allah SWT.',
        referensiBuku: 'Buku Siswa Qur\'an Hadits MI Kelas I Kemenag RI 2020/2024; Mushaf Al-Qur\'an Standar Indonesia Kemenag; Modul Tahsin Anak.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Al-Qur\'an Fase A)'
      }
    ],
    'Fase B': [
      {
        materiTopik: 'Hukum Bacaan Nun Mati/Tanwin (Idzhar, Idgham, Iqlab, Ikhfa) dan Surat Al-Qari\'ah',
        subMateri: 'Pengertian 4 Hukum Nun Sukun/Tanwin, Contoh Lafadz dalam Al-Qur\'an, Kandungan Surat Al-Qari\'ah tentang Peristiwa Hari Kiamat',
        capaianPembelajaran: 'Peserta didik mampu menerapkan hukum bacaan nun sukun dan tanwin dalam membaca surat pendek pilihan, serta memahami makna kandungan peristiwa hari akhir pada Surat Al-Qari\'ah.',
        tujuanPembelajaranInput: '1. Mengidentifikasi hukum tajwid Idzhar, Idgham Bighunnah/Bilaghunnah, Iqlab, dan Ikhfa pada ayat-ayat Al-Qur\'an.\n2. Membaca Surat Al-Qari\'ah dengan penerapan kaidah tajwid yang fasih dan benar.\n3. Menjelaskan gambaran dahsyatnya peristiwa kiamat dan timbangan amal perbuatan manusia.',
        referensiBuku: 'Buku Siswa Qur\'an Hadits MI Kelas IV Kemenag RI 2024; Kitab Tuhfatul Athfal; Modul Tajwid Aplikatif Kemenag.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Tajwid dan Tafsir Singkat Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Hukum Mim Mati dan Hadits tentang Menyayangi Anak Yatim',
        subMateri: 'Hukum Mim Sukun (Ikhfa Syafawi, Idgham Mimi, Idzhar Syafawi), Terjemah dan Kandungan Hadits Riwayat Bukhari tentang Menanggung Anak Yatim',
        capaianPembelajaran: 'Peserta didik mampu menerapkan hukum bacaan mim mati serta menganalisis kandungan hadits nabi tentang memuliakan anak yatim dan mengamalkannya dalam kepedulian sosial.',
        tujuanPembelajaranInput: '1. Membedakan kaidah penerapan Ikhfa Syafawi, Idgham Mitslain, dan Idzhar Syafawi secara tepat.\n2. Melafalkan dan menerjemahkan hadits tentang kedudukan mulia orang yang menyayangi anak yatim di surga.\n3. Merancang program sosial sedekah dan kepedulian terhadap anak yatim piatu di madrasah.',
        referensiBuku: 'Buku Siswa Qur\'an Hadits MI Kelas V Kemenag RI 2024; Shahih Bukhari; Panduan Literasi Hadits Tematik Kemenag.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Hadits & Tajwid Fase C)'
      }
    ]
  },

  SKI: {
    'Fase B': [
      {
        materiTopik: 'Ketabahan Nabi Muhammad SAW dan Para Sahabat dalam Berdakwah di Makkah',
        subMateri: 'Kondisi Masyarakat Jahiliyah Makkah, Dakwah Sirriyah dan Jahriyah, Boikot Bani Hasyim, Hijrah ke Thaif dan Habasyah',
        capaianPembelajaran: 'Peserta didik mampu menganalisis kondisi masyarakat Makkah pra-Islam, perjuangan dakwah Nabi Muhammad SAW di Makkah, serta meneladani ketabahan dan kesabaran para sahabat.',
        tujuanPembelajaranInput: '1. Menguraikan faktor penolakan kaum Quraisy terhadap dakwah tauhid Nabi Muhammad SAW secara historis.\n2. Menganalisis ketabahan keluarga Yasir, Bilal bin Rabah, dan Bani Hasyim dalam mempertahankan keimanan.\n3. Meneladani sifat pantang menyerah dan sabar Nabi Muhammad SAW saat menghadapi ujian di Thaif.',
        referensiBuku: 'Buku Siswa Sejarah Kebudayaan Islam MI Kelas IV Kemenag RI 2020/2024; Kitab Ar-Rahiqul Makhtum karya Syaikh Mubarakfuri; Peta Hijrah Nabi.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Periode Makkah Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Kepemimpinan Khulafaur Rasyidin dan Peran Walisongo di Nusantara',
        subMateri: 'Prestasi Abu Bakar, Umar, Utsman, dan Ali RA; Metode Dakwah Kultural Walisongo dalam Menyebarkan Islam di Jawa dan Kepulauan Nusantara',
        capaianPembelajaran: 'Peserta didik mampu menganalisis corak kepemimpinan Khulafaur Rasyidin serta meneladani metode dakwah damai, kearifan lokal, dan toleransi Walisongo di Indonesia.',
        tujuanPembelajaranInput: '1. Menjelaskan kebijakan penting pemerintahan Khulafaur Rasyidin dalam bidang keadilan, pendidikan, dan kesejahteraan rakyat.\n2. Menganalisis strategi pendekatan seni dan budaya yang digunakan Sunan Kalijaga dan Sunan Kudus dalam berdakwah.\n3. Menumbuhkan apresiasi terhadap nilai akulturasi budaya Islam nusantara yang damai dan inklusif.',
        referensiBuku: 'Buku Siswa SKI MI Kelas VI Kemenag RI 2024; Atlas Sejarah Walisongo karya Agus Sunyoto; Modul Sejarah Islam Nusantara Kemenag.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Khulafaur Rasyidin & Islam Nusantara Fase C)'
      }
    ]
  },

  'Bahasa Arab': {
    'Fase A': [
      {
        materiTopik: 'At-Ta\'aruf (Perkenalan Diri) dan Peralatan Madrasah (Al-Adawat Al-Madrasiyyah)',
        subMateri: 'Mufradat Nama-nama Benda Kelas (Qalamun, Kitabun, Sabbuuratun), Percakapan Sederhana Ma Ismuka/Ismuki, Kata Tunjuk Hadza/Hadzihi',
        capaianPembelajaran: 'Peserta didik mampu mendengarkan, menirukan, dan melafalkan kosa kata (mufradat) serta ungkapan perkenalan diri dan benda-benda kelas dalam bahasa Arab sederhana.',
        tujuanPembelajaranInput: '1. Melafalkan 10 kosa kata peralatan sekolah dalam bahasa Arab dengan makhraj yang benar.\n2. Menggunakan kalimat tanya "Maa hadza/hadzihi?" dalam percakapan berpasangan secara aktif.\n3. Merespons sapaan salam dan perkenalan diri menggunakan bahasa Arab komunikatif.',
        referensiBuku: 'Buku Siswa Bahasa Arab MI Kelas I Kemenag RI 2020/2024; Flashcard Mufradat Bergambar; Kamus Bergambar Arab-Indonesia Anak.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Istima\' dan Kalam Fase A)'
      }
    ],
    'Fase B': [
      {
        materiTopik: 'Al-Mihnah (Profesi) dan Amalul Yaumi (Kegiatan Sehari-hari)',
        subMateri: 'Kosa Kata Berbagai Profesi (Thabibun, Mudarrisun, Fallahun, Syurthiyyun), Fi\'il Mudhari\' Sederhana (Ana aqra\'u, Anta taktub), Jumlah Ismiyyah',
        capaianPembelajaran: 'Peserta didik mampu memahami teks lisan dan tulis sederhana tentang profesi dan rutinitas harian, serta merespon tindak tutur bahasa Arab sehari-hari.',
        tujuanPembelajaranInput: '1. Mengidentifikasi makna kosa kata jenis-jenis profesi dalam teks narasi pendek bahasa Arab.\n2. Menyusun kalimat sederhana berpola subjek-predikat (Jumlah Ismiyyah) tentang cita-cita profesi.\n3. Mempraktikkan dialog percakapan tentang kegiatan bangun tidur hingga berangkat ke madrasah.',
        referensiBuku: 'Buku Siswa Bahasa Arab MI Kelas IV Kemenag RI 2024; Media Audio Dialog Arab; Modul Qawa\'id Sederhana Kemenag.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Qira\'ah dan Kitabah Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Fi Hujratil Istiqbal wal Mudzakarah (Di Ruang Tamu dan Ruang Belajar)',
        subMateri: 'Kosa Kata Perabotan Rumah, Dzorof Makan (Fawqa, Tahta, Amama, Wara\'a, Fi, \'Ala), Kaidah Na\'at Man\'ut Sederhana',
        capaianPembelajaran: 'Peserta didik mampu menganalisis struktur kalimat bahasa Arab yang memuat kata depan (dzaraf tempat) dan sifat (na\'at), serta memproduksi teks deskripsi ruang rumah.',
        tujuanPembelajaranInput: '1. Menganalisis kedudukan dzorof makan (keterangan tempat) dalam mendeskripsikan tata letak benda di ruang belajar.\n2. Menerapkan kaidah kesesuaian mudzakkar-muannats pada frasa sifat (na\'at man\'ut) secara tepat.\n3. Menulis karangan pendek 3-4 kalimat mendeskripsikan ruang belajar madrasah dalam bahasa Arab.',
        referensiBuku: 'Buku Siswa Bahasa Arab MI Kelas V Kemenag RI 2024; Kamus Al-Munawwir; Lembar Kerja Maharah Kitabah.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'KMA No. 450 Tahun 2024 (Elemen Kitabah & Qawa\'id Fase C)'
      }
    ]
  },

  PJOK: {
    'Fase A': [
      {
        materiTopik: 'Pola Gerak Dasar Lokomotor, Non-Lokomotor, dan Manipulatif',
        subMateri: 'Gerak Berjalan, Berlari, dan Melompat Berbagai Arah; Menekuk, Mengayun, dan Memutar Badan; Melempar dan Menangkap Bola Kecil',
        capaianPembelajaran: 'Peserta didik dapat menunjukkan kemampuan dalam mempraktikkan pola gerak dasar lokomotor, non-lokomotor, dan manipulatif melalui permainan sederhana dan/atau tradisional.',
        tujuanPembelajaranInput: '1. Mempraktikkan pola gerak berjalan dan berlari dengan koordinasi tubuh yang seimbang.\n2. Melakukan gerak manipulatif melempar dan menangkap bola dengan kontrol motorik yang baik.\n3. Menunjukkan sikap sportivitas, disiplin, dan menghargai teman saat bermain bersama.',
        referensiBuku: 'Buku Panduan Guru PJOK Kelas I Kemendikdasmen 2022; Bola Kasti & Cone Pelatihan; Panduan Permainan Tradisional Nusantara.',
        alokasiWaktu: '3 Pertemuan (6 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Keterampilan Gerak Fase A)'
      }
    ],
    'Fase B': [
      {
        materiTopik: 'Keterampilan Gerak Dasar Senam Lantai dan Kebugaran Jasmani',
        subMateri: 'Guling Depan (Forward Roll), Sikap Lilin, Keseimbangan Bertumpu Satu Kaki, Latihan Kelenturan dan Daya Tahan Jantung-Paru Sederhana',
        capaianPembelajaran: 'Peserta didik dapat mempraktikkan variasi dan kombinasi pola gerak dominan senam (bertumpu, bergantung, keseimbangan, berpindah/lokomotor, tolakan, putaran, ayunan, melayang, dan mendarat) dalam senam lantai secara aman.',
        tujuanPembelajaranInput: '1. Menjelaskan dan mempraktikkan teknik awalan, putaran, dan pendaratan guling depan pada matras senam dengan aman.\n2. Melakukan sikap lilin dan tumpuan satu kaki untuk melatih keseimbangan statis tubuh.\n3. Menjaga kehati-hatian, kedisiplinan, dan saling menjaga keselamatan teman saat berlatih senam.',
        referensiBuku: 'Buku Siswa PJOK Kelas IV Kemendikdasmen 2022; Matras Senam Standar; Modul Kebugaran Jasmani BSKAP.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Keterampilan Gerak Fase B)'
      }
    ],
    'Fase C': [
      {
        materiTopik: 'Pola Hidup Bersih Sehat (PHBS) dan Pencegahan Penyakit Menular/Tidak Menular',
        subMateri: 'Gizi Seimbang "Isi Piringku", Pemeliharaan Kebersihan Alat Reproduksi Remaja, Bahaya Jajanan Berbahan Pengawet/Pewarna Berbahaya, Bahaya Rokok',
        capaianPembelajaran: 'Peserta didik mampu memahami dan menerapkan konsep pemeliharaan kebersihan dan kesehatan alat reproduksi, memilih makanan bergizi seimbang, serta menghindari zat adiktif berbahaya.',
        tujuanPembelajaranInput: '1. Menganalisis komposisi gizi seimbang harian sesuai panduan Isi Piringku Kementerian Kesehatan RI.\n2. Menjelaskan cara merawat organ reproduksi dan kebersihan pakaian pasca pubertas secara higienis.\n3. Merancang poster kampanye hidup sehat menolak rokok dan jajanan tak higienis di lingkungan sekolah/madrasah.',
        referensiBuku: 'Buku Siswa PJOK Kelas V Kemendikdasmen 2022; Buku Panduan Gizi Kemenkes RI; Modul PHBS Madrasah Sehat Kemenag.',
        alokasiWaktu: '4 Pertemuan (8 JP x 35 Menit)',
        dasarHukumCP: 'SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 (Elemen Pengembangan Karakter & Pola Hidup Sehat Fase C)'
      }
    ]
  }
};

/**
 * Helper to fetch authoritative curriculum set from database
 */
export function getAuthoritativeCurriculum(
  subject: string,
  fase: string,
  materiQuery?: string
): KurikulumElementSet | null {
  const subjectData = KEMENDIKDASMEN_CP_DATABASE[subject];
  if (!subjectData) {
    // Try relaxed search
    const matchingKey = Object.keys(KEMENDIKDASMEN_CP_DATABASE).find(k =>
      subject.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(subject.toLowerCase())
    );
    if (!matchingKey) return null;
    return getAuthoritativeCurriculum(matchingKey, fase, materiQuery);
  }

  // Determine normalized fase key
  let normalizedFase = 'Fase B';
  if (fase.includes('Fase A') || fase.includes('Kelas 1') || fase.includes('Kelas 2')) {
    normalizedFase = 'Fase A';
  } else if (fase.includes('Fase C') || fase.includes('Kelas 5') || fase.includes('Kelas 6')) {
    normalizedFase = 'Fase C';
  } else if (fase.includes('Fase B') || fase.includes('Kelas 3') || fase.includes('Kelas 4')) {
    normalizedFase = 'Fase B';
  }

  const items = subjectData[normalizedFase] || subjectData['Fase B'] || Object.values(subjectData)[0] || [];
  if (items.length === 0) return null;

  if (materiQuery && materiQuery.trim().length > 0) {
    const found = items.find(item =>
      item.materiTopik.toLowerCase().includes(materiQuery.toLowerCase()) ||
      item.subMateri.toLowerCase().includes(materiQuery.toLowerCase())
    );
    if (found) return found;
  }

  return items[0];
}

/**
 * Helper to get all available chapters for a subject and fase
 */
export function getAvailableCurriculumChapters(subject: string, fase: string): KurikulumElementSet[] {
  const subjectData = KEMENDIKDASMEN_CP_DATABASE[subject];
  if (!subjectData) return [];

  let normalizedFase = 'Fase B';
  if (fase.includes('Fase A') || fase.includes('Kelas 1') || fase.includes('Kelas 2')) {
    normalizedFase = 'Fase A';
  } else if (fase.includes('Fase C') || fase.includes('Kelas 5') || fase.includes('Kelas 6')) {
    normalizedFase = 'Fase C';
  } else if (fase.includes('Fase B') || fase.includes('Kelas 3') || fase.includes('Kelas 4')) {
    normalizedFase = 'Fase B';
  }

  return subjectData[normalizedFase] || Object.values(subjectData)[0] || [];
}
