import React, { useState } from 'react';
import { Target, CheckCircle2, Award, Clock, Users, ArrowRight, Volume2, Sparkles, BookCheck } from 'lucide-react';
import { SectionId } from '../types';
import { playSound, speakNarration } from '../utils/audio';

interface ObjectivesSectionProps {
  onNext: (nextSec: SectionId) => void;
  onComplete: () => void;
  isMuted: boolean;
}

export const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({ onNext, onComplete, isMuted }) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (idx: number) => {
    playSound.click();
    if (checkedItems.includes(idx)) {
      setCheckedItems(checkedItems.filter(i => i !== idx));
    } else {
      setCheckedItems([...checkedItems, idx]);
    }
  };

  const handleAudio = () => {
    playSound.popup();
    if (!isMuted) {
      speakNarration(
        "Tujuan Pembelajaran kita hari ini: Siswa mampu mengelompokkan minimal 8 dari 10 jenis perangkat keras ke dalam kategori input, pemroses, output, dan penyimpanan dengan akurasi 80% sebelum pembelajaran berakhir. Tekan kotak centang untuk menandai pemahamanmu!"
      );
    }
  };

  const handleContinue = () => {
    playSound.correct();
    onComplete();
    onNext('aperception');
  };

  const CRITERIA_LIST = [
    {
      title: 'Tujuan Utama Pembelajaran',
      desc: 'Peserta didik mampu mengelompokkan minimal 8 dari 10 jenis perangkat keras ke dalam kategori input, pemroses, output, dan penyimpanan dengan akurasi 80% sebelum pembelajaran berakhir.',
      badge: 'Capaian Inti'
    },
    {
      title: 'Indikator Keberhasilan (80%)',
      desc: 'Menuntaskan Asesmen Sumatif 10 soal dan memperoleh skor minimal 80 poin (8 dari 10 soal dijawab dengan benar).',
      badge: 'Standar Kelulusan'
    },
    {
      title: 'Dimensi Profil Pelajar Pancasila',
      desc: 'Bernalar Kritis (menganalisis fungsi alat dan membedakan jenisnya) serta Mandiri (bereksplorasi secara aktif dalam simulasi lab).',
      badge: 'Karakter'
    },
    {
      title: 'Prinsip Pembelajaran Mendalam (Deep Learning)',
      desc: 'Mindful (Sadar penuh atas fungsi perangkat), Meaningful (Bermakna melalui analogi organ tubuh), dan Joyful (Menyenangkan lewat gamifikasi perakitan PC).',
      badge: 'Kurikulum Merdeka'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full">
              Stasiun 1 • Orientasi Misi
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              Tujuan Pembelajaran & Kriteria Keberhasilan
            </h2>
          </div>
        </div>

        <button
          onClick={handleAudio}
          className="p-2.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
          title="Dengarkan Narasi Tujuan"
        >
          <Volume2 className="w-4 h-4 text-emerald-700 animate-pulse" />
          <span className="hidden sm:inline">Dengarkan Narasi</span>
        </button>
      </div>

      {/* Meta context badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Alokasi Waktu</p>
            <p className="text-xs font-bold text-slate-700">2 × 40 Menit</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5">
          <Users className="w-5 h-5 text-teal-600" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Sasaran Siswa</p>
            <p className="text-xs font-bold text-slate-700">Kelas VII SMP (12-13 Th)</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5">
          <Award className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Kriteria Lulus</p>
            <p className="text-xs font-bold text-amber-700">Minimal 80% (8/10)</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Pendekatan</p>
            <p className="text-xs font-bold text-slate-700">Game-Based Learning</p>
          </div>
        </div>
      </div>

      {/* Main Checklist Cards */}
      <div className="space-y-4 mb-8">
        {CRITERIA_LIST.map((item, idx) => {
          const isDone = checkedItems.includes(idx);
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-md flex items-start gap-4 ${
                isDone 
                  ? 'bg-emerald-50 border-emerald-500' 
                  : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className={`mt-0.5 w-6 h-6 rounded-xl border-2 flex items-center justify-center shrink-0 transition-colors ${
                isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 text-transparent'
              }`}>
                <CheckCircle2 className="w-4 h-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading font-bold text-slate-800 text-base">
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <span className="text-xs text-slate-500">
          Klik setiap kartu di atas setelah membacanya!
        </span>

        <button
          onClick={handleContinue}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
        >
          <span>Lanjut ke Apersepsi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
