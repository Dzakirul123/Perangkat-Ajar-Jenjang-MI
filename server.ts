import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import {
  getAuthoritativeCurriculum,
  getAvailableCurriculumChapters
} from "./src/data/kemendikdasmenDatabase";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      app: "Generator Perangkat Ajar Pendidikan",
      timestamp: new Date().toISOString()
    });
  });

  // Endpoint to retrieve standard Kemendikdasmen chapters for a subject and fase
  app.get("/api/curriculum/chapters", (req, res) => {
    const subject = (req.query.subject as string) || "Matematika";
    const fase = (req.query.fase as string) || "Fase B";
    const chapters = getAvailableCurriculumChapters(subject, fase);
    res.json({
      status: "success",
      subject,
      fase,
      chapters
    });
  });

  // AI-Powered Curriculum Element Generator (Kemendikdasmen & Kemenag Validated)
  app.post("/api/ai/generate-curriculum-elements", async (req, res) => {
    const {
      mataPelajaran = "Matematika",
      jenjang = "SD/MI",
      fase = "Fase B",
      kelas = "Kelas 4",
      satuanPendidikan = "MI Negeri 1 Paser",
      kurikulum = "Kurikulum Merdeka",
      semester = "Ganjil",
      topikSpesifik = "",
      fieldTarget = "all" // 'all', 'materi', 'cp', 'tp', 'referensi'
    } = req.body;

    const isMadrasah =
      satuanPendidikan.toLowerCase().includes("mi ") ||
      satuanPendidikan.toLowerCase().includes("madrasah") ||
      satuanPendidikan.toLowerCase().includes("mts") ||
      satuanPendidikan.toLowerCase().includes("ma ");

    const isPAISubject = [
      "akidah akhlak",
      "fiqih",
      "qur'an hadits",
      "ski",
      "bahasa arab"
    ].some((s) => mataPelajaran.toLowerCase().includes(s));

    // Prepare authoritative fallback from official Kemendikdasmen / Kemenag database
    const authoritativeFallback = getAuthoritativeCurriculum(
      mataPelajaran,
      fase,
      topikSpesifik
    );

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      if (authoritativeFallback) {
        return res.json({
          status: "success",
          source: "kemendikdasmen_official_database",
          message:
            "Memuat data resmi dari Standar BSKAP Kemendikdasmen & KMA Kemenag RI.",
          data: authoritativeFallback
        });
      }

      return res.status(200).json({
        status: "partial",
        source: "default_fallback",
        data: {
          materiTopik: topikSpesifik || `Konsep Esensial ${mataPelajaran}`,
          subMateri: `Pengenalan Konsep, Eksplorasi Terstruktur, Aplikasi Kontekstual ${mataPelajaran}`,
          capaianPembelajaran: `Pada akhir ${fase}, peserta didik mampu memahami, menganalisis, dan mengaplikasikan konsep esensial ${mataPelajaran} dalam konteks ${kelas} ${satuanPendidikan} sesuai standar Capaian Pembelajaran BSKAP Kemendikdasmen.`,
          tujuanPembelajaranInput: `1. Mengidentifikasi dan menjelaskan konsep dasar ${mataPelajaran} dengan tepat.\n2. Menganalisis keterkaitan materi dengan kehidupan sehari-hari.\n3. Menyelesaikan masalah aplikatif secara kreatif dan mandiri.`,
          referensiBuku: `Buku Teks Utama Siswa & Guru ${mataPelajaran} ${kelas} Kemendikdasmen/Kemenag RI; Modul Kurikulum Merdeka Terintegrasi.`,
          karakteristikSiswa: `Peserta didik ${kelas} ${satuanPendidikan} memiliki rasa ingin tahu yang tinggi dan aktif dalam pembelajaran interaktif.`,
          alokasiWaktu: "4 Pertemuan (8 JP x 35 Menit)",
          dasarHukumCP: isMadrasah || isPAISubject
            ? "KMA No. 450 Tahun 2024 & KMA No. 347 Tahun 2022"
            : "SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024"
        }
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      const promptSystem = `Anda adalah Dewan Ahli Pengembang Kurikulum Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen RI) dan Kementerian Agama RI (Kemenag RI).
Tugas Anda adalah merumuskan elemen pembelajaran terverifikasi, mutakhir, dan resmi sesuai SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 tentang Capaian Pembelajaran pada Kurikulum Merdeka, serta KMA No. 450 Tahun 2024 / KMA No. 347 Tahun 2022 untuk mata pelajaran PAI dan Madrasah.

KONTEKS GURU & MADRASAH/SEKOLAH:
- Satuan Pendidikan: ${satuanPendidikan}
- Jenjang: ${jenjang}
- Fase: ${fase}
- Kelas: ${kelas}
- Mata Pelajaran: ${mataPelajaran}
- Kurikulum: ${kurikulum}
- Semester: ${semester}
${topikSpesifik ? `- Topik/Materi yang diinginkan: "${topikSpesifik}"` : `- Catatan: Tentukan Bab/Materi Pokok semester ${semester} yang paling esensial dan baku sesuai buku teks utama Kemendikdasmen/Kemenag.`}

PEDOMAN PERUMUSAN:
1. "materiTopik": Judul materi pokok/bab resmi Kemendikdasmen/Kemenag (jelas, spesifik, padat).
2. "subMateri": Rincian 3-5 subtopik pembahasan yang runut dan mendalam.
3. "capaianPembelajaran": Teks rumusan Capaian Pembelajaran (CP) resmi sesuai Keputusan Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024 atau KMA 450/2024. Wajib menyertakan elemen kompetensi dan konten materi secara utuh.
4. "tujuanPembelajaranInput": 3 butir Tujuan Pembelajaran (TP) terukur menggunakan Kata Kerja Operasional (KKO) Taksonomi Bloom / Marzano, format nomor (1. ..., 2. ..., 3. ...).
5. "referensiBuku": Buku Teks Utama resmi Kemendikdasmen / Kemenag (misal: Buku Panduan Guru & Buku Siswa terbitan Pusat Perbukuan BSKAP Kemendikdasmen atau Direktorat KSKK Madrasah Kemenag RI).
6. "karakteristikSiswa": Gambaran profil kesiapan belajar dan karakteristik psikologis anak usia jenjang tersebut.
7. "alokasiWaktu": Estimasi JP realistis (misal: "4 Pertemuan (8 JP x 35 Menit)").
8. "dasarHukumCP": Cantumkan dasar hukum resmi (misal: "SK Kepala BSKAP Kemendikdasmen No. 032/H/KR/2024" atau "KMA No. 450 Tahun 2024").

Format luaran WAJIB berupa JSON murni sesuai schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: promptSystem,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              materiTopik: { type: Type.STRING },
              subMateri: { type: Type.STRING },
              capaianPembelajaran: { type: Type.STRING },
              tujuanPembelajaranInput: { type: Type.STRING },
              referensiBuku: { type: Type.STRING },
              karakteristikSiswa: { type: Type.STRING },
              alokasiWaktu: { type: Type.STRING },
              dasarHukumCP: { type: Type.STRING }
            },
            required: [
              "materiTopik",
              "subMateri",
              "capaianPembelajaran",
              "tujuanPembelajaranInput",
              "referensiBuku"
            ]
          },
          temperature: 0.2
        }
      });

      const responseText = response.text || "";
      let parsed = JSON.parse(responseText);

      return res.json({
        status: "success",
        source: "gemini_kemendikdasmen_ai",
        message: "Berhasil dihasilkan secara otomatis oleh AI terintegrasi CP Kemendikdasmen & Kemenag.",
        data: parsed
      });
    } catch (aiError: any) {
      console.error("AI Generation error, falling back to authoritative database:", aiError);

      if (authoritativeFallback) {
        return res.json({
          status: "success",
          source: "kemendikdasmen_official_database",
          message: "AI mengalami kendala jaringan. Memuat data resmi dari Standar BSKAP Kemendikdasmen & Kemenag RI.",
          data: authoritativeFallback
        });
      }

      return res.status(500).json({
        status: "error",
        error: aiError.message || "Gagal merumuskan elemen kurikulum"
      });
    }
  });

  // Enrichment endpoint using Gemini
  app.post("/api/ai/enrich", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({
          status: "fallback",
          message: "API Key tidak terpasang, menggunakan generator mesin kurikulum internal."
        });
      }

      const { prompt, context } = req.body;
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Konteks Kurikulum Kemendikdasmen: ${JSON.stringify(context || {})}\n\nTugas: ${prompt}\n\nBerikan hasil dalam format teks rapi berbahasa Indonesia sesuai kaidah Kurikulum Merdeka (SK BSKAP No. 032/H/KR/2024 / KMA 450/2024).`,
        config: {
          temperature: 0.4,
        },
      });

      return res.json({
        status: "success",
        text: response.text || "",
      });
    } catch (error: any) {
      console.error("AI Error:", error);
      return res.status(500).json({
        status: "error",
        error: error.message || "Gagal menghasilkan konten dengan AI",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
