import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number; // threshold for when the element is considered visible. For example, 0.1 means 10% of the element must be visible to trigger the animation.
  rootMargin?: string; // margin for the observer. For example, "200px" means the observer will trigger the animation when the element is 200px from the bottom of the viewport.
  delay?: number; // delay for the animation. For example, 100 means the animation will start after 100ms.
  adaptiveThreshold?: boolean; // whether to adapt threshold based on element height
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1, // Reduced default threshold for more consistent behavior
    rootMargin = "120px", // Increased margin for better trigger timing
    delay = 0,
    adaptiveThreshold = true,
  } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set mounted to true after hydration
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only start observing after component is mounted
    if (!isMounted) return;

    // Calculate adaptive threshold based on element height
    const calculateThreshold = (element: Element) => {
      if (!adaptiveThreshold) return threshold;

      const height = element.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;

      // For very tall elements (> 80% of viewport), use smaller threshold
      if (height > windowHeight * 0.8) {
        return 0.05; // 5% for very tall elements
      }
      // For medium elements (20-80% of viewport), use moderate threshold
      else if (height > windowHeight * 0.2) {
        return 0.1; // 10% for medium elements
      }
      // For small elements (< 20% of viewport), use higher threshold
      else {
        return 0.3; // 30% for small elements
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;

        if (entry.isIntersecting) {
          // Element is entering viewport
          console.log("Element entering viewport:", {
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
            windowHeight,
            hasAnimated,
            intersectionRatio: entry.intersectionRatio,
          });

          // Start animation with delay
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        } else if (hasAnimated) {
          // Only handle visibility changes after first animation
          console.log("Element leaving viewport:", {
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
            windowHeight,
            hasAnimated,
          });

          // If element is completely below viewport, hide it
          if (rect.top > windowHeight + 50) {
            setIsVisible(false);
          }
          // Keep elements visible if they've scrolled past the top
          // This maintains the animated state for elements above viewport
        }
      },
      {
        threshold: adaptiveThreshold ? [0.05, 0.1, 0.2, 0.3] : threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      // Update threshold based on element height after mounting
      if (adaptiveThreshold) {
        const adaptedThreshold = calculateThreshold(currentRef);
        console.log("Adaptive threshold for element:", {
          height: currentRef.getBoundingClientRect().height,
          threshold: adaptedThreshold,
        });
      }

      observer.observe(currentRef);

      // Force initial check for elements already in viewport
      setTimeout(() => {
        const rect = currentRef.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementThreshold = adaptiveThreshold
          ? calculateThreshold(currentRef)
          : threshold;

        // Calculate if enough of the element is visible
        const visibleHeight =
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibilityRatio = visibleHeight / rect.height;

        if (visibilityRatio >= elementThreshold && !isVisible) {
          console.log(
            "Force triggering animation for element already in viewport:",
            {
              visibilityRatio,
              threshold: elementThreshold,
            }
          );
          setIsVisible(true);
          setHasAnimated(true);
        }
      }, 100);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    threshold,
    rootMargin,
    delay,
    isMounted,
    hasAnimated,
    isVisible,
    adaptiveThreshold,
  ]);

  return { ref, isVisible: isMounted && isVisible };
};
