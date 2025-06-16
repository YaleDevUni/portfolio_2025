// Configuration for grid size and styling
// This file serves as a single source of truth for grid-related settings

export const gridConfig = {
  // Grid cell dimensions
  cellSize: {
    width: 7,
    height: 7,
  },

  // Hover effect settings
  hoverEffect: {
    radius: 1, // Number of cells to highlight in each direction
    darkModeColor: (intensity: number) =>
      `rgba(255, 255, 255, ${intensity * 0.8})`,
    lightModeColor: (intensity: number) => `rgba(0, 0, 0, ${intensity * 0.8})`,
    opacity: 0.9,
  },

  // Grid line styling
  gridLines: {
    darkModeColor: "rgba(75, 85, 99, 0.1)",
    lightModeColor: "rgba(229, 231, 235, 0.6)",
  },
};
