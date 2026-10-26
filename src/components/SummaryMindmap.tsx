import React from 'react';
import { Award, ArrowRight, Brain, Eye, Megaphone, Archive, Cpu, CheckCircle2, Sparkles, Printer } from 'lucide-react';
import { SectionId } from '../types';
import { playSound } from '../utils/audio';

interface SummaryMindmapProps {
  onNext: (nextSec: SectionId) => void;
  onComplete: () => void;
}

export const SummaryMindmap: React.FC<SummaryMindmapProps> = ({ onNext, onComplete }) => {
  const handlePrintSummary = () => {
    playSound.click();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full">
              Stasiun 8 • Rangkuman Infografik
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              Peta Konsep & Rangkuman Sistem Komputer
            </h2>
          </div>
        </div>

        <button
          onClick={handlePrintSummary}
          className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-center cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>Cetak Rangkuman</span>
        </button>
      </div>

      {/* Visual Mind Map Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-400/50 shadow-xl mb-8">
        {/* Core Center Node */}
        <div className="max-w-xs mx-auto mb-8 p-4 rounded-3xl bg-linear-to-r from-emerald-600 to-teal-700 text-white text-center shadow-xl border-4 border-white">
          <span className="text-xs font-black uppercase tracking-wider text-amber-300">Sistem Komputer SMP</span>
          <h3 className="font-heading text-xl font-black">PERANGKAT KERAS (HARDWARE)</h3>
          <p className="text-[11px] text-emerald-100 mt-1">Komponen fisik yang bisa dilihat dan disentuh</p>
        </div>

        {/* 4 Pillars Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="bg-emerald-50 rounded-2xl p-5 border-2 border-emerald-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📥</span>
              <h4 className="font-heading font-black text-base text-emerald-950">
                1. PERANGKAT MASUKAN (INPUT)
              </h4>
            </div>
            <p className="text-xs text-emerald-800 mb-3 font-semibold">
              Analogi: <em>Indra Manusia (Mata, Telinga, Kulit)</em>
            </p>
            <ul className="text-xs text-emerald-900 space-y-1.5 list-disc list-inside">
              <li><strong>Keyboard:</strong> Mengetik huruf, angka, dan perintah.</li>
              <li><strong>Mouse:</strong> Menggerakkan kursor dan memilih menu.</li>
              <li><strong>Microphone:</strong> Menangkap suara analog jadi sinyal digital.</li>
              <li><strong>Webcam:</strong> Merekam visual video dunia nyata.</li>
            </ul>
          </div>

          {/* Process */}
          <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚙️</span>
              <h4 className="font-heading font-black text-base text-blue-950">
                2. PERANGKAT PEMROSES (PROCESS)
              </h4>
            </div>
            <p className="text-xs text-blue-800 mb-3 font-semibold">
              Analogi: <em>Otak Manusia yang Berpikir Cepat</em>
            </p>
            <ul className="text-xs text-blue-900 space-y-1.5 list-disc list-inside">
              <li><strong>CPU:</strong> Otak penghitung logika dan eksekusi instruksi.</li>
              <li><strong>RAM:</strong> Memori kerja cepat tempat aplikasi dibuka sementara.</li>
              <li><strong>GPU:</strong> Pengolah grafis visual 3D dan game berkecepatan tinggi.</li>
              <li><strong>Motherboard:</strong> Papan sirkuit tulang belakang penghubung.</li>
            </ul>
          </div>

          {/* Output */}
          <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📤</span>
              <h4 className="font-heading font-black text-base text-amber-950">
                3. PERANGKAT KELUARAN (OUTPUT)
              </h4>
            </div>
            <p className="text-xs text-amber-800 mb-3 font-semibold">
              Analogi: <em>Mulut Berbicara & Tangan Menulis</em>
            </p>
            <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
              <li><strong>Monitor:</strong> Menampilkan gambar antarmuka sistem.</li>
              <li><strong>Speaker:</strong> Mengeluarkan gelombang suara dan musik.</li>
              <li><strong>Printer:</strong> Mencetak dokumen fisik di lembaran kertas.</li>
              <li><strong>Proyektor:</strong> Memancarkan visual ke dinding/layar lebar.</li>
            </ul>
          </div>

          {/* Storage */}
          <div className="bg-purple-50 rounded-2xl p-5 border-2 border-purple-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🗄️</span>
              <h4 className="font-heading font-black text-base text-purple-950">
                4. PERANGKAT PENYIMPANAN (STORAGE)
              </h4>
            </div>
            <p className="text-xs text-purple-800 mb-3 font-semibold">
              Analogi: <em>Ingatan Jangka Panjang & Lemari Arsip</em>
            </p>
            <ul className="text-xs text-purple-900 space-y-1.5 list-disc list-inside">
              <li><strong>SSD:</strong> Penyimpan kilat chip flash tanpa bagian bergerak.</li>
              <li><strong>HDD:</strong> Gudang arsip kapasitas raksasa piringan magnetik.</li>
              <li><strong>Flashdisk:</strong> Alat simpan saku praktis portabel.</li>
              <li><strong>Cloud Storage:</strong> Brankas simpan di server internet (Google Drive).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <span className="text-xs text-slate-500">
          Langkah terakhir: Isi Refleksi Deep Learning (Mindful, Meaningful, Joyful).
        </span>

        <button
          onClick={() => {
            playSound.correct();
            onComplete();
            onNext('reflection');
          }}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
        >
          <span>Lanjut ke Refleksi Belajar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
