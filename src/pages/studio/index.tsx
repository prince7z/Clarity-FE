import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from '@/components/studio/Dashboard';
import DeckSetupWizard from '@/components/studio/DeckSetupWizard';
import EditorWorkspace from '@/components/studio/EditorWorkspace';
import OnboardingFlow from '@/components/studio/OnboardingFlow';
import { StudioProvider, useStudio } from '@/components/studio/StudioContext';
import { StudioHeader } from '@/components/studio/StudioHeader.tsx';

export type StudioView = 'dashboard' | 'wizard' | 'editor' | 'onboarding';

function StudioContent() {
  const { currentView, setCurrentView, isFirstVisit } = useStudio();
  
  useEffect(() => {
    if (isFirstVisit) {
      setCurrentView('onboarding');
    }
  }, [isFirstVisit, setCurrentView]);

  return (
    <motion.div 
      className="relative min-h-screen bg-background overflow-hidden flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 gradient-ai-subtle" aria-hidden="true" />
      <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
      <StudioHeader />
      <div className="relative flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {currentView === 'onboarding' && (
            <motion.div
              key="onboarding"
              className="h-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <OnboardingFlow />
            </motion.div>
          )}
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Dashboard />
            </motion.div>
          )}
          {currentView === 'wizard' && (
            <motion.div
              key="wizard"
              className="h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <DeckSetupWizard />
            </motion.div>
          )}
          {currentView === 'editor' && (
            <motion.div
              key="editor"
              className="h-full min-h-0 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EditorWorkspace />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function StudioPage() {
  return (
    <StudioProvider>
      <StudioContent />
    </StudioProvider>
  );
}
