import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudio } from './StudioContext';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const N8N_URL = import.meta.env.VITE_N8N_URL;

import {
    Upload,
    FileUp,
    X,
    Check,
    ChevronRight,
    ChevronLeft,
    Palette,
    Type,
    Layout,
    BarChart3,
    Image,
    Users,
    Building2,
    Briefcase,
    PieChart,
    DollarSign,
    Loader2,
    FileSpreadsheet,
    Search,
    BookOpen,
    TrendingUp,
    Zap,
    Sparkles,
    Play,
    Clock,
    FileText,
    Layers
} from 'lucide-react';

const audienceTypes = [
    { id: 'lp-investor', label: 'LP/Investor', icon: Users },
    { id: 'board', label: 'Board', icon: Building2 },
    { id: 'internal', label: 'Internal Team', icon: Briefcase },
    { id: 'pitch', label: 'Pitch', icon: TrendingUp },
    { id: 'lender', label: 'Lender', icon: DollarSign },
    { id: 'corpdev', label: 'CorpDev', icon: PieChart },
];

const researchOptions = [
    { id: 'competitive', label: 'Competitive landscape analysis', icon: Users },
    { id: 'market-sizing', label: 'Latest market sizing data', icon: BarChart3 },
    { id: 'company-financials', label: 'Company financials & news', icon: TrendingUp },
    { id: 'industry-trends', label: 'Industry trends', icon: BookOpen },
];

const buildOptions = [
    { id: 'standard', label: 'Standard build', description: 'Recommended for most use cases', recommended: true },
    { id: 'fast', label: 'Fast build', description: 'Fewer validations, quicker results' },
    { id: 'thorough', label: 'Thorough build', description: 'Deep research + citations' },
];

interface UploadedFile {
    name: string;
    size: number;
    type: string;
    file?: File; // Actual file object for upload
}

function UploadZone({
    index,
    file,
    onFileDrop
}: {
    index: number;
    file: UploadedFile | null;
    onFileDrop: (file: UploadedFile) => void;
}) {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useCallback((input: HTMLInputElement | null) => {
        if (input) {
            input.onclick = () => input.value = ''; // Reset to allow same file selection
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type.includes('presentation') || droppedFile.type === 'application/pdf')) {
            onFileDrop({
                name: droppedFile.name,
                size: droppedFile.size,
                type: droppedFile.type,
                file: droppedFile,
            });
        }
    }, [onFileDrop]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => setIsDragOver(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileDrop({
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type,
                file: selectedFile,
            });
        }
    };

    const handleClick = () => {
        document.getElementById(`file-input-${index}`)?.click();
    };

    if (file) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative aspect-square rounded-2xl bg-primary/5 border-2 border-primary/30 p-4 flex flex-col items-center justify-center"
            >
                <div className="absolute top-2 right-2">
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-0">
                        <Check className="w-3 h-3 mr-1" />
                        Uploaded
                    </Badge>
                </div>
                <FileText className="w-10 h-10 text-primary mb-2" />
                <p className="text-sm font-medium text-center truncate w-full">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
            </motion.div>
        );
    }

    return (
        <>
            <input
                id={`file-input-${index}`}
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pptx,.pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf"
                className="hidden"
            />
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`aspect-square rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 flex flex-col items-center justify-center p-4 ${isDragOver
                        ? 'border-primary bg-primary/10 scale-105'
                        : 'border-muted-foreground/20 hover:border-primary/50 bg-muted/30 hover:bg-muted/50'
                    }`}
            >
                <Upload className={`w-8 h-8 mb-2 transition-colors ${isDragOver ? 'text-primary' : 'text-muted-foreground/50'}`} />
                <p className="text-sm text-muted-foreground text-center">Drop Zone {index + 1}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Click or drag</p>
            </motion.div>
        </>
    );
}

function Step1Upload({ onFilesChange }: { onFilesChange?: (files: (UploadedFile | null)[]) => void }) {
    const { uploadedFiles, setUploadedFiles } = useStudio();
    const [files, setFiles] = useState<(UploadedFile | null)[]>([null, null, null]);

    const handleFileDrop = (index: number, file: UploadedFile) => {
        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
        onFilesChange?.(newFiles);
    };

    const hasFiles = files.some(f => f !== null);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/25 mb-6"
                >
                    <Upload className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Show us your style</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Upload 1-3 similar presentations that represent your ideal style. We'll learn their design language.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                {files.map((file, index) => (
                    <UploadZone
                        key={index}
                        index={index}
                        file={file}
                        onFileDrop={(f) => handleFileDrop(index, f)}
                    />
                ))}
            </div>

            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <FileUp className="w-4 h-4" />
                    <span>Supports .pptx and .pdf files</span>
                </div>
                <div className="text-xs text-muted-foreground/60 space-y-1">
                    <p>• Previous investor presentations</p>
                    <p>• Your company's standard template</p>
                    <p>• "Perfect" decks you want to replicate</p>
                </div>
            </div>

            {hasFiles && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                >
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-0 py-2 px-4">
                        <Check className="w-4 h-4 mr-2" />
                        {files.filter(f => f !== null).length} file(s) ready for analysis
                    </Badge>
                </motion.div>
            )}
        </div>
    );
}

function Step2AnalyzeStyle() {
    const [analyzing, setAnalyzing] = useState(true);

    // Simulate analysis completion
    useState(() => {
        const timer = setTimeout(() => setAnalyzing(false), 2000);
        return () => clearTimeout(timer);
    });

    const stylePreview = {
        colors: { primary: '#0F172A', accent: '#38BDF8' },
        fonts: { title: 'Calibri 32pt', body: '14pt' },
        layout: '0.5" margins, 3-col max',
        charts: 'Column charts, right legend',
        logo: 'Bottom-right on all slides',
        confidence: 94,
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/25 mb-6"
                >
                    <Palette className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Confirm your presentation DNA</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    We've extracted the style from your presentations. Review and confirm or make adjustments.
                </p>
            </div>

            {analyzing ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                >
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Analyzing your presentations...</p>
                    <Progress value={65} className="w-64 mt-4" />
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Success indicator */}
                    <div className="flex justify-center">
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-0 py-2 px-4">
                            <Check className="w-4 h-4 mr-2" />
                            Extracted style from 3 presentations
                        </Badge>
                    </div>

                    {/* Style Preview Card */}
                    <div className="bg-card rounded-2xl border border-border p-6 max-w-lg mx-auto">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            DECK DNA SUMMARY
                        </h3>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Palette className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Colors:</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded" style={{ backgroundColor: stylePreview.colors.primary }} />
                                    <span className="font-mono text-xs">{stylePreview.colors.primary}</span>
                                    <div className="w-4 h-4 rounded" style={{ backgroundColor: stylePreview.colors.accent }} />
                                    <span className="font-mono text-xs">{stylePreview.colors.accent}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <Type className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Fonts:</span>
                                <span>{stylePreview.fonts.title} titles, {stylePreview.fonts.body} body</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <Layout className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Layout:</span>
                                <span>{stylePreview.layout}</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Charts:</span>
                                <span>{stylePreview.charts}</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <Image className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Logo:</span>
                                <span>{stylePreview.logo}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Confidence:</span>
                            <div className="flex items-center gap-2">
                                <Progress value={stylePreview.confidence} className="w-32" />
                                <Badge className="bg-emerald-500/10 text-emerald-600 border-0">
                                    {stylePreview.confidence}% ✓
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Palette className="w-4 h-4" />
                            Edit Style
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function Step3Content({
    companyName,
    presentationType,
    onMetaChange,
    onDataChange,
}: {
    companyName: string;
    presentationType: string;
    onMetaChange?: (meta: { companyName: string; presentationType: string }) => void;
    onDataChange?: (data: any) => void;
}) {
    const { deckContent, setDeckContent } = useStudio();
    const [localCompanyName, setLocalCompanyName] = useState(companyName || '');
    const [localPresentationType, setLocalPresentationType] = useState(presentationType || '');
    const [selectedAudience, setSelectedAudience] = useState('lp-investor');
    const [briefText, setBriefText] = useState('');
    const [selectedResearch, setSelectedResearch] = useState<string[]>([]);
    const [financialFiles, setFinancialFiles] = useState<UploadedFile[]>([]);

    // Notify parent of data changes
    const updateParent = () => {
        onDataChange?.({
            audience: selectedAudience,
            brief: briefText,
            research: selectedResearch,
            financialFiles: financialFiles
        });
    };

    const updateMeta = (next: { companyName?: string; presentationType?: string }) => {
        const nextCompanyName = next.companyName ?? localCompanyName;
        const nextPresentationType = next.presentationType ?? localPresentationType;
        onMetaChange?.({
            companyName: nextCompanyName,
            presentationType: nextPresentationType,
        });
    };

    const toggleResearch = (id: string) => {
        setSelectedResearch(prev => {
            const newResearch = prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id];
            setTimeout(() => updateParent(), 0);
            return newResearch;
        });
    };

    const handleAddFinancialFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const newFiles = [...financialFiles];
            Array.from(selectedFiles).forEach(file => {
                newFiles.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file,
                });
            });
            setFinancialFiles(newFiles);
            setTimeout(() => updateParent(), 0);
        }
    };

    const handleRemoveFinancialFile = (index: number) => {
        const newFiles = financialFiles.filter((_, i) => i !== index);
        setFinancialFiles(newFiles);
        setTimeout(() => updateParent(), 0);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/25 mb-6"
                >
                    <FileSpreadsheet className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">What goes in your PowerPoint?</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Tell us about your audience and provide the content for your presentation.
                </p>
            </div>

            {/* Company / Deck Metadata */}
            <div className="space-y-4">
                <Label className="text-sm font-medium">COMPANY & DECK</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="company-name" className="text-xs text-muted-foreground">Company Name</Label>
                        <Input
                            id="company-name"
                            placeholder="e.g., CloudScale"
                            value={localCompanyName}
                            onChange={(e) => {
                                const value = e.target.value;
                                setLocalCompanyName(value);
                                setTimeout(() => updateMeta({ companyName: value }), 0);
                            }}
                            className="bg-background/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="presentation-type" className="text-xs text-muted-foreground">Presentation Type</Label>
                        <Input
                            id="presentation-type"
                            placeholder="e.g., board presentation, investor update, pitch deck"
                            value={localPresentationType}
                            onChange={(e) => {
                                const value = e.target.value;
                                setLocalPresentationType(value);
                                setTimeout(() => updateMeta({ presentationType: value }), 0);
                            }}
                            className="bg-background/50"
                        />
                    </div>
                </div>
            </div>

            {/* Audience Selection */}
            <div className="space-y-4">
                <Label className="text-sm font-medium">AUDIENCE & PURPOSE</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {audienceTypes.map((audience) => {
                        const Icon = audience.icon;
                        const isSelected = selectedAudience === audience.id;
                        return (
                            <motion.button
                                key={audience.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setSelectedAudience(audience.id);
                                    setTimeout(() => updateParent(), 0);
                                }}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/30'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                                <p className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {audience.label}
                                </p>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Content Inputs */}
            <div className="space-y-6">
                {/* Financial Data Upload */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">1</span>
                        UPLOAD FINANCIAL DATA
                    </Label>
                    <input
                        id="financial-files-input"
                        type="file"
                        onChange={handleAddFinancialFile}
                        accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
                        multiple
                        className="hidden"
                    />
                    <div
                        onClick={() => document.getElementById('financial-files-input')?.click()}
                        className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-6 cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all duration-200"
                    >
                        <div className="flex items-center justify-center gap-4">
                            <FileSpreadsheet className="w-8 h-8 text-muted-foreground/50" />
                            <div className="text-left">
                                <p className="text-sm font-medium">Drop Excel/CSV files here</p>
                                <p className="text-xs text-muted-foreground">or click to browse</p>
                            </div>
                        </div>
                    </div>
                    {financialFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {financialFiles.map((file, index) => (
                                <Badge key={index} variant="secondary" className="gap-2 py-1.5">
                                    <FileSpreadsheet className="w-3 h-3" />
                                    {file.name}
                                    <X 
                                        className="w-3 h-3 cursor-pointer hover:text-destructive" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFinancialFile(index);
                                        }}
                                    />
                                </Badge>
                            ))}
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-0">
                                ✓ {financialFiles.length} file(s) uploaded
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Brief/Description */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">2</span>
                        ADD BRIEF/DESCRIPTION
                    </Label>
                    <Textarea
                        placeholder='Create investment deck for SaaS company "CloudScale". Need to show:
- Market opportunity ($15B growing 12%)
- Competitive advantage
- Financial projections (5 years)
- Investment ask: $50M Series C'
                        value={briefText}
                        onChange={(e) => {
                            setBriefText(e.target.value);
                            setTimeout(() => updateParent(), 0);
                        }}
                        className="min-h-[140px] bg-background/50"
                    />
                </div>

                {/* Research Requests */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">3</span>
                        RESEARCH REQUESTS
                        <Badge variant="secondary" className="text-xs">Optional</Badge>
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                        {researchOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = selectedResearch.includes(option.id);
                            return (
                                <motion.button
                                    key={option.id}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => toggleResearch(option.id)}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left ${isSelected
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/30'
                                        }`}
                                >
                                    <Checkbox checked={isSelected} className="pointer-events-none" />
                                    <Icon className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                                    <span className="text-sm">{option.label}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Step4Preview({ wizardData }: { wizardData?: any }) {
    const [selectedBuild, setSelectedBuild] = useState('standard');
    const [isBuilding, setIsBuilding] = useState(false);
    const { setCurrentView, setCurrentDeck, setPollingPresentationId } = useStudio();

    const slideOutline = [
        { num: 1, title: 'TITLE SLIDE' },
        { num: 2, title: 'EXECUTIVE SUMMARY (3 key points)' },
        { num: 3, title: 'MARKET OPPORTUNITY ($15B, 12% CAGR)' },
        { num: 4, title: 'COMPETITIVE LANDSCAPE' },
        { num: 5, title: 'FINANCIAL HIGHLIGHTS' },
        { num: 6, title: 'PROJECTIONS (5-year forecast)' },
        { num: 7, title: 'INVESTMENT THESIS' },
        { num: 8, title: 'USE OF PROCEEDS' },
        { num: 9, title: 'TEAM' },
        { num: 10, title: 'APPENDIX' },
    ];

    const handleStartBuilding = async () => {
        setIsBuilding(true);

        try {
            // Prepare FormData
const formData = new FormData();

// Use snake_case to match n8n expectations
formData.append('company_name', wizardData?.companyName || 'Not provided');
formData.append('presentation_type', wizardData?.presentationType || 'board presentation');
formData.append('target_audience', wizardData?.content?.audience || 'lp-investor');
formData.append('investment_thesis', wizardData?.content?.brief || '');

// Research requirements
const researchRequirements = wizardData?.content?.research?.join(', ') || '';
formData.append('research_requirements', researchRequirements);

// Reference presentations - keep the same field name for all files
if (wizardData?.referenceFiles) {
    wizardData.referenceFiles.forEach((fileData: UploadedFile | null) => {
        if (fileData?.file) {
            // Use a consistent field name - n8n will group them
            formData.append('reference_presentations', fileData.file, fileData.name);
        }
    });
}

// Financial files
if (wizardData?.content?.financialFiles) {
    wizardData.content.financialFiles.forEach((fileData: UploadedFile) => {
        if (fileData.file) {
            formData.append('financial_files', fileData.file, fileData.name);
        }
    });
}

            // Send axios request
            const response = await axios.post(
                N8N_URL,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Response:', response.data);
            
            // Check if response has presentation_id
            if (response.data && response.data.presentation_id) {
                // Set the presentation ID for polling
                setPollingPresentationId(response.data.presentation_id);
                // Navigate to polling view
                setCurrentView('polling');
            } else {
                // Fallback: if no presentation_id, show error
                alert('Failed to start presentation generation. No presentation ID received.');
                setIsBuilding(false);
            }
        } catch (error) {
            console.error('Error submitting deck data:', error);
            setIsBuilding(false);
            alert('Failed to submit deck data. Please try again.');
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/25 mb-6"
                >
                    <Layers className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Review and build your PowerPoint</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Preview the slide structure and choose your build settings.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Slide Outline */}
                <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary" />
                        DECK PREVIEW (Outline)
                    </h3>
                    <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
                        {slideOutline.map((slide, index) => (
                            <motion.div
                                key={slide.num}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                                    {slide.num}
                                </span>
                                <span className="text-sm">{slide.title}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Build Options */}
                <div className="space-y-6">
                    <div className="bg-card rounded-2xl border border-border p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Estimated Time</p>
                                <p className="text-2xl font-bold text-primary">8-12 minutes</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-2xl border border-border p-6">
                        <h3 className="font-semibold mb-4">BUILD OPTIONS</h3>
                        <RadioGroup value={selectedBuild} onValueChange={setSelectedBuild}>
                            {buildOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedBuild === option.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/30'
                                        }`}
                                    onClick={() => setSelectedBuild(option.id)}
                                >
                                    <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor={option.id} className="font-medium cursor-pointer">
                                                {option.label}
                                            </Label>
                                            {option.recommended && (
                                                <Badge className="bg-primary/10 text-primary border-0 text-xs">
                                                    Recommended
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                                    </div>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <Button
                        size="lg"
                        className="w-full gap-2 h-14 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                        onClick={handleStartBuilding}
                        disabled={isBuilding}
                    >
                        {isBuilding ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Building your deck...
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5" />
                                START BUILDING
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function DeckSetupWizard() {
    const { wizardStep, setWizardStep, setCurrentView } = useStudio();
    const [wizardData, setWizardData] = useState({
        referenceFiles: [null, null, null] as (UploadedFile | null)[],
        content: {
            audience: 'lp-investor',
            brief: '',
            research: [] as string[],
            financialFiles: [] as UploadedFile[]
        },
        companyName: 'Swafinix',
        presentationType: 'board presentation'
    });

    const steps = [
        { id: 1, title: 'Upload Style', component: Step1Upload },
        { id: 2, title: 'Analyze Style', component: Step2AnalyzeStyle },
        { id: 3, title: 'Add Content', component: Step3Content },
        { id: 4, title: 'Preview & Build', component: Step4Preview },
    ];

    const currentStep = steps[wizardStep - 1];
    const CurrentComponent = currentStep?.component || Step1Upload;

    const handleNext = () => {
        if (wizardStep < steps.length) {
            setWizardStep(wizardStep + 1);
        }
    };

    const handleBack = () => {
        if (wizardStep > 1) {
            setWizardStep(wizardStep - 1);
        } else {
            setCurrentView('dashboard');
        }
    };

    const handleSkip = () => {
        if (wizardStep < steps.length) {
            setWizardStep(wizardStep + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" onClick={() => setCurrentView('dashboard')} className="gap-2">
                        <X className="w-4 h-4" />
                        Cancel
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        Step {wizardStep} of {steps.length}
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <motion.div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step.id === wizardStep
                                        ? 'bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/25'
                                        : step.id < wizardStep
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                                initial={false}
                                animate={{ scale: step.id === wizardStep ? 1.1 : 1 }}
                            >
                                {step.id < wizardStep ? <Check className="w-5 h-5" /> : step.id}
                            </motion.div>
                            {index < steps.length - 1 && (
                                <div className={`w-12 h-0.5 mx-2 transition-colors ${step.id < wizardStep ? 'bg-emerald-500' : 'bg-muted'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <motion.div
                    key={wizardStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 p-8"
                >
                    {wizardStep === 1 && (
                        <Step1Upload 
                            onFilesChange={(files) => setWizardData({ ...wizardData, referenceFiles: files })} 
                        />
                    )}
                    {wizardStep === 2 && <Step2AnalyzeStyle />}
                    {wizardStep === 3 && (
                        <Step3Content 
                            companyName={wizardData.companyName}
                            presentationType={wizardData.presentationType}
                            onMetaChange={(meta) => setWizardData((prev) => ({ ...prev, ...meta }))}
                            onDataChange={(data) => setWizardData((prev) => ({ ...prev, content: data }))} 
                        />
                    )}
                    {wizardStep === 4 && <Step4Preview wizardData={wizardData} />}
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                    <Button variant="ghost" onClick={handleBack} className="gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        {wizardStep === 1 ? 'Cancel' : 'Back'}
                    </Button>

                    <div className="flex items-center gap-3">
                        {wizardStep < steps.length && (
                            <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                                Skip
                            </Button>
                        )}
                        {wizardStep < steps.length && (
                            <Button onClick={handleNext} className="gap-2">
                                Next: {steps[wizardStep]?.title}
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
