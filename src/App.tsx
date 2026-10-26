import React, { useState, useEffect } from 'react';
import { SectionId, UserProgress } from './types';
import { Navbar } from './components/Navbar';
import { StartScreen } from './components/StartScreen';
import { MainMenu } from './components/MainMenu';
import { ObjectivesSection } from './components/ObjectivesSection';
import { AperceptionSection } from './components/AperceptionSection';
import { CoreMaterialSection } from './components/CoreMaterialSection';
import { InteractiveExploration } from './components/InteractiveExploration';
import { VirtualPcLab } from './components/VirtualPcLab';
import { FlashcardPractice } from './components/FlashcardPractice';
import { FinalAssessment } from './components/FinalAssessment';
import { SummaryMindmap } from './components/SummaryMindmap';
import { ReflectionSection } from './components/ReflectionSection';
import { GuideModal } from './components/GuideModal';
import { CertificateBadgeModal } from './components/CertificateBadgeModal';
import { DesignDocumentModal } from './components/DesignDocumentModal';
import { playSound, stopNarration } from './utils/audio';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('start');
  const [isMuted, setIsMuted] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isDesignDocOpen, setIsDesignDocOpen] = useState(false);

  const [userProgress, setUserProgress] = useState<UserProgress>({
    studentName: 'Siswa Siber VII',
    avatar: '🤖',
    score: 100,
    stars: 1,
    completedSections: [],
    quizAnswers: {},
    quizPassed: false,
    quizScorePercent: 0,
    pcBuilt: false,
    reflection: {
      mindful: '',
      meaningful: '',
      joyful: '',
    },
  });

  // Handle Start trigger (from start screen, which also called Fullscreen API)
  const handleStartGame = (name: string, avatar: string) => {
    setUserProgress(prev => ({
      ...prev,
      studentName: name,
      avatar: avatar,
    }));
    setCurrentSection('menu');
  };

  const handleNavigate = (section: SectionId) => {
    stopNarration();
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markSectionCompleted = (sectionId: string, bonusPoints = 25) => {
    setUserProgress(prev => {
      const alreadyDone = prev.completedSections.includes(sectionId);
      if (alreadyDone) return prev;
      return {
        ...prev,
        score: prev.score + bonusPoints,
        completedSections: [...prev.completedSections, sectionId],
      };
    });
  };

  const handleAddScore = (points: number) => {
    setUserProgress(prev => ({
      ...prev,
      score: prev.score + points,
    }));
  };

  const handleUnlockBadge = (badgeId: string) => {
    // If not unlocked before, add points & notify
    handleAddScore(30);
  };

  const handleCompleteQuiz = (passed: boolean, percent: number) => {
    setUserProgress(prev => ({
      ...prev,
      quizPassed: passed,
      quizScorePercent: percent,
      score: prev.score + (passed ? 100 : 30),
      completedSections: prev.completedSections.includes('quiz')
        ? prev.completedSections
        : [...prev.completedSections, 'quiz'],
    }));
  };

  const handleSaveReflection = (reflection: { mindful: string; meaningful: string; joyful: string }) => {
    setUserProgress(prev => ({
      ...prev,
      reflection,
      score: prev.score + 50,
      completedSections: prev.completedSections.includes('reflection')
        ? prev.completedSections
        : [...prev.completedSections, 'reflection'],
    }));
  };

  const toggleMute = () => {
    if (!isMuted) {
      stopNarration();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Persistent Navigation Bar (except start screen) */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        userProgress={userProgress}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenDesignDoc={() => setIsDesignDocOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Main Learning Canvas */}
      <main className="flex-1 pb-16">
        {currentSection === 'start' && (
          <StartScreen onStart={handleStartGame} isMuted={isMuted} />
        )}

        {currentSection === 'menu' && (
          <MainMenu
            onNavigate={handleNavigate}
            userProgress={userProgress}
            isMuted={isMuted}
            onOpenDesignDoc={() => setIsDesignDocOpen(true)}
          />
        )}

        {currentSection === 'objectives' && (
          <ObjectivesSection
            onNext={handleNavigate}
            onComplete={() => markSectionCompleted('objectives', 20)}
            isMuted={isMuted}
          />
        )}

        {currentSection === 'aperception' && (
          <AperceptionSection
            onNext={handleNavigate}
            onComplete={() => markSectionCompleted('aperception', 30)}
            isMuted={isMuted}
          />
        )}

        {currentSection === 'material' && (
          <CoreMaterialSection
            onNext={handleNavigate}
            onComplete={() => markSectionCompleted('material', 40)}
            isMuted={isMuted}
          />
        )}

        {currentSection === 'exploration' && (
          <InteractiveExploration
            onNext={handleNavigate}
            onComplete={() => markSectionCompleted('exploration', 50)}
            isMuted={isMuted}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {currentSection === 'simulation' && (
          <VirtualPcLab
            onNext={handleNavigate}
            onComplete={() => markSectionCompleted('simulation', 50)}
            isMuted={isMuted}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {currentSection === 'practice' && (
          <FlashcardPractice
            onNext={handleNavigate}
            onComplete={() => markSectionCompleted('practice', 30)}
            isMuted={isMuted}
            onUnlockBadge={handleUnlockBadge}
            onAddScore={handleAddScore}
          />
        )}

        {currentSection === 'quiz' && (
          <FinalAssessment
            onNext={handleNavigate}
            onCompleteQuiz={handleCompleteQuiz}
            isMuted={isMuted}
            onUnlockBadge={handleUnlockBadge}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentSection === 'summary' && (
          <SummaryMindmap
            onNext={handleNavigate}
            onComplete={() => markSectionCompleted('summary', 20)}
          />
        )}

        {currentSection === 'reflection' && (
          <ReflectionSection
            onNext={handleNavigate}
            onComplete={() => markSectionCompleted('reflection', 30)}
            userProgress={userProgress}
            onSaveReflection={handleSaveReflection}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}
      </main>

      {/* Global Modals */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <CertificateBadgeModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        userProgress={userProgress}
      />

      <DesignDocumentModal
        isOpen={isDesignDocOpen}
        onClose={() => setIsDesignDocOpen(false)}
      />
    </div>
  );
}
