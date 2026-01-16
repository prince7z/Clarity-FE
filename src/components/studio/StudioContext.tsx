import { createContext, useContext, useState, ReactNode } from 'react';
import type { StudioView } from '@/pages/studio';

export interface Project {
    id: string;
    name: string;
    lastEdited: Date;
    status: 'ready' | 'review' | 'generating' | 'draft';
    slideCount: number;
    thumbnail?: string;
}

export interface DeckStyle {
    primaryColor: string;
    accentColor: string;
    titleFont: string;
    titleSize: string;
    bodyFont: string;
    bodySize: string;
    margins: string;
    logoPosition: string;
    chartStyle: string;
    confidence: number;
}

export interface DeckContent {
    audience: string;
    brief: string;
    financialData: File[];
    researchOptions: string[];
}

export interface SlideData {
    id: string;
    title: string;
    type: 'title' | 'content' | 'chart' | 'table' | 'comparison' | 'summary';
    content: any;
    notes?: string;
}

export interface CurrentDeck {
    id: string;
    name: string;
    style: DeckStyle;
    slides: SlideData[];
    buildProgress: number;
    status: 'building' | 'ready' | 'editing';
}

interface StudioContextType {
    currentView: StudioView;
    setCurrentView: (view: StudioView) => void;
    isFirstVisit: boolean;
    setIsFirstVisit: (value: boolean) => void;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    currentDeck: CurrentDeck | null;
    setCurrentDeck: (deck: CurrentDeck | null) => void;
    wizardStep: number;
    setWizardStep: (step: number) => void;
    uploadedFiles: File[];
    setUploadedFiles: (files: File[]) => void;
    extractedStyle: DeckStyle | null;
    setExtractedStyle: (style: DeckStyle | null) => void;
    deckContent: DeckContent;
    setDeckContent: (content: DeckContent) => void;
    selectedSlideId: string | null;
    setSelectedSlideId: (id: string | null) => void;
    rightPanelTab: string;
    setRightPanelTab: (tab: string) => void;
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const mockProjects: Project[] = [
    {
        id: '1',
        name: 'Q4 LP Review',
        lastEdited: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'ready',
        slideCount: 24,
    },
    {
        id: '2',
        name: 'Company X Pitch',
        lastEdited: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: 'review',
        slideCount: 18,
    },
    {
        id: '3',
        name: 'Board Update',
        lastEdited: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'generating',
        slideCount: 32,
    },
];

export function StudioProvider({ children }: { children: ReactNode }) {
    const [currentView, setCurrentView] = useState<StudioView>('dashboard');
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [currentDeck, setCurrentDeck] = useState<CurrentDeck | null>(null);
    const [wizardStep, setWizardStep] = useState(1);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [extractedStyle, setExtractedStyle] = useState<DeckStyle | null>(null);
    const [deckContent, setDeckContent] = useState<DeckContent>({
        audience: '',
        brief: '',
        financialData: [],
        researchOptions: [],
    });
    const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);
    const [rightPanelTab, setRightPanelTab] = useState('content');
    const [darkMode, setDarkMode] = useState(false);

    return (
        <StudioContext.Provider
            value={{
                currentView,
                setCurrentView,
                isFirstVisit,
                setIsFirstVisit,
                projects,
                setProjects,
                currentDeck,
                setCurrentDeck,
                wizardStep,
                setWizardStep,
                uploadedFiles,
                setUploadedFiles,
                extractedStyle,
                setExtractedStyle,
                deckContent,
                setDeckContent,
                selectedSlideId,
                setSelectedSlideId,
                rightPanelTab,
                setRightPanelTab,
                darkMode,
                setDarkMode,
            }}
        >
            {children}
        </StudioContext.Provider>
    );
}

export function useStudio() {
    const context = useContext(StudioContext);
    if (context === undefined) {
        throw new Error('useStudio must be used within a StudioProvider');
    }
    return context;
}
