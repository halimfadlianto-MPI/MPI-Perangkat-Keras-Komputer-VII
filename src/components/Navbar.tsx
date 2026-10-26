import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  BookOpen, 
  Award, 
  Sparkles, 
  FileText,
  Home
} from 'lucide-react';
import { SectionId, UserProgress } from '../types';
import { playSound, stopNarration } from '../utils/audio';
import { isCurrentlyFullscreen, requestFullscreenProgrammatic, exitFullscreenProgrammatic } from '../utils/fullscreen';

interface NavbarProps {
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
  userProgress: UserProgress;
  onOpenGuide: () => void;
  onOpenDesignDoc: () => void;
  onOpenCertificate: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  userProgress,
  onOpenGuide,
  onOpenDesignDoc,
  onOpenCertificate,
  isMuted,
  onToggleMute,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(isCurrentlyFullscreen());
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    playSound.click();
    if (isCurrentlyFullscreen()) {
      await exitFullscreenProgrammatic();
    } else {
      await requestFullscreenProgrammatic();
    }
  };

  const handleNav = (sec: SectionId) => {
    playSound.click();
    stopNarration();
    onNavigate(sec);
  };

  if (currentSection === 'start') {
    return null; // Start screen has its own clean immersion
  }

  return (
    <header className="sticky top-0 z-40 bg-emerald-700/95 backdrop-blur-md text-white shadow-lg border-b-4 border-emerald-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleNav('menu')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            title="Kembali ke Menu Utama"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-400 p-1.5 shadow-md flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <span className="text-2xl" role="img" aria-label="Robot Icon">🤖</span>
            </div>
            <div>
              <span className="font-heading text-lg sm:text-xl font-bold tracking-wide text-white block group-hover:text-amber-300 transition-colors">
                SIBER HARDWARE
              </span>
              <span className="text-[11px] text-emerald-200 hidden sm:block font-medium">
                Informatika Kelas VII • Kurikulum Merdeka
              </span>
            </div>
          </button>
        </div>

        {/* Center: Student Badge & Score */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-emerald-800/80 px-3 py-1.5 rounded-full flex items-center gap-2 border border-emerald-600/50 text-xs sm:text-sm font-semibold shadow-inner">
            <span className="text-base">{userProgress.avatar || '🚀'}</span>
            <span className="truncate max-w-[90px] sm:max-w-[120px] text-amber-200">
              {userProgress.studentName || 'Siswa Siber'}
            </span>
            <div className="w-px h-3 bg-emerald-600"></div>
            <div className="flex items-center gap-1 text-amber-300">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{userProgress.score} Poin</span>
            </div>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Menu Button */}
          {currentSection !== 'menu' && (
            <button
              onClick={() => handleNav('menu')}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Menu Utama"
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Menu</span>
            </button>
          )}

          {/* Guide Button */}
          <button
            onClick={() => {
              playSound.click();
              onOpenGuide();
            }}
            className="p-2 rounded-xl bg-emerald-800/90 hover:bg-emerald-600 text-emerald-100 hover:text-white transition-all border border-emerald-600/60 active:scale-95"
            title="Petunjuk Penggunaan"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              playSound.click();
              onToggleMute();
            }}
            className={`p-2 rounded-xl border transition-all active:scale-95 ${
              isMuted 
                ? 'bg-rose-900/60 text-rose-200 border-rose-600/50' 
                : 'bg-emerald-800/90 text-amber-300 border-emerald-600/60 hover:bg-emerald-600'
            }`}
            title={isMuted ? 'Nyalakan Audio' : 'Bisukan Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Fullscreen Programmatic Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-emerald-800/90 hover:bg-emerald-600 text-emerald-100 hover:text-white transition-all border border-emerald-600/60 active:scale-95"
            title={isFullscreen ? 'Keluar Fullscreen (Esc)' : 'Mode Layar Penuh (Fullscreen)'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4 text-amber-300" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Certificate / Badge Trigger */}
          <button
            onClick={() => {
              playSound.click();
              onOpenCertificate();
            }}
            className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-1 transition-all shadow-sm active:scale-95"
            title="Lihat Sertifikat & Badge"
          >
            <Award className="w-4 h-4 text-emerald-950" />
            <span className="hidden lg:inline">Sertifikat</span>
          </button>

          {/* Design Document (23 Poin) Button */}
          <button
            onClick={() => {
              playSound.click();
              onOpenDesignDoc();
            }}
            className="px-2.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm border border-teal-400/40 active:scale-95"
            title="Lihat Rancangan Konsep & Storyboard Lengkap (23 Bab)"
          >
            <FileText className="w-4 h-4 text-amber-200" />
            <span className="hidden xl:inline">Rancangan MPI (23 Bab)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
