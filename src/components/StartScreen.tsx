import React, { useState } from 'react';
import { Play, Sparkles, Volume2, ShieldCheck, User, Compass, Cpu, Monitor, Zap } from 'lucide-react';
import { playSound, speakNarration } from '../utils/audio';
import { requestFullscreenProgrammatic } from '../utils/fullscreen';

interface StartScreenProps {
  onStart: (name: string, avatar: string) => void;
  isMuted: boolean;
}

const AVATARS = [
  { id: 'robot', emoji: '🤖', name: 'Byte Si Robot' },
  { id: 'detective', emoji: '🕵️‍♂️', name: 'Detektif Siber' },
  { id: 'technician', emoji: '👩‍💻', name: 'Teknisi Cilik' },
  { id: 'astronaut', emoji: '🚀', name: 'Penjelajah Galaksi' },
];

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, isMuted }) => {
  const [studentName, setStudentName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].emoji);
  const [isStarting, setIsStarting] = useState(false);

  const handleAudioWelcome = () => {
    playSound.popup();
    if (!isMuted) {
      speakNarration(
        "Halo sahabat cerdas kelas tujuh! Selamat datang di Petualangan Siber Perangkat Keras Komputer. Tuliskan namamu, pilih avatarmu, lalu tekan tombol START besar berwarna hijau untuk memulai petualangan seru ini dalam mode layar penuh!"
      );
    }
  };

  const handleStartGame = async () => {
    setIsStarting(true);
    playSound.fanfare();

    // Trigger HTML5 Fullscreen API programmatically on user interaction
    try {
      await requestFullscreenProgrammatic(document.documentElement);
    } catch {
      // If fullscreen fails due to browser permission, proceed smoothly
    }

    const finalName = studentName.trim() || 'Siswa Siber VII';
    setTimeout(() => {
      onStart(finalName, selectedAvatar);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-radial from-emerald-600 via-emerald-800 to-teal-950 text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative Cyber Shapes in Background */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Badges */}
      <div className="absolute top-20 right-8 hidden lg:flex items-center gap-2 bg-emerald-700/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-emerald-400/30 text-emerald-200 text-sm shadow-xl animate-float">
        <Cpu className="w-5 h-5 text-amber-300" />
        <span>Sistem Komputer Kelas VII</span>
      </div>

      <div className="absolute bottom-24 left-8 hidden lg:flex items-center gap-2 bg-emerald-700/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-emerald-400/30 text-emerald-200 text-sm shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
        <Monitor className="w-5 h-5 text-teal-300" />
        <span>Kurikulum Merdeka • Deep Learning</span>
      </div>

      {/* Top Header Tag */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between z-10 pt-2">
        <div className="inline-flex items-center gap-2 bg-emerald-900/80 px-4 py-1.5 rounded-full border border-emerald-500/40 text-xs sm:text-sm font-semibold text-emerald-200 shadow-md">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>SMP KELAS VII • INFORMATIKA</span>
        </div>

        <button
          onClick={handleAudioWelcome}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-xs text-amber-200 font-semibold border border-emerald-400/40 shadow-sm transition-all active:scale-95 cursor-pointer"
          title="Dengarkan Sapaan Audio"
        >
          <Volume2 className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>Suara Petunjuk</span>
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="max-w-2xl mx-auto w-full my-auto z-10 text-center py-6">
        {/* Animated Mascot */}
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-linear-to-tr from-amber-400 to-yellow-300 p-2 shadow-2xl mx-auto flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer"
               onClick={handleAudioWelcome}>
            <span className="text-6xl sm:text-7xl animate-bounce" role="img" aria-label="Mascot">🤖</span>
          </div>
          <span className="absolute -bottom-2 -right-2 bg-emerald-950 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-400/60 shadow">
            Byte si Robot!
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md mb-2">
          PETUALANGAN SIBER
        </h1>
        <div className="inline-block px-4 py-1.5 bg-amber-400 text-emerald-950 rounded-2xl font-black text-sm sm:text-lg uppercase tracking-wider shadow-lg mb-4 transform -rotate-1">
          Ekspedisi Perangkat Keras Komputer
        </div>

        <p className="text-emerald-100 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
          Bantu Robot Byte menjelajahi 4 pulau komponen digital: <span className="text-amber-300 font-bold">Input</span>, <span className="text-sky-300 font-bold">Pemroses</span>, <span className="text-orange-300 font-bold">Output</span>, dan <span className="text-purple-300 font-bold">Penyimpanan</span>!
        </p>

        {/* Student Input & Avatar Choice */}
        <div className="bg-emerald-900/85 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-2 border-emerald-400/40 shadow-2xl text-left max-w-md mx-auto mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2 flex items-center gap-1.5">
            <User className="w-4 h-4 text-amber-300" />
            Tuliskan Nama / Nama Panggilanmu:
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Contoh: Budi Santoso / Rian"
            maxLength={25}
            className="w-full bg-emerald-950/90 border-2 border-emerald-600 focus:border-amber-400 focus:outline-none rounded-2xl px-4 py-3 text-white placeholder-emerald-500 font-semibold text-sm transition-all"
          />

          <div className="mt-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Pilih Avatar Karaktermu:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    playSound.click();
                    setSelectedAvatar(av.emoji);
                  }}
                  className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    selectedAvatar === av.emoji
                      ? 'bg-amber-400 text-emerald-950 border-white scale-105 shadow-md'
                      : 'bg-emerald-950/70 border-emerald-700/60 hover:bg-emerald-800 text-white'
                  }`}
                >
                  <span className="text-2xl">{av.emoji}</span>
                  <span className="text-[10px] font-bold truncate max-w-full">{av.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MANDATORY TRIGGER BUTTON "START" THAT ENTERS FULLSCREEN */}
        <div className="relative inline-block group">
          <div className="absolute -inset-1 bg-linear-to-r from-amber-400 via-yellow-300 to-lime-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
          
          <button
            id="start-button-trigger"
            onClick={handleStartGame}
            disabled={isStarting}
            className="relative px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-heading font-black text-2xl sm:text-3xl tracking-wide shadow-2xl border-4 border-white/80 transform hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer disabled:opacity-75"
          >
            <Play className="w-8 h-8 fill-current text-amber-300" />
            <span>START</span>
            <Zap className="w-6 h-6 text-yellow-300 animate-bounce" />
          </button>
        </div>

        {/* Small Notice explaining Fullscreen trigger */}
        <p className="text-[12px] text-emerald-300/80 mt-3 font-medium flex items-center justify-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          Menekan tombol <strong>START</strong> akan membuka pembelajaran dalam mode Fullscreen interaktif.
        </p>
      </div>

      {/* Footer Info */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-emerald-300/70 pb-2 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-emerald-700/50 pt-3">
        <span>Prinsip Pembelajaran: <strong>Mindful, Meaningful, & Joyful</strong></span>
        <span>Target Kelulusan Kuis: <strong>Minimal 80% (8 dari 10 Soal)</strong></span>
      </div>
    </div>
  );
};
