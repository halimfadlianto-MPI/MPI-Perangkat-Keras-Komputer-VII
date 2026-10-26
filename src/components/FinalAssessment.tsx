import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Volume2, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionId, QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { playSound, speakNarration } from '../utils/audio';

interface FinalAssessmentProps {
  onNext: (nextSec: SectionId) => void;
  onCompleteQuiz: (passed: boolean, percent: number) => void;
  isMuted: boolean;
  onUnlockBadge: (badgeId: string) => void;
  onOpenCertificate: () => void;
}

export const FinalAssessment: React.FC<FinalAssessmentProps> = ({
  onNext,
  onCompleteQuiz,
  isMuted,
  onUnlockBadge,
  onOpenCertificate
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ questionId: number; selected: string; isCorrect: boolean }[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAudioQuestion = () => {
    playSound.popup();
    if (!isMuted) {
      speakNarration(currentQ.audioPrompt || currentQ.question);
    }
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    playSound.click();
    setSelectedAnswer(opt);
    setIsAnswerSubmitted(true);

    const isCorrect = opt === currentQ.correctAnswer;
    if (isCorrect) {
      playSound.correct();
    } else {
      playSound.wrong();
    }

    setAnswersLog(prev => [
      ...prev,
      { questionId: currentQ.id, selected: opt, isCorrect }
    ]);
  };

  const handleNextQuestion = () => {
    playSound.click();
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished all 10 questions!
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const totalCorrect = answersLog.filter(a => a.isCorrect).length + (selectedAnswer === currentQ.correctAnswer ? 0 : 0);
    // Recount precisely
    const actualCorrect = answersLog.filter(a => a.isCorrect).length;
    const percent = Math.round((actualCorrect / QUIZ_QUESTIONS.length) * 100);
    const passed = percent >= 80;

    setIsQuizFinished(true);
    onCompleteQuiz(passed, percent);

    if (passed) {
      playSound.fanfare();
      onUnlockBadge('badge-master');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      if (!isMuted) {
        speakNarration(`Selamat! Kamu lulus dengan nilai ${percent} persen! Kamu telah menguasai perangkat keras komputer!`);
      }
    } else {
      playSound.wrong();
      if (!isMuted) {
        speakNarration(`Nilaimu adalah ${percent} persen. Kriteria kelulusan adalah 80 persen. Jangan berkecil hati, ayo pelajari kembali materinya dan coba ulangi kuis!`);
      }
    }
  };

  const handleRetryQuiz = () => {
    playSound.click();
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setAnswersLog([]);
    setIsQuizFinished(false);
  };

  const correctCount = answersLog.filter(a => a.isCorrect).length;
  const scorePercent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  const isPassed = scorePercent >= 80;

  // SUMMARY SCREEN UPON COMPLETION
  if (isQuizFinished) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center animate-fade-in">
        <div className={`p-8 rounded-3xl border-4 shadow-2xl bg-white ${
          isPassed ? 'border-emerald-500' : 'border-amber-400'
        }`}>
          {/* Trophy / Result Badge */}
          <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-6xl mb-4 shadow-lg bg-linear-to-tr from-amber-300 to-yellow-400">
            {isPassed ? '🏆' : '📚'}
          </div>

          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            Hasil Asesmen Sumatif (10 Soal)
          </span>

          <h3 className="font-heading text-3xl sm:text-4xl font-black text-slate-800 mt-2 mb-1">
            {isPassed ? 'LULUS DENGAN PRESTASI SIBER!' : 'BELUM MENCAPAI KRITERIA 80%'}
          </h3>

          <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 inline-block max-w-sm w-full">
            <div className="flex items-center justify-between text-sm font-bold text-slate-600 mb-1">
              <span>Jawaban Benar</span>
              <span className="text-emerald-700">{correctCount} dari 10 Soal</span>
            </div>
            <div className="flex items-center justify-between text-base font-black text-slate-800 border-t border-slate-200 pt-1 mt-1">
              <span>Nilai Akhir</span>
              <span className={`text-2xl ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {scorePercent}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Standar Kriteria Kelulusan: Minimum 80% (8 dari 10 Soal)
            </p>
          </div>

          <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
            {isPassed
              ? 'Luar biasa! Kamu telah membuktikan kemampuan analisis yang matang dalam mengelompokkan perangkat masukan, pemroses, keluaran, dan penyimpanan!'
              : 'Kamu sudah berusaha dengan baik! Namun untuk membuka sertifikat resmi, kamu perlu memperoleh minimal 8 jawaban benar (80%). Ayo pelajari kembali modul materi dan coba lagi!'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {isPassed ? (
              <>
                <button
                  onClick={() => {
                    playSound.fanfare();
                    onOpenCertificate();
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-linear-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-sm uppercase tracking-wide flex items-center gap-2 shadow-xl cursor-pointer active:scale-95"
                >
                  <Award className="w-5 h-5 text-emerald-950" />
                  <span>Klaim & Cetak Sertifikat</span>
                </button>
                <button
                  onClick={() => {
                    playSound.click();
                    onNext('summary');
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
                >
                  <span>Lanjut ke Rangkuman & Refleksi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleRetryQuiz}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wide flex items-center gap-2 shadow-xl cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Coba Ulangi Kuis</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE QUESTION SCREEN
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Quiz Header Tracker */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-800">
            Asesmen Sumatif • Soal {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-xs font-bold text-slate-400">
            Tipe: {currentQ.type.toUpperCase()}
          </span>
        </div>

        <button
          onClick={handleAudioQuestion}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1.5 text-xs font-bold"
          title="Dengarkan Soal (Audio)"
        >
          <Volume2 className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="hidden sm:inline">Bacakan Soal</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-rose-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-200 shadow-xl mb-6">
        <h3 className="font-heading text-lg sm:text-xl font-black text-slate-800 leading-snug whitespace-pre-line mb-6">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options?.map((opt, idx) => {
            const isSelected = selectedAnswer === opt;
            const isCorrectAnswer = opt === currentQ.correctAnswer;

            let btnStyle = 'bg-white border-slate-200 hover:border-slate-400 text-slate-700';

            if (isAnswerSubmitted) {
              if (isCorrectAnswer) {
                btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md font-bold';
              } else if (isSelected && !isCorrectAnswer) {
                btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(opt)}
                className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                  isAnswerSubmitted && isCorrectAnswer
                    ? 'bg-emerald-600 text-white'
                    : isAnswerSubmitted && isSelected && !isCorrectAnswer
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 mt-0.5">{opt}</span>

                {isAnswerSubmitted && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Pedagogical Feedback Box */}
        {isAnswerSubmitted && (
          <div className={`mt-6 p-5 rounded-2xl border-2 animate-fade-in ${
            selectedAnswer === currentQ.correctAnswer
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            <div className="flex items-start gap-2.5">
              {selectedAnswer === currentQ.correctAnswer ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h5 className="font-heading font-bold text-xs uppercase tracking-wider mb-1">
                  {selectedAnswer === currentQ.correctAnswer
                    ? 'Jawabanmu Tepat! (+10 Poin)'
                    : 'Umpan Balik Perbaikan:'}
                </h5>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next Button Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Umpan balik langsung membantumu belajar dari setiap respon.
        </span>

        {isAnswerSubmitted && (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 shadow-lg cursor-pointer active:scale-95 animate-bounce"
          >
            <span>{currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? 'Lihat Hasil Akhir' : 'Soal Berikutnya'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
