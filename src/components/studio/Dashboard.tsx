import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudio } from './StudioContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useUser, useClerk } from '@clerk/clerk-react';
import {
    Presentation,
    Plus,
    Search,
    Settings,
    Home,
    Star,
    LayoutTemplate,
    FolderClosed,
    Bell,
    Trash2,
    MoreHorizontal,
    Loader2,
    Link2,
    CheckCircle2,
    Clock,
    User,
    HeadphonesIcon,
    ArrowUpCircle,
    LogOut,
} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet';

// ─── Types ──────────────────────────────────────────────────────────────
interface SheetPresentation {
    presentationId: string;
    companyName: string;
    presentationType: string;
    status: 'queued' | 'completed';
    presentationUrl: string | null;
    exportUrl: string | null;
    createdAt: string;
}

// ─── LocalStorage helpers ───────────────────────────────────────────────
const LS_KEY = 'clarity_presentations';
const LS_DELETED_KEY = 'clarity_deleted_ids';
const LS_FAVS_KEY = 'clarity_favorite_ids';

function getSavedPresentations(): SheetPresentation[] {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function savePresentations(items: SheetPresentation[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
}

function getDeletedIds(): string[] {
    try {
        const raw = localStorage.getItem(LS_DELETED_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function addDeletedId(id: string) {
    const ids = getDeletedIds();
    if (!ids.includes(id)) {
        ids.push(id);
        localStorage.setItem(LS_DELETED_KEY, JSON.stringify(ids));
    }
}

function getFavoriteIds(): string[] {
    try {
        const raw = localStorage.getItem(LS_FAVS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function setFavoriteIds(ids: string[]) {
    localStorage.setItem(LS_FAVS_KEY, JSON.stringify(ids));
}

function toggleFavoriteId(id: string): string[] {
    const ids = getFavoriteIds();
    const index = ids.indexOf(id);
    if (index === -1) { ids.push(id); } else { ids.splice(index, 1); }
    setFavoriteIds(ids);
    return [...ids];
}

// ─── Helpers ────────────────────────────────────────────────────────────
function formatTimeAgo(dateStr: string): string {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Recently';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Edited yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

// ─── Sidebar nav items ─────────────────────────────────────────────────
const sidebarNav = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Star, label: 'Favorites', id: 'favorites' },
    { icon: LayoutTemplate, label: 'Templates', id: 'templates' },
    { icon: FolderClosed, label: 'Folders', id: 'folders' },
    { icon: Bell, label: 'Notifications', id: 'notifications' },
    { icon: Trash2, label: 'Trash', id: 'trash' },
    { icon: Settings, label: 'Settings', id: 'settings' },
];

// ─── Context Menu (hover popover on three-dots) ────────────────────────
function CardContextMenu({
    presentation,
    isFav,
    onAddFavorite,
    onCopyLink,
    onDelete,
}: {
    presentation: SheetPresentation;
    isFav: boolean;
    onAddFavorite: () => void;
    onCopyLink: () => void;
    onDelete: () => void;
}) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 200);
    };

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
            >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1 z-50 w-56 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl py-1.5"
                    >
                        {/* Header */}
                        <div className="px-3.5 py-2.5 border-b border-gray-100 dark:border-gray-800">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                {presentation.companyName}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                {formatTimeAgo(presentation.createdAt)}
                            </p>
                        </div>

                        {/* Options */}
                        <div className="py-1">
                            <button
                                onClick={(e) => { e.stopPropagation(); onAddFavorite(); setOpen(false); }}
                                className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Star className={`w-4 h-4 ${isFav ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                                {isFav ? 'Remove from favorites' : 'Add to favorites'}
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onCopyLink(); setOpen(false); }}
                                className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Link2 className="w-4 h-4 text-gray-400" />
                                Copy link
                            </button>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-800 pt-1">
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(); setOpen(false); }}
                                className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Send to trash
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Profile Dropdown (hover) ───────────────────────────────────────────
function ProfileDropdown({ userInitial, onSignOut }: { userInitial: string; onSignOut: () => void }) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 200);
    };

    const items = [
        { icon: User, label: 'Profile', action: () => {}, color: 'text-gray-700 dark:text-gray-300' },
        { icon: HeadphonesIcon, label: 'Support', action: () => {}, color: 'text-gray-700 dark:text-gray-300' },
        { icon: ArrowUpCircle, label: 'Upgrade', action: () => {}, color: 'text-gray-700 dark:text-gray-300' },
        { icon: LogOut, label: 'Sign out', action: onSignOut, color: 'text-red-500' },
    ];

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm cursor-pointer">
                {userInitial}
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 mb-2 z-50 w-44 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl py-1.5 ml-5"
                    >
                        {items.map((item) => (
                            <button
                                key={item.label}
                                onClick={item.action}
                                className={`w-full flex items-center gap-3 px-3.5 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${item.color}`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Presentation Card ─────────────────────────────────────────────────
function PresentationCard({
    presentation,
    isFav,
    onClick,
    onAddFavorite,
    onCopyLink,
    onDelete,
}: {
    presentation: SheetPresentation;
    isFav: boolean;
    onClick: () => void;
    onAddFavorite: () => void;
    onCopyLink: () => void;
    onDelete: () => void;
}) {
    const isCompleted = presentation.status === 'completed';

    return (
        <div className="group">
            {/* Card body */}
            <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                className="cursor-pointer rounded-2xl overflow-hidden border border-amber-200/60 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-amber-900/20 dark:border-amber-800/30 shadow-sm hover:shadow-lg transition-all duration-300 relative"
            >
                {/* Status badge */}
                <div className="absolute top-3 left-3 z-10">
                    <Badge
                        variant="secondary"
                        className={`gap-1 text-[10px] font-semibold px-2 py-0.5 ${
                            isCompleted
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                        }`}
                    >
                        {isCompleted ? (
                            <CheckCircle2 className="w-3 h-3" />
                        ) : (
                            <Clock className="w-3 h-3" />
                        )}
                        {isCompleted ? 'Completed' : 'Queued'}
                    </Badge>
                </div>

                {/* Fav indicator */}
                {isFav && (
                    <div className="absolute top-3 right-3 z-10">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                )}

                <div className="flex items-stretch p-5 pt-9 gap-4 min-h-[140px]">
                    {/* Text content */}
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug line-clamp-3">
                            {presentation.companyName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 truncate">
                            {presentation.presentationType || "Let's get started!"}
                        </p>
                    </div>
                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-amber-200/60 to-orange-200/40 dark:from-amber-800/30 dark:to-orange-800/20 flex-shrink-0 overflow-hidden flex items-center justify-center self-center">
                        <Presentation className="w-8 h-8 text-amber-600/40 dark:text-amber-400/40" />
                    </div>
                </div>
            </motion.div>

            {/* Card footer */}
            <div className="flex items-center justify-between px-1 pt-2 pb-1">
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                        {presentation.companyName}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        {formatTimeAgo(presentation.createdAt)}
                    </p>
                </div>
                <CardContextMenu
                    presentation={presentation}
                    isFav={isFav}
                    onAddFavorite={onAddFavorite}
                    onCopyLink={onCopyLink}
                    onDelete={onDelete}
                />
            </div>
        </div>
    );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────
export default function Dashboard() {
    const {
        setCurrentView,
        setCurrentDeck,
        setWizardStep,
        setUploadedFiles,
        setExtractedStyle,
        setDeckContent,
    } = useStudio();
    const { user } = useUser();
    const { signOut } = useClerk();

    const [searchQuery, setSearchQuery] = useState('');
    const [presentations, setPresentations] = useState<SheetPresentation[]>(getSavedPresentations);
    const [isLoading, setIsLoading] = useState(false);
    const [activeNav, setActiveNav] = useState('home');
    const [favoriteIds, setFavoriteIdsState] = useState<string[]>(getFavoriteIds);

    // Delete sheet state
    const [deleteSheetOpen, setDeleteSheetOpen] = useState(false);
    const [selectedPresentation, setSelectedPresentation] = useState<SheetPresentation | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Credits (stored in localStorage)
    const [credits] = useState(() => {
        try {
            const c = localStorage.getItem('clarity_credits');
            return c ? parseInt(c, 10) : 480;
        } catch { return 480; }
    });

    const resetWizardAndNavigate = () => {
        setUploadedFiles([]);
        setExtractedStyle(null);
        setDeckContent({ audience: '', brief: '', financialData: [], researchOptions: [] });
        setCurrentDeck(null);
        setWizardStep(1);
        setCurrentView('wizard');
    };

    // ─── Favorites handler ──────────────────────────────────────────
    const handleToggleFavorite = (id: string) => {
        const updated = toggleFavoriteId(id);
        setFavoriteIdsState(updated);
    };

    // ─── Copy link handler ──────────────────────────────────────────
    const handleCopyLink = (presentation: SheetPresentation) => {
        const url = presentation.presentationUrl || presentation.exportUrl || '';
        if (url) {
            navigator.clipboard.writeText(url).catch(() => {});
        }
    };

    // ─── Fetch from Google Sheet + merge with localStorage ──────────
    const fetchPresentations = async () => {
        setIsLoading(true);
        try {
            const sheetId = '1HsytksVRGJagIh6mFfpvUVz57G9sNKlZLlfR-y5YmgI';
            const response = await fetch(
                `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`
            );
            if (!response.ok) { console.error('Failed to fetch sheet data'); return; }

            const text = await response.text();
            const jsonString = text.substring(47, text.length - 2);
            const data = JSON.parse(jsonString);
            const rows = data.table.rows;
            if (rows.length === 0) return;

            const headerRow = rows[0].c;
            const headers = headerRow.map((cell: any) => cell?.v || '');
            const idx = (name: string) => headers.findIndex((h: string) => h.toLowerCase() === name);
            const idIndex = idx('presentation_id');
            const companyIndex = idx('company_name');
            const typeIndex = idx('presentation_type');
            const urlIndex = idx('presentation_url');
            const exportIndex = idx('export_url');
            const createdIndex = idx('created_at');

            const deletedIds = getDeletedIds();
            const fetched: SheetPresentation[] = [];

            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].c;
                if (!cells) continue;
                const presentationId = cells[idIndex]?.v;
                if (!presentationId || deletedIds.includes(presentationId)) continue;

                fetched.push({
                    presentationId,
                    companyName: cells[companyIndex]?.v || 'Untitled',
                    presentationType: cells[typeIndex]?.v || 'Presentation',
                    status: (cells[urlIndex]?.v || cells[exportIndex]?.v) ? 'completed' : 'queued',
                    presentationUrl: cells[urlIndex]?.v || null,
                    exportUrl: cells[exportIndex]?.v || null,
                    createdAt: cells[createdIndex]?.v || '',
                });
            }

            const reversed = fetched.reverse();
            setPresentations(reversed);
            savePresentations(reversed);
        } catch (error) {
            console.error('Error fetching presentations:', error);
            setPresentations(getSavedPresentations());
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchPresentations(); }, []);

    // ─── Delete handler ─────────────────────────────────────────────
    const handleDelete = async () => {
        if (!selectedPresentation) return;
        setIsDeleting(true);
        try {
            addDeletedId(selectedPresentation.presentationId);
            const updated = presentations.filter(
                (p) => p.presentationId !== selectedPresentation.presentationId
            );
            setPresentations(updated);
            savePresentations(updated);
        } finally {
            setIsDeleting(false);
            setDeleteSheetOpen(false);
            setSelectedPresentation(null);
        }
    };

    // ─── Click handler ──────────────────────────────────────────────
    const handlePresentationClick = (presentation: SheetPresentation) => {
        if (presentation.status === 'completed' && (presentation.presentationUrl || presentation.exportUrl)) {
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
                iframeUrl: presentation.presentationUrl,
                exportUrl: presentation.exportUrl,
            });
            setCurrentView('editor');
        }
    };

    // ─── Filtered & favorites view ──────────────────────────────────
    const baseFiltered = presentations.filter(
        (p) =>
            p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.presentationId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filtered = activeNav === 'favorites'
        ? baseFiltered.filter((p) => favoriteIds.includes(p.presentationId))
        : baseFiltered;

    const userInitial = user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || 'U';

    const pageTitle = activeNav === 'favorites' ? 'Favorites' : undefined;

    return (
        <div className="flex h-full min-h-screen bg-gray-50/80 dark:bg-gray-950">
            {/* ─── Left Sidebar ────────────────────────────────────── */}
            <aside className="w-[88px] flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-5 gap-1">
                {/* Logo */}
                <div className="mt-auto pt-2 pb-4">
                    <ProfileDropdown
                        userInitial={userInitial}
                        onSignOut={() => signOut()}
                    />
                </div>
                {/* Nav items */}
                <nav className="flex-1 flex flex-col items-center gap-0.5 w-full px-2">
                    {sidebarNav.map((item) => {
                        const isActive = activeNav === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`w-full flex flex-col items-center gap-1 py-2.5 rounded-xl text-[11px] font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* User avatar with hover dropdown */}
                
            </aside>

            {/* ─── Main area ───────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-auto">
                {/* Top bar */}
                <header className="flex items-center gap-4 px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/70 dark:border-gray-800/70 sticky top-0 z-20">
                    {/* Search */}
                    <div className="flex-1 max-w-xl relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-primary/30"
                        />
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        {/* Credits */}
                        <div className="text-right hidden sm:block">
                            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{credits}/500</span>
                            <p className="text-[11px] text-gray-400 leading-none">credits left</p>
                        </div>

                        {/* Create button */}
                        <Button
                            onClick={resetWizardAndNavigate}
                            className="gap-2 rounded-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900 text-white shadow-lg px-5 h-10 text-sm font-semibold"
                        >
                            <Plus className="w-4 h-4" />
                            Create a New PPT
                        </Button>
                    </div>
                </header>

                {/* ─── Cards Grid ──────────────────────────────────── */}
                <main className="flex-1 px-6 py-6">
                    {/* Page title for favorites */}
                    {pageTitle && (
                        <div className="mb-5">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                {pageTitle}
                            </h2>
                            <p className="text-sm text-gray-400 mt-0.5">Presentations you've saved as favorites</p>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="w-7 h-7 animate-spin text-primary" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-24 text-gray-400">
                            {activeNav === 'favorites' ? (
                                <>
                                    <Star className="w-14 h-14 mx-auto mb-4 opacity-40" />
                                    <p className="text-lg font-medium">No favorites yet</p>
                                    <p className="text-sm mt-1">Hover over a card's menu and add it to favorites</p>
                                </>
                            ) : (
                                <>
                                    <Presentation className="w-14 h-14 mx-auto mb-4 opacity-40" />
                                    <p className="text-lg font-medium">No presentations found</p>
                                    <p className="text-sm mt-1">Create your first one to get started!</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            <AnimatePresence>
                                {filtered.map((presentation, index) => (
                                    <motion.div
                                        key={presentation.presentationId}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.04 }}
                                    >
                                        <PresentationCard
                                            presentation={presentation}
                                            isFav={favoriteIds.includes(presentation.presentationId)}
                                            onClick={() => handlePresentationClick(presentation)}
                                            onAddFavorite={() => handleToggleFavorite(presentation.presentationId)}
                                            onCopyLink={() => handleCopyLink(presentation)}
                                            onDelete={() => {
                                                setSelectedPresentation(presentation);
                                                setDeleteSheetOpen(true);
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </main>
            </div>

            {/* ─── Delete Confirmation Sheet ────────────────────────── */}
            <Sheet open={deleteSheetOpen} onOpenChange={setDeleteSheetOpen}>
                <SheetContent side="right" className="sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2 text-red-600">
                            <Trash2 className="w-5 h-5" />
                            Send to trash
                        </SheetTitle>
                        <SheetDescription>
                            This presentation will be moved to trash and removed from your dashboard.
                        </SheetDescription>
                    </SheetHeader>

                    {selectedPresentation && (
                        <div className="py-6 space-y-4">
                            <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 p-4 space-y-2">
                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                    {selectedPresentation.companyName}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {selectedPresentation.presentationType}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                                    ID: {selectedPresentation.presentationId}
                                </p>
                            </div>
                        </div>
                    )}

                    <SheetFooter className="gap-2 sm:gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteSheetOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="flex-1 gap-2"
                        >
                            {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
