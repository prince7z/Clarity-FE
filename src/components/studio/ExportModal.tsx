import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useStudio } from './StudioContext';
import axios from 'axios';
import {
    X,
    Download,
    FileText,
    Presentation,
    Lock,
    MessageSquare,
    BookOpen,
    Loader2,
    CheckCircle2,
    Layers,
    HardDrive,
    AlertCircle
} from 'lucide-react';

const GAMMA_API_KEY = 'sk-gamma-yxIevBweJdS0A0dBB133cQSxG7efIGtOMVL3OEjeF4';
const GAMMA_API_BASE = 'https://public-api.gamma.app/v1.0';

interface ExportModalProps {
    onClose: () => void;
}

type ExportFormat = 'pptx' | 'pdf';

export default function ExportModal({ onClose }: ExportModalProps) {

    const { currentDeck, pollingPresentationId } = useStudio();
    const [format, setFormat] = useState<ExportFormat>('pptx');
    const [fileName, setFileName] = useState(currentDeck?.name.replace(/\s+/g, '_') + '_Q2_2024' || 'Presentation');
    const [options, setOptions] = useState({
        speakerNotes: false,
        citations: true,
        passwordProtect: false,
        trackChanges: false,
    });
    const [isExporting, setIsExporting] = useState(false);
    const [exportComplete, setExportComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [exportProgress, setExportProgress] = useState('Preparing export...');

    const handleExport = async () => {
        // Prioritize current deck ID over polling ID to ensure we export the correct presentation
        const presentationId = currentDeck?.id || pollingPresentationId;
        
        if (!presentationId) {
            setError('No presentation ID found. Please generate a presentation first.');
            return;
        }

        setIsExporting(true);
        setError(null);
        setExportProgress('Requesting export from Gamma API...');

        try {
            // Step 1: First, check if we can get the presentation status and export URLs
            setExportProgress('Fetching presentation details...');
            
            // Get the existing presentation to check if it has export URLs already
            const presentationResponse = await axios.get(
                `${GAMMA_API_BASE}/generations/bxpTxRE8GgNy6etdNCxXy`,
                {
                    headers: {
                        'X-API-KEY': GAMMA_API_KEY,
                    },
                }
            );

            const { status, pdfUrl, pptxUrl } = presentationResponse.data;
            
            // If the presentation is complete and has the export URL we need, use it directly
            if (status === 'completed') {
                const existingUrl = format === 'pdf' ? pdfUrl : pptxUrl;
                
                if (existingUrl) {
                    // We already have the export URL, download it directly
                    setExportProgress('Downloading file...');
                    const link = document.createElement('a');
                    link.href = existingUrl;
                    link.download = `${fileName}.${format}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    setIsExporting(false);
                    setExportComplete(true);
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                    return;
                }
            }
            
            // Step 2: If no export URL exists, request a new export by creating a generation with exportAs
            setExportProgress('Creating ' + format.toUpperCase() + ' file...');
            const exportResponse = await axios.post(
                `${GAMMA_API_BASE}/generations`,
                {
                    inputText: 'Export existing presentation',
                    textMode: 'preserve',
                    format: 'presentation',
                    exportAs: format, // 'pdf' or 'pptx'
                    sourceGenerationId: presentationId, // Reference the existing presentation
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': GAMMA_API_KEY,
                    },
                }
            );

            const newGenerationId = exportResponse.data.generationId;
            
            // Step 2: Poll for the export to complete
            setExportProgress('Processing export...');
            let attempts = 0;
            const maxAttempts = 60; // 5 minutes max (5 second intervals)
            
            const pollForExport = async (): Promise<string | null> => {
                while (attempts < maxAttempts) {
                    attempts++;
                    setExportProgress(`Processing... (${attempts * 5}s)`);
                    
                    const statusResponse = await axios.get(
                        `${GAMMA_API_BASE}/generations/${newGenerationId}`,
                        {
                            headers: {
                                'X-API-KEY': GAMMA_API_KEY,
                            },
                        }
                    );

                    const { status, pdfUrl, pptxUrl } = statusResponse.data;

                    if (status === 'completed') {
                        // Return the appropriate URL based on format
                        return format === 'pdf' ? pdfUrl : pptxUrl;
                    } else if (status === 'failed') {
                        throw new Error('Export failed');
                    }

                    // Wait 5 seconds before polling again
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
                
                throw new Error('Export timeout - please try again');
            };

            const downloadUrl = await pollForExport();

            if (!downloadUrl) {
                throw new Error('No download URL received');
            }

            // Step 3: Download the file
            setExportProgress('Downloading file...');
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${fileName}.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
            setExportComplete(true);
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (err: any) {
            console.error('Export error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to export. Please try again.');
            setIsExporting(false);
        }
    };

    const toggleOption = (key: keyof typeof options) => {
        setOptions({ ...options, [key]: !options[key] });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
                className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
                {exportComplete ? (
                    <motion.div
                        className="p-12 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 15 }}
                            className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </motion.div>
                        <h2 className="text-2xl font-bold mb-2">Export Complete!</h2>
                        <p className="text-muted-foreground">
                            Your {format.toUpperCase()} file has been downloaded.
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                                    <Download className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-lg">Export Your PowerPoint</h2>
                                    <p className="text-sm text-muted-foreground">Choose format and options</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Warning if no presentation ID */}
                            {!pollingPresentationId && !currentDeck?.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                                >
                                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-amber-600">No Presentation Generated</p>
                                        <p className="text-sm text-amber-600/80 mt-1">
                                            Please generate a presentation first before exporting.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Format Options */}
                            <div>
                                <h3 className="text-sm font-medium mb-4">FORMAT OPTIONS</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* PPTX Option */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setFormat('pptx')}
                                        className={`p-6 rounded-xl border-2 text-center transition-all duration-200 ${format === 'pptx'
                                                ? 'border-primary bg-primary/5 shadow-lg'
                                                : 'border-border hover:border-primary/30'
                                            }`}
                                    >
                                        <Presentation className={`w-10 h-10 mx-auto mb-3 ${format === 'pptx' ? 'text-primary' : 'text-muted-foreground'
                                            }`} />
                                        <Badge className={`mb-3 ${format === 'pptx'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                            }`}>
                                            PPTX
                                        </Badge>
                                        <p className="font-medium mb-1">Editable PowerPoint</p>
                                        <p className="text-xs text-muted-foreground">
                                            Best for: Further edits, Collaboration
                                        </p>
                                    </motion.button>

                                    {/* PDF Option */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setFormat('pdf')}
                                        className={`p-6 rounded-xl border-2 text-center transition-all duration-200 ${format === 'pdf'
                                                ? 'border-primary bg-primary/5 shadow-lg'
                                                : 'border-border hover:border-primary/30'
                                            }`}
                                    >
                                        <FileText className={`w-10 h-10 mx-auto mb-3 ${format === 'pdf' ? 'text-primary' : 'text-muted-foreground'
                                            }`} />
                                        <Badge className={`mb-3 ${format === 'pdf'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                            }`}>
                                            PDF
                                        </Badge>
                                        <p className="font-medium mb-1">Print-ready PDF</p>
                                        <p className="text-xs text-muted-foreground">
                                            Best for: Distribution, Presentations
                                        </p>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Enhanced Options */}
                            <div>
                                <h3 className="text-sm font-medium mb-4">ENHANCED OPTIONS</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                            <Label htmlFor="speakerNotes" className="cursor-pointer">
                                                Include speaker notes
                                            </Label>
                                        </div>
                                        <Checkbox
                                            id="speakerNotes"
                                            checked={options.speakerNotes}
                                            onCheckedChange={() => toggleOption('speakerNotes')}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                                            <Label htmlFor="citations" className="cursor-pointer">
                                                Include source citations appendix
                                            </Label>
                                        </div>
                                        <Checkbox
                                            id="citations"
                                            checked={options.citations}
                                            onCheckedChange={() => toggleOption('citations')}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Lock className="w-4 h-4 text-muted-foreground" />
                                            <Label htmlFor="password" className="cursor-pointer">
                                                Password protect
                                            </Label>
                                        </div>
                                        <Checkbox
                                            id="password"
                                            checked={options.passwordProtect}
                                            onCheckedChange={() => toggleOption('passwordProtect')}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Layers className="w-4 h-4 text-muted-foreground" />
                                            <Label htmlFor="trackChanges" className="cursor-pointer">
                                                Track changes/comments version
                                            </Label>
                                        </div>
                                        <Checkbox
                                            id="trackChanges"
                                            checked={options.trackChanges}
                                            onCheckedChange={() => toggleOption('trackChanges')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Error Display */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20"
                                >
                                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-destructive">Export Error</p>
                                        <p className="text-sm text-destructive/80 mt-1">{error}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* File Name */}
                            <div>
                                <Label htmlFor="fileName" className="text-sm font-medium">
                                    FILE NAME
                                </Label>
                                <Input
                                    id="fileName"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    className="mt-2"
                                />
                            </div>

                            {/* File Info */}

                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-border flex items-center justify-between bg-muted/20">
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleExport}
                                disabled={isExporting || (!pollingPresentationId && !currentDeck?.id)}
                                className="gap-2 px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                            >
                                {isExporting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {exportProgress}
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        EXPORT NOW
                                    </>
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}
