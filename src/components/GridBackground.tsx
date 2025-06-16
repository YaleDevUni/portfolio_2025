"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { gridConfig } from "@/config/gridConfig";
import { traceConfig } from "@/config/traceConfig";

interface TraceCell {
  id: string;
  x: number;
  y: number;
  intensity: number;
  createdAt: number;
  duration: number;
}

export default function GridBackground() {
  const [mounted, setMounted] = useState(false);
  const [traceCells, setTraceCells] = useState<TraceCell[]>([]);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef({ x: -1, y: -1 });
  const { cellSize, hoverEffect, gridLines } = gridConfig;

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track mouse position and create trace
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPosition = { x: e.clientX, y: e.clientY };

      // If this is the first mouse move, just record the position
      if (lastMousePosition.current.x === -1) {
        lastMousePosition.current = currentPosition;
        return;
      }

      // Calculate positions to interpolate between
      const startX = lastMousePosition.current.x;
      const startY = lastMousePosition.current.y;
      const endX = currentPosition.x;
      const endY = currentPosition.y;

      // Calculate distance to determine how many interpolation steps we need
      const distance = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
      );
      const steps = Math.max(1, Math.ceil(distance / (cellSize.width * 0.5))); // Ensure smooth trail

      // Interpolate between start and end positions
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const interpX = startX + (endX - startX) * t;
        const interpY = startY + (endY - startY) * t;

        // Calculate which grid cell this interpolated position is in
        const centerCellX = Math.floor(interpX / cellSize.width);
        const centerCellY = Math.floor(interpY / cellSize.height);

        // Create trace cells in a radius around the center position
        const newTraceCells: TraceCell[] = [];
        const radius = traceConfig.radius;

        for (let y = centerCellY - radius; y <= centerCellY + radius; y++) {
          for (let x = centerCellX - radius; x <= centerCellX + radius; x++) {
            // Calculate distance from center cell (for intensity)
            const distance = Math.sqrt(
              Math.pow(x - centerCellX, 2) + Math.pow(y - centerCellY, 2)
            );

            if (distance <= radius) {
              const intensity =
                traceConfig.intensity * (1 - distance / (radius + 1));

              // Use a unique ID based on cell position to avoid duplicates
              const cellId = `${x}-${y}`;

              newTraceCells.push({
                id: `${Date.now()}-${i}-${cellId}`,
                x: x,
                y: y,
                intensity: intensity,
                createdAt: Date.now(),
                duration: traceConfig.duration,
              });
            }
          }
        }

        if (newTraceCells.length > 0) {
          setTraceCells((prev) => [...prev, ...newTraceCells]);
        }
      }

      // Update last position
      lastMousePosition.current = currentPosition;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mounted, cellSize.width, cellSize.height]);

  // Clean up expired trace cells
  useEffect(() => {
    if (!mounted) return;

    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTraceCells((prev) =>
        prev.filter((cell) => now - cell.createdAt < cell.duration)
      );
    }, 100);

    return () => {
      clearInterval(cleanupInterval);
    };
  }, [mounted]);

  // Render trace cells with fade-out effect
  const renderTraceCells = () => {
    const now = Date.now();

    return traceCells.map((cell) => {
      const age = now - cell.createdAt;
      const progress = age / cell.duration;

      // Calculate fade-out opacity (starts full, fades to 0)
      const fadeOpacity = Math.max(0, 1 - progress);

      return (
        <div
          key={`trace-${cell.id}`}
          className="absolute transition-opacity duration-100"
          style={{
            left: cell.x * cellSize.width,
            top: cell.y * cellSize.height,
            width: cellSize.width,
            height: cellSize.height,
            backgroundColor:
              theme === "dark"
                ? hoverEffect.darkModeColor(cell.intensity)
                : hoverEffect.lightModeColor(cell.intensity),
            opacity: hoverEffect.opacity * fadeOpacity * traceConfig.opacity,
          }}
        />
      );
    });
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none "
      ref={containerRef}
    >
      <div
        className="absolute inset-0 bg-repeat [transition:none] notransition"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize.width}px ${cellSize.height}px`,
          // Apply color based on theme
          ...({
            "--grid-color":
              theme === "dark"
                ? gridLines.darkModeColor
                : gridLines.lightModeColor,
          } as React.CSSProperties),
        }}
      />

      {/* Grid-aligned hover effect and trace cells */}
      <div className="absolute inset-0 overflow-hidden notransition">
        {/* {renderGridCells()} */}
        {renderTraceCells()}
      </div>
    </div>
  );
}
