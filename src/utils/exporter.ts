import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { GeneratedTeachingKit, TeacherInputData } from '../types';

export function generateKopSuratHtml(input: TeacherInputData): string {
  const isMadrasah = input.satuanPendidikan.toLowerCase().includes('mi') || 
                     input.satuanPendidikan.toLowerCase().includes('madrasah') || 
                     input.satuanPendidikan.toLowerCase().includes('mts') || 
                     input.satuanPendidikan.toLowerCase().includes('ma');
  const instansiAtas = isMadrasah 
    ? `KEMENTERIAN AGAMA REPUBLIK INDONESIA<br/>KANTOR KEMENTERIAN AGAMA KABUPATEN ${input.kotaKabupaten.toUpperCase()}`
    : 'PEMERINTAH DAERAH PROVINSI / KABUPATEN / DINAS PENDIDIKAN';

  return `
    <div style="text-align: center; border-bottom: 3px double #000; padding-bottom: 12px; margin-bottom: 24px; font-family: 'Times New Roman', Times, serif;">
      <h3 style="margin: 0; font-size: 13pt; text-transform: uppercase; font-weight: bold; line-height: 1.3;">${instansiAtas}</h3>
      <h2 style="margin: 4px 0; font-size: 16pt; text-transform: uppercase; font-weight: bold;">${input.satuanPendidikan}</h2>
      <p style="margin: 2px 0; font-size: 10pt;">NPSN: ${input.npsn || '60723231'} | Alamat: ${input.kotaKabupaten}, Kalimantan Timur | Website / Email Resmi Madrasah</p>
    </div>
  `;
}

export function generateTandaTanganHtml(input: TeacherInputData): string {
  const isSDorMI = input.jenjang === 'SD/MI' || 
                   input.satuanPendidikan.toLowerCase().includes('sd') || 
                   input.satuanPendidikan.toLowerCase().includes('mi');
  const teacherRoleTitle = isSDorMI ? 'Guru Kelas' : 'Guru Mata Pelajaran';

  return `
    <div style="margin-top: 40px; font-family: 'Times New Roman', Times, serif; page-break-inside: avoid;">
      <table style="width: 100%; border: none;">
        <tr>
          <td style="width: 50%; vertical-align: top; text-align: left; border: none; font-size: 11pt;">
            Mengetahui,<br/>
            Kepala ${input.satuanPendidikan}<br/><br/><br/><br/><br/>
            <b><u>${input.kepalaSekolah}</u></b><br/>
            NIP. ${input.nipKepalaSekolah}
          </td>
          <td style="width: 50%; vertical-align: top; text-align: right; border: none; font-size: 11pt;">
            ${input.kotaKabupaten}, ${input.tanggalPengesahan}<br/>
            ${teacherRoleTitle},<br/><br/><br/><br/><br/>
            <b><u>${input.namaGuru}</u></b><br/>
            NIP. ${input.nipNuptk}
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function wrapInWordDocument(
  title: string,
  bodyContent: string,
  input: TeacherInputData,
  paperSizeOverride?: 'A4' | 'Kuarto'
): string {
  const paperSize = paperSizeOverride || input.ukuranKertas || 'A4';
  const isKuarto = paperSize === 'Kuarto';
  // Kuarto (Letter): 21.59cm x 27.94cm (8.5 x 11 in) | A4: 21.0cm x 29.7cm
  const paperDimensions = isKuarto ? '21.59cm 27.94cm' : '21.0cm 29.7cm';
  const paperLabel = isKuarto ? 'Kertas Kuarto / Letter (21.59 x 27.94 cm)' : 'Kertas A4 (21.0 x 29.7 cm)';

  // Margin setting: Resmi Kedinasan (4-4-3-3: Atas 4, Kiri 4, Bawah 3, Kanan 3) or Standar (Atas 3, Kiri 3, Bawah 2.5, Kanan 2.5)
  const isResmi = input.marginKertas === 'Resmi (4-4-3-3)';
  const marginCss = isResmi ? '4.0cm 3.0cm 3.0cm 4.0cm' : '3.0cm 2.5cm 2.5cm 3.0cm';

  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${title}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
      <w:Compatibility>
        <w:BreakWrappedTables/>
        <w:SnapToGridInCell/>
        <w:WrapTextWithPunct/>
        <w:UseAsianBreakRules/>
      </w:Compatibility>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: ${paperDimensions};
      margin: ${marginCss};
      mso-page-orientation: portrait;
      mso-header-margin: 35.4pt;
      mso-footer-margin: 35.4pt;
      mso-paper-source: 0;
    }
    div.Section1 {
      page: Section1;
    }
    body {
      font-family: 'Times New Roman', serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #000;
      margin: 0;
    }
    p, div, li {
      font-family: 'Times New Roman', serif;
      font-size: 12pt;
      line-height: 1.5;
      text-align: justify;
    }
    h1, h2, h3, h4 {
      font-family: 'Times New Roman', serif;
      color: #000;
      margin-top: 14px;
      margin-bottom: 6px;
    }
    h1 { font-size: 16pt; text-align: center; font-weight: bold; }
    h2 { font-size: 14pt; text-align: center; font-weight: bold; text-transform: uppercase; }
    h3 { font-size: 13pt; font-weight: bold; }
    h4 { font-size: 12pt; font-weight: bold; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 16px;
    }
    th, td {
      border: 1px solid #000;
      padding: 6px 8px;
      font-size: 11pt;
      vertical-align: top;
      font-family: 'Times New Roman', serif;
    }
    th {
      background-color: #f2f2f2;
      text-align: center;
      font-weight: bold;
    }
    .no-border td { border: none; padding: 3px 6px; }
    .text-center { text-align: center; }
    .page-break { page-break-before: always; }
  </style>
</head>
<body>
  <div class="Section1">
    ${generateKopSuratHtml(input)}
    <div style="text-align: center; margin-bottom: 24px;">
      <h2 style="margin: 0; border: none; font-size: 14pt;">${title}</h2>
      <p style="margin: 4px 0; font-size: 10.5pt; text-align: center; color: #333;">
        Mata Pelajaran: ${input.mataPelajaran} | Kelas/Fase: ${input.kelas} (${input.fase}) | Tahun: ${input.tahunPelajaran}<br/>
        <span style="font-size: 9.5pt; color: #555;">Ukuran Kertas: ${paperLabel} | Margin: ${isResmi ? 'Resmi 4-4-3-3 cm' : 'Standar 3-2.5-2.5-3 cm'}</span>
      </p>
    </div>
    ${bodyContent}
    ${generateTandaTanganHtml(input)}
  </div>
</body>
</html>`;
}

export function exportSingleDocx(
  title: string,
  contentHtml: string,
  input: TeacherInputData,
  filename: string,
  paperSizeOverride?: 'A4' | 'Kuarto'
) {
  const paperSize = paperSizeOverride || input.ukuranKertas || 'A4';
  const fullHtml = wrapInWordDocument(title, contentHtml, input, paperSize);
  const blob = new Blob(['\ufeff' + fullHtml], { type: 'application/msword;charset=utf-8' });
  saveAs(blob, `${filename}_[${paperSize}].doc`);
}

export function exportKisiKisiExcel(kit: GeneratedTeachingKit, input: TeacherInputData) {
  let tableRows = '';
  kit.perangkatSoal.soalList.forEach((q) => {
    tableRows += `
      <tr>
        <td style="text-align: center;">${q.number}</td>
        <td>${input.capaianPembelajaran.substring(0, 100)}...</td>
        <td>${input.materiTopik}</td>
        <td>${q.indicator}</td>
        <td style="text-align: center;">${q.cognitiveLevel}</td>
        <td style="text-align: center;">${q.difficulty}</td>
        <td style="text-align: center;">${q.type}</td>
        <td style="text-align: center;">${q.number}</td>
        <td style="text-align: center;">${q.correctAnswer}</td>
      </tr>
    `;
  });

  const excelHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <style>
        th { background-color: #2e7d32; color: #ffffff; font-weight: bold; border: 1px solid #000; padding: 6px; }
        td { border: 1px solid #000; padding: 5px; font-size: 10pt; }
      </style>
    </head>
    <body>
      <h2>MATRIKS KISI-KISI PENULISAN SOAL EVALUASI</h2>
      <p>Satuan Pendidikan: ${input.satuanPendidikan} | Mapel: ${input.mataPelajaran} | Kelas: ${input.kelas}</p>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Capaian Pembelajaran (CP)</th>
            <th>Materi Pokok</th>
            <th>Indikator Soal</th>
            <th>Level Kognitif</th>
            <th>Tingkat Kesulitan</th>
            <th>Bentuk Soal</th>
            <th>No. Soal</th>
            <th>Kunci Jawaban</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
  saveAs(blob, `KISI_KISI_SOAL_${input.mataPelajaran.replace(/\s+/g, '_')}.xls`);
}

export async function exportCompleteZipPackage(
  kit: GeneratedTeachingKit,
  input: TeacherInputData,
  paperSizeOverride?: 'A4' | 'Kuarto'
) {
  const paperSize = paperSizeOverride || input.ukuranKertas || 'A4';
  const paperLabel = paperSize === 'Kuarto' ? 'Kertas Kuarto / Letter (21.59 x 27.94 cm)' : 'Kertas A4 (21.0 x 29.7 cm)';
  const zip = new JSZip();
  const folderName = `PERANGKAT_AJAR_${input.mataPelajaran.replace(/\s+/g, '_')}_${input.kelas.replace(/\s+/g, '_')}_[KERTAS_${paperSize.toUpperCase()}]`;
  const root = zip.folder(folderName) || zip;

  // 1. CP, TP, ATP
  const cpTpAtpHtml = `
    <h3>I. CAPAIAN PEMBELAJARAN (CP)</h3>
    <p><b>Rasional:</b> ${kit.cp.rasional}</p>
    <p><b>Tujuan Mata Pelajaran:</b></p>
    <ul>${kit.cp.tujuanMapel.map(t => `<li>${t}</li>`).join('')}</ul>
    <p><b>Elemen Capaian:</b></p>
    <table>
      <tr><th style="width:25%;">Elemen</th><th>Deskripsi Capaian</th></tr>
      ${kit.cp.elemenCapaian.map(e => `<tr><td><b>${e.elemen}</b></td><td>${e.deskripsi}</td></tr>`).join('')}
    </table>

    <h3 style="margin-top: 30px;">II. TUJUAN PEMBELAJARAN (TP)</h3>
    <table>
      <tr><th style="width:12%;">Kode</th><th>Rumusan Tujuan Pembelajaran</th><th style="width:25%;">Elemen</th><th style="width:25%;">Kompetensi</th></tr>
      ${kit.tp.map(t => `<tr><td style="text-align:center;"><b>${t.kode}</b></td><td>${t.deskripsi}</td><td>${t.elemen}</td><td>${t.kompetensi}</td></tr>`).join('')}
    </table>

    <h3 style="margin-top: 30px;">III. ALUR TUJUAN PEMBELAJARAN (ATP)</h3>
    <table>
      <tr><th style="width:10%;">Tahap</th><th style="width:15%;">Kode TP</th><th>Materi & Sub-Materi</th><th style="width:15%;">Alokasi</th><th>Profil Pelajar Pancasila</th></tr>
      ${kit.atp.map(a => `<tr><td style="text-align:center;">${a.tahap}</td><td style="text-align:center;"><b>${a.kodeTP}</b></td><td>${a.materi}</td><td style="text-align:center;">${a.alokasiJP} JP</td><td>${a.profilPelajar.join(', ')}</td></tr>`).join('')}
    </table>
  `;
  root.file(`01_CP_TP_ATP_${paperSize}.doc`, wrapInWordDocument('CAPAIAN, TUJUAN, DAN ALUR PEMBELAJARAN', cpTpAtpHtml, input, paperSize));

  // 2. PROTA & PROSEM
  const protaProsemHtml = `
    <h3>PROGRAM TAHUNAN (PROTA) TAHUN AJARAN ${input.tahunPelajaran}</h3>
    <p>Pekan Efektif Semester Ganjil: ${kit.prota.pekanEfektifGanjil} Pekan | Pekan Efektif Semester Genap: ${kit.prota.pekanEfektifGenap} Pekan | Total: ${kit.prota.totalJP} JP</p>
    <table>
      <tr><th style="width:8%;">No</th><th>Materi Pokok / Lingkup Materi</th><th style="width:18%;">Semester</th><th style="width:18%;">Alokasi JP</th><th>Keterangan</th></tr>
      ${kit.prota.items.map(p => `<tr><td style="text-align:center;">${p.no}</td><td>${p.materiPokok}</td><td style="text-align:center;">${p.semester}</td><td style="text-align:center;">${p.alokasiJP} JP</td><td>${p.keterangan}</td></tr>`).join('')}
    </table>

    <h3 style="margin-top: 35px;">PROGRAM SEMESTER (PROSEM) - SEMESTER ${kit.prosem.semester.toUpperCase()}</h3>
    <table>
      <tr>
        <th rowspan="2" style="width:6%;">No</th>
        <th rowspan="2">Materi / Tujuan Pembelajaran</th>
        <th rowspan="2" style="width:8%;">JP</th>
        ${kit.prosem.bulanNames.map(b => `<th colspan="4">${b}</th>`).join('')}
      </tr>
      <tr>
        ${kit.prosem.bulanNames.map(() => `<th>1</th><th>2</th><th>3</th><th>4</th>`).join('')}
      </tr>
      ${kit.prosem.items.map(p => `
        <tr>
          <td style="text-align:center;">${p.no}</td>
          <td>${p.tujuanPembelajaran}</td>
          <td style="text-align:center;">${p.alokasiJP}</td>
          ${kit.prosem.bulanNames.map(b => {
            const arr = p.bulan[b] || [0, 0, 0, 0];
            return arr.map(v => `<td style="text-align:center;">${v > 0 ? v : '-'}</td>`).join('');
          }).join('')}
        </tr>
      `).join('')}
    </table>
  `;
  root.file(`02_PROTA_DAN_PROSEM_${paperSize}.doc`, wrapInWordDocument('PROGRAM TAHUNAN DAN PROGRAM SEMESTER', protaProsemHtml, input, paperSize));

  // 3. Modul Ajar
  const modulHtml = `
    <h3>MODUL AJAR KURIKULUM MERDEKA</h3>
    <h4>A. INFORMASI UMUM</h4>
    <table class="no-border">
      <tr><td style="width:25%;">Satuan Pendidikan</td><td>: ${kit.modulAjar.identitas.satuanPendidikan}</td></tr>
      <tr><td>Penyusun / Guru</td><td>: ${kit.modulAjar.identitas.guru}</td></tr>
      <tr><td>Mata Pelajaran</td><td>: ${kit.modulAjar.identitas.mataPelajaran}</td></tr>
      <tr><td>Jenjang / Kelas / Fase</td><td>: ${kit.modulAjar.identitas.jenjang} / ${kit.modulAjar.identitas.kelasFase}</td></tr>
      <tr><td>Alokasi Waktu</td><td>: ${kit.modulAjar.identitas.alokasiWaktu}</td></tr>
      <tr><td>Tahun Pelajaran</td><td>: ${kit.modulAjar.identitas.tahunPelajaran}</td></tr>
    </table>

    <h4>B. KOMPETENSI AWAL & PROFIL PELAJAR PANCASILA</h4>
    <p><b>Kompetensi Awal:</b></p>
    <ul>${kit.modulAjar.kompetensiAwal.map(k => `<li>${k}</li>`).join('')}</ul>
    <p><b>Profil Pelajar Pancasila:</b></p>
    <ul>${kit.modulAjar.profilPelajarPancasila.map(p => `<li>${p}</li>`).join('')}</ul>

    <h4>C. KOMPONEN INTI</h4>
    <p><b>Model Pembelajaran:</b> ${kit.modulAjar.modelPembelajaran}</p>
    <p><b>Pemahaman Bermakna:</b> ${kit.modulAjar.pemahamanBermakna}</p>
    <p><b>Pertanyaan Pemantik:</b></p>
    <ol>${kit.modulAjar.pertanyaanPemantik.map(q => `<li>${q}</li>`).join('')}</ol>

    <h4>D. KEGIATAN PEMBELAJARAN</h4>
    <p><b>1. Kegiatan Pendahuluan:</b></p>
    <ul>${kit.modulAjar.kegiatanPembelajaran.pendahuluan.map(p => `<li><b>(${p.menit} Menit)</b> ${p.deskripsi}</li>`).join('')}</ul>
    <p><b>2. Kegiatan Inti (PBL & Diferensiasi):</b></p>
    <ol>${kit.modulAjar.kegiatanPembelajaran.inti.map(i => `<li><b>${i.sintaks} (${i.menit} Menit):</b> ${i.deskripsi} <i>[Diferensiasi: ${i.diferensiasi}]</i></li>`).join('')}</ol>
    <p><b>3. Kegiatan Penutup:</b></p>
    <ul>${kit.modulAjar.kegiatanPembelajaran.penutup.map(p => `<li><b>(${p.menit} Menit)</b> ${p.deskripsi}</li>`).join('')}</ul>

    <h4>E. ASESMEN & TINDAK LANJUT</h4>
    <p><b>Asesmen Diagnostik:</b> ${kit.modulAjar.asesmen.diagnostik}</p>
    <p><b>Asesmen Formatif:</b> ${kit.modulAjar.asesmen.formatif}</p>
    <p><b>Asesmen Sumatif:</b> ${kit.modulAjar.asesmen.sumatif}</p>
    <p><b>Program Pengayaan:</b> ${kit.modulAjar.pengayaanRemedial.pengayaan}</p>
    <p><b>Program Remedial:</b> ${kit.modulAjar.pengayaanRemedial.remedial}</p>
  `;
  root.file(`03_MODUL_AJAR_LENGKAP_${paperSize}.doc`, wrapInWordDocument('MODUL AJAR KURIKULUM MERDEKA', modulHtml, input, paperSize));

  // 4. Media & Bahan Ajar
  const mediaHtml = `
    <h3>MEDIA DAN BAHAN AJAR</h3>
    <div style="background:#f9f9f9; padding:12px; border-left:4px solid #16a34a; margin-bottom:20px;">
      <pre style="font-family: inherit; white-space: pre-wrap;">${kit.mediaAjar.ringkasanMateri}</pre>
    </div>
    <h4>KERANGKA PRESENTASI SLIDE</h4>
    <table>
      <tr><th style="width:10%;">Slide</th><th style="width:25%;">Judul Slide</th><th>Poin Konten</th><th>Saran Visual</th></tr>
      ${kit.mediaAjar.poinPresentasi.map(s => `<tr><td style="text-align:center;">${s.slide}</td><td><b>${s.judul}</b></td><td>${s.konten}</td><td><i>${s.visualPrompt}</i></td></tr>`).join('')}
    </table>
  `;
  root.file(`04_MEDIA_DAN_BAHAN_AJAR_${paperSize}.doc`, wrapInWordDocument('MEDIA DAN BAHAN AJAR', mediaHtml, input, paperSize));

  // 5. Rubrik Penilaian
  const rubrikHtml = `
    <h3>KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)</h3>
    <table>
      <tr><th style="width:25%;">Kriteria Indikator</th><th>Baru Berkembang (0-64)</th><th>Layak (65-74)</th><th>Cakap (75-89)</th><th>Mahir (90-100)</th></tr>
      ${kit.rubrik.kktp.map(r => `<tr><td><b>${r.kriteria}</b></td><td>${r.baruBerkembang}</td><td>${r.layak}</td><td>${r.cakap}</td><td>${r.mahir}</td></tr>`).join('')}
    </table>
    <p><b>Pedoman Penskoran:</b> ${kit.rubrik.pedomanPenskoran}</p>
  `;
  root.file(`05_RUBRIK_PENILAIAN_KKTP_${paperSize}.doc`, wrapInWordDocument('RUBRIK PENILAIAN DAN KKTP', rubrikHtml, input, paperSize));

  // 6. Refleksi
  const refleksiHtml = `
    <h3>INSTRUMEN REFLEKSI PEMBELAJARAN</h3>
    <h4>A. Refleksi Pendidik (Guru)</h4>
    <ol>${kit.refleksi.refleksiGuru.map(r => `<li>${r}</li>`).join('')}</ol>
    <h4>B. Refleksi Peserta Didik</h4>
    <ol>${kit.refleksi.refleksiPesertaDidik.map(r => `<li>${r}</li>`).join('')}</ol>
  `;
  root.file(`06_INSTRUMEN_REFLEKSI_${paperSize}.doc`, wrapInWordDocument('INSTRUMEN REFLEKSI PEMBELAJARAN', refleksiHtml, input, paperSize));

  // 7. LKPD
  const lkpdHtml = `
    <h3>${kit.lkpd.judul}</h3>
    <h4>A. TUJUAN AKTIVITAS</h4>
    <ul>${kit.lkpd.tujuanAktivitas.map(t => `<li>${t}</li>`).join('')}</ul>
    <h4>B. PETUNJUK KERJA</h4>
    <ol>${kit.lkpd.petunjukBelajar.map(p => `<li>${p}</li>`).join('')}</ol>
    <h4>C. STIMULUS KASUS FAKTUAL</h4>
    <p style="background:#eee; padding:10px; border-left:3px solid #000;">${kit.lkpd.stimulusMasalah}</p>
    <h4>D. TABEL PENGAMATAN</h4>
    <table>
      <tr><th style="width:30%;">Aspek yang Diamati</th><th>Hasil Observasi Faktual</th><th style="width:25%;">Catatan Lapangan</th></tr>
      ${kit.lkpd.lembarObservasi.map(o => `<tr><td>${o.aspek}</td><td>${o.hasilPengamatan}</td><td>${o.catatan}</td></tr>`).join('')}
    </table>
    <h4>E. PERTANYAAN DISKUSI</h4>
    <ol>${kit.lkpd.pertanyaanDiskusi.map(p => `<li>${p}</li>`).join('')}</ol>
  `;
  root.file(`07_LKPD_${paperSize}.doc`, wrapInWordDocument('LEMBAR KERJA PESERTA DIDIK', lkpdHtml, input, paperSize));

  // 8. Format Kartu Soal
  let kartuSoalHtml = `<h3>KUMPULAN KARTU SOAL INSTRUMEN ASESMEN</h3>`;
  kit.perangkatSoal.soalList.forEach((q) => {
    kartuSoalHtml += `
      <div style="border: 1px solid #000; padding: 12px; margin-bottom: 20px; page-break-inside: avoid;">
        <table style="width:100%; border:none; margin-bottom:8px;">
          <tr>
            <td style="border:none; width:50%;"><b>KARTU SOAL NOMOR ${q.number}</b></td>
            <td style="border:none; text-align:right;"><b>Level: ${q.cognitiveLevel} (${q.difficulty})</b></td>
          </tr>
        </table>
        <p><b>Satuan Pendidikan:</b> ${input.satuanPendidikan} | <b>Mata Pelajaran:</b> ${input.mataPelajaran}</p>
        <p><b>Kelas / Semester:</b> ${input.kelas} / ${input.semester} | <b>Materi:</b> ${input.materiTopik}</p>
        <p><b>Indikator Soal:</b> ${q.indicator}</p>
        <hr style="border-top:1px dashed #000;"/>
        ${q.stimulus ? `<p><i>Stimulus: ${q.stimulus}</i></p>` : ''}
        <p><b>Butir Soal:</b> ${q.questionText}</p>
        ${q.options ? q.options.map(o => `<p style="margin:2px 0 2px 15px;"><b>${o.key}.</b> ${o.text}</p>`).join('') : ''}
        <p style="margin-top:10px;"><b>Kunci Jawaban:</b> ${q.correctAnswer}</p>
        <p><b>Rasional & Pembahasan:</b> ${q.explanation}</p>
        <p><b>Pedoman Penskoran:</b> ${q.scoringGuide}</p>
      </div>
    `;
  });
  root.file(`08_KARTU_SOAL_${paperSize}.doc`, wrapInWordDocument(`KARTU SOAL EVALUASI (${paperSize})`, kartuSoalHtml, input, paperSize));

  // 9. Naskah 100 Soal
  let naskahSoalHtml = `<h3>NASKAH BANK SOAL EVALUASI (${kit.perangkatSoal.soalList.length} BUTIR)</h3>`;
  kit.perangkatSoal.soalList.forEach((q) => {
    naskahSoalHtml += `
      <div style="margin-bottom: 16px; page-break-inside: avoid;">
        <p><b>Nomor ${q.number}.</b> [${q.cognitiveLevel} - ${q.difficulty} - ${q.type}]</p>
        ${q.stimulus ? `<p style="margin-left:15px; font-style:italic;">"${q.stimulus}"</p>` : ''}
        <p style="margin-left: 15px;">${q.questionText}</p>
        ${q.options ? `
          <div style="margin-left: 30px;">
            ${q.options.map(opt => `<p style="margin: 2px 0;"><b>${opt.key}.</b> ${opt.text}</p>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  });
  root.file(`09_NASKAH_LENGKAP_SOAL_${paperSize}.doc`, wrapInWordDocument(`NASKAH ${kit.perangkatSoal.soalList.length} SOAL EVALUASI`, naskahSoalHtml, input, paperSize));

  // 10. Kunci dan Pembahasan
  let kunciHtml = `<h3>KUNCI JAWABAN DAN PEMBAHASAN MENDALAM</h3><table><tr><th style="width:8%;">No</th><th style="width:10%;">Kunci</th><th style="width:10%;">Level</th><th style="width:15%;">Bentuk</th><th>Pembahasan Ilmiah & Rasional</th></tr>`;
  kit.perangkatSoal.soalList.forEach((q) => {
    kunciHtml += `
      <tr>
        <td style="text-align:center;"><b>${q.number}</b></td>
        <td style="text-align:center; font-weight:bold; color:#15803d;">${q.correctAnswer}</td>
        <td style="text-align:center;">${q.cognitiveLevel}</td>
        <td style="text-align:center;">${q.type}</td>
        <td>${q.explanation}</td>
      </tr>
    `;
  });
  kunciHtml += `</table>`;
  root.file(`10_KUNCI_DAN_PEMBAHASAN_${paperSize}.doc`, wrapInWordDocument('KUNCI JAWABAN DAN PEMBAHASAN SOAL', kunciHtml, input, paperSize));

  // 11. Berita Acara Legalitas Persetujuan
  const beritaAcaraHtml = `
    <h3>BERITA ACARA PERSETUJUAN DAN LEGALITAS DIGITAL EKSEKUSI PERANGKAT AJAR</h3>
    <table class="no-border">
      <tr><td style="width:30%;">Nomor Berkas / Transaksi</td><td>: <b>${kit.metadata.approval.transactionId}</b></td></tr>
      <tr><td>Waktu Persetujuan Resmi</td><td>: ${kit.metadata.approval.approvedAt}</td></tr>
      <tr><td>Nama Penyetuju</td><td>: <b>${kit.metadata.approval.approverName}</b></td></tr>
      <tr><td>Jabatan Penyetuju</td><td>: ${kit.metadata.approval.approverRole}</td></tr>
      <tr><td>Versi Prototype Terverifikasi</td><td>: ${kit.metadata.approval.prototypeVersion}</td></tr>
      <tr><td>Format Ukuran Kertas</td><td>: <b>${paperLabel}</b></td></tr>
      <tr><td>Status Eksekusi</td><td>: <span style="color:green; font-weight:bold;">${kit.metadata.approval.status}</span></td></tr>
      <tr><td>Catatan Khusus Penyetuju</td><td>: ${kit.metadata.approval.notes || '-'}</td></tr>
    </table>
    <div style="background:#fef3c7; border:1px solid #f59e0b; padding:12px; margin-top:20px; font-size:10pt;">
      <b>Klausul Legalitas Digital:</b> Persetujuan pengguna yang tercatat dalam berkas ini menjadi bukti persetujuan digital terhadap proses eksekusi aplikasi secara sah dalam alur kerja sistem, bukan pengganti tanda tangan elektronik tersertifikasi apabila secara hukum negara diwajibkan.
    </div>
  `;
  root.file(`11_BERITA_ACARA_LEGALITAS_${paperSize}.doc`, wrapInWordDocument('BERITA ACARA PERSETUJUAN LEGALITAS', beritaAcaraHtml, input, paperSize));

  // Generate ZIP blob and download
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, `${folderName}.zip`);
}
