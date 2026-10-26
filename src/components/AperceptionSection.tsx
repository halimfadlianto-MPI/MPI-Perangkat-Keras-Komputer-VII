import React, { useState } from 'react';
import { Lightbulb, HelpCircle, ArrowRight, CheckCircle2, AlertTriangle, Sparkles, Volume2 } from 'lucide-react';
import { SectionId } from '../types';
import { playSound, speakNarration } from '../utils/audio';

interface AperceptionSectionProps {
  onNext: (nextSec: SectionId) => void;
  onComplete: () => void;
  isMuted: boolean;
}

export const AperceptionSection: React.FC<AperceptionSectionProps> = ({ onNext, onComplete, isMuted }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const scenarioQuestion = {
    story: "Pagi ini, Dika hendak mengerjakan tugas kliping digital di laboratorium sekolah. Saat tombol power CPU ditekan, lampu indikator menyala dan kipas berputar kencang. Namun, layar monitor tetap gelap gulita dan ketikan keyboard tidak memunculkan huruf apapun di layar!",
    question: "Menurut analisismu, mengapa komputer belum bisa digunakan oleh Dika meskipun CPU-nya sudah menyala?",
    options: [
      { text: "Karena komputer adalah satu kesatuan sistem: tanpa perangkat keluaran (Monitor) dan masukan (Keyboard) yang terhubung, interaksi tidak dapat terjadi.", isCorrect: true },
      { text: "Karena CPU hanya bisa menyala jika ada sambungan internet Wi-Fi saja.", isCorrect: false },
      { text: "Karena semua komputer harus disiram air terlebih dahulu agar dingin.", isCorrect: false }
    ],
    reflection: "Tepat sekali! Komputer bukanlah benda tunggal, melainkan sebuah 'SISTEM' yang terdiri dari perangkat masukan, pemroses, keluaran, dan penyimpanan yang harus saling bekerja sama seperti organ tubuh manusia!"
  };

  const handleSelect = (idx: number) => {
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (scenarioQuestion.options[idx].isCorrect) {
      playSound.correct();
    } else {
      playSound.wrong();
    }
  };

  const handleAudioStory = () => {
    playSound.popup();
    if (!isMuted) {
      speakNarration(
        "Apersepsi: Misteri Komputer Mati di Lab. Bayangkan kamu menekan tombol power komputer, lampu menyala tapi layar monitor tetap gelap. Mengapa hal ini bisa terjadi? Komputer adalah sistem kerja sama antara perangkat masukan, pemroses, keluaran, dan penyimpanan!"
      );
    }
  };

  const handleNext = () => {
    playSound.click();
    onComplete();
    onNext('material');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full">
              Stasiun 2 • Pemantik Keingintahuan
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              Apersepsi: Misteri Komputer di Laboratorium
            </h2>
          </div>
        </div>

        <button
          onClick={handleAudioStory}
          className="p-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
          title="Dengarkan Cerita Audio"
        >
          <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" />
          <span className="hidden sm:inline">Dengarkan Cerita</span>
        </button>
      </div>

      {/* Story Box */}
      <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md mb-8">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 p-2 shadow-md flex items-center justify-center shrink-0 border-2 border-white">
            <span className="text-4xl">🕵️‍♂️</span>
          </div>
          <div>
            <span className="text-xs font-black uppercase text-amber-800 bg-amber-200 px-2.5 py-0.5 rounded-full">
              Studi Kasus Nyata
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-1 mb-2">
              Kasus: "Komputer Berdengung, Layar Tetap Gelap"
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {scenarioQuestion.story}
            </p>
          </div>
        </div>

        {/* Question prompt */}
        <div className="mt-6 pt-6 border-t border-amber-200">
          <h4 className="font-heading font-bold text-amber-950 text-sm sm:text-base flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            {scenarioQuestion.question}
          </h4>

          <div className="space-y-3">
            {scenarioQuestion.options.map((opt, idx) => {
              const isChosen = selectedAnswer === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer ${
                    isChosen
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md'
                        : 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-white border-amber-200 hover:border-amber-400 text-slate-700 hover:bg-amber-100/40'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                    isChosen
                      ? opt.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {showExplanation && (
            <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-emerald-400 shadow-sm animate-fade-in flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs text-emerald-800 uppercase tracking-wider">Refleksi Kritis:</p>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  {scenarioQuestion.reflection}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <span className="text-xs text-slate-500">
          Apersepsi membantumu memahami keterkaitan antar perangkat.
        </span>

        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
        >
          <span>Lanjut ke Materi Utama (4 Pilar)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
