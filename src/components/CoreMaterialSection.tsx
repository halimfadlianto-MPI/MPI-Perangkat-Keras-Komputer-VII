import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  Volume2, 
  Brain, 
  Eye, 
  Megaphone, 
  Archive, 
  Cpu, 
  Layers, 
  Sparkles,
  ArrowDown,
  CheckCircle2
} from 'lucide-react';
import { SectionId, HardwareCategory } from '../types';
import { CATEGORIES } from '../data/hardwareData';
import { playSound, speakNarration } from '../utils/audio';

interface CoreMaterialSectionProps {
  onNext: (nextSec: SectionId) => void;
  onComplete: () => void;
  isMuted: boolean;
}

export const CoreMaterialSection: React.FC<CoreMaterialSectionProps> = ({ onNext, onComplete, isMuted }) => {
  const [activeCategory, setActiveCategory] = useState<HardwareCategory>('input');

  const categoryList: HardwareCategory[] = ['input', 'process', 'output', 'storage'];

  const handleAudioExplain = () => {
    playSound.popup();
    if (!isMuted) {
      const cat = CATEGORIES[activeCategory];
      speakNarration(
        `${cat.name}. ${cat.shortDesc}. Analogi manusia: ${cat.humanAnalogy}.`
      );
    }
  };

  const handleSelectTab = (catId: HardwareCategory) => {
    playSound.click();
    setActiveCategory(catId);
  };

  const currentCat = CATEGORIES[activeCategory];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-0.5 rounded-full">
              Stasiun 3 • Naskah Materi Pokok
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              4 Pilar Perangkat Keras Komputer
            </h2>
          </div>
        </div>

        <button
          onClick={handleAudioExplain}
          className="p-2.5 rounded-2xl bg-blue-100 hover:bg-blue-200 text-blue-800 transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
          title="Dengarkan Narasi Materi"
        >
          <Volume2 className="w-4 h-4 text-blue-700 animate-pulse" />
          <span className="hidden sm:inline">Dengar Materi</span>
        </button>
      </div>

      {/* IPOS Cycle Infographic Banner */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm mb-6">
        <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Siklus IPOS (Input - Process - Output - Storage)
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
            <span className="text-xs font-black text-emerald-800 uppercase block">1. INPUT</span>
            <p className="text-[11px] text-emerald-600 mt-1">Data / Perintah dimasukkan pengguna</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200">
            <span className="text-xs font-black text-blue-800 uppercase block">2. PROCESS</span>
            <p className="text-[11px] text-blue-600 mt-1">CPU & RAM mengolah dan menghitung data</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
            <span className="text-xs font-black text-amber-800 uppercase block">3. OUTPUT</span>
            <p className="text-[11px] text-amber-600 mt-1">Hasil ditampilkan di layar atau cetakan</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
            <span className="text-xs font-black text-purple-800 uppercase block">4. STORAGE</span>
            <p className="text-[11px] text-purple-600 mt-1">File disimpan permanen di SSD / HDD</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {categoryList.map((catId) => {
          const c = CATEGORIES[catId];
          const isSelected = activeCategory === catId;
          return (
            <button
              key={catId}
              onClick={() => handleSelectTab(catId)}
              className={`p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm transition-all flex flex-col items-center gap-1.5 cursor-pointer shadow-xs ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-102'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}
            >
              <span className="text-xl">
                {catId === 'input' && '🖱️'}
                {catId === 'process' && '🧠'}
                {catId === 'output' && '🖥️'}
                {catId === 'storage' && '💾'}
              </span>
              <span>{c.nameId}</span>
            </button>
          );
        })}
      </div>

      {/* Main Feature Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-emerald-500/40 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Kategori Terpilih
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-800 mt-1">
              {currentCat.name}
            </h3>
          </div>

          {/* Analogy badge */}
          <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-xs flex items-center gap-2 max-w-md">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-bold text-amber-900">Analogi Tubuh Manusia:</p>
              <p className="text-amber-800 text-[11px] leading-tight">{currentCat.humanAnalogy}</p>
            </div>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="py-6">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            {currentCat.shortDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h5 className="font-heading font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Ciri Utama & Peran:
              </h5>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                {activeCategory === 'input' && (
                  <>
                    <li>Berinteraksi langsung dengan pengguna manusia.</li>
                    <li>Mengubah aksi fisik (ketikan, klik, suara, cahaya) menjadi kode sinyal digital.</li>
                    <li>Contoh: Keyboard, Mouse, Microphone, Webcam, Scanner.</li>
                  </>
                )}
                {activeCategory === 'process' && (
                  <>
                    <li>Bekerja di dalam casing (Motherboard) tanpa perlu disentuh langsung.</li>
                    <li>Melakukan triliunan kalkulasi logika dan pengolahan data biner.</li>
                    <li>Contoh: CPU (Prosesor), RAM (Memori Utama), GPU (Kartu Grafis).</li>
                  </>
                )}
                {activeCategory === 'output' && (
                  <>
                    <li>Menerjemahkan bahasa biner 0 dan 1 menjadi hal yang bisa dimengerti indra kita.</li>
                    <li>Bisa berupa tampilan visual, suara audio, getaran, atau kertas cetakan.</li>
                    <li>Contoh: Monitor, Speaker, Headphone, Printer, Proyektor.</li>
                  </>
                )}
                {activeCategory === 'storage' && (
                  <>
                    <li>Menyimpan file secara tahan lama (Non-Volatile) agar tidak hilang.</li>
                    <li>Dapat dibaca dan ditulis ulang berkali-kali sesuai kebutuhan belajar.</li>
                    <li>Contoh: SSD (Super cepat), Harddisk (Kapasitas jumbo), Flashdisk, Google Drive.</li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <h5 className="font-heading font-bold text-emerald-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Tips Mengingat Cepat:
              </h5>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {activeCategory === 'input' && "Ingat kata 'IN' (Masuk): Segala alat yang bertugas MEMASUKKAN perintah ke komputer adalah Input!"}
                {activeCategory === 'process' && "Ingat kata 'OTAK': Segala komponen yang bertugas BERPIKIR dan MENGHITUNG di dalam PC adalah Pemroses!"}
                {activeCategory === 'output' && "Ingat kata 'OUT' (Keluar): Segala alat yang bertugas MENGELUARKAN hasil olahan ke mata dan telinga kita adalah Output!"}
                {activeCategory === 'storage' && "Ingat kata 'SIMPAN': Segala tempat untuk MENYIMPAN file tugas agar tidak lenyap saat listrik mati adalah Penyimpanan!"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <span className="text-xs text-slate-500">
          Siap menekan gambar perangkat keras dan membuka pop-up penjelasannya?
        </span>

        <button
          onClick={() => {
            playSound.correct();
            onComplete();
            onNext('exploration');
          }}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
        >
          <span>Lanjut ke Eksplorasi Pop-up</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
