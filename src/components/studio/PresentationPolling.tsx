import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    Loader2,
    Search,
    BarChart3,
    FileSpreadsheet,
    Image,
    TrendingUp,
    Brain,
    Sparkles,
    CheckCircle2,
    Home,
    ExternalLink,
    Eye
} from 'lucide-react';
import { useStudio } from './StudioContext';

interface PresentationPollingProps {
    presentationId: string;
    onComplete: (url: string) => void;
}

const loadingMessages = [
    { icon: Search, text: "Extracting data from your files...", duration: 3000 },
    { icon: Brain, text: "Analyzing market trends and insights...", duration: 4000 },
    { icon: BarChart3, text: "Processing financial data...", duration: 3500 },
    { icon: TrendingUp, text: "Conducting competitive analysis...", duration: 4500 },
    { icon: FileSpreadsheet, text: "Structuring presentation outline...", duration: 3000 },
    { icon: Image, text: "Applying your brand DNA...", duration: 3500 },
    { icon: Sparkles, text: "Generating slides with AI...", duration: 4000 },
    { icon: Brain, text: "Optimizing visual layouts...", duration: 3000 },
    { icon: BarChart3, text: "Creating charts and graphs...", duration: 3500 },
    { icon: Sparkles, text: "Polishing final touches...", duration: 3000 }
];

export default function PresentationPolling({ presentationId, onComplete }: PresentationPollingProps) {
    const { setCurrentView, setCurrentDeck } = useStudio();
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [presentationUrl, setPresentationUrl] = useState<string | null>(null);
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Poll Google Sheets for presentation URL
    const pollForPresentationUrl = async () => {
        try {
            // Using Google Sheets API to fetch data
            const sheetId = '1HsytksVRGJagIh6mFfpvUVz57G9sNKlZLlfR-y5YmgI';
            
            // For public sheets, we can use the JSON export
            const response = await fetch(
                `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`
            );
            
            if (!response.ok) {
                console.error('Failed to fetch sheet data');
                return null;
            }

            const text = await response.text();
            // Remove the "/*O_o*/google.visualization.Query.setResponse(" prefix and ");" suffix
            const jsonString = text.substring(47, text.length - 2);
            const data = JSON.parse(jsonString);

            // Get all rows
            const rows = data.table.rows;
            
            if (rows.length === 0) {
                console.error('No rows found in sheet');
                return null;
            }

            // First row contains the headers
            const headerRow = rows[0].c;
            const headers = headerRow.map((cell: any) => cell?.v || '');
            
            // Find column indices
            const idColumnIndex = headers.findIndex((name: string) => 
                name.toLowerCase() === 'presentation_id'
            );
            const urlColumnIndex = headers.findIndex((name: string) => 
                name.toLowerCase() === 'presentation_url'
            );

            if (idColumnIndex === -1 || urlColumnIndex === -1) {
                console.error('Required columns not found in sheet. Headers:', headers);
                return null;
            }

            // Search for the presentation ID (skip first row which is headers)
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].c;
                if (!cells) continue;
                
                const rowPresentationId = cells[idColumnIndex]?.v;
                const rowUrl = cells[urlColumnIndex]?.v;

                if (rowPresentationId === presentationId && rowUrl) {
                    return rowUrl;
                }
            }

            return null;
        } catch (error) {
            console.error('Error polling for presentation URL:', error);
            return null;
        }
    };

    // Start polling
    useEffect(() => {
        const poll = async () => {
            const url = await pollForPresentationUrl();
            if (url) {
                setPresentationUrl(url);
                setIsComplete(true);
                setProgress(100);
                if (pollingIntervalRef.current) {
                    clearInterval(pollingIntervalRef.current);
                }
                if (messageTimeoutRef.current) {
                    clearTimeout(messageTimeoutRef.current);
                }
            }
        };

        // Poll every 5 seconds
        poll(); // Initial poll
        pollingIntervalRef.current = setInterval(poll, 5000);

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, [presentationId]);

    // Cycle through loading messages
    useEffect(() => {
        if (isComplete) return;

        const currentMessage = loadingMessages[currentMessageIndex];
        
        messageTimeoutRef.current = setTimeout(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
            setProgress((prev) => Math.min(prev + 10, 95)); // Gradually increase progress up to 95%
        }, currentMessage.duration);

        return () => {
            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
            }
        };
    }, [currentMessageIndex, isComplete]);

    const handleOpenPresentation = () => {
        if (presentationUrl) {
            window.open(presentationUrl, '_blank');
        }
    };
    
    const handleViewInEditor = () => {
        if (presentationUrl) {
            setCurrentDeck({
                id: presentationId,
                name: 'Generated Presentation',
                style: {
                    primaryColor: '#0F172A',
                    accentColor: '#38BDF8',
                    titleFont: 'Calibri',
                    titleSize: '32pt',
                    bodyFont: 'Calibri',
                    bodySize: '14pt',
                    margins: '0.5"',
                    logoPosition: 'bottom-right',
                    chartStyle: 'column',
                    confidence: 94,
                },
                slides: [],
                buildProgress: 100,
                status: 'ready',
                iframeUrl: presentationUrl,
            });
            setCurrentView('editor');
            onComplete(presentationUrl);
        }
    };

    const handleGoToDashboard = () => {
        setCurrentView('dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 max-w-2xl w-full"
            >
                <div className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 p-8 md:p-12 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {!isComplete ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                {/* Status Badge */}
                                <div className="flex justify-center">
                                    <Badge className="bg-primary/10 text-primary border-0 px-4 py-2 text-sm">
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Generating Presentation
                                    </Badge>
                                </div>

                                {/* Main Loading Icon */}
                                <div className="flex justify-center">
                                    <motion.div
                                        className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/25"
                                        animate={{
                                            scale: [1, 1.05, 1],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        {loadingMessages[currentMessageIndex] && (
                                            <motion.div
                                                key={currentMessageIndex}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {(() => {
                                                    const Icon = loadingMessages[currentMessageIndex].icon;
                                                    return <Icon className="w-10 h-10 text-primary-foreground" />;
                                                })()}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </div>

                                {/* Loading Message */}
                                <div className="text-center space-y-3">
                                    <AnimatePresence mode="wait">
                                        <motion.h2
                                            key={currentMessageIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-2xl font-bold"
                                        >
                                            {loadingMessages[currentMessageIndex]?.text}
                                        </motion.h2>
                                    </AnimatePresence>
                                    <p className="text-muted-foreground">
                                        This may take a few minutes. We're crafting your perfect presentation.
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-3">
                                    <Progress value={progress} className="h-2" />
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>Progress</span>
                                        <span>{progress}%</span>
                                    </div>
                                </div>

                                {/* Presentation ID */}
                                <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Presentation ID</p>
                                    <p className="font-mono text-sm">{presentationId}</p>
                                </div>

                                {/* Queue Notice */}
                                <div className="text-center pt-4 border-t border-border space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        Your request is in queue. Once generated, you can find it on the studio page.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={handleGoToDashboard}
                                        className="gap-2"
                                    >
                                        <Home className="w-4 h-4" />
                                        Go to Studio Dashboard
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-8 text-center"
                            >
                                {/* Success Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", duration: 0.6 }}
                                    className="flex justify-center"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/25">
                                        <CheckCircle2 className="w-10 h-10 text-white" />
                                    </div>
                                </motion.div>

                                {/* Success Message */}
                                <div className="space-y-3">
                                    <h2 className="text-3xl font-bold">Presentation Ready! 🎉</h2>
                                    <p className="text-muted-foreground">
                                        Your presentation has been successfully generated and is ready to view.
                                    </p>
                                </div>

                                {/* Presentation URL */}
                                <div className="bg-emerald-500/10 rounded-xl p-4 space-y-2 border border-emerald-500/20">
                                    <p className="text-xs text-emerald-600 uppercase tracking-wide font-semibold">Presentation Link</p>
                                    <a 
                                        href={presentationUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline flex items-center justify-center gap-2 break-all"
                                    >
                                        {presentationUrl}
                                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                    </a>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3 pt-4">
                                    <Button
                                        onClick={handleViewInEditor}
                                        className="w-full gap-2 h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View in Editor
                                    </Button>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={handleOpenPresentation}
                                            className="flex-1 gap-2 h-12"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Open in Gamma
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleGoToDashboard}
                                            className="flex-1 gap-2 h-12"
                                        >
                                            <Home className="w-4 h-4" />
                                            Dashboard
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Additional Info */}
                {!isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-center text-xs text-muted-foreground"
                    >
                        <p>Keep this window open or check back later from your dashboard</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
