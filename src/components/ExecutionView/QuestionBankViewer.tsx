import React, { useState, useMemo } from 'react';
import { QuestionItem, CognitiveLevel, DifficultyLevel, QuestionType, GeneratedTeachingKit, TeacherInputData } from '../../types';
import {
  FileQuestion,
  Filter,
  Search,
  Eye,
  EyeOff,
  Download,
  BookOpen,
  Award,
  Layers,
  FileSpreadsheet,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { exportKisiKisiExcel } from '../../utils/exporter';

interface QuestionBankViewerProps {
  kit: GeneratedTeachingKit;
  inputData: TeacherInputData;
}

export const QuestionBankViewer: React.FC<QuestionBankViewerProps> = ({
  kit,
  inputData,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'naskah' | 'kisi_kisi' | 'kartu_soal'>('naskah');
  const [selectedCognitive, setSelectedCognitive] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllExplanations, setShowAllExplanations] = useState(true);
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({ 1: true });

  const questions = kit.perangkatSoal.soalList;

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchCog = selectedCognitive === 'ALL' || q.cognitiveLevel === selectedCognitive;
      const matchType = selectedType === 'ALL' || q.type === selectedType;
      const matchQuery =
        searchQuery === '' ||
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.stimulus && q.stimulus.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCog && matchType && matchQuery;
    });
  }, [questions, selectedCognitive, selectedType, searchQuery]);

  const toggleCard = (num: number) => {
    setExpandedCards((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-Navigation */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-emerald-600" />
              Perangkat Instrumen Asesmen ({questions.length} Butir Soal)
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              C1 – C6 Lengkap
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dilengkapi analisis materi, kisi-kisi terstandar, format kartu soal, naskah butir, kunci jawaban, dan pembahasan mendalam.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub Tab buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setActiveSubTab('naskah')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSubTab === 'naskah'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Naskah Soal ({questions.length})
            </button>
            <button
              onClick={() => setActiveSubTab('kisi_kisi')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSubTab === 'kisi_kisi'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matriks Kisi-Kisi
            </button>
            <button
              onClick={() => setActiveSubTab('kartu_soal')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSubTab === 'kartu_soal'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Format Kartu Soal
            </button>
          </div>

          <button
            onClick={() => exportKisiKisiExcel(kit, inputData)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors shadow-2xs"
            title="Download Matriks Kisi-Kisi dalam format Excel XLSX/XLS"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Export Excel</span>
          </button>
        </div>
      </div>

      {/* Distribution Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {(['C1', 'C2', 'C3', 'C4', 'C5', 'C6'] as CognitiveLevel[]).map((level) => {
          const count = questions.filter((q) => q.cognitiveLevel === level).length;
          const labelMap: { [key: string]: string } = {
            C1: 'Mengingat (LOTS)',
            C2: 'Memahami (LOTS)',
            C3: 'Menerapkan (MOTS)',
            C4: 'Menganalisis (MOTS)',
            C5: 'Mengevaluasi (HOTS)',
            C6: 'Mencipta (HOTS)',
          };

          return (
            <div
              key={level}
              onClick={() => setSelectedCognitive(selectedCognitive === level ? 'ALL' : level)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                selectedCognitive === level
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-sm">{level}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  selectedCognitive === level ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {count} Soal
                </span>
              </div>
              <p className={`text-[10px] truncate ${selectedCognitive === level ? 'text-emerald-100' : 'text-slate-500'}`}>
                {labelMap[level]}
              </p>
            </div>
          );
        })}
      </div>

      {/* SUB-TAB 1: NASKAH SOAL */}
      {activeSubTab === 'naskah' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari indikator atau kata soal..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                />
              </div>

              <select
                value={selectedCognitive}
                onChange={(e) => setSelectedCognitive(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700"
              >
                <option value="ALL">Semua Level (C1-C6)</option>
                <option value="C1">C1 - Mengingat</option>
                <option value="C2">C2 - Memahami</option>
                <option value="C3">C3 - Menerapkan</option>
                <option value="C4">C4 - Menganalisis</option>
                <option value="C5">C5 - Mengevaluasi</option>
                <option value="C6">C6 - Mencipta</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700"
              >
                <option value="ALL">Semua Bentuk Soal</option>
                <option value="Pilihan Ganda">Pilihan Ganda</option>
                <option value="Pilihan Ganda Kompleks">Pilihan Ganda Kompleks</option>
                <option value="Menjodohkan">Menjodohkan</option>
                <option value="Isian Singkat">Isian Singkat</option>
                <option value="Uraian">Uraian / Esai</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAllExplanations(!showAllExplanations)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium text-slate-700"
              >
                {showAllExplanations ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Sembunyikan Kunci & Pembahasan
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Tampilkan Kunci & Pembahasan
                  </>
                )}
              </button>
              <span className="text-slate-500 font-medium">
                Ditemukan: <b>{filteredQuestions.length}</b> butir
              </span>
            </div>
          </div>

          {/* Question List Cards */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => (
              <div
                key={q.number}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all"
              >
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {q.number}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Level {q.cognitiveLevel}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        q.difficulty === 'Mudah'
                          ? 'bg-blue-50 text-blue-700'
                          : q.difficulty === 'Sedang'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 px-2 py-0.5 rounded-md bg-slate-100">
                      {q.type}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {q.competencyElement}
                  </span>
                </div>

                {/* Stimulus */}
                {q.stimulus && (
                  <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-emerald-500 text-xs text-slate-700 mb-3 italic">
                    <b>Stimulus:</b> {q.stimulus}
                  </div>
                )}

                {/* Question Text */}
                <p className="text-sm font-medium text-slate-900 leading-relaxed mb-3">
                  {q.questionText}
                </p>

                {/* Options for Multiple Choice */}
                {q.options && q.options.length > 0 && (
                  <div className="space-y-1.5 mb-4 pl-2">
                    {q.options.map((opt) => {
                      const isCorrect = showAllExplanations && opt.key === q.correctAnswer;
                      return (
                        <div
                          key={opt.key}
                          className={`flex items-start gap-2.5 p-2 rounded-lg text-xs transition-colors ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-300'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span className="pt-0.5">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Answer Key & Explanation Accordion */}
                {showAllExplanations && (
                  <div className="mt-3 pt-3 border-t border-slate-100 bg-emerald-50/40 rounded-lg p-3 text-xs space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">Kunci Jawaban:</span>
                      <span className="font-extrabold text-emerald-700 text-sm bg-white px-2 py-0.5 rounded border border-emerald-300">
                        {q.correctAnswer}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Rasional & Pembahasan Ilmiah:</span>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{q.explanation}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Pedoman Penskoran:</span>
                      <p className="text-slate-500 mt-0.5">{q.scoringGuide}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MATRIKS KISI-KISI SOAL */}
      {activeSubTab === 'kisi_kisi' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 overflow-x-auto">
          <div className="mb-4">
            <h4 className="text-sm font-bold text-slate-900">
              Matriks Kisi-Kisi Penulisan Soal Evaluasi
            </h4>
            <p className="text-xs text-slate-500">
              Format standar dinas/kemenag memetakan CP, materi pokok, indikator soal, level kognitif, bentuk, dan nomor soal.
            </p>
          </div>

          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="border border-slate-200 p-2.5 text-center">No</th>
                <th className="border border-slate-200 p-2.5">Elemen Capaian (CP)</th>
                <th className="border border-slate-200 p-2.5">Materi Pokok</th>
                <th className="border border-slate-200 p-2.5">Indikator Soal</th>
                <th className="border border-slate-200 p-2.5 text-center">Level</th>
                <th className="border border-slate-200 p-2.5 text-center">Kesulitan</th>
                <th className="border border-slate-200 p-2.5">Bentuk Soal</th>
                <th className="border border-slate-200 p-2.5 text-center">No. Soal</th>
                <th className="border border-slate-200 p-2.5 text-center">Kunci</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {questions.map((q) => (
                <tr key={q.number} className="hover:bg-slate-50/80">
                  <td className="border border-slate-200 p-2 text-center font-bold">{q.number}</td>
                  <td className="border border-slate-200 p-2 max-w-xs truncate">{inputData.capaianPembelajaran}</td>
                  <td className="border border-slate-200 p-2 font-medium">{inputData.materiTopik}</td>
                  <td className="border border-slate-200 p-2">{q.indicator}</td>
                  <td className="border border-slate-200 p-2 text-center font-bold text-emerald-700">{q.cognitiveLevel}</td>
                  <td className="border border-slate-200 p-2 text-center">{q.difficulty}</td>
                  <td className="border border-slate-200 p-2">{q.type}</td>
                  <td className="border border-slate-200 p-2 text-center font-mono font-bold">{q.number}</td>
                  <td className="border border-slate-200 p-2 text-center font-bold text-emerald-800">{q.correctAnswer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 3: FORMAT KARTU SOAL */}
      {activeSubTab === 'kartu_soal' && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
            Format Kartu Soal individual resmi untuk lampiran administrasi asesmen guru, memuat analisis butir, indikator, soal, dan kunci.
          </div>

          <div className="space-y-4">
            {questions.slice(0, 10).map((q) => (
              <div
                key={q.number}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                  <div className="text-xs font-bold text-slate-900">
                    KARTU SOAL NOMOR {q.number}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Level {q.cognitiveLevel} ({q.difficulty})
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 border-r border-slate-100 pr-2">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Satuan Pendidikan & Mapel</span>
                      <span className="font-semibold text-slate-800">{inputData.satuanPendidikan} - {inputData.mataPelajaran}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Kelas / Fase / Semester</span>
                      <span className="font-semibold text-slate-800">{inputData.kelas} ({inputData.fase}) - Semester {inputData.semester}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Materi Pokok</span>
                      <span className="font-semibold text-slate-800">{inputData.materiTopik}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Indikator Soal</span>
                      <span className="text-slate-700">{q.indicator}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {q.stimulus && (
                      <div className="bg-slate-50 p-2 rounded text-[11px] text-slate-600 italic">
                        {q.stimulus}
                      </div>
                    )}
                    <div className="font-medium text-slate-900">{q.questionText}</div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-emerald-700">Kunci Jawaban: {q.correctAnswer}</span>
                      <span className="text-slate-400 text-[11px]">{q.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {questions.length > 10 && (
              <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                Menampilkan 10 kartu soal percontohan di layar. Seluruh {questions.length} kartu soal lengkap disertakan dalam file ekspor DOCX & ZIP paket perangkat ajar.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
