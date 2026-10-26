import React from 'react';
import { 
  Compass, 
  HelpCircle, 
  Lightbulb, 
  BookOpen, 
  Search, 
  Wrench, 
  Layers, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  FileText,
  Heart,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { SectionId, UserProgress } from '../types';
import { playSound, speakNarration } from '../utils/audio';

interface MainMenuProps {
  onNavigate: (section: SectionId) => void;
  userProgress: UserProgress;
  isMuted: boolean;
  onOpenDesignDoc: () => void;
}

interface MenuStation {
  id: SectionId;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  badge: string;
  completed: boolean;
  xp: number;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onNavigate,
  userProgress,
  isMuted,
  onOpenDesignDoc
}) => {
  const STATIONS: MenuStation[] = [
    {
      id: 'objectives',
      title: '1. Peta & Tujuan Belajar',
      subtitle: 'Target kompetensi, kriteria 80%, & capaian Informatika',
      icon: Compass,
      color: 'bg-emerald-600',
      badge: 'Orientasi',
      completed: userProgress.completedSections.includes('objectives'),
      xp: 20
    },
    {
      id: 'aperception',
      title: '2. Apersepsi: Misteri PC Mati',
      subtitle: 'Studi kasus pemantik & dilema laboratorium komputer',
      icon: Lightbulb,
      color: 'bg-amber-500',
      badge: 'Kasus Awal',
      completed: userProgress.completedSections.includes('aperception'),
      xp: 30
    },
    {
      id: 'material',
      title: '3. Naskah Materi 4 Pilar',
      subtitle: 'Konsep Input, Pemroses, Output, & Penyimpanan',
      icon: BookOpen,
      color: 'bg-blue-600',
      badge: 'Konsep Kunci',
      completed: userProgress.completedSections.includes('material'),
      xp: 40
    },
    {
      id: 'exploration',
      title: '4. Eksplorasi Interaktif Pop-up',
      subtitle: 'Tekan gambar perangkat keras & pelajari rahasianya',
      icon: Search,
      color: 'bg-emerald-700',
      badge: 'Wajib Coba!',
      completed: userProgress.completedSections.includes('exploration'),
      xp: 50
    },
    {
      id: 'simulation',
      title: '5. Simulasi: Rakit Komputer',
      subtitle: 'Pasang CPU, RAM, GPU & uji coba tombol power PC!',
      icon: Wrench,
      color: 'bg-purple-600',
      badge: 'Lab Virtual',
      completed: userProgress.completedSections.includes('simulation'),
      xp: 50
    },
    {
      id: 'practice',
      title: '6. Latihan Cepat & Sortir',
      subtitle: 'Flashcard kilat & tantangan mengelompokkan part',
      icon: Layers,
      color: 'bg-teal-600',
      badge: 'Tantangan',
      completed: userProgress.completedSections.includes('practice'),
      xp: 30
    },
    {
      id: 'quiz',
      title: '7. Asesmen Sumatif (10 Soal)',
      subtitle: 'Uji kemampuan analitis dengan target lulus 80%',
      icon: CheckCircle2,
      color: 'bg-rose-600',
      badge: 'Target Min 80%',
      completed: userProgress.quizPassed,
      xp: 100
    },
    {
      id: 'summary',
      title: '8. Rangkuman & Refleksi',
      subtitle: 'Mind map visual, refleksi diri, & unduh sertifikat resmi',
      icon: Award,
      color: 'bg-amber-600',
      badge: 'Klaim Badge',
      completed: userProgress.completedSections.includes('reflection'),
      xp: 30
    }
  ];

  const handleSelectStation = (stationId: SectionId) => {
    playSound.click();
    onNavigate(stationId);
  };

  const handleSpeakMenuIntro = () => {
    playSound.popup();
    if (!isMuted) {
      speakNarration(
        `Halo ${userProgress.studentName}! Ini adalah Peta Petualangan Siber Perangkat Keras Komputer. Kamu bisa menjelajahi modul secara bertahap mulai dari Tujuan Belajar, Apersepsi, Eksplorasi Menekan Gambar, Rakit PC Virtual, hingga Asesmen Akhir 10 Soal untuk meraih Sertifikat Siber Master!`
      );
    }
  };

  const completedCount = STATIONS.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / STATIONS.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 border-emerald-500/30 mb-8 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400 p-2 shadow-lg flex items-center justify-center shrink-0 border-2 border-white/60">
              <span className="text-4xl sm:text-5xl">{userProgress.avatar || '🤖'}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider font-extrabold bg-emerald-950/60 px-3 py-0.5 rounded-full text-amber-300">
                  Agen Peneliti Muda
                </span>
                <button
                  onClick={handleSpeakMenuIntro}
                  className="p-1 rounded-full bg-emerald-500/50 hover:bg-emerald-400 text-white transition-all"
                  title="Dengarkan Panduan Menu"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black">
                Selamat Datang, {userProgress.studentName}!
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
                Selesaikan seluruh stasiun misi di bawah ini untuk membuka predikat <strong>Siber Master Hardware</strong> dan mencetak sertifikat prestasimu!
              </p>
            </div>
          </div>

          {/* Quick Progress Bar */}
          <div className="bg-emerald-950/70 p-4 rounded-2xl border border-emerald-400/30 md:min-w-[260px]">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-emerald-200">Progress Ekspedisi</span>
              <span className="text-amber-300">{progressPercent}% ({completedCount}/8)</span>
            </div>
            <div className="w-full h-3 bg-emerald-900 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-linear-to-r from-amber-400 to-lime-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="mt-2 text-[11px] text-emerald-300 flex items-center justify-between">
              <span>Total Poin: <strong className="text-amber-300">{userProgress.score} XP</strong></span>
              <span>Target Asesmen: <strong className="text-amber-300">80%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Learning Stations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-900 flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-600" />
            Peta Stasiun Pembelajaran
          </h3>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Klik salah satu modul untuk mulai
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATIONS.map((station) => {
            const Icon = station.icon;
            return (
              <button
                key={station.id}
                onClick={() => handleSelectStation(station.id)}
                className={`relative group p-5 rounded-3xl border-3 text-left transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 bg-white ${
                  station.completed 
                    ? 'border-emerald-500 hover:border-emerald-600' 
                    : 'border-slate-200 hover:border-emerald-400'
                }`}
              >
                {/* Station Badge Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                    {station.badge}
                  </span>
                  {station.completed ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      +{station.xp} Poin
                    </span>
                  )}
                </div>

                {/* Station Icon & Title */}
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-2xl ${station.color} text-white p-2.5 flex items-center justify-center shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base sm:text-lg text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                      {station.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {station.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                  <span>Masuki Stasiun</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Feature Callout (Kurikulum Merdeka Deep Learning) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-heading font-bold text-emerald-900 text-sm">Mindful (Sadar Penuh)</h5>
            <p className="text-xs text-emerald-700 mt-0.5">
              Fokus menyimak alur kerja data komputer dari indra input hingga proses dan output.
            </p>
          </div>
        </div>

        <div className="bg-teal-50 rounded-2xl p-4 border border-teal-200 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-heading font-bold text-teal-900 text-sm">Meaningful (Bermakna)</h5>
            <p className="text-xs text-teal-700 mt-0.5">
              Menghubungkan fungsi perangkat keras dengan analogi nyata tubuh manusia dan kehidupan harian.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-heading font-bold text-amber-900 text-sm">Joyful (Menyenangkan)</h5>
            <p className="text-xs text-amber-700 mt-0.5">
              Game rakit PC, eksplorasi pop-up interaktif, dan kuis berhadiah sertifikat prestasi resmi.
            </p>
          </div>
        </div>
      </div>

      {/* Teacher / Assessor Tool Banner (Dokumen 23 Bab Lengkap) */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-base text-amber-300">
              Dokumen Lengkap Perancangan MPI (23 Bab & Storyboard)
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Tersedia naskah konsep, analisis pedagogis, storyboard komprehensif, prompt kode & aset, serta rubrik asesmen Kurikulum Merdeka.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onOpenDesignDoc();
          }}
          className="px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Buka Dokumen Naskah
        </button>
      </div>
    </div>
  );
};
