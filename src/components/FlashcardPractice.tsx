import React, { useState } from 'react';
import { Layers, RotateCcw, CheckCircle2, XCircle, ArrowRight, Sparkles, Volume2, HelpCircle } from 'lucide-react';
import { SectionId, HardwareCategory } from '../types';
import { HARDWARE_ITEMS, CATEGORIES } from '../data/hardwareData';
import { playSound, speakNarration } from '../utils/audio';

interface FlashcardPracticeProps {
  onNext: (nextSec: SectionId) => void;
  onComplete: () => void;
  isMuted: boolean;
  onUnlockBadge: (badgeId: string) => void;
  onAddScore: (points: number) => void;
}

export const FlashcardPractice: React.FC<FlashcardPracticeProps> = ({
  onNext,
  onComplete,
  isMuted,
  onUnlockBadge,
  onAddScore
}) => {
  const [practiceMode, setPracticeMode] = useState<'flashcard' | 'sort'>('sort');
  
  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Sorting state
  const [sortIndex, setSortIndex] = useState(0);
  const [sortScore, setSortScore] = useState(0);
  const [sortFeedback, setSortFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const testItems = HARDWARE_ITEMS.slice(0, 10);
  const currentCard = testItems[cardIndex % testItems.length];
  const currentSortItem = testItems[sortIndex % testItems.length];

  const handleFlip = () => {
    playSound.click();
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    playSound.click();
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % testItems.length);
  };

  const handleSortGuess = (chosenCategory: HardwareCategory) => {
    if (sortFeedback) return; // wait feedback

    const isCorrect = chosenCategory === currentSortItem.category;
    if (isCorrect) {
      playSound.correct();
      setSortScore(prev => prev + 1);
      onAddScore(5);
      setSortFeedback({
        isCorrect: true,
        text: `Tepat sekali! ${currentSortItem.name.split('(')[0]} adalah bagian dari ${CATEGORIES[chosenCategory].nameId}.`
      });
    } else {
      playSound.wrong();
      setSortFeedback({
        isCorrect: false,
        text: `Kurang tepat. ${currentSortItem.name.split('(')[0]} termasuk ke dalam ${CATEGORIES[currentSortItem.category].nameId}.`
      });
    }

    setTimeout(() => {
      setSortFeedback(null);
      if (sortIndex + 1 >= testItems.length) {
        onUnlockBadge('badge-sorter');
      }
      setSortIndex(prev => prev + 1);
    }, 1200);
  };

  const handleResetSort = () => {
    playSound.click();
    setSortIndex(0);
    setSortScore(0);
    setSortFeedback(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-0.5 rounded-full">
              Stasiun 6 • Latihan & Penguatan
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              Latihan Mandiri: Flashcard & Sortir Cepat
            </h2>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 self-start sm:self-center">
          <button
            onClick={() => { playSound.click(); setPracticeMode('sort'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              practiceMode === 'sort' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sortir Keranjang ({sortScore}/{testItems.length})
          </button>
          <button
            onClick={() => { playSound.click(); setPracticeMode('flashcard'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              practiceMode === 'flashcard' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Flashcard Pintar
          </button>
        </div>
      </div>

      {/* MODE 1: SORTING RUSH */}
      {practiceMode === 'sort' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-teal-500/40 shadow-xl mb-8 text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400">
              Pertanyaan {Math.min(sortIndex + 1, testItems.length)} dari {testItems.length}
            </span>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Skor Latihan: {sortScore} / {testItems.length}
            </span>
          </div>

          {/* Current Target Card to Classify */}
          <div className="max-w-md mx-auto my-4 p-6 rounded-3xl bg-linear-to-b from-teal-50 to-emerald-50 border-2 border-teal-300 shadow-md">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white flex items-center justify-center text-5xl mb-3 shadow-inner">
              {currentSortItem.category === 'input' && '⌨️'}
              {currentSortItem.category === 'process' && '🧠'}
              {currentSortItem.category === 'output' && '🖥️'}
              {currentSortItem.category === 'storage' && '💾'}
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-800">
              {currentSortItem.name}
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
              "{currentSortItem.functionDesc}"
            </p>
          </div>

          {/* Feedback popup banner */}
          {sortFeedback && (
            <div className={`p-3 rounded-2xl text-xs font-bold mb-4 max-w-md mx-auto animate-fade-in ${
              sortFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}>
              {sortFeedback.text}
            </div>
          )}

          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Masukkan ke keranjang kategori yang tepat:
          </p>

          {/* 4 Category Bins */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {(['input', 'process', 'output', 'storage'] as HardwareCategory[]).map((catKey) => {
              const cat = CATEGORIES[catKey];
              return (
                <button
                  key={catKey}
                  onClick={() => handleSortGuess(catKey)}
                  className={`p-4 rounded-2xl border-2 font-bold text-xs sm:text-sm transition-all flex flex-col items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                    catKey === 'input' ? 'border-emerald-300 hover:bg-emerald-50 text-emerald-900' :
                    catKey === 'process' ? 'border-blue-300 hover:bg-blue-50 text-blue-900' :
                    catKey === 'output' ? 'border-amber-300 hover:bg-amber-50 text-amber-900' :
                    'border-purple-300 hover:bg-purple-50 text-purple-900'
                  }`}
                >
                  <span className="text-2xl">
                    {catKey === 'input' && '📥'}
                    {catKey === 'process' && '⚙️'}
                    {catKey === 'output' && '📤'}
                    {catKey === 'storage' && '🗄️'}
                  </span>
                  <span>{cat.nameId.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: FLASHCARD */}
      {practiceMode === 'flashcard' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-teal-500/40 shadow-xl mb-8 text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400">
              Kartu {cardIndex + 1} dari {testItems.length}
            </span>
            <span className="text-xs text-teal-600 font-semibold">
              Klik kartu untuk membalik
            </span>
          </div>

          <div
            onClick={handleFlip}
            className="max-w-md mx-auto h-64 rounded-3xl p-6 border-3 border-teal-400/80 shadow-lg cursor-pointer transition-all transform hover:scale-102 flex flex-col items-center justify-center bg-linear-to-b from-teal-50 to-white"
          >
            {!isFlipped ? (
              <>
                <span className="text-6xl mb-3">💻</span>
                <h4 className="font-heading text-2xl font-black text-slate-800">
                  {currentCard.name}
                </h4>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  (Klik untuk melihat kategori & fungsi rahasia)
                </p>
              </>
            ) : (
              <div className="animate-fade-in">
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-teal-600 text-white">
                  Kategori: {CATEGORIES[currentCard.category].nameId}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 mt-3 font-semibold leading-relaxed">
                  {currentCard.functionDesc}
                </p>
                <p className="text-[11px] text-amber-700 mt-2 italic">
                  💡 {currentCard.humanAnalogy}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={handleFlip}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Balik Kartu
            </button>
            <button
              onClick={handleNextCard}
              className="px-6 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs cursor-pointer shadow-md"
            >
              Kartu Berikutnya
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <span className="text-xs text-slate-500">
          Sudah yakin? Saatnya menguji pemahaman di Asesmen Sumatif (Target min 80%)!
        </span>

        <button
          onClick={() => {
            playSound.correct();
            onComplete();
            onNext('quiz');
          }}
          className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
        >
          <span>Masuk ke Asesmen 10 Soal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
