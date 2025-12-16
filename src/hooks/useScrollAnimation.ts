'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationState {
    scrollProgress: number;
    currentSection: number;
    sectionProgress: number;
}

interface UseScrollAnimationOptions {
    sectionCount?: number;
}

export function useScrollAnimation(
    options: UseScrollAnimationOptions = {}
): ScrollAnimationState {
    const { sectionCount = 4 } = options;
    const [state, setState] = useState<ScrollAnimationState>({
        scrollProgress: 0,
        currentSection: 0,
        sectionProgress: 0,
    });

    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Wait for DOM to be ready
        if (typeof window === 'undefined') return;

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

            const sectionIndex = Math.min(
                Math.floor(progress * sectionCount),
                sectionCount - 1
            );
            const sectionStart = sectionIndex / sectionCount;
            const sectionEnd = (sectionIndex + 1) / sectionCount;
            const sectionProg =
                (progress - sectionStart) / (sectionEnd - sectionStart);

            setState({
                scrollProgress: progress,
                currentSection: sectionIndex,
                sectionProgress: Math.min(Math.max(sectionProg, 0), 1),
            });
        };

        // Initial update
        updateProgress();

        // Use GSAP ScrollTrigger for smooth updates
        const scrollTrigger = ScrollTrigger.create({
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: updateProgress,
        });

        // Also listen to native scroll for fallback
        window.addEventListener('scroll', updateProgress, { passive: true });

        return () => {
            scrollTrigger.kill();
            window.removeEventListener('scroll', updateProgress);
        };
    }, [sectionCount]);

    return state;
}

// Hook for animating elements on scroll
export function useScrollReveal(
    threshold: number = 0.2
): {
    ref: React.RefObject<HTMLDivElement | null>;
    isVisible: boolean;
} {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref.current || typeof window === 'undefined') return;

        const element = ref.current;

        ScrollTrigger.create({
            trigger: element,
            start: `top ${100 - threshold * 100}%`,
            onEnter: () => setIsVisible(true),
            once: true,
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [threshold]);

    return { ref, isVisible };
}

// Hook for pinning elements during scroll
export function usePinElement(): React.RefObject<HTMLDivElement | null> {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current || typeof window === 'undefined') return;

        const element = ref.current;

        ScrollTrigger.create({
            trigger: element,
            start: 'top top',
            end: 'bottom bottom',
            pin: true,
            pinSpacing: false,
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return ref;
}
