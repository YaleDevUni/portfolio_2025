"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { gridConfig } from "@/config/gridConfig";

interface PixelTextProps {
  text: string;
  x?: number;
  y?: number;
  color?: string;
  scale?: number;
  className?: string;
  animate?: "none" | "pulse" | "blink" | "wave";
}

// Define a pixel representation of each character
const PIXEL_CHARACTERS: Record<string, string[]> = {
  A: [" XX ", "X  X", "XXXX", "X  X", "X  X"],
  B: ["XXX ", "X  X", "XXX ", "X  X", "XXX "],
  C: [" XXX", "X   ", "X   ", "X   ", " XXX"],
  D: ["XXX ", "X  X", "X  X", "X  X", "XXX "],
  E: ["XXXX", "X   ", "XXX ", "X   ", "XXXX"],
  F: ["XXXX", "X   ", "XXX ", "X   ", "X   "],
  G: [" XXX", "X   ", "X XX", "X  X", " XXX"],
  H: ["X  X", "X  X", "XXXX", "X  X", "X  X"],
  I: ["XXX", " X ", " X ", " X ", "XXX"],
  J: ["  XX", "   X", "   X", "X  X", " XX "],
  K: ["X  X", "X X ", "XX  ", "X X ", "X  X"],
  L: ["X   ", "X   ", "X   ", "X   ", "XXXX"],
  M: ["X   X", "XX XX", "X X X", "X   X", "X   X"],
  N: ["X  X", "XX X", "X XX", "X  X", "X  X"],
  O: [" XX ", "X  X", "X  X", "X  X", " XX "],
  P: ["XXX ", "X  X", "XXX ", "X   ", "X   "],
  Q: [" XX ", "X  X", "X  X", "X XX", " XXX"],
  R: ["XXX ", "X  X", "XXX ", "X X ", "X  X"],
  S: [" XXX", "X   ", " XX ", "   X", "XXX "],
  T: ["XXXXX", "  X  ", "  X  ", "  X  ", "  X  "],
  U: ["X  X", "X  X", "X  X", "X  X", " XX "],
  V: ["X  X", "X  X", "X  X", " XX ", "  X "],
  W: ["X   X", "X   X", "X X X", "XX XX", "X   X"],
  X: ["X  X", "X  X", " XX ", "X  X", "X  X"],
  Y: ["X   X", " X X ", "  X  ", "  X  ", "  X  "],
  Z: ["XXXX", "   X", "  X ", " X  ", "XXXX"],
  "0": [" XX ", "X  X", "X  X", "X  X", " XX "],
  "1": [" X ", "XX ", " X ", " X ", "XXX"],
  "2": [" XX ", "X  X", "  X ", " X  ", "XXXX"],
  "3": ["XXX ", "   X", " XX ", "   X", "XXX "],
  "4": ["X  X", "X  X", "XXXX", "   X", "   X"],
  "5": ["XXXX", "X   ", "XXX ", "   X", "XXX "],
  "6": [" XX ", "X   ", "XXX ", "X  X", " XX "],
  "7": ["XXXX", "   X", "  X ", " X  ", "X   "],
  "8": [" XX ", "X  X", " XX ", "X  X", " XX "],
  "9": [" XX ", "X  X", " XXX", "   X", " XX "],
  " ": ["    ", "    ", "    ", "    ", "    "],
  ".": ["  ", "  ", "  ", "  ", "X "],
  ",": ["  ", "  ", "  ", " X", "X "],
  "!": ["X", "X", "X", " ", "X"],
  "?": [" XX ", "X  X", "  X ", "    ", "  X "],
  ":": ["  ", "X ", "  ", "X ", "  "],
  "-": ["    ", "    ", "XXXX", "    ", "    "],
  _: ["     ", "     ", "     ", "     ", "XXXXX"],
  "(": [" X", "X ", "X ", "X ", " X"],
  ")": ["X ", " X", " X", " X", "X "],
};

export default function PixelText({
  text,
  x = 0,
  y = 0,
  color,
  scale = 1,
  className = "",
  animate = "none",
}: PixelTextProps) {
  const [mounted, setMounted] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const { theme } = useTheme();

  // Use the shared grid configuration
  const { cellSize } = gridConfig;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation effect
  useEffect(() => {
    if (!mounted || animate === "none") return;

    const interval = setInterval(() => {
      setAnimationFrame((prev) => (prev + 1) % 60); // 60 frames for animation cycle
    }, 50); // Update every 50ms

    return () => clearInterval(interval);
  }, [mounted, animate]);

  if (!mounted) return null;

  // Convert text to uppercase to match our character map
  const upperText = text.toUpperCase();

  // Default colors based on theme
  const defaultColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 120, 0.8)";
  const pixelColor = color || defaultColor;

  // Calculate pixel positions
  const renderPixels = () => {
    const pixels = [];
    let offsetX = 0;
    let maxHeight = 0;

    // Loop through each character in the text
    for (let charIndex = 0; charIndex < upperText.length; charIndex++) {
      const char = upperText[charIndex];
      const pixelPattern = PIXEL_CHARACTERS[char] || PIXEL_CHARACTERS[" "];

      // Find the width of this character
      const charWidth = pixelPattern[0].length;

      // Loop through the pattern for this character
      for (let row = 0; row < pixelPattern.length; row++) {
        for (let col = 0; col < charWidth; col++) {
          // If there's a pixel at this position (marked by 'X')
          if (pixelPattern[row][col] === "X") {
            let posX = x + (offsetX + col) * cellSize.width * scale;
            let posY = y + row * cellSize.height * scale;
            let opacity = 1;
            let transform = "";

            // Apply animation effects
            if (animate !== "none") {
              const phase = (animationFrame + charIndex * 3 + col + row) % 60; // Different phase per pixel

              if (animate === "pulse") {
                // Pulsating effect - fade in and out
                opacity = 0.5 + 0.5 * Math.sin((phase * Math.PI) / 30);
              } else if (animate === "blink") {
                // Blinking effect - random pixels blink
                opacity = Math.sin((phase * Math.PI) / 10) > 0.7 ? 1 : 0.3;
              } else if (animate === "wave") {
                // Wave effect - pixels move in a wave pattern
                const waveOffset =
                  Math.sin((phase * Math.PI) / 30 + charIndex * 0.5) * 5;
                posY += waveOffset;
              }
            }

            pixels.push(
              <div
                key={`pixel-${charIndex}-${row}-${col}`}
                className="absolute"
                style={{
                  left: posX,
                  top: posY,
                  width: cellSize.width * scale,
                  height: cellSize.height * scale,
                  backgroundColor: pixelColor,
                  opacity,
                  transform,
                  transition: animate !== "none" ? "none" : undefined,
                }}
              />
            );
          }
        }
      }

      // Move to the next character (with 1 space between characters)
      offsetX += charWidth + 1;
      maxHeight = Math.max(maxHeight, pixelPattern.length);
    }

    return { pixels, offsetX, maxHeight };
  };

  const { pixels, offsetX, maxHeight } = renderPixels();

  return (
    <div
      className={`relative ${className}`}
      style={{
        height: `${maxHeight * cellSize.height * scale}px`,
        width: `${offsetX * cellSize.width * scale}px`,
      }}
    >
      {pixels}
    </div>
  );
}
