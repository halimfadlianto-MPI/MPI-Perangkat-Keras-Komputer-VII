import React, { useState } from 'react';
import { 
  Search, 
  X, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Award,
  Layers,
  Zap,
  Info,
  Radio,
  ExternalLink
} from 'lucide-react';
import { SectionId, HardwareCategory, HardwareItem } from '../types';
import { HARDWARE_ITEMS, CATEGORIES } from '../data/hardwareData';
import { playSound, speakNarration, stopNarration } from '../utils/audio';

interface InteractiveExplorationProps {
  onNext: (nextSec: SectionId) => void;
  onComplete: () => void;
  isMuted: boolean;
  onUnlockBadge: (badgeId: string) => void;
}

export const InteractiveExploration: React.FC<InteractiveExplorationProps> = ({
  onNext,
  onComplete,
  isMuted,
  onUnlockBadge
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<HardwareItem | null>(null);
  const [exploredIds, setExploredIds] = useState<string[]>([]);
  const [miniQuizAnswer, setMiniQuizAnswer] = useState<string | null>(null);
  const [miniQuizFeedback, setMiniQuizFeedback] = useState<boolean | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? HARDWARE_ITEMS
    : HARDWARE_ITEMS.filter(item => item.category === selectedCategory);

  const handleCardClick = (item: HardwareItem) => {
    playSound.popup();
    setActiveItem(item);
    setMiniQuizAnswer(null);
    setMiniQuizFeedback(null);

    // Track exploration progress
    if (!exploredIds.includes(item.id)) {
      const nextExplored = [...exploredIds, item.id];
      setExploredIds(nextExplored);
      if (nextExplored.length >= 8) {
        onUnlockBadge('badge-detective');
      }
    }

    // Auto audio narration if not muted
    if (!isMuted) {
      speakNarration(`${item.name}. ${item.soundNarration}`);
    }
  };

  const handleCloseModal = () => {
    playSound.click();
    stopNarration();
    setActiveItem(null);
  };

  const handlePlayVoice = (text: string) => {
    playSound.click();
    speakNarration(text);
  };

  const handleMiniQuizSubmit = (categoryGuess: string) => {
    if (!activeItem) return;
    setMiniQuizAnswer(categoryGuess);
    const isCorrect = categoryGuess === activeItem.category;
    setMiniQuizFeedback(isCorrect);
    if (isCorrect) {
      playSound.correct();
    } else {
      playSound.wrong();
    }
  };

  const getHardwareEmoji = (id: string) => {
    switch(id) {
      case 'keyboard': return '⌨️';
      case 'mouse': return '🖱️';
      case 'microphone': return '🎙️';
      case 'webcam': return '📷';
      case 'cpu': return '⚡';
      case 'ram': return '🚀';
      case 'gpu': return '🎮';
      case 'motherboard': return '🧩';
      case 'monitor': return '🖥️';
      case 'speaker': return '🔊';
      case 'printer': return '🖨️';
      case 'projector': return '📽️';
      case 'ssd': return '⚡';
      case 'hdd': return '💿';
      case 'flashdisk': return '🗂️';
      case 'cloud_storage': return '☁️';
      default: return '💻';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-lg">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                Stasiun 4 • Eksplorasi Mandiri
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Telah dibuka: {exploredIds.length} / {HARDWARE_ITEMS.length}
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              Eksplorasi Interaktif: Tekan Gambar Perangkat Keras
            </h2>
          </div>
        </div>

        <div className="text-xs text-slate-500 bg-white px-3 py-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Klik salah satu gambar untuk menampilkan jendela pop-up penjelasannya!</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => { playSound.click(); setSelectedCategory('all'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-400'
          }`}
        >
          Semua ({HARDWARE_ITEMS.length})
        </button>

        {(['input', 'process', 'output', 'storage'] as HardwareCategory[]).map((catId) => {
          const cat = CATEGORIES[catId];
          const isSelected = selectedCategory === catId;
          return (
            <button
              key={catId}
              onClick={() => { playSound.click(); setSelectedCategory(catId); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-400'
              }`}
            >
              <span>{cat.nameId}</span>
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filteredItems.map((item) => {
          const isExplored = exploredIds.includes(item.id);
          const catInfo = CATEGORIES[item.category];

          return (
            <button
              key={item.id}
              onClick={() => handleCardClick(item)}
              className={`group relative p-4 rounded-3xl border-3 text-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white flex flex-col items-center justify-between ${
                isExplored
                  ? 'border-emerald-400 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-emerald-400'
              }`}
            >
              {/* Category Pill */}
              <div className="w-full flex items-center justify-between mb-2">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                  item.category === 'input' ? 'bg-emerald-100 text-emerald-800' :
                  item.category === 'process' ? 'bg-blue-100 text-blue-800' :
                  item.category === 'output' ? 'bg-amber-100 text-amber-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {catInfo.nameId.split(' ')[0]}
                </span>

                {isExplored && (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]" title="Sudah dieksplorasi">
                    ✓
                  </span>
                )}
              </div>

              {/* Big Illustrated Icon / Cartoon Visual */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 my-2 rounded-2xl bg-linear-to-b from-slate-50 to-emerald-50 border-2 border-emerald-100 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                <span className="text-4xl sm:text-5xl drop-shadow-sm select-none">
                  {getHardwareEmoji(item.id)}
                </span>
              </div>

              {/* Title & Tag */}
              <div className="w-full mt-2">
                <h4 className="font-heading font-bold text-sm sm:text-base text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                  {item.name.split('(')[0].trim()}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {item.badgeTag}
                </p>
              </div>

              <div className="mt-3 w-full py-1.5 rounded-xl bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-[11px] font-bold text-slate-600 transition-colors flex items-center justify-center gap-1">
                <span>Klik untuk Pop-Up</span>
                <Sparkles className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* POP-UP DETAIL MODAL (INTI FITUR INTERAKTIF) */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-emerald-500 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Tutup Jendela"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-100 to-teal-100 border-2 border-emerald-300 flex items-center justify-center shrink-0 shadow-md">
                <span className="text-5xl">{getHardwareEmoji(activeItem.id)}</span>
              </div>

              <div className="pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    activeItem.category === 'input' ? 'bg-emerald-100 text-emerald-800' :
                    activeItem.category === 'process' ? 'bg-blue-100 text-blue-800' :
                    activeItem.category === 'output' ? 'bg-amber-100 text-amber-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    Kategori: {CATEGORIES[activeItem.category].name}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                  {activeItem.name}
                </h3>
                <p className="text-xs text-emerald-700 font-bold mt-0.5">
                  🏷️ Julukan: {activeItem.badgeTag}
                </p>
              </div>
            </div>

            {/* Voice Read Aloud Button */}
            <div className="mb-4">
              <button
                onClick={() => handlePlayVoice(`${activeItem.name}. Fungsi: ${activeItem.functionDesc}. Fakta Unik: ${activeItem.funFact}`)}
                className="w-full py-2.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Dengarkan Penjelasan Suara (Audio Narasi)</span>
              </button>
            </div>

            {/* Description Sections */}
            <div className="space-y-4 mb-6">
              {/* Function */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Fungsi Utama:
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeItem.functionDesc}
                </p>
              </div>

              {/* How it works & Port */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-teal-50 p-3.5 rounded-2xl border border-teal-200">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-teal-900 mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-teal-600" />
                    Cara Kerjanya:
                  </h5>
                  <p className="text-xs text-teal-800 leading-relaxed">
                    {activeItem.howItWorks}
                  </p>
                </div>

                <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-blue-900 mb-1 flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    Jenis Colokan / Port:
                  </h5>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    {activeItem.ports}
                  </p>
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-start gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900">
                    Fakta Unik & Menarik:
                  </h5>
                  <p className="text-xs sm:text-sm text-amber-800 mt-0.5 leading-relaxed">
                    {activeItem.funFact}
                  </p>
                </div>
              </div>

              {/* Human Analogy */}
              <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                <div>
                  <h5 className="font-bold text-xs text-purple-900">Analogi Tubuh Kita:</h5>
                  <p className="text-xs text-purple-800">{activeItem.humanAnalogy}</p>
                </div>
              </div>
            </div>

            {/* Interactive Mini-Quiz inside Pop-up */}
            <div className="bg-emerald-900 text-white p-4 rounded-2xl shadow-inner">
              <h5 className="font-heading font-bold text-xs text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Kuis Kilat: Termasuk Kategori Apakah {activeItem.name.split('(')[0]}?
              </h5>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['input', 'process', 'output', 'storage'] as HardwareCategory[]).map((catKey) => {
                  const isPicked = miniQuizAnswer === catKey;
                  return (
                    <button
                      key={catKey}
                      onClick={() => handleMiniQuizSubmit(catKey)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isPicked
                          ? catKey === activeItem.category
                            ? 'bg-emerald-500 text-white'
                            : 'bg-rose-500 text-white'
                          : 'bg-emerald-800 hover:bg-emerald-700 text-emerald-100'
                      }`}
                    >
                      {CATEGORIES[catKey].nameId.split(' ')[0]}
                    </button>
                  );
                })}
              </div>

              {miniQuizFeedback !== null && (
                <div className={`mt-3 p-2 rounded-xl text-xs font-bold text-center ${
                  miniQuizFeedback ? 'bg-emerald-600/60 text-emerald-200' : 'bg-rose-600/60 text-rose-200'
                }`}>
                  {miniQuizFeedback
                    ? '🎉 Hebat sekali! Jawabanmu 100% Benar!'
                    : '💡 Kurang tepat! Coba ingat kembali fungsinya di atas.'}
                </div>
              )}
            </div>

            {/* Modal Bottom Close */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Tutup & Eksplorasi Lainnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Tips: Buka minimal <strong>8 komponen</strong> untuk memperoleh lencana <em>Detektif Komponen</em>!
        </div>

        <button
          onClick={() => {
            playSound.correct();
            onComplete();
            onNext('simulation');
          }}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
        >
          <span>Lanjut ke Lab Rakit PC Virtual</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
