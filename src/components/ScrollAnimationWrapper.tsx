"use client";

import { ReactNode, useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  delay?: number; // delay for the animation. For example, 100 means the animation will start after 100ms.
  className?: string; // className for the wrapper div.
  animationType?: "fade" | "slideUp" | "slideLeft" | "slideRight"; // type of animation to use.
  animationDistance?: number; // distance for the animation. For example, 100 means the animation will move 100px.
  threshold?: number; // custom threshold for intersection observer
  rootMargin?: string; // custom root margin for intersection observer
  adaptiveThreshold?: boolean; // whether to use adaptive threshold based on element height
}

export default function ScrollAnimationWrapper({
  children,
  delay = 0,
  className = "",
  animationType = "slideUp",
  animationDistance = 320,
  threshold,
  rootMargin,
  adaptiveThreshold = true, // Enable adaptive threshold by default
}: ScrollAnimationWrapperProps) {
  const { ref, isVisible } = useScrollAnimation({
    delay,
    threshold,
    rootMargin,
    adaptiveThreshold,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getAnimationStyles = () => {
    const baseStyle = {
      transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
      willChange: "transform, opacity",
    };

    if (!isMounted) {
      // Initial hidden state for each animation type
      switch (animationType) {
        case "fade":
          return { ...baseStyle, opacity: 0 };
        case "slideUp":
          return {
            ...baseStyle,
            opacity: 0,
            transform: `translateY(${animationDistance}px)`,
          };
        case "slideLeft":
          return {
            ...baseStyle,
            opacity: 0,
            transform: `translateX(${animationDistance}px)`,
          };
        case "slideRight":
          return {
            ...baseStyle,
            opacity: 0,
            transform: `translateX(-${animationDistance}px)`,
          };
        default:
          return { ...baseStyle, opacity: 0 };
      }
    }

    // Animation states based on visibility
    switch (animationType) {
      case "fade":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
        };
      case "slideUp":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateY(0px)"
            : `translateY(${animationDistance}px)`,
        };
      case "slideLeft":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateX(0px)"
            : `translateX(${animationDistance}px)`,
        };
      case "slideRight":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateX(0px)"
            : `translateX(-${animationDistance}px)`,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div ref={ref} className={className} style={getAnimationStyles()}>
      {children}
    </div>
  );
}
