import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    X,
    MessageSquare,
    Sparkles,
    Check,
    Reply,
    MoreHorizontal,
    User,
    Bot,
    Eye,
    ThumbsUp,
    ThumbsDown,
    Clock
} from 'lucide-react';

interface Comment {
    id: string;
    type: 'user' | 'ai';
    author: string;
    avatar?: string;
    content: string;
    slide: number;
    timestamp: string;
    resolved: boolean;
    aiSuggestion?: {
        action: string;
        impact: string;
    };
}

const mockComments: Comment[] = [
    {
        id: '1',
        type: 'user',
        author: 'Sarah Chen',
        content: 'Make competitor names more prominent - they\'re getting lost in the chart',
        slide: 4,
        timestamp: '10:42 AM',
        resolved: false,
    },
    {
        id: '2',
        type: 'ai',
        author: 'AI Assistant',
        content: 'Add market share % to the competitive landscape chart',
        slide: 4,
        timestamp: '10:45 AM',
        resolved: false,
        aiSuggestion: {
            action: 'Would increase slide impact by adding market share data from latest Gartner report',
            impact: 'High impact on investor understanding',
        },
    },
    {
        id: '3',
        type: 'user',
        author: 'Michael Torres',
        content: 'Can we update the revenue projection to include Q4 actuals?',
        slide: 5,
        timestamp: '11:15 AM',
        resolved: false,
    },
    {
        id: '4',
        type: 'ai',
        author: 'AI Assistant',
        content: 'Consider adding a growth rate annotation to the financial chart',
        slide: 5,
        timestamp: '11:20 AM',
        resolved: true,
        aiSuggestion: {
            action: 'Add YoY growth labels to each bar in the revenue chart',
            impact: 'Makes growth trajectory immediately visible',
        },
    },
    {
        id: '5',
        type: 'user',
        author: 'Sarah Chen',
        content: 'The title slide looks great! Perfect branding.',
        slide: 1,
        timestamp: 'Yesterday',
        resolved: true,
    },
];

function CommentCard({ comment, onResolve }: { comment: Comment; onResolve: (id: string) => void }) {
    const isAI = comment.type === 'ai';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border transition-all duration-200 ${comment.resolved
                    ? 'bg-muted/30 border-border/50 opacity-60'
                    : 'bg-card border-border hover:border-primary/30 hover:shadow-md'
                }`}
        >
            <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                    {isAI ? (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                    ) : (
                        <>
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback className="bg-muted">
                                {comment.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </>
                    )}
                </Avatar>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        {isAI && (
                            <Badge className="bg-primary/10 text-primary border-0 text-xs gap-1">
                                <Sparkles className="w-3 h-3" />
                                AI
                            </Badge>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">{comment.timestamp}</span>
                    </div>

                    <p className="text-sm text-foreground mb-2">{comment.content}</p>

                    {comment.aiSuggestion && (
                        <div className="bg-primary/5 rounded-lg p-3 mb-3 border border-primary/10">
                            <p className="text-xs text-muted-foreground">{comment.aiSuggestion.action}</p>
                            <p className="text-xs text-primary mt-1">💡 {comment.aiSuggestion.impact}</p>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                            Slide {comment.slide}
                        </Badge>

                        {!comment.resolved && (
                            <div className="flex items-center gap-1 ml-auto">
                                {isAI ? (
                                    <>
                                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                                            <Eye className="w-3 h-3" />
                                            Preview
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-7 text-xs gap-1 bg-primary/10 text-primary hover:bg-primary/20"
                                            onClick={() => onResolve(comment.id)}
                                        >
                                            <Check className="w-3 h-3" />
                                            Apply
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                                            Dismiss
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 text-xs gap-1"
                                            onClick={() => onResolve(comment.id)}
                                        >
                                            <Check className="w-3 h-3" />
                                            Apply Fix
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                                            Ignore
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground">
                                            <Reply className="w-3 h-3" />
                                            Reply
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}

                        {comment.resolved && (
                            <Badge className="ml-auto bg-emerald-500/10 text-emerald-600 border-0 text-xs gap-1">
                                <Check className="w-3 h-3" />
                                Resolved
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

interface CommentsPanelProps {
    onClose: () => void;
}

export default function CommentsPanel({ onClose }: CommentsPanelProps) {
    const [comments, setComments] = useState<Comment[]>(mockComments);
    const [filter, setFilter] = useState('all');
    const [newComment, setNewComment] = useState('');

    const handleResolve = (id: string) => {
        setComments(comments.map(c =>
            c.id === id ? { ...c, resolved: true } : c
        ));
    };

    const filteredComments = comments.filter(c => {
        if (filter === 'unresolved') return !c.resolved;
        if (filter === 'me') return c.author === 'Sarah Chen';
        if (filter === 'ai') return c.type === 'ai';
        return true;
    });

    const unresolvedCount = comments.filter(c => !c.resolved).length;
    const appliedCount = comments.filter(c => c.resolved).length;

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
                            <MessageSquare className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-semibold">Comments & Suggestions</h2>
                            <p className="text-xs text-muted-foreground">
                                {unresolvedCount} unresolved • {appliedCount} applied
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Filters */}
                <div className="p-4 border-b border-border shrink-0">
                    <Tabs value={filter} onValueChange={setFilter}>
                        <TabsList className="w-full">
                            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                            <TabsTrigger value="unresolved" className="flex-1">Unresolved</TabsTrigger>
                            <TabsTrigger value="me" className="flex-1">By Me</TabsTrigger>
                            <TabsTrigger value="ai" className="flex-1">By AI</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Comments List */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {filteredComments.map((comment, index) => (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                                onResolve={handleResolve}
                            />
                        ))}

                        {filteredComments.length === 0 && (
                            <div className="text-center py-12">
                                <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground">No comments found</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Bulk Actions */}
                <div className="p-4 border-t border-border shrink-0">
                    <div className="flex items-center gap-2 mb-4">
                        <Button variant="outline" size="sm" className="text-xs">
                            Select All
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                            Apply Selected
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                            Mark as Resolved
                        </Button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Comment Stats: </span>
                        <span className="font-medium text-emerald-600">Applied {appliedCount}/{comments.length}</span>
                        <span className="text-muted-foreground"> • </span>
                        <span className="font-medium text-amber-600">{unresolvedCount} Need Input</span>
                    </div>
                </div>

                {/* Add Comment */}
                <div className="p-4 border-t border-border bg-muted/30 shrink-0">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1"
                        />
                        <Button size="sm" disabled={!newComment.trim()}>
                            Send
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
