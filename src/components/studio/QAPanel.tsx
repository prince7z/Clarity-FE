import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    X,
    Shield,
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    ChevronRight,
    ChevronDown,
    Palette,
    Type,
    BarChart3,
    FileText,
    BookOpen,
    Wand2,
    Download,
    RefreshCcw,
    Check,
    Clock
} from 'lucide-react';

interface QACategory {
    id: string;
    name: string;
    icon: typeof Palette;
    passed: number;
    total: number;
    issues: QAIssue[];
}

interface QAIssue {
    id: string;
    severity: 'error' | 'warning' | 'info';
    title: string;
    description: string;
    slide?: number;
    autoFixable: boolean;
}

const mockQAData: QACategory[] = [
    {
        id: 'design',
        name: 'Design & Formatting',
        icon: Palette,
        passed: 24,
        total: 24,
        issues: [],
    },
    {
        id: 'content',
        name: 'Content & Data',
        icon: FileText,
        passed: 18,
        total: 20,
        issues: [
            {
                id: '1',
                severity: 'warning',
                title: 'Calculation needs verification',
                description: 'The growth rate on slide 5 (35%) doesn\'t match the calculated difference between 2023 and 2024 revenue figures (30%).',
                slide: 5,
                autoFixable: false,
            },
            {
                id: '2',
                severity: 'warning',
                title: 'Potential data inconsistency',
                description: 'Market size figure differs between slide 3 ($15B) and slide 7 ($15.2B).',
                slide: 3,
                autoFixable: true,
            },
        ],
    },
    {
        id: 'research',
        name: 'Research & Sources',
        icon: BookOpen,
        passed: 22,
        total: 22,
        issues: [],
    },
];

function QACategoryCard({ category, expanded, onToggle }: {
    category: QACategory;
    expanded: boolean;
    onToggle: () => void;
}) {
    const Icon = category.icon;
    const isPassed = category.passed === category.total;
    const hasIssues = category.issues.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border overflow-hidden"
        >
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
            >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPassed ? 'bg-emerald-500/10' : 'bg-amber-500/10'
                    }`}>
                    {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                    )}
                </div>

                <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-sm ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {isPassed ? '✓' : '⚠️'} {category.passed}/{category.total} passed
                        </span>
                    </div>
                </div>

                {hasIssues && (
                    expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
                )}
            </button>

            {expanded && hasIssues && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border"
                >
                    <div className="p-4 space-y-3 bg-muted/20">
                        {category.issues.map((issue) => (
                            <div
                                key={issue.id}
                                className="p-3 rounded-lg bg-background border border-border"
                            >
                                <div className="flex items-start gap-3">
                                    {issue.severity === 'error' ? (
                                        <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                                    ) : issue.severity === 'warning' ? (
                                        <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                                    )}

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-sm">{issue.title}</span>
                                            {issue.slide && (
                                                <Badge variant="secondary" className="text-xs">
                                                    Slide {issue.slide}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{issue.description}</p>

                                        <div className="flex items-center gap-2 mt-3">
                                            {issue.autoFixable ? (
                                                <Button size="sm" className="h-7 text-xs gap-1 bg-primary/10 text-primary hover:bg-primary/20">
                                                    <Wand2 className="w-3 h-3" />
                                                    Auto-fix
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Mark as Verified
                                                </Button>
                                            )}
                                            <Button size="sm" variant="ghost" className="h-7 text-xs">
                                                View Slide
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {!hasIssues && (
                <div className="px-4 pb-4">
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>• All fonts match template</p>
                        <p>• Colors within brand palette</p>
                        <p>• Logo placement consistent</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

interface QAPanelProps {
    onClose: () => void;
}

export default function QAPanel({ onClose }: QAPanelProps) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>('content');
    const [isRunningCheck, setIsRunningCheck] = useState(false);

    const totalPassed = mockQAData.reduce((acc, cat) => acc + cat.passed, 0);
    const totalChecks = mockQAData.reduce((acc, cat) => acc + cat.total, 0);
    const overallPercentage = Math.round((totalPassed / totalChecks) * 100);
    const totalIssues = mockQAData.reduce((acc, cat) => acc + cat.issues.length, 0);
    const autoFixableIssues = mockQAData.reduce(
        (acc, cat) => acc + cat.issues.filter(i => i.autoFixable).length,
        0
    );

    const handleRunCheck = () => {
        setIsRunningCheck(true);
        setTimeout(() => setIsRunningCheck(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.div
                className="relative w-full max-w-lg bg-background border-l border-border shadow-2xl h-full flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-semibold">Quality Assurance Report</h2>
                            <p className="text-xs text-muted-foreground">
                                Last checked: Just now
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Overall Status */}
                <div className="p-6 border-b border-border bg-gradient-to-r from-emerald-500/5 to-transparent shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium">Overall Status</span>
                        <Badge className={`${overallPercentage >= 95
                                ? 'bg-emerald-500/10 text-emerald-600'
                                : overallPercentage >= 80
                                    ? 'bg-amber-500/10 text-amber-600'
                                    : 'bg-destructive/10 text-destructive'
                            } border-0`}>
                            {overallPercentage}% Pass
                        </Badge>
                    </div>
                    <Progress value={overallPercentage} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-2">
                        {totalPassed} of {totalChecks} checks passed
                    </p>
                </div>

                {/* Categories */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase">Categories</h3>

                        {mockQAData.map((category) => (
                            <QACategoryCard
                                key={category.id}
                                category={category}
                                expanded={expandedCategory === category.id}
                                onToggle={() => setExpandedCategory(
                                    expandedCategory === category.id ? null : category.id
                                )}
                            />
                        ))}
                    </div>
                </ScrollArea>

                {/* Actions */}
                <div className="p-4 border-t border-border space-y-4 shrink-0">
                    {totalIssues > 0 && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                {totalIssues} issue{totalIssues !== 1 ? 's' : ''} found
                            </span>
                            {autoFixableIssues > 0 && (
                                <Button size="sm" className="gap-2">
                                    <Wand2 className="w-4 h-4" />
                                    Auto-fix {autoFixableIssues} Issue{autoFixableIssues !== 1 ? 's' : ''}
                                </Button>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export QA Report
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={handleRunCheck}
                            disabled={isRunningCheck}
                        >
                            {isRunningCheck ? (
                                <>
                                    <RefreshCcw className="w-4 h-4 animate-spin" />
                                    Running...
                                </>
                            ) : (
                                <>
                                    <RefreshCcw className="w-4 h-4" />
                                    Re-run Check
                                </>
                            )}
                        </Button>
                    </div>

                    {overallPercentage >= 95 && (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                            <p className="font-medium text-emerald-700">Deck is client-ready</p>
                            <p className="text-xs text-emerald-600 mt-1">
                                All critical checks passed
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
