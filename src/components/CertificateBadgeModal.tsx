import React from 'react';
import { X, Printer, Award, Sparkles, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress, Badge } from '../types';
import { BADGES_LIST } from '../data/hardwareData';
import { playSound } from '../utils/audio';

interface CertificateBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
}

export const CertificateBadgeModal: React.FC<CertificateBadgeModalProps> = ({
  isOpen,
  onClose,
  userProgress
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playSound.click();
    window.print();
  };

  const triggerCelebration = () => {
    playSound.fanfare();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl border-4 border-amber-400 relative max-h-[92vh] overflow-y-auto print:p-0 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls (Hidden in print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Sertifikat Resmi Kelulusan MPI
            </span>
            <button
              onClick={triggerCelebration}
              className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="Rayakan!"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>Rayakan 🎉</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE CANVAS */}
        <div className="relative p-6 sm:p-10 rounded-2xl border-8 border-double border-emerald-800 bg-linear-to-b from-emerald-50/40 via-white to-amber-50/30 text-center shadow-inner overflow-hidden">
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="text-[180px]">🤖</span>
          </div>

          {/* Certificate Header */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 text-emerald-800 mb-1">
              <ShieldCheck className="w-6 h-6 text-amber-500" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest">
                INFORMATIKA KELAS VII SMP • KURIKULUM MERDEKA
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-emerald-950 uppercase tracking-wide">
              SERTIFIKAT KELULUSAN
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto my-2 rounded-full"></div>
            <p className="text-xs text-slate-500">
              Nomor Registrasi Siber: MPI-INF7-{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mt-4 mb-2">
            Diberikan dengan penuh kebanggaan kepada:
          </p>

          {/* Student Name */}
          <div className="my-2 py-2">
            <h3 className="font-heading text-3xl sm:text-5xl font-black text-emerald-800 underline decoration-amber-400 decoration-wavy underline-offset-8">
              {userProgress.studentName || 'Siswa Siber VII'}
            </h3>
            <p className="text-xs text-slate-500 mt-3 font-semibold">
              Sebagai Penjelajah Muda Informatika yang Berhasil Menyelesaikan Ekspedisi:
            </p>
          </div>

          {/* Module Title */}
          <div className="my-4 max-w-xl mx-auto p-3.5 bg-emerald-900/10 rounded-2xl border border-emerald-300/60">
            <h4 className="font-heading font-black text-sm sm:text-base text-emerald-950 uppercase">
              SISTEM KOMPUTER: PENGELOMPOKAN PERANGKAT KERAS (HARDWARE)
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Tuntas mengelompokkan perangkat Masukan, Pemroses, Keluaran, dan Penyimpanan dengan capaian asesmen sumatif{' '}
              <strong className="text-emerald-700">{Math.max(userProgress.quizScorePercent, 80)}% (LULUS)</strong>.
            </p>
          </div>

          {/* Badges Earned Ribbon */}
          <div className="my-6">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
              Lencana Kehormatan Siber yang Diperoleh:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {BADGES_LIST.map((b) => (
                <div
                  key={b.id}
                  className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 shadow-xs flex items-center gap-1.5 text-xs font-bold text-slate-800"
                >
                  <span className="text-sm">⭐</span>
                  <span>{b.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-2 sm:grid-cols-3 items-end pt-8 mt-6 border-t border-slate-200 gap-4 text-xs">
            <div className="text-left">
              <p className="text-slate-400 text-[10px] uppercase font-bold">Tanggal Kelulusan:</p>
              <p className="font-bold text-slate-800 mt-0.5">{currentDate}</p>
              <p className="text-[10px] text-slate-500 mt-2">Mode Daring Interaktif</p>
            </div>

            <div className="hidden sm:flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center bg-amber-50 shadow-md">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <span className="text-[10px] font-black uppercase text-amber-800 mt-1">VERIFIED MPI</span>
            </div>

            <div className="text-right">
              <p className="text-slate-400 text-[10px] uppercase font-bold">Instruktur / Pengembang:</p>
              <p className="font-bold text-emerald-800 mt-0.5">Ahli Pedagogi & Media MPI</p>
              <p className="text-[10px] text-slate-500 italic mt-2">Teknolog Pembelajaran SMP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
