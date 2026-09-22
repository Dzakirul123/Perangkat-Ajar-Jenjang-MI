import React, { useState } from 'react';
import { GeneratedTeachingKit, TeacherInputData } from '../../types';
import { QuestionBankViewer } from './QuestionBankViewer';
import {
  exportSingleDocx,
  exportCompleteZipPackage,
  exportKisiKisiExcel,
  generateKopSuratHtml
} from '../../utils/exporter';
import {
  FileText,
  Printer,
  Download,
  FileSpreadsheet,
  Archive,
  CheckCircle2,
  Calendar,
  Layers,
  BookOpen,
  Award,
  HelpCircle,
  Clock,
  Sparkles,
  ClipboardList,
  Edit2,
  Check
} from 'lucide-react';

interface DocumentViewerProps {
  kit: GeneratedTeachingKit;
  inputData: TeacherInputData;
  onRegenerate: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  kit,
  inputData,
  onRegenerate,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'summary'
    | 'cp'
    | 'tp'
    | 'atp'
    | 'prota'
    | 'prosem'
    | 'modul'
    | 'media'
    | 'rubrik'
    | 'refleksi'
    | 'lkpd'
    | 'soal'
  >('summary');

  const [isExportingZip, setIsExportingZip] = useState(false);
  const [paperSize, setPaperSize] = useState<'A4' | 'Kuarto'>(inputData.ukuranKertas || 'A4');

  const handlePrint = () => {
    window.print();
  };

  const handleExportZip = async () => {
    setIsExportingZip(true);
    try {
      await exportCompleteZipPackage(kit, inputData, paperSize);
    } catch (err) {
      console.error('Failed to export ZIP:', err);
    } finally {
      setIsExportingZip(false);
    }
  };

  const handleExportCurrentTabDocx = () => {
    let title = 'PERANGKAT AJAR';
    let filename = 'DOKUMEN';
    let contentHtml = '';

    switch (activeTab) {
      case 'summary':
        title = 'BERITA ACARA LEGALITAS DAN PERSETUJUAN PERANGKAT AJAR';
        filename = `00_BERITA_ACARA_LEGALITAS_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <table class="no-border">
            <tr><td style="width:30%;">Nomor Berkas / Transaksi</td><td>: <b>${kit.metadata.approval.transactionId}</b></td></tr>
            <tr><td>Waktu Persetujuan</td><td>: ${kit.metadata.approval.approvedAt}</td></tr>
            <tr><td>Nama Penyetuju</td><td>: <b>${kit.metadata.approval.approverName}</b></td></tr>
            <tr><td>Jabatan Penyetuju</td><td>: ${kit.metadata.approval.approverRole}</td></tr>
            <tr><td>Versi Prototype</td><td>: ${kit.metadata.approval.prototypeVersion}</td></tr>
            <tr><td>Format Kertas Word</td><td>: <b>${paperSize === 'Kuarto' ? 'Kertas Kuarto / Letter (21.59 x 27.94 cm)' : 'Kertas A4 (21.0 x 29.7 cm)'}</b></td></tr>
            <tr><td>Status Eksekusi</td><td>: <span style="color:green; font-weight:bold;">${kit.metadata.approval.status}</span></td></tr>
            <tr><td>Catatan Penyetuju</td><td>: ${kit.metadata.approval.notes || '-'}</td></tr>
          </table>
        `;
        break;
      case 'cp':
        title = 'CAPAIAN PEMBELAJARAN (CP)';
        filename = `01_CAPAIAN_PEMBELAJARAN_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>A. Rasional Mata Pelajaran</h3>
          <p>${kit.cp.rasional}</p>
          <h3>B. Tujuan Mata Pelajaran</h3>
          <ul>${kit.cp.tujuanMapel.map((t) => `<li>${t}</li>`).join('')}</ul>
          <h3>C. Karakteristik Mata Pelajaran</h3>
          <p>${kit.cp.karakteristikMapel}</p>
          <h3>D. Elemen Capaian Pembelajaran</h3>
          <table>
            <tr><th style="width:25%;">Elemen</th><th>Deskripsi Capaian</th></tr>
            ${kit.cp.elemenCapaian.map((e) => `<tr><td><b>${e.elemen}</b></td><td>${e.deskripsi}</td></tr>`).join('')}
          </table>
        `;
        break;
      case 'tp':
        title = 'TUJUAN PEMBELAJARAN (TP)';
        filename = `02_TUJUAN_PEMBELAJARAN_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>Matriks Perumusan Tujuan Pembelajaran (TP)</h3>
          <table>
            <tr><th style="width:12%;">Kode TP</th><th>Rumusan Tujuan Pembelajaran</th><th style="width:25%;">Elemen Capaian</th><th style="width:25%;">Kompetensi Inti</th></tr>
            ${kit.tp.map((t) => `<tr><td style="text-align:center;"><b>${t.kode}</b></td><td>${t.deskripsi}</td><td>${t.elemen}</td><td>${t.kompetensi}</td></tr>`).join('')}
          </table>
        `;
        break;
      case 'atp':
        title = 'ALUR TUJUAN PEMBELAJARAN (ATP)';
        filename = `03_ALUR_TUJUAN_PEMBELAJARAN_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>Alur Tujuan Pembelajaran (ATP) Semester ${inputData.semester}</h3>
          <table>
            <tr><th style="width:8%;">Tahap</th><th style="width:14%;">Kode TP</th><th>Materi & Sub-Materi</th><th style="width:12%;">Alokasi JP</th><th>Profil Pelajar Pancasila</th><th>Glosarium</th></tr>
            ${kit.atp.map((a) => `<tr><td style="text-align:center;">${a.tahap}</td><td style="text-align:center;"><b>${a.kodeTP}</b></td><td>${a.materi}</td><td style="text-align:center;">${a.alokasiJP} JP</td><td>${a.profilPelajar.join(', ')}</td><td>${a.glosarium}</td></tr>`).join('')}
          </table>
        `;
        break;
      case 'prota':
        title = 'PROGRAM TAHUNAN (PROTA)';
        filename = `04_PROGRAM_TAHUNAN_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>Program Tahunan (PROTA) Tahun Ajaran ${inputData.tahunPelajaran}</h3>
          <p>Pekan Efektif Ganjil: ${kit.prota.pekanEfektifGanjil} Pekan | Pekan Efektif Genap: ${kit.prota.pekanEfektifGenap} Pekan | Total Beban Belajar: ${kit.prota.totalJP} JP</p>
          <table>
            <tr><th style="width:8%;">No</th><th>Materi Pokok / Lingkup Materi</th><th style="width:15%;">Semester</th><th style="width:15%;">Alokasi JP</th><th>Keterangan</th></tr>
            ${kit.prota.items.map((p) => `<tr><td style="text-align:center;">${p.no}</td><td>${p.materiPokok}</td><td style="text-align:center;">${p.semester}</td><td style="text-align:center;">${p.alokasiJP} JP</td><td>${p.keterangan}</td></tr>`).join('')}
          </table>
        `;
        break;
      case 'prosem':
        title = 'PROGRAM SEMESTER (PROSEM)';
        filename = `05_PROGRAM_SEMESTER_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>Program Semester (PROSEM) - Semester ${kit.prosem.semester.toUpperCase()}</h3>
          <table>
            <tr>
              <th rowspan="2" style="width:6%;">No</th>
              <th rowspan="2">Materi / Tujuan Pembelajaran</th>
              <th rowspan="2" style="width:8%;">JP</th>
              ${kit.prosem.bulanNames.map((b) => `<th colspan="4">${b}</th>`).join('')}
            </tr>
            <tr>
              ${kit.prosem.bulanNames.map(() => `<th>1</th><th>2</th><th>3</th><th>4</th>`).join('')}
            </tr>
            ${kit.prosem.items.map((p) => `
              <tr>
                <td style="text-align:center;">${p.no}</td>
                <td>${p.tujuanPembelajaran}</td>
                <td style="text-align:center;">${p.alokasiJP}</td>
                ${kit.prosem.bulanNames.map((b) => {
                  const arr = p.bulan[b] || [0, 0, 0, 0];
                  return arr.map((v) => `<td style="text-align:center;">${v > 0 ? v : '-'}</td>`).join('');
                }).join('')}
              </tr>
            `).join('')}
          </table>
        `;
        break;
      case 'modul':
        title = 'MODUL AJAR KURIKULUM MERDEKA';
        filename = `06_MODUL_AJAR_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>MODUL AJAR KURIKULUM MERDEKA</h3>
          <h4>A. INFORMASI UMUM</h4>
          <table class="no-border">
            <tr><td style="width:25%;">Satuan Pendidikan</td><td>: ${kit.modulAjar.identitas.satuanPendidikan}</td></tr>
            <tr><td>Penyusun / Guru</td><td>: ${kit.modulAjar.identitas.guru}</td></tr>
            <tr><td>Mata Pelajaran</td><td>: ${kit.modulAjar.identitas.mataPelajaran}</td></tr>
            <tr><td>Jenjang / Kelas / Fase</td><td>: ${kit.modulAjar.identitas.jenjang} / ${kit.modulAjar.identitas.kelasFase}</td></tr>
            <tr><td>Alokasi Waktu</td><td>: ${kit.modulAjar.identitas.alokasiWaktu}</td></tr>
          </table>
          <h4>B. KOMPETENSI AWAL & PROFIL PELAJAR PANCASILA</h4>
          <p><b>Kompetensi Awal:</b></p>
          <ul>${kit.modulAjar.kompetensiAwal.map((k) => `<li>${k}</li>`).join('')}</ul>
          <p><b>Profil Pelajar Pancasila:</b></p>
          <ul>${kit.modulAjar.profilPelajarPancasila.map((p) => `<li>${p}</li>`).join('')}</ul>
          <h4>C. KEGIATAN PEMBELAJARAN (SINTAKS PBL & DIFERENSIASI)</h4>
          <p><b>1. Pendahuluan:</b></p>
          <ul>${kit.modulAjar.kegiatanPembelajaran.pendahuluan.map((p) => `<li><b>(${p.menit} Menit)</b> ${p.deskripsi}</li>`).join('')}</ul>
          <p><b>2. Kegiatan Inti:</b></p>
          <ol>${kit.modulAjar.kegiatanPembelajaran.inti.map((i) => `<li><b>${i.sintaks} (${i.menit} Menit):</b> ${i.deskripsi} <i>[Diferensiasi: ${i.diferensiasi}]</i></li>`).join('')}</ol>
          <p><b>3. Penutup:</b></p>
          <ul>${kit.modulAjar.kegiatanPembelajaran.penutup.map((p) => `<li><b>(${p.menit} Menit)</b> ${p.deskripsi}</li>`).join('')}</ul>
        `;
        break;
      case 'media':
        title = 'MEDIA DAN BAHAN AJAR';
        filename = `07_MEDIA_BAHAN_AJAR_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>MEDIA DAN BAHAN AJAR</h3>
          <p><b>Ringkasan Materi Komprehensif:</b></p>
          <div style="background:#f9f9f9; padding:12px; border-left:4px solid #16a34a;">
            <pre style="font-family: inherit; white-space: pre-wrap;">${kit.mediaAjar.ringkasanMateri}</pre>
          </div>
          <h4 style="margin-top:20px;">Kerangka Presentasi Slide Pembelajaran</h4>
          <table>
            <tr><th style="width:10%;">Slide</th><th style="width:25%;">Judul Slide</th><th>Poin Konten</th><th>Saran Visual</th></tr>
            ${kit.mediaAjar.poinPresentasi.map((s) => `<tr><td style="text-align:center;">${s.slide}</td><td><b>${s.judul}</b></td><td>${s.konten}</td><td><i>${s.visualPrompt}</i></td></tr>`).join('')}
          </table>
        `;
        break;
      case 'rubrik':
        title = 'RUBRIK PENILAIAN DAN KKTP';
        filename = `08_RUBRIK_KKTP_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)</h3>
          <table>
            <tr><th style="width:25%;">Kriteria Indikator</th><th>Baru Berkembang (0-64)</th><th>Layak (65-74)</th><th>Cakap (75-89)</th><th>Mahir (90-100)</th></tr>
            ${kit.rubrik.kktp.map((r) => `<tr><td><b>${r.kriteria}</b></td><td>${r.baruBerkembang}</td><td>${r.layak}</td><td>${r.cakap}</td><td>${r.mahir}</td></tr>`).join('')}
          </table>
          <p><b>Pedoman Penskoran:</b> ${kit.rubrik.pedomanPenskoran}</p>
        `;
        break;
      case 'refleksi':
        title = 'INSTRUMEN REFLEKSI PEMBELAJARAN';
        filename = `09_INSTRUMEN_REFLEKSI_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>INSTRUMEN REFLEKSI GURU & SISWA</h3>
          <h4>A. Refleksi Guru</h4>
          <ol>${kit.refleksi.refleksiGuru.map((r) => `<li>${r}</li>`).join('')}</ol>
          <h4>B. Refleksi Peserta Didik</h4>
          <ol>${kit.refleksi.refleksiPesertaDidik.map((r) => `<li>${r}</li>`).join('')}</ol>
        `;
        break;
      case 'lkpd':
        title = kit.lkpd.judul;
        filename = `10_LKPD_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        contentHtml = `
          <h3>${kit.lkpd.judul}</h3>
          <h4>A. TUJUAN AKTIVITAS</h4>
          <ul>${kit.lkpd.tujuanAktivitas.map((t) => `<li>${t}</li>`).join('')}</ul>
          <h4>B. PETUNJUK KERJA</h4>
          <ol>${kit.lkpd.petunjukBelajar.map((p) => `<li>${p}</li>`).join('')}</ol>
          <h4>C. STIMULUS KASUS FAKTUAL</h4>
          <p style="background:#eee; padding:10px; border-left:3px solid #000;">${kit.lkpd.stimulusMasalah}</p>
          <h4>D. TABEL PENGAMATAN</h4>
          <table>
            <tr><th style="width:30%;">Aspek yang Diamati</th><th>Hasil Observasi Faktual</th><th style="width:25%;">Catatan Lapangan</th></tr>
            ${kit.lkpd.lembarObservasi.map((o) => `<tr><td>${o.aspek}</td><td>${o.hasilPengamatan}</td><td>${o.catatan}</td></tr>`).join('')}
          </table>
          <h4>E. PERTANYAAN DISKUSI</h4>
          <ol>${kit.lkpd.pertanyaanDiskusi.map((p) => `<li>${p}</li>`).join('')}</ol>
        `;
        break;
      case 'soal':
        title = `NASKAH ${kit.perangkatSoal.soalList.length} SOAL EVALUASI, KARTU SOAL & KUNCI JAWABAN`;
        filename = `11_BANK_SOAL_LENGKAP_${inputData.mataPelajaran.replace(/\s+/g, '_')}`;
        let soalRows = `<h3>NASKAH ${kit.perangkatSoal.soalList.length} SOAL EVALUASI</h3>`;
        kit.perangkatSoal.soalList.forEach((q) => {
          soalRows += `
            <div style="margin-bottom: 16px; page-break-inside: avoid;">
              <p><b>Nomor ${q.number}.</b> [${q.cognitiveLevel} - ${q.difficulty} - ${q.type}]</p>
              ${q.stimulus ? `<p style="margin-left:15px; font-style:italic;">"${q.stimulus}"</p>` : ''}
              <p style="margin-left: 15px;">${q.questionText}</p>
              ${q.options ? `<div style="margin-left: 30px;">${q.options.map((opt) => `<p style="margin:2px 0;"><b>${opt.key}.</b> ${opt.text}</p>`).join('')}</div>` : ''}
              <p style="margin-left:15px; color:#15803d; font-size:10pt;"><i>Kunci: ${q.correctAnswer} | Pembahasan: ${q.explanation}</i></p>
            </div>
          `;
        });
        contentHtml = soalRows;
        break;
    }

    exportSingleDocx(title, contentHtml, inputData, filename, paperSize);
  };

  const tabs = [
    { id: 'summary', label: 'Ringkasan & Legalitas', icon: Award },
    { id: 'cp', label: '1. CP', icon: BookOpen },
    { id: 'tp', label: '2. TP', icon: CheckCircle2 },
    { id: 'atp', label: '3. ATP', icon: Layers },
    { id: 'prota', label: '4. PROTA', icon: Calendar },
    { id: 'prosem', label: '5. PROSEM', icon: Clock },
    { id: 'modul', label: '6. Modul Ajar', icon: FileText },
    { id: 'media', label: '7. Media Ajar', icon: Sparkles },
    { id: 'rubrik', label: '8. Rubrik & KKTP', icon: ClipboardList },
    { id: 'refleksi', label: '9. Refleksi', icon: HelpCircle },
    { id: 'lkpd', label: '10. LKPD', icon: FileText },
    { id: 'soal', label: `11. Bank Asesmen (${kit.perangkatSoal.soalList.length} Soal)`, icon: FileSpreadsheet },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Top Action Toolbar */}
      <div className="no-print bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              STATUS: DOKUMEN SIAP PAKAI (TERVERIFIKASI)
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ID: {kit.metadata.approval.transactionId}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Paket Lengkap Perangkat Ajar ({inputData.mataPelajaran} - {inputData.kelas})
          </h2>
        </div>

        {/* Export Buttons & Paper Size Setting */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Paper Size Switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-500 px-2 flex items-center gap-1">
              <FileText className="w-3 h-3 text-slate-500" />
              Kertas:
            </span>
            <button
              type="button"
              onClick={() => setPaperSize('A4')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                paperSize === 'A4'
                  ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Ukuran A4: 21.0 x 29.7 cm"
            >
              A4
            </button>
            <button
              type="button"
              onClick={() => setPaperSize('Kuarto')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                paperSize === 'Kuarto'
                  ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Ukuran Kuarto / Letter: 21.59 x 27.94 cm"
            >
              Kuarto (Letter)
            </button>
          </div>

          <button
            onClick={handleExportCurrentTabDocx}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-xl transition-colors shadow-2xs"
            title={`Download tab ini sebagai dokumen Word (.doc) berukuran ${paperSize}`}
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Word (.doc) [{paperSize}]</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs"
            title="Cetak format cetak resmi atau Simpan sebagai PDF"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Cetak / PDF</span>
          </button>

          <button
            onClick={() => exportKisiKisiExcel(kit, inputData)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors shadow-2xs"
            title="Download Matriks Kisi-Kisi Penulisan Soal dalam format Excel (XLSX/XLS)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Excel Kisi-Kisi</span>
          </button>

          <button
            onClick={handleExportZip}
            disabled={isExportingZip}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            title={`Download seluruh 11 dokumen dalam arsip ZIP siap pakai berformat Kertas ${paperSize}`}
          >
            <Archive className="w-4 h-4" />
            <span>{isExportingZip ? 'Menyiapkan ZIP...' : `Download ZIP [${paperSize}]`}</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="no-print bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 overflow-x-auto scrollbar-none flex items-center gap-1 text-xs font-medium">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-white text-emerald-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      <div className={`bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs ${paperSize === 'Kuarto' ? 'print-kuarto' : 'print-a4'}`}>
        {/* Document Format & Paper Information Bar (No Print) */}
        <div className="no-print mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-600">
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              Format Halaman Dokumen:
            </span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-300 font-bold text-slate-900">
              {paperSize === 'Kuarto' ? 'Kertas Kuarto / Letter (21.59 x 27.94 cm)' : 'Kertas A4 (21.0 x 29.7 cm)'}
            </span>
            <span className="text-slate-400">|</span>
            <span>Margin: {inputData.marginKertas || 'Standar (3-2.5-2.5-3 cm)'}</span>
          </div>
          <button
            onClick={handleExportCurrentTabDocx}
            className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-bold hover:underline shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh Tab Ini Sebagai Word ({paperSize})
          </button>
        </div>

        {/* Printable Official Kop Surat */}
        <div className="border-b-4 border-double border-slate-900 pb-4 mb-6 text-center">
          <h4 className="text-xs uppercase font-bold text-slate-600 tracking-wider">
            PEMERINTAH DAERAH PROVINSI / KABUPATEN / YAYASAN
          </h4>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-wide mt-1">
            {inputData.satuanPendidikan}
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-serif">
            NPSN: {inputData.npsn || '10293847'} | Alamat: Jl. Pendidikan No. 45, {inputData.kotaKabupaten} | Website / Email Resmi
          </p>
        </div>

        {/* TAB 0: RINGKASAN & BERITA ACARA */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold uppercase text-slate-900">
                BERITA ACARA LEGALITAS DAN PERSETUJUAN PERANGKAT AJAR
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Nomor Registrasi: {kit.metadata.approval.transactionId}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/90 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase text-xs border-b border-slate-200 pb-2">
                  Data Penyetuju & Legalitas Digital
                </h4>
                <div>
                  <span className="text-slate-500 block">Nama Penyetuju:</span>
                  <span className="font-bold text-slate-900 text-sm">{kit.metadata.approval.approverName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Jabatan Resmi:</span>
                  <span className="font-semibold text-slate-800">{kit.metadata.approval.approverRole}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Waktu Persetujuan:</span>
                  <span className="font-semibold text-slate-800">{kit.metadata.approval.approvedAt}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Versi Prototype:</span>
                  <span className="font-mono text-slate-800">{kit.metadata.approval.prototypeVersion}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status Sistem:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {kit.metadata.approval.status}
                  </span>
                </div>
                {kit.metadata.approval.notes && (
                  <div>
                    <span className="text-slate-500 block">Catatan Tambahan:</span>
                    <span className="italic text-slate-700">"{kit.metadata.approval.notes}"</span>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/90 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase text-xs border-b border-slate-200 pb-2">
                  Ringkasan Cakupan Berkas Yang Dihasilkan
                </h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mata Pelajaran:</span>
                    <span className="font-bold text-slate-900">{inputData.mataPelajaran}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Jenjang & Kelas:</span>
                    <span className="font-bold text-slate-900">{inputData.jenjang} / {inputData.kelas} ({inputData.fase})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Semester & Tahun:</span>
                    <span className="font-bold text-slate-900">{inputData.semester} / {inputData.tahunPelajaran}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Materi Pokok:</span>
                    <span className="font-bold text-slate-900">{inputData.materiTopik}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Alokasi Waktu:</span>
                    <span className="font-bold text-slate-900">{inputData.alokasiWaktu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Soal Asesmen:</span>
                    <span className="font-bold text-emerald-700">{kit.perangkatSoal.soalList.length} Soal (C1–C6)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Kelengkapan Paket:</span>
                    <span className="font-bold text-emerald-700">11 Dokumen Terpadu (100% Lengkap)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <b>Klausul Legalitas Digital:</b> Bukti persetujuan ini mengikat secara administratif internal pada alur kerja aplikasi Generator Perangkat Ajar Pendidikan. Seluruh berkas siap dicetak dan ditandatangani basah oleh Kepala Sekolah dan Guru Pengampu.
            </div>
          </div>
        )}

        {/* TAB 1: CAPAIAN PEMBELAJARAN (CP) */}
        {activeTab === 'cp' && (
          <div className="space-y-6">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                CAPAIAN PEMBELAJARAN (CP) — KURIKULUM MERDEKA
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Mata Pelajaran: {inputData.mataPelajaran} | {inputData.fase}
              </p>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-800">
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">A. Rasional Mata Pelajaran</h4>
                <p className="text-slate-700 text-justify">{kit.cp.rasional}</p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">B. Tujuan Mata Pelajaran</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {kit.cp.tujuanMapel.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-2">C. Elemen Capaian Pembelajaran</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-300 text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-900">
                        <th className="border border-slate-300 p-2.5 text-left w-1/4">Elemen</th>
                        <th className="border border-slate-300 p-2.5 text-left">Deskripsi Capaian Pembelajaran</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kit.cp.elemenCapaian.map((e, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="border border-slate-300 p-2.5 font-bold align-top">{e.elemen}</td>
                          <td className="border border-slate-300 p-2.5 text-justify align-top">{e.deskripsi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TUJUAN PEMBELAJARAN (TP) */}
        {activeTab === 'tp' && (
          <div className="space-y-6">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                TUJUAN PEMBELAJARAN (TP)
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Perumusan Kompetensi Berbasis KKO Bloom Revisi & ABCD
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="border border-slate-300 p-2.5 text-center w-16">Kode</th>
                    <th className="border border-slate-300 p-2.5 text-left">Rumusan Tujuan Pembelajaran</th>
                    <th className="border border-slate-300 p-2.5 text-left w-40">Elemen</th>
                    <th className="border border-slate-300 p-2.5 text-left w-48">Kompetensi (KKO)</th>
                  </tr>
                </thead>
                <tbody>
                  {kit.tp.map((item) => (
                    <tr key={item.kode} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 text-center font-bold text-emerald-800 font-mono">
                        {item.kode}
                      </td>
                      <td className="border border-slate-300 p-2.5">{item.deskripsi}</td>
                      <td className="border border-slate-300 p-2.5 font-medium">{item.elemen}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-600">{item.kompetensi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ALUR TUJUAN PEMBELAJARAN (ATP) */}
        {activeTab === 'atp' && (
          <div className="space-y-6">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                ALUR TUJUAN PEMBELAJARAN (ATP)
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Sekuensial Pembelajaran, Jam Pelajaran (JP), dan Profil Pelajar Pancasila
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="border border-slate-300 p-2.5 text-center w-14">Tahap</th>
                    <th className="border border-slate-300 p-2.5 text-center w-20">Kode TP</th>
                    <th className="border border-slate-300 p-2.5 text-left">Materi / Sub-Materi</th>
                    <th className="border border-slate-300 p-2.5 text-center w-20">Alokasi</th>
                    <th className="border border-slate-300 p-2.5 text-left">Profil Pelajar Pancasila</th>
                  </tr>
                </thead>
                <tbody>
                  {kit.atp.map((item) => (
                    <tr key={item.tahap} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 text-center font-bold">{item.tahap}</td>
                      <td className="border border-slate-300 p-2.5 text-center font-bold text-emerald-800 font-mono">
                        {item.kodeTP}
                      </td>
                      <td className="border border-slate-300 p-2.5 font-medium">{item.materi}</td>
                      <td className="border border-slate-300 p-2.5 text-center font-bold">{item.alokasiJP} JP</td>
                      <td className="border border-slate-300 p-2.5">{item.profilPelajar.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PROGRAM TAHUNAN (PROTA) */}
        {activeTab === 'prota' && (
          <div className="space-y-6">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                PROGRAM TAHUNAN (PROTA) TAHUN PELAJARAN {inputData.tahunPelajaran}
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Pekan Efektif Ganjil: {kit.prota.pekanEfektifGanjil} Pekan | Pekan Efektif Genap: {kit.prota.pekanEfektifGenap} Pekan | Total Alokasi: {kit.prota.totalJP} JP
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="border border-slate-300 p-2.5 text-center w-12">No</th>
                    <th className="border border-slate-300 p-2.5 text-left">Lingkup Materi / Tujuan Pembelajaran</th>
                    <th className="border border-slate-300 p-2.5 text-center w-28">Semester</th>
                    <th className="border border-slate-300 p-2.5 text-center w-24">Alokasi Waktu</th>
                    <th className="border border-slate-300 p-2.5 text-left">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {kit.prota.items.map((item) => (
                    <tr key={item.no} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 text-center font-bold">{item.no}</td>
                      <td className="border border-slate-300 p-2.5 font-medium">{item.materiPokok}</td>
                      <td className="border border-slate-300 p-2.5 text-center">{item.semester}</td>
                      <td className="border border-slate-300 p-2.5 text-center font-bold">{item.alokasiJP} JP</td>
                      <td className="border border-slate-300 p-2.5 text-slate-500">{item.keterangan}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 font-bold">
                    <td colSpan={3} className="border border-slate-300 p-2.5 text-right uppercase">
                      Total Jam Pelajaran Efektif:
                    </td>
                    <td className="border border-slate-300 p-2.5 text-center text-emerald-800">
                      {kit.prota.totalJP} JP
                    </td>
                    <td className="border border-slate-300 p-2.5">Tercakup 100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PROGRAM SEMESTER (PROSEM) */}
        {activeTab === 'prosem' && (
          <div className="space-y-6">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                PROGRAM SEMESTER (PROSEM) — SEMESTER {kit.prosem.semester.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Matriks Distribusi Pekan Efektif Jam Tatap Muka
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th rowSpan={2} className="border border-slate-300 p-2 text-center w-10">No</th>
                    <th rowSpan={2} className="border border-slate-300 p-2 text-left">Materi Pokok / TP</th>
                    <th rowSpan={2} className="border border-slate-300 p-2 text-center w-14">JP</th>
                    {kit.prosem.bulanNames.map((b) => (
                      <th key={b} colSpan={4} className="border border-slate-300 p-1.5 text-center">
                        {b}
                      </th>
                    ))}
                  </tr>
                  <tr className="bg-slate-50 text-[10px]">
                    {kit.prosem.bulanNames.map((b) => (
                      <React.Fragment key={b}>
                        <th className="border border-slate-300 p-1 text-center w-6">1</th>
                        <th className="border border-slate-300 p-1 text-center w-6">2</th>
                        <th className="border border-slate-300 p-1 text-center w-6">3</th>
                        <th className="border border-slate-300 p-1 text-center w-6">4</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kit.prosem.items.map((item) => (
                    <tr key={item.no} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2 text-center font-bold">{item.no}</td>
                      <td className="border border-slate-300 p-2">{item.tujuanPembelajaran}</td>
                      <td className="border border-slate-300 p-2 text-center font-bold">{item.alokasiJP}</td>
                      {kit.prosem.bulanNames.map((b) => {
                        const arr = item.bulan[b] || [0, 0, 0, 0];
                        return arr.map((val, wIdx) => (
                          <td
                            key={wIdx}
                            className={`border border-slate-300 p-1 text-center font-bold ${
                              val > 0 ? 'bg-emerald-100 text-emerald-900' : 'text-slate-300'
                            }`}
                          >
                            {val > 0 ? val : '-'}
                          </td>
                        ));
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: MODUL AJAR LENGKAP */}
        {activeTab === 'modul' && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                MODUL AJAR KURIKULUM MERDEKA
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                {kit.modulAjar.identitas.mataPelajaran} — {kit.modulAjar.identitas.kelasFase}
              </p>
            </div>

            {/* A. Informasi Umum */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1 mb-2">
                A. INFORMASI UMUM
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div><b>Satuan Pendidikan:</b> {kit.modulAjar.identitas.satuanPendidikan}</div>
                <div><b>Penyusun:</b> {kit.modulAjar.identitas.guru}</div>
                <div><b>Mata Pelajaran:</b> {kit.modulAjar.identitas.mataPelajaran}</div>
                <div><b>Jenjang/Kelas/Fase:</b> {kit.modulAjar.identitas.jenjang} / {kit.modulAjar.identitas.kelasFase}</div>
                <div><b>Alokasi Waktu:</b> {kit.modulAjar.identitas.alokasiWaktu}</div>
                <div><b>Tahun Pelajaran:</b> {kit.modulAjar.identitas.tahunPelajaran}</div>
              </div>
            </div>

            {/* B. Kompetensi Awal & Profil Pancasila */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1 mb-2">
                B. KOMPETENSI AWAL & PROFIL PELAJAR PANCASILA
              </h4>
              <div className="space-y-2">
                <p><b>Kompetensi Awal:</b></p>
                <ul className="list-disc pl-5 space-y-1">
                  {kit.modulAjar.kompetensiAwal.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
                <p className="mt-2"><b>Profil Pelajar Pancasila:</b></p>
                <div className="flex flex-wrap gap-1.5">
                  {kit.modulAjar.profilPelajarPancasila.map((p, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* C. Komponen Inti */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1 mb-2">
                C. KOMPONEN INTI
              </h4>
              <div className="space-y-2">
                <p><b>Model Pembelajaran:</b> {kit.modulAjar.modelPembelajaran}</p>
                <p><b>Pemahaman Bermakna:</b> {kit.modulAjar.pemahamanBermakna}</p>
                <p><b>Pertanyaan Pemantik:</b></p>
                <ol className="list-decimal pl-5 space-y-1">
                  {kit.modulAjar.pertanyaanPemantik.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* D. Kegiatan Pembelajaran Terinci */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1 mb-2">
                D. KEGIATAN PEMBELAJARAN
              </h4>
              <div className="space-y-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">1. Kegiatan Pendahuluan (15 Menit)</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {kit.modulAjar.kegiatanPembelajaran.pendahuluan.map((p, i) => (
                      <li key={i}>
                        <b>({p.menit} Menit)</b> {p.deskripsi}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">2. Kegiatan Inti (PBL & Diferensiasi) (50 Menit)</h5>
                  <div className="space-y-2">
                    {kit.modulAjar.kegiatanPembelajaran.inti.map((item, i) => (
                      <div key={i} className="p-2.5 bg-white rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                          <span>Sintaks: {item.sintaks} ({item.menit} Menit)</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                            {item.diferensiasi}
                          </span>
                        </div>
                        <p className="text-slate-700">{item.deskripsi}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">3. Kegiatan Penutup (15 Menit)</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {kit.modulAjar.kegiatanPembelajaran.penutup.map((p, i) => (
                      <li key={i}>
                        <b>({p.menit} Menit)</b> {p.deskripsi}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* E. Asesmen & Tindak Lanjut */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1 mb-2">
                E. ASESMEN & TINDAK LANJUT
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold block text-slate-900 mb-1">Asesmen Diagnostik</span>
                  <p className="text-slate-600">{kit.modulAjar.asesmen.diagnostik}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold block text-slate-900 mb-1">Asesmen Formatif</span>
                  <p className="text-slate-600">{kit.modulAjar.asesmen.formatif}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold block text-slate-900 mb-1">Asesmen Sumatif</span>
                  <p className="text-slate-600">{kit.modulAjar.asesmen.sumatif}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: MEDIA & BAHAN AJAR */}
        {activeTab === 'media' && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                MEDIA DAN BAHAN AJAR
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Ringkasan Materi Esensial & Kerangka Presentasi Slide
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-2">A. Ringkasan Materi Pembelajaran</h4>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 whitespace-pre-line font-serif text-slate-800 leading-relaxed">
                {kit.mediaAjar.ringkasanMateri}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-2">B. Kerangka Presentasi Slide (6 Slide Utama)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {kit.mediaAjar.poinPresentasi.map((slide) => (
                  <div key={slide.slide} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                        Slide {slide.slide}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm mb-1">{slide.judul}</h5>
                    <p className="text-slate-600 mb-2">{slide.konten}</p>
                    <div className="text-[11px] text-slate-400 italic bg-slate-50 p-2 rounded">
                      Visual: {slide.visualPrompt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: RUBRIK & KKTP */}
        {activeTab === 'rubrik' && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                RUBRIK PENILAIAN & KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Interval Nilai: Baru Berkembang (0-64), Layak (65-74), Cakap (75-89), Mahir (90-100)
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="border border-slate-300 p-2.5 text-left w-1/4">Kriteria Indikator</th>
                    <th className="border border-slate-300 p-2.5 text-left">Baru Berkembang (0-64)</th>
                    <th className="border border-slate-300 p-2.5 text-left">Layak (65-74)</th>
                    <th className="border border-slate-300 p-2.5 text-left">Cakap (75-89)</th>
                    <th className="border border-slate-300 p-2.5 text-left">Mahir (90-100)</th>
                  </tr>
                </thead>
                <tbody>
                  {kit.rubrik.kktp.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 font-bold align-top">{item.kriteria}</td>
                      <td className="border border-slate-300 p-2.5 align-top text-slate-600">{item.baruBerkembang}</td>
                      <td className="border border-slate-300 p-2.5 align-top text-slate-700">{item.layak}</td>
                      <td className="border border-slate-300 p-2.5 align-top font-medium text-emerald-900">{item.cakap}</td>
                      <td className="border border-slate-300 p-2.5 align-top font-bold text-emerald-800">{item.mahir}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Pedoman Penskoran:</span>
              <p className="text-slate-600">{kit.rubrik.pedomanPenskoran}</p>
            </div>
          </div>
        )}

        {/* TAB 9: REFLEKSI GURU & SISWA */}
        {activeTab === 'refleksi' && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                INSTRUMEN REFLEKSI PEMBELAJARAN
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Evaluasi Diri Pendidik & Umpan Balik Peserta Didik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                  A. Refleksi Guru (Pendidik)
                </h4>
                <ol className="list-decimal pl-5 space-y-2">
                  {kit.refleksi.refleksiGuru.map((item, idx) => (
                    <li key={idx} className="text-slate-700">{item}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                  B. Refleksi Peserta Didik
                </h4>
                <ol className="list-decimal pl-5 space-y-2">
                  {kit.refleksi.refleksiPesertaDidik.map((item, idx) => (
                    <li key={idx} className="text-slate-700">{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: LKPD */}
        {activeTab === 'lkpd' && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold uppercase text-slate-900">
                {kit.lkpd.judul}
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Nama Kelompok / Peserta Didik: _______________________ | Kelas: {inputData.kelas}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">A. Tujuan Aktivitas</h4>
              <ul className="list-disc pl-5 space-y-1">
                {kit.lkpd.tujuanAktivitas.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">B. Petunjuk Kerja</h4>
              <ol className="list-decimal pl-5 space-y-1">
                {kit.lkpd.petunjukBelajar.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ol>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 mb-1">C. Stimulus Masalah Faktual</h4>
              <p className="italic text-slate-700">{kit.lkpd.stimulusMasalah}</p>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-2">D. Lembar Observasi / Pengamatan</h4>
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="border border-slate-300 p-2.5 text-left w-1/3">Aspek Yang Diamati</th>
                    <th className="border border-slate-300 p-2.5 text-left">Hasil Observasi Faktual</th>
                    <th className="border border-slate-300 p-2.5 text-left w-1/4">Catatan Lapangan</th>
                  </tr>
                </thead>
                <tbody>
                  {kit.lkpd.lembarObservasi.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2.5 font-medium">{row.aspek}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-600">{row.hasilPengamatan}</td>
                      <td className="border border-slate-300 p-2.5 text-slate-500">{row.catatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-2">E. Pertanyaan Diskusi Kritis</h4>
              <ol className="list-decimal pl-5 space-y-2">
                {kit.lkpd.pertanyaanDiskusi.map((q, idx) => (
                  <li key={idx} className="font-medium text-slate-800">{q}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* TAB 11: BANK ASESMEN (100 SOAL) */}
        {activeTab === 'soal' && (
          <QuestionBankViewer kit={kit} inputData={inputData} />
        )}

        {/* Official Signature Block at the bottom of all documents */}
        <div className="mt-12 pt-8 border-t border-slate-300 page-break-inside-avoid">
          <div className="flex justify-between items-start text-xs font-serif">
            <div className="text-left">
              Mengetahui,<br />
              Kepala {inputData.satuanPendidikan}
              <br /><br /><br /><br /><br />
              <b className="underline uppercase tracking-wide">{inputData.kepalaSekolah}</b><br />
              NIP. {inputData.nipKepalaSekolah}
            </div>

            <div className="text-right">
              {inputData.kotaKabupaten}, {inputData.tanggalPengesahan}<br />
              {inputData.jenjang === 'SD/MI' || inputData.satuanPendidikan.toLowerCase().includes('mi') ? 'Guru Kelas' : 'Guru Mata Pelajaran'}
              <br /><br /><br /><br /><br />
              <b className="underline uppercase tracking-wide">{inputData.namaGuru}</b><br />
              NIP. {inputData.nipNuptk}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
