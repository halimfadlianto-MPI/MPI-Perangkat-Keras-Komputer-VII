import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. Pilihan Ganda Analitis
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Saat Rian sedang mengikuti kelas daring Informatika, ia berbicara untuk bertanya kepada guru. Perangkat keras manakah yang bertugas mengubah gelombang suara Rian menjadi sinyal data digital?',
    audioPrompt: 'Soal nomor satu: Saat Rian berbicara dalam kelas daring, perangkat keras apa yang menangkap suaranya?',
    options: [
      'Speaker eksternal',
      'Microphone (Mikrofon)',
      'CPU (Processor)',
      'Monitor IPS'
    ],
    correctAnswer: 'Microphone (Mikrofon)',
    explanation: 'Tepat sekali! Mikrofon berfungsi sebagai Input Device yang menangkap gelombang suara getaran analog dan mengubahnya menjadi sinyal digital agar didengar oleh guru dan teman-teman sekelas.',
    hint: 'Ingat analogi indra manusia: bagian apa yang menangkap suara dari luar?',
    points: 10
  },

  // 2. Benar / Salah
  {
    id: 2,
    type: 'true-false',
    question: 'RAM (Random Access Memory) adalah media penyimpanan permanen yang tidak akan kehilangan data meskipun komputer tiba-tiba mati lampu.',
    audioPrompt: 'Soal nomor dua: Benar atau salahkah pernyataan bahwa data di RAM tetap tersimpan saat listrik mati?',
    options: ['Benar', 'Salah'],
    correctAnswer: 'Salah',
    explanation: 'Hebat, analisismu tepat! RAM bersifat Volatile (sementara). Data di dalam RAM akan hilang seketika saat arus listrik terputus. Media yang menyimpan file secara permanen adalah SSD, HDD, atau Flashdisk.',
    hint: 'Bayangkan RAM seperti meja belajar: jika meja dibersihkan, buku harus disimpan di rak lemari arsip (SSD/Harddisk).',
    points: 10
  },

  // 3. Simulasi Keputusan / Kasus
  {
    id: 3,
    type: 'case-study',
    question: 'Bu Siti ingin mencetak lembar soal ujian semester sebanyak 50 eksemplar dalam bentuk lembaran kertas fisik untuk dibagikan di kelas. Perangkat keluaran (output) manakah yang paling tepat disiapkan di lab komputer?',
    audioPrompt: 'Soal nomor tiga: Bu Siti ingin membuat dokumen kertas fisik untuk ujian. Perangkat apa yang harus digunakan?',
    options: [
      'Proyektor InFocus di dinding',
      'Printer laser / inkjet',
      'Monitor layar lengkung',
      'Webcam resolusi tinggi'
    ],
    correctAnswer: 'Printer laser / inkjet',
    explanation: 'Bagus sekali! Printer adalah perangkat keluaran yang menghasilkan output fisik berwujud cetakan tinta atau toner pada kertas (hardcopy).',
    hint: 'Cari perangkat yang menghasilkan salinan cetak fisik di atas lembaran kertas.',
    points: 10
  },

  // 4. Analisis Perangkat Masukan
  {
    id: 4,
    type: 'multiple-choice',
    question: 'Komputer diibaratkan seperti tubuh manusia. Jika CPU bertindak sebagai Otak yang mengolah pikiran, maka manakah perangkat di bawah ini yang bertindak serupa dengan "Mata" yang menangkap visual dunia luar?',
    audioPrompt: 'Soal nomor empat: Jika CPU adalah otak, perangkat apakah yang berperan seperti mata?',
    options: [
      'Webcam (Kamera Web)',
      'Printer Inkjet',
      'Speaker Stereo',
      'Solid State Drive (SSD)'
    ],
    correctAnswer: 'Webcam (Kamera Web)',
    explanation: 'Tepat! Webcam menangkap cahaya visual dari lingkungan nyata dan menyalurkannya sebagai data masukan gambar ke komputer, persis seperti fungsi mata pada manusia.',
    hint: 'Perangkat apa yang bisa "melihat" wajahmu saat melakukan panggilan video?',
    points: 10
  },

  // 5. Pilihan Ganda Klasifikasi
  {
    id: 5,
    type: 'multiple-choice',
    question: 'Perhatikan daftar komponen berikut:\n(1) Keyboard, (2) Monitor, (3) Mouse, (4) Proyektor, (5) Microphone.\nKomponen yang seluruhnya tergolong ke dalam PERANGKAT MASUKAN (INPUT) adalah...',
    audioPrompt: 'Soal nomor lima: Pilihlah nomor yang semuanya termasuk perangkat masukan input.',
    options: [
      '(1), (3), dan (5)',
      '(2), (4), dan (5)',
      '(1), (2), dan (4)',
      '(3), (4), dan (5)'
    ],
    correctAnswer: '(1), (3), dan (5)',
    explanation: 'Luar biasa! Keyboard (1), Mouse (3), dan Microphone (5) adalah perangkat masukan (input). Sedangkan Monitor (2) dan Proyektor (4) adalah perangkat keluaran (output).',
    hint: 'Singkirkan perangkat yang berfungsi memancarkan tampilan gambar ke mata kita.',
    points: 10
  },

  // 6. Benar / Salah
  {
    id: 6,
    type: 'true-false',
    question: 'SSD (Solid State Drive) membaca dan menyimpan data lebih cepat dibandingkan Harddisk konvensional karena SSD menggunakan chip memori flash tanpa adanya piringan cakram magnetik yang berputar.',
    audioPrompt: 'Soal nomor enam: Benar atau salah, SSD lebih cepat dari Harddisk karena tidak memiliki komponen bergerak?',
    options: ['Benar', 'Salah'],
    correctAnswer: 'Benar',
    explanation: 'Tepat sekali! SSD menggunakan chip semikonduktor (NAND Flash) tanpa bagian mekanik yang bergerak, sehingga waktu akses datanya secepat kilat dan lebih tahan guncangan dibandingkan piringan Harddisk.',
    hint: 'Pikirkan mengapa laptop modern dengan SSD dapat menyala (booting) dalam waktu hanya 5-10 detik.',
    points: 10
  },

  // 7. Studi Kasus Pemecahan Masalah
  {
    id: 7,
    type: 'case-study',
    question: 'Seorang siswa SMP sedang bermain game edukasi simulasi 3 Dimensi, namun layarnya sering patah-patah (lag) dan gambar visualnya pecah. Komponen pemroses mana di dalam komputer yang paling bertanggung jawab dalam merender gambar grafis 3D?',
    audioPrompt: 'Soal nomor tujuh: Gambar game patah-patah di komputer. Komponen pemroses apa yang bertugas mengolah gambar 3 dimensi?',
    options: [
      'GPU / VGA Card (Kartu Grafis)',
      'Sound Card Audio',
      'Flashdisk USB',
      'Power Supply Unit (PSU)'
    ],
    correctAnswer: 'GPU / VGA Card (Kartu Grafis)',
    explanation: 'Jawabanmu sangat tepat! GPU (Graphics Processing Unit) memiliki ribuan inti komputasi yang secara khusus mengolah perhitungan warna piksel visual dan pemodelan poligon 3 Dimensi berkecepatan tinggi.',
    hint: 'Perhatikan kata kunci: "Grafis", "3 Dimensi", dan "Visual".',
    points: 10
  },

  // 8. Klasifikasi Portabel Storage
  {
    id: 8,
    type: 'multiple-choice',
    question: 'Dinda ingin memindahkan file presentasi Informatika dari komputer sekolah ke laptop miliknya di rumah tanpa bergantung pada koneksi internet. Media penyimpanan portabel saku yang paling praktis dan tepat adalah...',
    audioPrompt: 'Soal nomor delapan: Media penyimpanan saku portabel apa yang paling praktis untuk memindahkan tugas tanpa internet?',
    options: [
      'Flashdisk (USB Flash Drive)',
      'RAM DDR4',
      'Motherboard ATX',
      'Kabel HDMI'
    ],
    correctAnswer: 'Flashdisk (USB Flash Drive)',
    explanation: 'Hebat! Flashdisk berukuran mungil, mudah dimasukkan ke kantong saku, menggunakan antarmuka colokan USB universal, dan dapat menyimpan file secara mandiri tanpa membutuhkan kuota internet.',
    hint: 'Bentuknya kecil seperti gantungan kunci dan sering dicolok ke lubang USB.',
    points: 10
  },

  // 9. Benar / Salah
  {
    id: 9,
    type: 'true-false',
    question: 'Penyimpanan awan (Cloud Storage) seperti Google Drive tidak menggunakan perangkat keras fisik sama sekali karena datanya melayang di udara.',
    audioPrompt: 'Soal nomor sembilan: Benar atau salah, Cloud Storage tidak memakai perangkat keras fisik sama sekali?',
    options: ['Benar', 'Salah'],
    correctAnswer: 'Salah',
    explanation: 'Pintar sekali! Istilah "Cloud" hanyalah metafora. Kenyataannya, data kita tersimpan di ribuan komputer server fisik nyata berkapasitas raksasa di dalam pusat data (Data Center) yang terhubung ke jaringan internet global.',
    hint: 'Apakah internet bekerja tanpa adanya komputer server di suatu gedung?',
    points: 10
  },

  // 10. Simulasi Keputusan / Menjodohkan
  {
    id: 10,
    type: 'case-study',
    question: 'Saat kepala sekolah menyampaikan pengumuman rapat di aula besar, seluruh guru dapat mendengarkan suara pidato dengan lantang dan jernih. Perangkat keras keluaran suara apakah yang digunakan untuk memperbesar gelombang suara tersebut?',
    audioPrompt: 'Soal nomor sepuluh: Perangkat keluaran apa yang memperdengarkan suara lantang ke seluruh ruangan aula?',
    options: [
      'Speaker / Sound System',
      'Webcam Video',
      'Processor Core i7',
      'Keyboard Mekanikal'
    ],
    correctAnswer: 'Speaker / Sound System',
    explanation: 'Sempurna! Speaker mengubah getaran sinyal listrik audio digital menjadi getaran gelombang suara udara fisik yang menggetarkan gendang telinga manusia.',
    hint: 'Perangkat apa yang mengeluarkan bunyi lagu atau musik di ruangan?',
    points: 10
  }
];
