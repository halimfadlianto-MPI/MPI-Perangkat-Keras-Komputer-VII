import React, { useState } from 'react';
import { Heart, Sparkles, Lightbulb, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionId, UserProgress } from '../types';
import { playSound } from '../utils/audio';

interface ReflectionSectionProps {
  onNext: (nextSec: SectionId) => void;
  onComplete: () => void;
  userProgress: UserProgress;
  onSaveReflection: (reflection: { mindful: string; meaningful: string; joyful: string }) => void;
  onOpenCertificate: () => void;
}

export const ReflectionSection: React.FC<ReflectionSectionProps> = ({
  onNext,
  onComplete,
  userProgress,
  onSaveReflection,
  onOpenCertificate
}) => {
  const [mindful, setMindful] = useState(userProgress.reflection?.mindful || 'Saya menyadari bahwa komputer adalah satu kesatuan sistem di mana semua komponen harus bekerja sama seperti organ tubuh kita.');
  const [meaningful, setMeaningful] = useState(userProgress.reflection?.meaningful || 'Sekarang saya mengerti fungsi RAM dan SSD, jadi saya tidak bingung lagi saat melihat spesifikasi laptop untuk belajar.');
  const [joyful, setJoyful] = useState(userProgress.reflection?.joyful || 'Bagian paling menyenangkan adalah saat merakit komputer di lab virtual dan menekan tombol power hingga PC berhasil booting!');

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound.correct();
    onSaveReflection({ mindful, meaningful, joyful });
    setSaved(true);
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
          <Heart className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full">
            Kurikulum Merdeka • Deep Learning
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800">
            Refleksi 3 Dimensi: Mindful, Meaningful, & Joyful
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. MINDFUL */}
        <div className="bg-emerald-50 rounded-3xl p-6 border-2 border-emerald-300 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🧘‍♂️</span>
            <h4 className="font-heading font-black text-base text-emerald-950">
              1. Mindful (Kesadaran Penuh)
            </h4>
          </div>
          <p className="text-xs text-emerald-800 mb-3 font-semibold">
            Apa hal baru yang membuatmu paling sadar dan fokus tentang bagaimana perangkat komputer saling bekerja sama?
          </p>
          <textarea
            rows={3}
            value={mindful}
            onChange={(e) => setMindful(e.target.value)}
            className="w-full bg-white border border-emerald-300 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-emerald-600 font-medium leading-relaxed"
            placeholder="Tuliskan refleksimu di sini..."
          />
        </div>

        {/* 2. MEANINGFUL */}
        <div className="bg-teal-50 rounded-3xl p-6 border-2 border-teal-300 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌱</span>
            <h4 className="font-heading font-black text-base text-teal-950">
              2. Meaningful (Kebermaknaan Nyata)
            </h4>
          </div>
          <p className="text-xs text-teal-800 mb-3 font-semibold">
            Bagaimana pengetahuan tentang 4 kategori perangkat keras ini berguna dalam kehidupan sehari-harimu?
          </p>
          <textarea
            rows={3}
            value={meaningful}
            onChange={(e) => setMeaningful(e.target.value)}
            className="w-full bg-white border border-teal-300 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-teal-600 font-medium leading-relaxed"
            placeholder="Tuliskan manfaat nyatanya..."
          />
        </div>

        {/* 3. JOYFUL */}
        <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-300 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🎉</span>
            <h4 className="font-heading font-black text-base text-amber-950">
              3. Joyful (Kegembiraan Belajar)
            </h4>
          </div>
          <p className="text-xs text-amber-800 mb-3 font-semibold">
            Aktivitas apa di dalam aplikasi ini yang paling membuatmu senang, tertantang, dan bersemangat?
          </p>
          <textarea
            rows={3}
            value={joyful}
            onChange={(e) => setJoyful(e.target.value)}
            className="w-full bg-white border border-amber-300 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-amber-600 font-medium leading-relaxed"
            placeholder="Tuliskan pengalaman yang paling berkesan..."
          />
        </div>

        {/* Submit & Certificate triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Simpan Lembar Refleksi</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound.fanfare();
              onOpenCertificate();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-linear-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all active:scale-95"
          >
            <Award className="w-5 h-5 text-emerald-950" />
            <span>Buka Sertifikat & Lencana</span>
          </button>
        </div>
      </form>
    </div>
  );
};
