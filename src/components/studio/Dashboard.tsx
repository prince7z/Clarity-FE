import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStudio, type Project } from './StudioContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};
import {
    Presentation,
    Plus,
    Search,
    Settings,
    User,
    Clock,
    CheckCircle2,
    AlertCircle,
    Loader2,
    FileUp,
    FileText,
    Layers,
    ChevronDown,
    Sparkles,
    Upload,
    MessageSquare,
    LayoutTemplate,
    TrendingUp,
    PieChart,
    Users,
    BarChart3,
    Building2,
    RefreshCw
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const quickTemplates = [
    { id: 'lp-update', name: 'LP Update', icon: TrendingUp },
    { id: 'investment-thesis', name: 'Investment Thesis', icon: PieChart },
    { id: 'portfolio-review', name: 'Portfolio Review', icon: Layers },
    { id: 'competitive-analysis', name: 'Competitive Analysis', icon: Users },
    { id: 'financial-summary', name: 'Financial Summary', icon: BarChart3 },
];

const templateTypes = [
    { id: 'lp-report', name: 'LP Report', icon: FileText },
    { id: 'pitch-deck', name: 'Pitch Deck', icon: Presentation },
    { id: 'board-materials', name: 'Board Materials', icon: Building2 },
    { id: 'quarterly-review', name: 'Quarterly Review', icon: TrendingUp },
    { id: 'ma-book', name: 'M&A Book', icon: Layers },
];

function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
}

function getStatusInfo(status: Project['status']) {
    switch (status) {
        case 'ready':
            return { icon: CheckCircle2, label: 'Ready', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
        case 'review':
            return { icon: AlertCircle, label: 'In Review', color: 'text-amber-500', bg: 'bg-amber-500/10' };
        case 'generating':
            return { icon: Loader2, label: 'Generating', color: 'text-blue-500', bg: 'bg-blue-500/10', animate: true };
        case 'draft':
            return { icon: FileText, label: 'Draft', color: 'text-muted-foreground', bg: 'bg-muted' };
        default:
            return { icon: FileText, label: 'Unknown', color: 'text-muted-foreground', bg: 'bg-muted' };
    }
}

function PresentationCard({ presentation, onClick }: { presentation: SheetPresentation; onClick: () => void }) {
    const isCompleted = presentation.status === 'completed';
    const StatusIcon = isCompleted ? CheckCircle2 : Loader2;

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group ${isCompleted ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={isCompleted ? onClick : undefined}
        >
            <div className={`bg-card rounded-2xl border border-border/50 p-6 transition-all duration-300 relative overflow-hidden ${
                isCompleted ? 'hover:border-primary/30 hover:shadow-xl' : 'opacity-75'
            }`}>
                {/* Gradient overlay on hover */}
                {isCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                {/* Thumbnail placeholder */}
                <div className="relative aspect-[16/10] rounded-xl bg-muted/50 mb-4 overflow-hidden flex items-center justify-center border border-border/30">
                    <Presentation className="w-12 h-12 text-muted-foreground/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="relative">
                    <h3 className={`font-semibold text-lg mb-2 transition-colors ${
                        isCompleted ? 'group-hover:text-primary' : ''
                    }`}>
                        {presentation.companyName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        {presentation.presentationType}
                    </p>
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={`gap-1.5 ${
                            isCompleted ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'
                        }`}>
                            <StatusIcon className={`w-3 h-3 ${!isCompleted ? 'animate-spin' : ''}`} />
                            {isCompleted ? 'Completed' : 'Queued'}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">
                            {presentation.presentationId.split('_')[1]?.substring(0, 8)}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    const statusInfo = getStatusInfo(project.status);
    const StatusIcon = statusInfo.icon;

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer"
            onClick={onClick}
        >
            <div className="bg-card rounded-2xl border border-border/50 p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Thumbnail placeholder */}
                <div className="relative aspect-[16/10] rounded-xl bg-muted/50 mb-4 overflow-hidden flex items-center justify-center border border-border/30">
                    <Presentation className="w-12 h-12 text-muted-foreground/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="relative">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Last edited: {formatTimeAgo(project.lastEdited)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={`${statusInfo.bg} ${statusInfo.color} gap-1.5`}>
                            <StatusIcon className={`w-3 h-3 ${statusInfo.animate ? 'animate-spin' : ''}`} />
                            {statusInfo.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{project.slideCount} slides</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function CreateNewSection() {
    const { setCurrentView, setWizardStep } = useStudio();
    const [briefText, setBriefText] = useState('');

    const handleFromReference = () => {
        setWizardStep(1);
        setCurrentView('wizard');
    };

    const handleFromBrief = () => {
        setWizardStep(3);
        setCurrentView('wizard');
    };

    const handleFromTemplate = () => {
        setWizardStep(1);
        setCurrentView('wizard');
    };

    return (
        <motion.div
            className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl border border-border/50 p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

            <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25">
                        <Plus className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Create New PowerPoint</h2>
                        <p className="text-muted-foreground">Choose how you'd like to start</p>
                    </div>
                </div>

                {/* Three workflow options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* From Reference Deck */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFromReference}
                        className="group text-left p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-background/50 hover:bg-primary/5 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">1</span>
                            <h3 className="font-semibold">From Reference Deck</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            "Make a new deck that looks exactly like this"
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                            <FileUp className="w-4 h-4" />
                            <span>Upload PPT/PDF</span>
                        </div>
                    </motion.button>

                    {/* From Brief */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFromBrief}
                        className="group text-left p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-background/50 hover:bg-primary/5 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">2</span>
                            <h3 className="font-semibold">From Brief</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            "Describe what you need"
                        </p>
                        <div className="mt-4">
                            <Input
                                placeholder="LP deck for fintech investment..."
                                value={briefText}
                                onChange={(e) => setBriefText(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm h-9 bg-background/50"
                            />
                        </div>
                    </motion.button>

                    {/* From Template */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFromTemplate}
                        className="group text-left p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-background/50 hover:bg-primary/5 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <LayoutTemplate className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">3</span>
                            <h3 className="font-semibold">From Template</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                            Choose from our professional templates
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {templateTypes.slice(0, 3).map((template) => (
                                <Badge key={template.id} variant="secondary" className="text-xs">
                                    {template.name}
                                </Badge>
                            ))}
                            <Badge variant="secondary" className="text-xs">+2</Badge>
                        </div>
                    </motion.button>
                </div>

                {/* Quick Templates */}
                <div className="border-t border-border/50 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Quick Templates:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {quickTemplates.map((template) => {
                            const TemplateIcon = template.icon;
                            return (
                                <motion.button
                                    key={template.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setWizardStep(1);
                                        setCurrentView('wizard');
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-primary/10 text-sm font-medium hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
                                >
                                    <TemplateIcon className="w-4 h-4" />
                                    {template.name}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

interface SheetPresentation {
    presentationId: string;
    companyName: string;
    presentationType: string;
    status: 'queued' | 'completed';
    presentationUrl: string | null;
    createdAt: string;
}

export default function Dashboard() {
    const { setCurrentView, setCurrentDeck } = useStudio();
    const [searchQuery, setSearchQuery] = useState('');
    const [presentations, setPresentations] = useState<SheetPresentation[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPresentations = async () => {
        setIsLoading(true);
        try {
            const sheetId = '1HsytksVRGJagIh6mFfpvUVz57G9sNKlZLlfR-y5YmgI';
            const response = await fetch(
                `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`
            );
            
            if (!response.ok) {
                console.error('Failed to fetch sheet data');
                return;
            }

            const text = await response.text();
            const jsonString = text.substring(47, text.length - 2);
            const data = JSON.parse(jsonString);

            const rows = data.table.rows;
            if (rows.length === 0) return;

            // First row contains headers
            const headerRow = rows[0].c;
            const headers = headerRow.map((cell: any) => cell?.v || '');
            
            const idIndex = headers.findIndex((h: string) => h.toLowerCase() === 'presentation_id');
            const companyIndex = headers.findIndex((h: string) => h.toLowerCase() === 'company_name');
            const typeIndex = headers.findIndex((h: string) => h.toLowerCase() === 'presentation_type');
            const statusIndex = headers.findIndex((h: string) => h.toLowerCase() === 'status');
            const urlIndex = headers.findIndex((h: string) => h.toLowerCase() === 'presentation_url');
            const createdIndex = headers.findIndex((h: string) => h.toLowerCase() === 'created_at');

            const presentations: SheetPresentation[] = [];
            
            // Skip first row (headers) and iterate through data
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].c;
                if (!cells) continue;
                
                const presentationId = cells[idIndex]?.v;
                if (!presentationId) continue;

                const companyName = cells[companyIndex]?.v || 'Untitled';
                const presentationType = cells[typeIndex]?.v || 'Presentation';
                const presentationUrl = cells[urlIndex]?.v || null;
                const createdAt = cells[createdIndex]?.v || '';
                const status = presentationUrl ? 'completed' : 'queued';

                presentations.push({
                    presentationId,
                    companyName,
                    presentationType,
                    status,
                    presentationUrl,
                    createdAt,
                });
            }

            setPresentations(presentations.reverse()); // Show newest first
        } catch (error) {
            console.error('Error fetching presentations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPresentations();
    }, []);

    const filteredPresentations = presentations.filter(pres =>
        pres.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pres.presentationId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePresentationClick = (presentation: SheetPresentation) => {
        if (presentation.status === 'completed' && presentation.presentationUrl) {
            // Load deck with iframe URL
            setCurrentDeck({
                id: presentation.presentationId,
                name: `${presentation.companyName} - ${presentation.presentationType}`,
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
                iframeUrl: presentation.presentationUrl, // Add iframe URL
            });
            setCurrentView('editor');
        }
    };

    return (
        <div className="flex-1 bg-transparent">
            {/* Header */}
            <header className="border-b border-border/70 bg-background/60 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl gradient-ai shadow-sm" aria-hidden="true" />
                            <div className="leading-tight">
                                <div className="text-sm font-semibold text-foreground">Clarity AI</div>
                                <div className="text-xs text-muted-foreground">Projects</div>
                            </div>
                        </div>

                        {/* Center: Quick Actions */}
                        <div className="flex-1 max-w-xl mx-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search projects, templates, or features..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-11 bg-muted/30 border-muted-foreground/10 focus:border-primary/50 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={scrollToPricing}
                                variant="outline"
                            >
                                Pricing
                            </Button>
                            
                            <Button
                                onClick={() => {
                                    setCurrentView('wizard');
                                }}
                                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                            >
                                <Plus className="w-4 h-4" />
                                Create New PowerPoint
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-xl">
                                        <Settings className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Templates</DropdownMenuItem>
                                    <DropdownMenuItem>API Access</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-xl">
                                        <User className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Account</DropdownMenuItem>
                                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Recent Decks Section */}
                <motion.section
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold">Your Presentations</h2>
                            <p className="text-sm text-muted-foreground">Generated presentations from your requests</p>
                        </div>
                        <Button
                            onClick={fetchPresentations}
                            disabled={isLoading}
                            variant="outline"
                            className="gap-2"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : filteredPresentations.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <Presentation className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No presentations found. Create your first one!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPresentations.map((presentation, index) => (
                                <motion.div
                                    key={presentation.presentationId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <PresentationCard
                                        presentation={presentation}
                                        onClick={() => handlePresentationClick(presentation)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.section>

                {/* Create New Section */}
                <CreateNewSection />

                {/* Pricing Section */}
                
            </main>
        </div>
    );
}
