import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudio } from './StudioContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    ChevronLeft,
    ChevronRight,
    Save,
    Undo,
    Redo,
    Plus,
    Layers,
    Presentation,
    FileText,
    BarChart3,
    Table2,
    MessageSquare,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    Search,
    Settings,
    Download,
    Play,
    Grid3X3,
    Loader2,
    Eye,
    Edit3,
    Palette,
    Type,
    Layout,
    Image,
    PieChart,
    TrendingUp,
    Users,
    DollarSign,
    BookOpen,
    ExternalLink,
    Maximize2,
    MoreHorizontal,
    RefreshCcw,
    Zap,
    FileSearch,
    Check
} from 'lucide-react';
import CommentsPanel from './CommentsPanel';
import QAPanel from './QAPanel';
import ExportModal from './ExportModal';

// Mock slide content for demonstration
const mockSlideContent = {
    '1': { title: 'CloudScale', subtitle: 'Investment Deck Q4 2024', type: 'title' },
    '2': {
        title: 'Executive Summary',
        points: [
            'Market-leading SaaS platform for cloud infrastructure',
            '$120M ARR growing 35% YoY',
            'Seeking $50M Series C to expand globally'
        ],
        type: 'summary'
    },
    '3': {
        title: 'Market Opportunity',
        marketSize: '$15B',
        cagr: '12%',
        chartData: [
            { year: 2023, value: 12 },
            { year: 2024, value: 13.5 },
            { year: 2025, value: 15 },
        ],
        type: 'chart'
    },
    '4': {
        title: 'Competitive Landscape',
        competitors: [
            { name: 'AWS', marketShare: 32 },
            { name: 'Azure', marketShare: 22 },
            { name: 'CloudScale', marketShare: 8 },
            { name: 'Others', marketShare: 38 },
        ],
        type: 'comparison'
    },
    '5': {
        title: 'Financial Highlights',
        metrics: [
            { label: 'Revenue', value: '$120M', change: '+35%' },
            { label: 'Gross Margin', value: '78%', change: '+3%' },
            { label: 'Net Retention', value: '125%', change: '+5%' },
        ],
        type: 'chart'
    },
};

function SlideNavigator() {
    const { currentDeck, selectedSlideId, setSelectedSlideId } = useStudio();

    if (!currentDeck) return null;

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    SLIDES ({currentDeck.slides.length})
                </h3>
            </div>

            <ScrollArea className="flex-1 p-3">
                <div className="space-y-2">
                    {currentDeck.slides.map((slide, index) => (
                        <motion.button
                            key={slide.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedSlideId(slide.id)}
                            className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${selectedSlideId === slide.id
                                    ? 'border-primary bg-primary/5 shadow-md'
                                    : 'border-transparent hover:border-border hover:bg-muted/30'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs font-medium">
                                    {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${selectedSlideId === slide.id ? 'text-primary' : ''
                                        }`}>
                                        {slide.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {slide.type === 'chart' && <BarChart3 className="w-3 h-3 text-muted-foreground" />}
                                        {slide.type === 'table' && <Table2 className="w-3 h-3 text-muted-foreground" />}
                                        {slide.type === 'title' && <Presentation className="w-3 h-3 text-muted-foreground" />}
                                        {slide.type === 'summary' && <FileText className="w-3 h-3 text-muted-foreground" />}
                                        {slide.type === 'comparison' && <Users className="w-3 h-3 text-muted-foreground" />}
                                        <span className="text-xs text-muted-foreground capitalize">{slide.type}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                <Button variant="ghost" className="w-full mt-4 gap-2 text-muted-foreground hover:text-foreground">
                    <Plus className="w-4 h-4" />
                    Add Slide
                </Button>
            </ScrollArea>

            <div className="p-4 border-t border-border">
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    OUTLINE
                </h3>
                <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground hover:text-foreground cursor-pointer py-1">1. Introduction</p>
                    <p className="text-muted-foreground hover:text-foreground cursor-pointer py-1">2. Market Analysis</p>
                    <p className="text-muted-foreground hover:text-foreground cursor-pointer py-1">3. Competition</p>
                    <p className="text-muted-foreground hover:text-foreground cursor-pointer py-1">4. Financials</p>
                    <p className="text-muted-foreground hover:text-foreground cursor-pointer py-1">5. Investment Case</p>
                    <p className="text-muted-foreground hover:text-foreground cursor-pointer py-1">6. Appendix</p>
                </div>
            </div>
        </div>
    );
}

function SlideCanvas() {
    const { currentDeck, selectedSlideId } = useStudio();
    const [zoom, setZoom] = useState(100);

    if (!currentDeck) return null;

    const selectedSlide = currentDeck.slides.find(s => s.id === selectedSlideId) || currentDeck.slides[0];
    const slideContent = mockSlideContent[selectedSlideId || '1'] || mockSlideContent['1'];

    const renderSlideContent = () => {
        switch (slideContent.type) {
            case 'title':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <h1 className="text-4xl font-bold mb-4" style={{ color: currentDeck.style.primaryColor }}>
                            {slideContent.title}
                        </h1>
                        <p className="text-xl text-muted-foreground">{slideContent.subtitle}</p>
                    </div>
                );
            case 'summary':
                return (
                    <div className="p-8 h-full">
                        <h2 className="text-2xl font-bold mb-6" style={{ color: currentDeck.style.primaryColor }}>
                            {slideContent.title}
                        </h2>
                        <ul className="space-y-4">
                            {slideContent.points?.map((point, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: currentDeck.style.accentColor }} />
                                    <span className="text-lg">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'chart':
                return (
                    <div className="p-8 h-full">
                        <h2 className="text-2xl font-bold mb-6" style={{ color: currentDeck.style.primaryColor }}>
                            {slideContent.title}
                        </h2>
                        {slideContent.marketSize && (
                            <div className="flex items-center gap-8 mb-8">
                                <div className="text-center">
                                    <p className="text-5xl font-bold" style={{ color: currentDeck.style.accentColor }}>
                                        {slideContent.marketSize}
                                    </p>
                                    <p className="text-muted-foreground">Total Addressable Market</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-5xl font-bold text-emerald-500">
                                        {slideContent.cagr}
                                    </p>
                                    <p className="text-muted-foreground">CAGR</p>
                                </div>
                            </div>
                        )}
                        {slideContent.metrics && (
                            <div className="grid grid-cols-3 gap-4">
                                {slideContent.metrics.map((metric, i) => (
                                    <div key={i} className="bg-muted/30 rounded-xl p-4 text-center">
                                        <p className="text-3xl font-bold" style={{ color: currentDeck.style.accentColor }}>
                                            {metric.value}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                                        <Badge className="mt-2 bg-emerald-500/10 text-emerald-600 border-0">
                                            {metric.change}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                        {slideContent.chartData && (
                            <div className="flex items-end gap-4 h-40 mt-4">
                                {slideContent.chartData.map((data, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full rounded-t-lg transition-all duration-500"
                                            style={{
                                                height: `${(data.value / 20) * 100}%`,
                                                backgroundColor: currentDeck.style.accentColor
                                            }}
                                        />
                                        <p className="text-sm mt-2">{data.year}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'comparison':
                return (
                    <div className="p-8 h-full">
                        <h2 className="text-2xl font-bold mb-6" style={{ color: currentDeck.style.primaryColor }}>
                            {slideContent.title}
                        </h2>
                        <div className="space-y-4">
                            {slideContent.competitors?.map((comp, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className="w-24 font-medium">{comp.name}</span>
                                    <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-lg"
                                            style={{
                                                backgroundColor: comp.name === 'CloudScale'
                                                    ? currentDeck.style.accentColor
                                                    : currentDeck.style.primaryColor + '60'
                                            }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${comp.marketShare}%` }}
                                            transition={{ duration: 0.8, delay: i * 0.1 }}
                                        />
                                    </div>
                                    <span className="w-12 text-right font-semibold">{comp.marketShare}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Click to edit slide content</p>
                    </div>
                );
        }
    };

    return (
        <div className="h-full flex flex-col bg-muted/20">
            {/* Slide number indicator */}
            <div className="p-4 flex items-center justify-between border-b border-border bg-background/50">
                <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                        Slide {currentDeck.slides.findIndex(s => s.id === selectedSlideId) + 1} of {currentDeck.slides.length}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{selectedSlide?.title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                        <Sparkles className="w-4 h-4 mr-2 text-primary" />
                        AI Suggestions
                    </Button>
                    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                        <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>-</Button>
                        <span className="text-sm w-12 text-center">{zoom}%</span>
                        <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>+</Button>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Maximize2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Canvas area */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                <motion.div
                    className="bg-white rounded-xl shadow-2xl overflow-hidden"
                    style={{
                        width: `${(960 * zoom) / 100}px`,
                        height: `${(540 * zoom) / 100}px`,
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'center',
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-[960px] h-[540px] origin-top-left" style={{ transform: `scale(${zoom / 100})` }}>
                        {renderSlideContent()}

                        {/* Logo placeholder */}
                        <div
                            className="absolute bottom-4 right-4 w-16 h-8 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground"
                        >
                            LOGO
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Contextual Toolbar */}
            <div className="p-3 border-t border-border bg-background/80 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-1">
                        <Type className="w-4 h-4" />
                        Font
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="sm" className="gap-1">
                        <Palette className="w-4 h-4" />
                        Color
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="sm" className="gap-1">
                        <BarChart3 className="w-4 h-4" />
                        Charts
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="sm" className="gap-1">
                        <Table2 className="w-4 h-4" />
                        Tables
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="sm" className="gap-1">
                        <Image className="w-4 h-4" />
                        Images
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="sm" className="gap-1">
                        <Layout className="w-4 h-4" />
                        Layout
                    </Button>
                </div>
            </div>
        </div>
    );
}

function InspectorPanel() {
    const { currentDeck, selectedSlideId, rightPanelTab, setRightPanelTab } = useStudio();
    const [showComments, setShowComments] = useState(false);
    const [showQA, setShowQA] = useState(false);

    if (!currentDeck) return null;

    const slideContent = mockSlideContent[selectedSlideId || '1'] || mockSlideContent['1'];

    return (
        <div className="h-full flex flex-col">
            <Tabs value={rightPanelTab} onValueChange={setRightPanelTab} className="flex-1 flex flex-col">
                <div className="border-b border-border p-2">
                    <TabsList className="w-full">
                        <TabsTrigger value="slide" className="flex-1 text-xs">Slide</TabsTrigger>
                        <TabsTrigger value="content" className="flex-1 text-xs">Content</TabsTrigger>
                        <TabsTrigger value="research" className="flex-1 text-xs">Research</TabsTrigger>
                    </TabsList>
                </div>

                <ScrollArea className="flex-1">
                    <TabsContent value="slide" className="p-4 mt-0 space-y-6">
                        <div>
                            <h4 className="text-sm font-semibold mb-3">SLIDE TYPE</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {['Title', 'Content', 'Chart', 'Table', 'Comparison'].map((type) => (
                                    <Button
                                        key={type}
                                        variant={slideContent.type === type.toLowerCase() ? 'default' : 'outline'}
                                        size="sm"
                                        className="text-xs"
                                    >
                                        {type}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold mb-3">LAYOUT</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="aspect-video bg-muted rounded border-2 border-transparent hover:border-primary cursor-pointer transition-colors">
                                        <div className="p-2 h-full flex flex-col gap-1">
                                            <div className="h-2 bg-muted-foreground/30 rounded w-3/4" />
                                            <div className="flex-1 bg-muted-foreground/20 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold mb-3">STYLE</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Primary Color</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: currentDeck.style.primaryColor }} />
                                        <span className="text-xs font-mono">{currentDeck.style.primaryColor}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Accent Color</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: currentDeck.style.accentColor }} />
                                        <span className="text-xs font-mono">{currentDeck.style.accentColor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="content" className="p-4 mt-0 space-y-6">
                        <div>
                            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                SELECTED: {slideContent.title}
                            </h4>

                            {slideContent.type === 'chart' && slideContent.chartData && (
                                <div className="space-y-3">
                                    <p className="text-sm font-medium">CHART DATA (Editable):</p>
                                    <div className="bg-muted/30 rounded-lg p-3">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-muted-foreground">
                                                    <th className="text-left py-1">Year</th>
                                                    <th className="text-left py-1">Value ($B)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {slideContent.chartData.map((data, i) => (
                                                    <tr key={i} className="border-t border-border/50">
                                                        <td className="py-2">{data.year}</td>
                                                        <td className="py-2">${data.value}B</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {slideContent.type === 'chart' && slideContent.metrics && (
                                <div className="space-y-3">
                                    <p className="text-sm font-medium">METRICS (Editable):</p>
                                    <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                                        {slideContent.metrics.map((metric, i) => (
                                            <div key={i} className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
                                                <span className="text-muted-foreground">{metric.label}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{metric.value}</span>
                                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-0 text-xs">
                                                        {metric.change}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold mb-3">SOURCES</h4>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-xs">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Company Financials (audited)</p>
                                        <p className="text-muted-foreground">2023-2024 data verified</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-xs">
                                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Management Projections</p>
                                        <p className="text-muted-foreground">2025 forecast (unaudited)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                                <Edit3 className="w-3 h-3 mr-1" />
                                Edit Data Source
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                                <RefreshCcw className="w-3 h-3 mr-1" />
                                Change Type
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="research" className="p-4 mt-0 space-y-4">
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-0">
                            <Check className="w-3 h-3 mr-1" />
                            Research Complete
                        </Badge>

                        <div className="space-y-4">
                            <div className="bg-muted/30 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-sm">Market Sizing Data</h4>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Cloud infrastructure market projected to reach $15.2B by 2025 (Gartner, Q3 2024)
                                        </p>
                                        <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-xs">
                                            View full report <ExternalLink className="w-3 h-3 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/30 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-sm">Competitive Analysis</h4>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            4 major competitors identified. CloudScale has 3rd highest NPS score among enterprise customers.
                                        </p>
                                        <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-xs">
                                            View analysis <ExternalLink className="w-3 h-3 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </ScrollArea>
            </Tabs>
        </div>
    );
}

export default function EditorWorkspace() {
    const { currentDeck, setCurrentView, setSelectedSlideId } = useStudio();
    const [buildProgress, setBuildProgress] = useState(0);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showCommentsPanel, setShowCommentsPanel] = useState(false);
    const [showQAPanel, setShowQAPanel] = useState(false);
    const [unreadComments, setUnreadComments] = useState(3);
    const [qaIssues, setQaIssues] = useState(2);

    // Simulate building progress
    useEffect(() => {
        if (currentDeck?.status === 'building' && buildProgress < 100) {
            const timer = setInterval(() => {
                setBuildProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    return prev + Math.random() * 8;
                });
            }, 500);
            return () => clearInterval(timer);
        }
    }, [currentDeck?.status, buildProgress]);

    // Set initial selected slide
    useEffect(() => {
        if (currentDeck?.slides?.[0] && !currentDeck.slides.find(s => s.id === currentDeck.slides[0].id)) {
            setSelectedSlideId(currentDeck.slides[0].id);
        } else if (currentDeck?.slides?.[0]) {
            setSelectedSlideId(currentDeck.slides[0].id);
        }
    }, [currentDeck, setSelectedSlideId]);

    if (!currentDeck) {
        return (
            <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading workspace...</p>
                </div>
            </div>
        );
    }

    const isBuilding = currentDeck.status === 'building' && buildProgress < 100;

    return (
        <div className="flex-1 min-h-0 flex flex-col bg-background/70 backdrop-blur-xl">
            {/* Header */}
            <header className="h-14 border-b border-border bg-background/60 backdrop-blur-xl flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => setCurrentView('dashboard')} className="gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Projects
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg gradient-ai shadow-sm" aria-hidden="true" />
                        <span className="font-semibold">{currentDeck.name}.pptx</span>
                    </div>
                    {isBuilding ? (
                        <Badge className="bg-blue-500/10 text-blue-500 border-0 gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Building... {Math.round(buildProgress)}%
                        </Badge>
                    ) : (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-0 gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Ready
                        </Badge>
                    )}
                </div>

                {/* Menu Bar */}
                <div className="flex items-center gap-1 text-sm">
                    {['File', 'Edit', 'View', 'Research', 'Review', 'QA', 'Export'].map((menu) => (
                        <DropdownMenu key={menu}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 px-3">
                                    {menu}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Option 1</DropdownMenuItem>
                                <DropdownMenuItem>Option 2</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Option 3</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Save className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Undo className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Redo className="w-4 h-4" />
                        </Button>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Slide {currentDeck.slides.findIndex(s => s.id === (currentDeck.slides[0]?.id || '1')) + 1} of {currentDeck.slides.length}</span>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="w-6 h-6">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-6 h-6">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="icon">
                        <Grid3X3 className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            {/* Building Progress */}
            {isBuilding && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-1 bg-muted"
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-blue-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${buildProgress}%` }}
                    />
                </motion.div>
            )}

            {/* Main Content - Three Panel Layout */}
            <div className="flex-1 overflow-hidden">
                <ResizablePanelGroup direction="horizontal">
                    {/* Left Panel - Slide Navigator */}
                    <ResizablePanel defaultSize={18} minSize={15} maxSize={25}>
                        <SlideNavigator />
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* Center Panel - Slide Canvas */}
                    <ResizablePanel defaultSize={55}>
                        <SlideCanvas />
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* Right Panel - Inspector */}
                    <ResizablePanel defaultSize={27} minSize={20} maxSize={35}>
                        <InspectorPanel />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

            {/* Footer */}
            <footer className="h-12 border-t border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 relative"
                        onClick={() => setShowCommentsPanel(true)}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Comments
                        {unreadComments > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">
                                {unreadComments}
                            </Badge>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 relative"
                        onClick={() => setShowQAPanel(true)}
                    >
                        <AlertCircle className="w-4 h-4" />
                        QA Issues
                        {qaIssues > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-500 text-xs">
                                {qaIssues}
                            </Badge>
                        )}
                    </Button>
                    <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Research Complete
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <Play className="w-4 h-4" />
                        Preview Slideshow
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                        <Search className="w-4 h-4" />
                        Find & Replace
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => setShowQAPanel(true)}
                    >
                        <Zap className="w-4 h-4" />
                        Run Full QA Check
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button
                        onClick={() => setShowExportModal(true)}
                        className="gap-2 bg-gradient-to-r from-primary to-primary/80"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            </footer>

            {/* Comments Panel Overlay */}
            <AnimatePresence>
                {showCommentsPanel && (
                    <CommentsPanel onClose={() => setShowCommentsPanel(false)} />
                )}
            </AnimatePresence>

            {/* QA Panel Overlay */}
            <AnimatePresence>
                {showQAPanel && (
                    <QAPanel onClose={() => setShowQAPanel(false)} />
                )}
            </AnimatePresence>

            {/* Export Modal */}
            <AnimatePresence>
                {showExportModal && (
                    <ExportModal onClose={() => setShowExportModal(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}
