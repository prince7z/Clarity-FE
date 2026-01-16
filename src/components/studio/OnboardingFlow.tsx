import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudio } from './StudioContext';
import { Button } from '@/components/ui/button';
import {
    Presentation,
    Sparkles,
    Upload,
    Wand2,
    ArrowRight,
    CheckCircle2,
    FileUp,
    Zap
} from 'lucide-react';

const steps = [
    {
        id: 'welcome',
        title: 'Create PowerPoints in minutes, not days',
        subtitle: 'The definitive PowerPoint production studio for private equity, investment banking, and corporate development.',
        icon: Presentation,
    },
    {
        id: 'demo',
        title: 'How it works',
        subtitle: 'Three simple steps to perfect presentations',
        icon: Sparkles,
        features: [
            { icon: Upload, title: 'Upload', description: 'Show us what "good looks like" with your reference decks' },
            { icon: Wand2, title: 'Configure', description: 'Tell us what you need - content, data, and research' },
            { icon: Zap, title: 'Generate', description: 'AI builds your entire presentation with perfect formatting' },
        ],
    },
    {
        id: 'start',
        title: "Let's start by learning your style",
        subtitle: 'Upload a PowerPoint you love, and we\'ll learn its design language',
        icon: FileUp,
    },
];

export default function OnboardingFlow() {
    const [currentStep, setCurrentStep] = useState(0);
    const { setCurrentView, setIsFirstVisit } = useStudio();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFirstVisit(false);
            setCurrentView('wizard');
        }
    };

    const handleSkip = () => {
        setIsFirstVisit(false);
        setCurrentView('dashboard');
    };

    const step = steps[currentStep];
    const Icon = step.icon;

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-background via-background to-primary/5">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />
            </div>

            <motion.div
                className="relative z-10 max-w-2xl w-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-12">
                    {steps.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentStep
                                    ? 'w-8 bg-primary'
                                    : index < currentStep
                                        ? 'w-2 bg-primary/60'
                                        : 'w-2 bg-muted-foreground/20'
                                }`}
                            initial={false}
                            animate={{ scale: index === currentStep ? 1 : 0.9 }}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="text-center"
                    >
                        {/* Icon */}
                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/25 mb-8"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Icon className="w-10 h-10 text-primary-foreground" />
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            {step.title}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto">
                            {step.subtitle}
                        </p>

                        {/* Features for demo step */}
                        {step.features && (
                            <div className="grid grid-cols-3 gap-6 mb-12">
                                {step.features.map((feature, index) => {
                                    const FeatureIcon = feature.icon;
                                    return (
                                        <motion.div
                                            key={feature.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            className="group"
                                        >
                                            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                                                    <FeatureIcon className="w-6 h-6 text-primary" />
                                                </div>
                                                <h3 className="font-semibold mb-2">{feature.title}</h3>
                                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Upload area for start step */}
                        {step.id === 'start' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mb-12"
                            >
                                <div className="border-2 border-dashed border-primary/30 rounded-2xl p-12 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                                    <Upload className="w-12 h-12 text-primary/60 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                    <p className="text-muted-foreground">
                                        Drag & drop your PowerPoint here, or <span className="text-primary font-medium">browse</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground/60 mt-2">
                                        Supports .pptx and .pdf files
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Actions */}
                <motion.div
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Button
                        variant="ghost"
                        onClick={handleSkip}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Skip intro
                    </Button>
                    <Button
                        size="lg"
                        onClick={handleNext}
                        className="px-8 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                    >
                        {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
