import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from '@/components/studio/Dashboard';
import DeckSetupWizard from '@/components/studio/DeckSetupWizard';
import EditorWorkspace from '@/components/studio/EditorWorkspace';
import OnboardingFlow from '@/components/studio/OnboardingFlow';
import { StudioProvider, useStudio } from '@/components/studio/StudioContext';

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
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {currentView === 'onboarding' && (
          <motion.div
            key="onboarding"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EditorWorkspace />
          </motion.div>
        )}
      </AnimatePresence>
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
