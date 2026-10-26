import React from 'react';
import { X, BookOpen, Volume2, Maximize, MousePointerClick, Wrench, CheckCircle2, Keyboard } from 'lucide-react';
import { playSound } from '../utils/audio';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-emerald-500 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSound.click();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
              Buku Panduan Siswa
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-800">
              Petunjuk Penggunaan Aplikasi MPI
            </h3>
          </div>
        </div>

        <div className="space-y-4 mb-6 text-xs sm:text-sm text-slate-700">
          {/* Item 1 */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <Maximize className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-emerald-900 mb-0.5">1. Mode Layar Penuh (Fullscreen)</h5>
              <p className="leading-relaxed">
                Aplikasi dirancang otomatis masuk ke mode Fullscreen saat tombol <strong>START</strong> diklik. Kamu juga bisa menekan ikon layar di bilah navigasi atas atau menekan tombol <strong>Esc</strong> pada keyboard untuk keluar kapan saja.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-start gap-3">
            <MousePointerClick className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-teal-900 mb-0.5">2. Menekan Gambar untuk Membuka Pop-Up</h5>
              <p className="leading-relaxed">
                Di stasiun <strong>Eksplorasi Interaktif</strong>, sentuh atau klik kartu bergambar perangkat keras komputer. Jendela pop-up akan terbuka menampilkan foto, cara kerja, fakta seru, dan kuis kilat!
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <Volume2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-amber-900 mb-0.5">3. Bantuan Audio & Pembaca Suara (TTS)</h5>
              <p className="leading-relaxed">
                Bagi kamu yang lebih nyaman mendengarkan suara, tekan tombol berikon <strong>Speaker</strong> di setiap halaman untuk mendengarkan narasi ramah dalam Bahasa Indonesia.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-3">
            <Wrench className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-purple-900 mb-0.5">4. Simulasi Lab & Kuis Sumatif</h5>
              <p className="leading-relaxed">
                Rakit komputer di lab virtual, selesaikan latihan sortir, dan tuntaskan 10 soal asesmen dengan nilai minimal <strong>80%</strong> untuk mencetak Sertifikat Kelulusan resmi!
              </p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Keyboard className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-slate-900 mb-0.5">5. Navigasi Keyboard</h5>
              <p className="leading-relaxed">
                Gunakan tombol <strong>Tab</strong> untuk berpindah antar tombol interaktif dan tekan <strong>Enter/Spasi</strong> untuk memilih.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-all shadow-md"
          >
            Mengerti & Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
