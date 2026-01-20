import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Upload,
    FileUp,
    X,
    Check,
    Building2,
    Users,
    Target,
    Lightbulb,
    FileText,
    FileSpreadsheet,
    Search,
    Loader2,
    Download,
    ExternalLink,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Presentation
} from 'lucide-react';
import {
    PresentationFormData,
    GenerationProgress,
    QAValidation,
    generateFullPresentation
} from '@/services/presentationApi';

const presentationTypes = [
    { value: 'Investment Committee (IC) Deck', label: 'Investment Committee (IC) Deck' },
    { value: 'Limited Partner (LP) Update', label: 'Limited Partner (LP) Update' },
    { value: 'Board Presentation', label: 'Board Presentation' },
    { value: 'M&A Pitch/CIM', label: 'M&A Pitch/CIM' },
    { value: 'Lender/Credit Deck', label: 'Lender/Credit Deck' },
];

interface UploadedFile {
    file: File;
    name: string;
    size: number;
}

interface GenerationResult {
    url: string;
    qa: QAValidation;
}

export default function PresentationForm() {
    // Form state
    const [companyName, setCompanyName] = useState('');
    const [presentationType, setPresentationType] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [investmentThesis, setInvestmentThesis] = useState('');
    const [researchRequirements, setResearchRequirements] = useState('');
    const [referenceFiles, setReferenceFiles] = useState<UploadedFile[]>([]);
    const [financialFiles, setFinancialFiles] = useState<UploadedFile[]>([]);

    // UI state
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState<GenerationProgress | null>(null);
    const [result, setResult] = useState<GenerationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleReferenceFileDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(
            f => f.name.endsWith('.pptx') || f.name.endsWith('.ppt') || f.name.endsWith('.pdf')
        );
        setReferenceFiles(prev => [
            ...prev,
            ...files.map(f => ({ file: f, name: f.name, size: f.size }))
        ].slice(0, 3));
    }, []);

    const handleReferenceFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).filter(
            f => f.name.endsWith('.pptx') || f.name.endsWith('.ppt') || f.name.endsWith('.pdf')
        );
        setReferenceFiles(prev => [
            ...prev,
            ...files.map(f => ({ file: f, name: f.name, size: f.size }))
        ].slice(0, 3));
    };

    const handleFinancialFileDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(
            f => f.name.endsWith('.xlsx') || f.name.endsWith('.xls') || f.name.endsWith('.csv')
        );
        setFinancialFiles(prev => [
            ...prev,
            ...files.map(f => ({ file: f, name: f.name, size: f.size }))
        ]);
    }, []);

    const handleFinancialFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).filter(
            f => f.name.endsWith('.xlsx') || f.name.endsWith('.xls') || f.name.endsWith('.csv')
        );
        setFinancialFiles(prev => [
            ...prev,
            ...files.map(f => ({ file: f, name: f.name, size: f.size }))
        ]);
    };

    const removeReferenceFile = (index: number) => {
        setReferenceFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeFinancialFile = (index: number) => {
        setFinancialFiles(prev => prev.filter((_, i) => i !== index));
    };

    const isFormValid = companyName && presentationType && targetAudience && investmentThesis;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsGenerating(true);
        setError(null);
        setResult(null);
        setProgress({ step: 'init', progress: 0, status: 'running', message: 'Starting generation...' });

        const formData: PresentationFormData = {
            companyName,
            presentationType,
            targetAudience,
            investmentThesis,
            researchRequirements,
            referenceFiles: referenceFiles.map(f => f.file),
            financialFiles: financialFiles.map(f => f.file),
        };

        try {
            const generationResult = await generateFullPresentation(formData, setProgress);
            setResult(generationResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during generation');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (result?.url) {
            window.open(result.url, '_blank');
        }
    };

    const handleReset = () => {
        setResult(null);
        setError(null);
        setProgress(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/30 mb-6">
                        <Presentation className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4">
                        PE/IB Presentation Generator
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Enterprise-grade presentation creation with Deck DNA extraction and deep research powered by AI
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-3 py-1">
                            <Sparkles className="w-3 h-3 mr-1.5" /> AI-Powered
                        </Badge>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-3 py-1">
                            <Target className="w-3 h-3 mr-1.5" /> PE/IB Focused
                        </Badge>
                        <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 px-3 py-1">
                            <FileText className="w-3 h-3 mr-1.5" /> Professional
                        </Badge>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {result ? (
                        /* Success State */
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl"
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/30 mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Presentation Generated Successfully!
                                </h2>
                                <p className="text-slate-400">
                                    Your {presentationType} for {companyName} is ready
                                </p>
                            </div>

                            {/* QA Results */}
                            <div className="bg-slate-800/50 rounded-2xl p-6 mb-6">
                                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-indigo-400" />
                                    QA Validation Results
                                </h3>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                        <p className="text-3xl font-bold text-emerald-400">{result.qa.checksPassed}</p>
                                        <p className="text-xs text-emerald-300">Checks Passed</p>
                                    </div>
                                    <div className="text-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                        <p className="text-3xl font-bold text-amber-400">{result.qa.warnings.length}</p>
                                        <p className="text-xs text-amber-300">Warnings</p>
                                    </div>
                                    <div className="text-center p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                                        <p className="text-3xl font-bold text-indigo-400">
                                            {Math.round((result.qa.checksPassed / result.qa.checksTotal) * 100)}%
                                        </p>
                                        <p className="text-xs text-indigo-300">Quality Score</p>
                                    </div>
                                </div>
                                <Badge
                                    className={`${result.qa.overallStatus === 'PASS'
                                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                        }`}
                                >
                                    {result.qa.overallStatus === 'PASS' ? (
                                        <><Check className="w-3 h-3 mr-1" /> All Checks Passed</>
                                    ) : (
                                        <><AlertCircle className="w-3 h-3 mr-1" /> Passed with Warnings</>
                                    )}
                                </Badge>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <Button
                                    onClick={handleDownload}
                                    className="flex-1 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/30"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Open Presentation
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </Button>
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="h-14 border-slate-600 text-slate-300 hover:bg-slate-800"
                                >
                                    Create Another
                                </Button>
                            </div>
                        </motion.div>
                    ) : isGenerating ? (
                        /* Loading State */
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl"
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-xl shadow-indigo-500/30 mb-4">
                                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Generating Your Presentation
                                </h2>
                                <p className="text-slate-400 mb-6">
                                    {progress?.message || 'Processing...'}
                                </p>
                                <Progress value={progress?.progress || 0} className="h-3 bg-slate-800" />
                                <p className="text-sm text-slate-500 mt-2">{progress?.progress || 0}% Complete</p>
                            </div>

                            {/* Generation Steps */}
                            <div className="space-y-3">
                                {[
                                    { id: 'deckDNA', label: 'Extracting Deck DNA', icon: Sparkles },
                                    { id: 'research', label: 'Performing Market Research', icon: Search },
                                    { id: 'competitive', label: 'Analyzing Competitors', icon: Users },
                                    { id: 'financial', label: 'Processing Financial Data', icon: FileSpreadsheet },
                                    { id: 'architecture', label: 'Building Content Architecture', icon: FileText },
                                    { id: 'gamma', label: 'Generating Presentation', icon: Presentation },
                                    { id: 'qa', label: 'Running QA Validation', icon: Target },
                                ].map((step, index) => {
                                    const Icon = step.icon;
                                    const isActive = progress?.step === step.id;
                                    const isComplete = progress &&
                                        ['deckDNA', 'research', 'competitive', 'financial', 'architecture', 'gamma', 'qa']
                                            .indexOf(step.id) < ['deckDNA', 'research', 'competitive', 'financial', 'architecture', 'gamma', 'qa']
                                                .indexOf(progress.step);

                                    return (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive
                                                    ? 'bg-indigo-500/20 border border-indigo-500/30'
                                                    : isComplete
                                                        ? 'bg-emerald-500/10 border border-emerald-500/20'
                                                        : 'bg-slate-800/30'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive
                                                    ? 'bg-indigo-500 text-white'
                                                    : isComplete
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-slate-700 text-slate-400'
                                                }`}>
                                                {isComplete ? (
                                                    <Check className="w-4 h-4" />
                                                ) : isActive ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Icon className="w-4 h-4" />
                                                )}
                                            </div>
                                            <span className={`text-sm ${isActive
                                                    ? 'text-indigo-300 font-medium'
                                                    : isComplete
                                                        ? 'text-emerald-300'
                                                        : 'text-slate-500'
                                                }`}>
                                                {step.label}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        /* Form State */
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-400" />
                                    <p className="text-red-300">{error}</p>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setError(null)}
                                        className="ml-auto text-red-400 hover:text-red-300"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </motion.div>
                            )}

                            {/* Main Form Card */}
                            <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl space-y-8">
                                {/* Company Name */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-indigo-400" />
                                        Company Name <span className="text-red-400">*</span>
                                    </Label>
                                    <Input
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="e.g., CloudScale Technologies"
                                        className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20"
                                        required
                                    />
                                </div>

                                {/* Presentation Type */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-indigo-400" />
                                        Presentation Type <span className="text-red-400">*</span>
                                    </Label>
                                    <Select value={presentationType} onValueChange={setPresentationType}>
                                        <SelectTrigger className="h-12 bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20">
                                            <SelectValue placeholder="Select presentation type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            {presentationTypes.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                    className="text-slate-300 focus:bg-indigo-500/20 focus:text-white"
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Target Audience */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-indigo-400" />
                                        Target Audience <span className="text-red-400">*</span>
                                    </Label>
                                    <Input
                                        value={targetAudience}
                                        onChange={(e) => setTargetAudience(e.target.value)}
                                        placeholder="e.g., Institutional investors, Board of Directors"
                                        className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20"
                                        required
                                    />
                                </div>

                                {/* Investment Thesis */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                        <Lightbulb className="w-4 h-4 text-indigo-400" />
                                        Investment Thesis / Key Message <span className="text-red-400">*</span>
                                    </Label>
                                    <Textarea
                                        value={investmentThesis}
                                        onChange={(e) => setInvestmentThesis(e.target.value)}
                                        placeholder="Main investment thesis or message to convey. E.g., 'Strong SaaS company with 40% YoY growth, expanding into enterprise market, seeking Series C at $50M...'"
                                        className="min-h-[120px] bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20"
                                        required
                                    />
                                </div>
                            </div>

                            {/* File Upload Cards */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Reference Presentations */}
                                <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-xl">
                                    <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
                                        <FileUp className="w-4 h-4 text-purple-400" />
                                        Reference Presentations
                                        <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-xs">
                                            For Deck DNA
                                        </Badge>
                                    </Label>
                                    <div
                                        onDrop={handleReferenceFileDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-purple-500/50 hover:bg-purple-500/5 transition-all cursor-pointer"
                                    >
                                        <input
                                            type="file"
                                            accept=".pptx,.ppt,.pdf"
                                            multiple
                                            onChange={handleReferenceFileSelect}
                                            className="hidden"
                                            id="reference-files"
                                        />
                                        <label htmlFor="reference-files" className="cursor-pointer">
                                            <Upload className="w-8 h-8 mx-auto mb-3 text-slate-500" />
                                            <p className="text-sm text-slate-400">
                                                Drop 2-3 similar presentations or{' '}
                                                <span className="text-purple-400">browse</span>
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">.pptx, .ppt, .pdf</p>
                                        </label>
                                    </div>
                                    {referenceFiles.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {referenceFiles.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-2"
                                                >
                                                    <FileText className="w-4 h-4 text-purple-400" />
                                                    <span className="text-sm text-slate-300 flex-1 truncate">
                                                        {file.name}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeReferenceFile(index)}
                                                        className="h-6 w-6 p-0 text-slate-500 hover:text-red-400"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Financial Data */}
                                <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-xl">
                                    <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
                                        <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                                        Financial Data
                                        <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-xs">
                                            Optional
                                        </Badge>
                                    </Label>
                                    <div
                                        onDrop={handleFinancialFileDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-pointer"
                                    >
                                        <input
                                            type="file"
                                            accept=".xlsx,.xls,.csv"
                                            multiple
                                            onChange={handleFinancialFileSelect}
                                            className="hidden"
                                            id="financial-files"
                                        />
                                        <label htmlFor="financial-files" className="cursor-pointer">
                                            <FileSpreadsheet className="w-8 h-8 mx-auto mb-3 text-slate-500" />
                                            <p className="text-sm text-slate-400">
                                                Drop Excel/CSV files or{' '}
                                                <span className="text-emerald-400">browse</span>
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">.xlsx, .xls, .csv</p>
                                        </label>
                                    </div>
                                    {financialFiles.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {financialFiles.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-2"
                                                >
                                                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                                                    <span className="text-sm text-slate-300 flex-1 truncate">
                                                        {file.name}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFinancialFile(index)}
                                                        className="h-6 w-6 p-0 text-slate-500 hover:text-red-400"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Research Requirements */}
                            <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-xl">
                                <Label className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
                                    <Search className="w-4 h-4 text-amber-400" />
                                    Research Requirements
                                    <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-xs">
                                        Optional
                                    </Badge>
                                </Label>
                                <Textarea
                                    value={researchRequirements}
                                    onChange={(e) => setResearchRequirements(e.target.value)}
                                    placeholder="Market sizing, competitor analysis, regulatory landscape, industry trends, etc."
                                    className="min-h-[100px] bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={!isFormValid}
                                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-indigo-500/30 transition-all duration-300"
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                Generate Presentation
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12 text-slate-500 text-sm"
                >
                    <p>Powered by Gemini AI, Tavily Research & Gamma Presentation Engine</p>
                </motion.div>
            </div>
        </div>
    );
}
