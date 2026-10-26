import React, { useState } from 'react';
import { X, Copy, Check, FileText, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

interface DesignDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignDocumentModal: React.FC<DesignDocumentModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'chapters'>('preview');

  if (!isOpen) return null;

  const handleCopyAll = () => {
    playSound.click();
    navigator.clipboard.writeText(DESIGN_DOCUMENT_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border-4 border-teal-500 relative max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                Dokumen Kurikulum Merdeka
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-black text-slate-800">
                Naskah Perancangan & Storyboard Lengkap (23 Format Poin)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title="Salin Naskah ke Clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin!' : 'Salin Naskah'}</span>
            </button>

            <button
              onClick={() => {
                playSound.click();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 rounded-2xl my-4 border border-slate-200 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-text">
          {DESIGN_DOCUMENT_TEXT}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 shrink-0 text-xs text-slate-500">
          <span>Format resmi 23 Poin: Instructional Design, Storyboard, Audio, Visual, Rubrik & Spesifikasi Teknis.</span>
          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export const DESIGN_DOCUMENT_TEXT = `================================================================================
RANCANGAN MULTIMEDIA PEMBELAJARAN INTERAKTIF (MPI) INFORMATIKA SMP KELAS VII
KURIKULUM MERDEKA: DEEP LEARNING (MINDFUL, MEANINGFUL, JOYFUL)
================================================================================

1. JUDUL MULTIMEDIA PEMBELAJARAN INTERAKTIF:
"Petualangan Siber: Ekspedisi Mengelompokkan Perangkat Keras Komputer (Hardware Quest VII)"

2. DESKRIPSI SINGKAT MPI:
Multimedia Pembelajaran Interaktif (MPI) berbasis web yang dikembangkan khusus untuk peserta didik SMP Kelas VII pada mata pelajaran Informatika (Elemen Sistem Komputer). Menggunakan pendekatan Game-Based Learning, MPI ini memfasilitasi peserta didik untuk mengidentifikasi dan mengelompokkan berbagai komponen perangkat keras komputer ke dalam 4 kategori fundamental (Input, Pemroses, Output, dan Penyimpanan). Media dilengkapi tombol pemicu "START" otomatis masuk mode Fullscreen, fitur eksplorasi interaktif berbasis klik pop-up, laboratorium rakit PC virtual, serta narasi audio dwibahasa (teks dan suara ramah anak) untuk menjamin inklusivitas belajar.

3. SASARAN PENGGUNA:
- Jenjang: Sekolah Menengah Pertama (SMP)
- Kelas/Semester: VII (Tujuh) / Semester Ganjil
- Usia: 12 - 13 Tahun
- Karakteristik Pengguna: Menyukai visual berwarna-warni cerah bertema hijau edukatif, antusias dengan gamifikasi, memiliki literasi digital bervariasi (rendah-sedang), serta membutuhkan pendampingan audio visual bertingkat.

4. TUJUAN PEMBELAJARAN:
- Tujuan Pembelajaran Spesifik: Melalui eksplorasi interaktif dan simulasi laboratorium virtual, peserta didik mampu mengelompokkan minimal 8 dari 10 jenis perangkat keras ke dalam kategori input, pemroses, output, dan penyimpanan dengan akurasi minimal 80% sebelum pembelajaran berakhir.
- Indikator Keberhasilan: Ketuntasan asesmen sumatif dengan skor minimal 80/100 (8 dari 10 butir soal dijawab benar dengan penalaran kritis).

5. RASIONAL DESAIN PEMBELAJARAN:
- Penerapan Kurikulum Merdeka berlandaskan Deep Learning:
  a. Mindful (Sadar Penuh): Peserta didik memusatkan perhatian pada alur kerja data komputer, menyadari bahwa setiap komponen memiliki fungsi unik yang tidak dapat dipisahkan.
  b. Meaningful (Bermakna): Mengaitkan sistem komputer dengan analogi biologis tubuh manusia (Mata/Telinga = Input, Otak = Pemroses, Mulut/Tangan = Output, Ingatan = Penyimpanan) sehingga konsep abstrak menjadi konkret dan relevan dalam kehidupan sehari-hari.
  c. Joyful (Menyenangkan): Gamifikasi stasiun petualangan, simulasi perakitan PC yang menyala secara visual dan suara boot-up, serta selebrasi konfeti perolehan sertifikat siber.

6. ALUR PEMBELAJARAN:
1. Orientasi & Entry (Halaman Pembuka + Trigger START Fullscreen)
2. Pembacaan Panduan & Orientasi Misi (Tujuan Pembelajaran)
3. Apersepsi Kritis (Studi Kasus "Komputer Rusak di Laboratorium")
4. Pengenalan Konsep 4 Pilar Siklus IPOS (Input - Process - Output - Storage)
5. Eksplorasi Interaktif Mandiri (Menekan Gambar Perangkat Keras -> Muncul Pop-Up Penjelasan & Audio)
6. Laboratorium Praktik Rakit PC Virtual (Hands-on Assembly & Boot Test)
7. Penguatan & Latihan Cepat (Flashcard & Sorting Rush)
8. Asesmen Sumatif 10 Soal (Umpan Balik Langsung per Butir Soal, Kriteria 80%)
9. Rangkuman Mind Map & Refleksi 3 Dimensi (Mindful, Meaningful, Joyful)
10. Validasi Capaian & Unduh Sertifikat Siber Kelulusan.

7. FLOWCHART NAVIGASI DALAM BENTUK TEKS:
[Halaman Pembuka (Input Nama & Avatar)]
          |
  [Tombol "START" (Wajib Programmatic Fullscreen API)]
          |
    [Menu Utama (Peta Petualangan 8 Stasiun)]
      ├── 1. Tujuan Belajar & Kriteria 80% ────────┐
      ├── 2. Apersepsi: Misteri PC Laboratorium ────┤
      ├── 3. Materi Pokok: 4 Pilar IPOS ───────────┤
      ├── 4. Eksplorasi Klik Gambar -> Pop-Up ─────┤
      ├── 5. Lab Virtual: Rakit PC Impian ─────────┤
      ├── 6. Latihan Kilat: Flashcard & Sortir ────┤
      ├── 7. Asesmen Sumatif 10 Soal (Min 80%) ────┤
      └── 8. Rangkuman & Refleksi Deep Learning ───┘
          |
  [Evaluasi Skor >= 80%]
      ├── YA  --> [Buka Sertifikat Kelulusan Resmi + Konfeti]
      └── TIDAK --> [Umpan Balik Remedial + Tombol Ulangi Kuis]

8. STRUKTUR HALAMAN MPI:
- Halaman 0: Pembuka (Mascot Robot Byte, input nama, pilih avatar, tombol pemicu START Fullscreen).
- Header Persisten: Audio narasi toggle, indikator Fullscreen, skor poin XP, navigasi breadcrumb, tombol panduan & naskah desain.
- Halaman 1: Peta Navigasi Stasiun Modul (Adventure Island Map).
- Halaman 2: Petunjuk Penggunaan & Aksesibilitas.
- Halaman 3: Tujuan Pembelajaran & Indikator 80%.
- Halaman 4: Apersepsi & Masalah Pemantik.
- Halaman 5: Naskah Materi Utama 4 Pilar.
- Halaman 6: Area Eksplorasi Gambar Interaktif (Pop-up modal kartu komponen).
- Halaman 7: Ruang Praktik Perakitan PC Virtual.
- Halaman 8: Latihan Cepat (Flashcard bolak-balik & Sorting bins).
- Halaman 9: Ruang Asesmen Sumatif (10 Soal Berbobot, Umpan Balik Instan).
- Halaman 10: Rangkuman Infografis Mind Map.
- Halaman 11: Lembar Refleksi Diri (Mindful, Meaningful, Joyful).
- Halaman 12: Sertifikat Kelulusan Resmi & Koleksi 5 Lencana Penghargaan.

9. STORYBOARD LENGKAP SETIAP HALAMAN:
- Halaman Pembuka:
  Visual: Latar hijau gradasi futuristik ramah anak, partikel siber mengapung, ikon Robot Byte 3D kartun melambaikan tangan.
  Konten: Judul besar, kotak isian nama siswa, 4 tombol pilihan avatar (Robot, Detektif, Teknisi, Astronot).
  Interaksi: Klik tombol START hijau bercahaya -> browser otomatis masuk ke Fullscreen, suara fanfare berbunyi, berpindah ke Menu Utama.

- Halaman Eksplorasi Gambar Interaktif (Core Requirement):
  Visual: Kisi-kisi (grid) kartu komponen dengan ilustrasi kartun berkualitas tinggi, tag kategori warna (Hijau Input, Biru Proses, Kuning Output, Ungu Storage).
  Interaksi: Ketika pengguna mengeklik gambar (misal: Keyboard, CPU, atau SSD):
  - Suara 'popup pop' terdengar.
  - Dialog pop-up modal terbuka di tengah layar dengan latar belakang gelap blur.
  - Menampilkan: Foto/ilustrasi komponen, nama lokal & internasional, analogi organ tubuh, penjelasan fungsi ilmiah sederhana, cara kerja biner, jenis colokan/port, fun fact anak SMP, tombol audio pembaca suara, dan kuis tebak kilat di dalam pop-up.

- Halaman Simulasi Rakit Komputer Virtual:
  Visual: Ruang laboratorium komputer dengan meja kerja komponen di kiri dan casing PC akrilik transparan di kanan.
  Interaksi: Siswa menekan komponen (Motherboard, CPU, RAM, GPU, SSD, Power Supply) untuk memasangnya ke slot yang sesuai. Setelah lengkap, tombol 'POWER' menyala berkedip. Siswa menekan tombol power -> kipas berputar, lampu RGB menyala, suara boot-up berbunyi, dan status bios menyatakan 'SYSTEM ONLINE'.

- Halaman Asesmen Sumatif (10 Soal):
  Visual: Desain kartu soal bersih dengan kontras tinggi, indikator nomor soal, timer santai tanpa stres.
  Interaksi: Siswa memilih salah satu opsi jawaban -> kartu seketika terkunci, warna berubah (Hijau jika benar, Merah jika salah), serta muncul kotak umpan balik pedagogis di bawah soal menjelaskan alasan ilmiahnya secara detail.

10. RANCANGAN AKTIVITAS INTERAKTIF:
- Aktivitas 1: Eksplorasi Sentuh Gambar Pop-Up (Active Discovery Learning).
- Aktivitas 2: Perakitan PC Virtual (Constructivist Simulation).
- Aktivitas 3: Sorting Rush (Kinesthetic Gamification).
- Aktivitas 4: Evaluasi Responsif (Instant-Feedback Formative/Summative Test).

11. RANCANGAN KONTEN MATERI:
- Perangkat Masukan (Input): Keyboard (pengirim kode ASCII/biner), Mouse (sensor optik koordinat X-Y), Mikrofon (gelombang suara ke audio digital), Webcam (sensor cahaya CMOS ke visual piksel).
- Perangkat Pemroses (Processing): CPU (siklus fetch-decode-execute), RAM (memori kerja volatile kecepatan tinggi), GPU (pemrosesan paralel grafis 3D), Motherboard (papan sirkuit jalur data bus).
- Perangkat Keluaran (Output): Monitor (titik piksel RGB lampu latar), Speaker (diafragma elektromagnetik suara akustik), Printer (cetakan tinta fisik kertas), Proyektor (pancaran visual bidang luas).
- Perangkat Penyimpanan (Storage): SSD (chip flash NAND secepat kilat), HDD (cakram magnetik putar), Flashdisk (penyimpan portabel USB), Cloud Storage (server pusat data internet).

12. RANCANGAN MEDIA VISUAL:
- Gaya: Flat modern cartoon bersahabat dengan sudut membulat (rounded-3xl), palet dominan hijau daun (#10b981 / #047857) dipadukan aksen kuning cerah (#fbbf24) dan putih bersih.
- Tipografi: Kombinasi font Fredoka untuk judul ceria dan Nunito untuk keterbacaan teks penjelasan tingkat tinggi.
- Kontras: Memenuhi standar WCAG AAA (kontras rasio teks di atas 7:1 terhadap latar belakang).

13. RANCANGAN AUDIO ATAU NARASI:
- Efek Suara (Synthesized Sound FX):
  * Klik tombol: Nada gelembung lembut (600Hz - 850Hz).
  * Buka pop-up: Nada melayang segitiga (320Hz - 640Hz).
  * Jawaban benar: Arpeggio empat nada menaik (C5, E5, G5, C6).
  * Jawaban salah: Nada rendah ramah bersahabat (260Hz - 140Hz).
  * Booting PC: Nada daya frekuensi harmonik.
  * Fanfare perayaan: Melodi kemenangan instrumen ceria.
- Text-to-Speech (TTS): Menggunakan SpeechSynthesis API Bahasa Indonesia berkecepatan 0.95x dengan intonasi hangat untuk membacakan setiap materi dan soal bagi siswa yang mengalami hambatan membaca.

14. RANCANGAN ANIMASI ATAU SIMULASI:
- Animasi Mengapung (Floating mascot): Siklus naik-turun halus 3 detik pada karakter Byte si Robot.
- Animasi Perakitan PC: Efek partikel dan pergantian status slot komponen saat part berhasil ditancapkan.
- Animasi Booting: Indikator spinner BIOS dan transisi layar casing dari gelap menjadi hijau menyala.
- Animasi Selebrasi: Semburan konfeti warna-warni saat lulus kuis minimal 80%.

15. RANCANGAN KUIS DAN ASESMEN:
- Jumlah Soal: 10 Butir Soal Terkalibrasi.
- Variasi Bentuk Soal:
  * Soal 1: Pilihan Ganda Analitis (Input audio mikrofon).
  * Soal 2: Benar / Salah (Sifat volatile RAM).
  * Soal 3: Studi Kasus Pemecahan Masalah (Kebutuhan cetak kertas dokumen fisik).
  * Soal 4: Analogi Organ Tubuh (Webcam sebagai indra penglihatan).
  * Soal 5: Klasifikasi Kombinasi Masukan (Keyboard, mouse, mic).
  * Soal 6: Benar / Salah Analitis (Perbandingan kecepatan SSD vs HDD).
  * Soal 7: Simulasi Kasus Game Lag (Peran GPU dalam rendering visual 3D).
  * Soal 8: Pemilihan Media Saku Portabel (Flashdisk untuk mobilitas tugas).
  * Soal 9: Benar / Salah Konsep Internet (Mitos Cloud Storage vs Server Fisik).
  * Soal 10: Studi Kasus Penyampaian Informasi Luas (Speaker & sound system).

16. UMPAN BALIK UNTUK JAWABAN BENAR DAN SALAH:
- Jawaban Benar: "Luar biasa! [Nama Komponen] memang bertugas [fungsi spesifik]. Logika analisismu sangat tepat!"
- Jawaban Salah: "Belum tepat, sahabat siber! Ingat kembali bahwa [Nama Komponen] tidak bertugas [fungsi keliru], melainkan [fungsi sebenarnya]. Ayo perhatikan kata kuncinya!"

17. RUBRIK PENILAIAN ASESMEN SUMATIF:
- Skor 90 - 100%: Sangat Mahir (Lencana Emas Siber Master, pemahaman menyeluruh 4 kategori).
- Skor 80 - 89%: Mahir (Lulus Kriteria Keberhasilan, menguasai klasifikasi perangkat keras).
- Skor 60 - 79%: Cukup (Perlu penguatan pada pembedaan pemroses dan penyimpanan).
- Skor < 60%: Perlu Bimbingan (Direkomendasikan mengulang stasiun Eksplorasi Gambar Pop-up).

18. CATATAN DIFERENSIASI PEMBELAJARAN:
- Diferensiasi Konten: Tersedia teks narasi terstruktur, bagan infografis visual, serta tombol audio suara ramah anak untuk pelajar auditori dan siswa lamban membaca.
- Diferensiasi Proses: Siswa bebas memilih menjelajah secara acak melalui Peta Menu atau mengikuti alur linier, serta dapat mencoba perakitan PC berulang kali.
- Diferensiasi Produk: Sertifikat mencantumkan nama, skor personal, dan deretan lencana pencapaian yang dapat disimpan atau dicetak.

19. CATATAN AKSESIBILITAS:
- Dukungan Kontras Tinggi (Dark green & white background).
- Dukungan Aksesibilitas Keyboard (Tab, Enter, Space navigation).
- Tidak menggunakan kedipan cahaya berlebih yang memicu fotosensitivitas.
- Ukuran tombol ramah layar sentuh (touch target minimum 44 x 44 piksel).

20. SPESIFIKASI TEKNIS HTML/CSS/JAVASCRIPT & FULLSCREEN API:
- Teknologi Utama: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- Implementasi Wajib Fullscreen API pada Tombol START:
\`\`\`javascript
async function handleStartTrigger() {
  const element = document.documentElement;
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      await element.msRequestFullscreen();
    }
  } catch (err) {
    console.warn("Fullscreen permission bypassed or not supported:", err);
  }
}
\`\`\`

21. PROMPT TAMBAHAN UNTUK MEMBUAT ASET GAMBAR:
- Prompt 1 (Maskot Robot Byte):
  "A friendly cute 3D cartoon green robot mascot named Byte, big smiling digital eyes on screen face, round emerald green armor, floating gently, welcoming friendly posture, clean white background, Pixar educational style, 4k render, joyful color palette."
- Prompt 2 (Komponen Komputer Pop-up):
  "Vector isometric cartoon illustration of computer hardware components: mechanical keyboard, ergonomic mouse, glowing CPU chip with golden pins, RAM stick with colorful LEDs, and sleek modern SSD drive, vibrant green and teal outlines, educational textbook clipart style."

22. PROMPT TAMBAHAN UNTUK MEMBUAT VIDEO PEMBELAJARAN:
- Prompt Storyboard Video (Durasi 2 Menit):
  "Create an animated educational video explaining the IPOS computer cycle for 7th grade students. Scene 1: A teenager typing on a keyboard (Input). Scene 2: Zoom inside the computer casing showing a cartoon CPU brain solving math equations with lightning bolts (Process). Scene 3: A printer printing colorful homework and a monitor displaying 4K animation (Output). Scene 4: An SSD vault storing files securely (Storage). Voiceover tone: Enthusiastic, friendly Indonesian language narrator with joyful background music."

23. REKOMENDASI PENGEMBANGAN LANJUTAN:
1. Penambahan fitur Augmented Reality (AR) berbasis WebXR untuk melihat komponen PC 3D mengambang di atas meja siswa melalui kamera HP.
2. Integrasi penyimpanan nilai otomatis ke Google Classroom via Google Workspace integration.
3. Modul lanjutan mencakup perangkat lunak (Operating System & Application Software).
================================================================================`;
