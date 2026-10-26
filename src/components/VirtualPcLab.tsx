import React, { useState } from 'react';
import { Wrench, CheckCircle2, RotateCcw, Power, Sparkles, ArrowRight, Volume2, ShieldCheck, Zap } from 'lucide-react';
import { SectionId } from '../types';
import { playSound, speakNarration } from '../utils/audio';

interface VirtualPcLabProps {
  onNext: (nextSec: SectionId) => void;
  onComplete: () => void;
  isMuted: boolean;
  onUnlockBadge: (badgeId: string) => void;
}

interface ComponentToInstall {
  id: string;
  name: string;
  slot: string;
  emoji: string;
  category: string;
  desc: string;
}

const PC_PARTS: ComponentToInstall[] = [
  { id: 'mb', name: 'Motherboard ATX', slot: 'Casing Chasis', emoji: '🧩', category: 'Papan Utama', desc: 'Papan sirkuit tempat bertumpunya semua komponen' },
  { id: 'cpu', name: 'Processor CPU Core i5', slot: 'Soket CPU', emoji: '⚡', category: 'Pemroses', desc: 'Otak penghitung logika dan instruksi' },
  { id: 'ram', name: 'RAM DDR4 16GB', slot: 'Slot DIMM', emoji: '🚀', category: 'Pemroses', desc: 'Memori kerja kilat sementara' },
  { id: 'gpu', name: 'GPU RTX Graphic Card', slot: 'Slot PCIe', emoji: '🎮', category: 'Pemroses Visual', desc: 'Pengolah grafis 3D dan game beresolusi tinggi' },
  { id: 'ssd', name: 'SSD NVMe 512GB', slot: 'Slot M.2', emoji: '💾', category: 'Penyimpanan', desc: 'Penyimpan sistem operasi secepat kilat' },
  { id: 'psu', name: 'Power Supply 550W', slot: 'Ruang PSU', emoji: '🔋', category: 'Penyalur Daya', desc: 'Penyalur arus listrik ke seluruh komponen' }
];

export const VirtualPcLab: React.FC<VirtualPcLabProps> = ({
  onNext,
  onComplete,
  isMuted,
  onUnlockBadge
}) => {
  const [installedParts, setInstalledParts] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);
  const [bootingAnim, setBootingAnim] = useState(false);

  const handleInstall = (partId: string) => {
    if (installedParts.includes(partId)) return;
    playSound.click();
    const nextParts = [...installedParts, partId];
    setInstalledParts(nextParts);

    if (nextParts.length === PC_PARTS.length) {
      playSound.correct();
    }
  };

  const handleBoot = () => {
    if (installedParts.length < PC_PARTS.length) {
      playSound.wrong();
      if (!isMuted) {
        speakNarration("Komponen belum lengkap! Pasang seluruh komponen ke dalam casing sebelum menyalakan daya.");
      }
      return;
    }

    playSound.bootUp();
    setBootingAnim(true);

    setTimeout(() => {
      setBootingAnim(false);
      setIsBooted(true);
      playSound.fanfare();
      onUnlockBadge('badge-builder');
      if (!isMuted) {
        speakNarration("Luar biasa! Sistem Komputer Berhasil Booting 100%! Kamu telah resmi menjadi Teknisi Siber Handal!");
      }
    }, 1200);
  };

  const handleReset = () => {
    playSound.click();
    setInstalledParts([]);
    setIsBooted(false);
  };

  const isComplete = installedParts.length === PC_PARTS.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full">
              Stasiun 5 • Praktik & Simulasi Lab
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              Laboratorium Virtual: Rakit Komputer Impian
            </h2>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-center cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Rakit Ulang</span>
        </button>
      </div>

      {/* Main Assembly Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left: Component Inventory */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm">
          <h4 className="font-heading font-bold text-sm text-slate-800 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Daftar Komponen Meja Lab</span>
            <span className="text-xs font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
              {installedParts.length} / {PC_PARTS.length} Terpasang
            </span>
          </h4>

          <div className="space-y-2.5">
            {PC_PARTS.map((part) => {
              const isInstalled = installedParts.includes(part.id);
              return (
                <button
                  key={part.id}
                  disabled={isInstalled}
                  onClick={() => handleInstall(part.id)}
                  className={`w-full p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isInstalled
                      ? 'bg-emerald-50 border-emerald-300 opacity-60 cursor-not-allowed'
                      : 'bg-white border-slate-200 hover:border-purple-500 hover:shadow-md active:scale-98'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-2xl shrink-0">
                    {part.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-heading font-bold text-xs sm:text-sm text-slate-800 truncate">
                        {part.name}
                      </h5>
                      <span className="text-[10px] font-bold text-slate-400">
                        {part.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {part.desc}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {isInstalled ? (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Pasang
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-xl">
                        + Pasang
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Computer Casing & Monitor Rig */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 text-white border-4 border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Casing Acrylic Window Look */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-mono text-slate-400 ml-2">CYBER-RIG V.7 [CASING INTERIOR]</span>
              </div>

              {isBooted && (
                <span className="text-xs font-mono font-bold text-emerald-400 animate-pulse flex items-center gap-1">
                  <Zap className="w-3 h-3" /> STATUS: SYSTEM ONLINE 240 FPS
                </span>
              )}
            </div>

            {/* Virtual Chassis Slot Display */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 min-h-[220px] relative">
              {installedParts.length === 0 ? (
                <div className="h-44 flex flex-col items-center justify-center text-center text-slate-500">
                  <Wrench className="w-10 h-10 mb-2 opacity-40 animate-bounce" />
                  <p className="text-xs font-semibold">Casing masih kosong melompong!</p>
                  <p className="text-[11px] text-slate-600">Klik tombol '+ Pasang' di sebelah kiri untuk memasukkan perangkat.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {installedParts.map((pId) => {
                    const comp = PC_PARTS.find(p => p.id === pId)!;
                    return (
                      <div
                        key={pId}
                        className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all ${
                          isBooted
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-900/30'
                            : 'bg-slate-900 border-purple-500/50 text-slate-200'
                        }`}
                      >
                        <span className="text-3xl mb-1">{comp.emoji}</span>
                        <span className="text-xs font-bold leading-tight truncate w-full">{comp.name}</span>
                        <span className="text-[10px] text-purple-300 font-mono mt-1">{comp.slot}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Booting Overlay screen */}
              {bootingAnim && (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center">
                  <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="font-mono text-xs text-amber-300 tracking-wider">BOOTING BIOS & CHECKING HARDWARE...</p>
                </div>
              )}

              {isBooted && (
                <div className="mt-4 p-3 bg-linear-to-r from-emerald-900/60 to-teal-900/60 rounded-xl border border-emerald-400 text-xs flex items-center justify-between">
                  <span className="font-mono text-emerald-200">
                    🎉 SUCCESS: Sistem Operasi Siap Digunakan!
                  </span>
                  <span className="text-amber-300 font-bold">+50 XP</span>
                </div>
              )}
            </div>
          </div>

            {/* Bottom Casing Power Controls */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              POWER SWITCH: {isBooted ? 'ON (RUNNING)' : 'STANDBY'}
            </span>

            <button
              onClick={handleBoot}
              disabled={bootingAnim || !isComplete}
              className={`px-6 py-3 rounded-2xl font-heading font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
                isBooted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : isComplete
                    ? 'bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 animate-pulse'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isBooted ? 'Komputer Menyala' : 'TEKAN TOMBOL POWER'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <span className="text-xs text-slate-500">
          Simulasi rakitan komputer melatih keterampilan logika sebab-akibat.
        </span>

        <button
          onClick={() => {
            playSound.correct();
            onComplete();
            onNext('practice');
          }}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
        >
          <span>Lanjut ke Latihan Cepat & Sortir</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
