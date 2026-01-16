import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useStudio } from './StudioContext';
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
    HardDrive
} from 'lucide-react';

interface ExportModalProps {
    onClose: () => void;
}

type ExportFormat = 'pptx' | 'pdf';

export default function ExportModal({ onClose }: ExportModalProps) {
    const { currentDeck } = useStudio();
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

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setExportComplete(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        }, 2000);
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
                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Layers className="w-4 h-4 text-muted-foreground" />
                                        <span>{currentDeck?.slides.length || 24} slides</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <HardDrive className="w-4 h-4 text-muted-foreground" />
                                        <span>~4.2 MB</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-border flex items-center justify-between bg-muted/20">
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleExport}
                                disabled={isExporting}
                                className="gap-2 px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                            >
                                {isExporting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Exporting...
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
