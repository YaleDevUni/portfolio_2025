"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, LayoutGrid, Activity, Aperture } from "lucide-react";

export default function Menu() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-background border border-border rounded-full p-1 shadow-md">
      <button
        className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
        aria-label="Option A"
      >
        <LayoutGrid size={18} />
      </button>
      <button
        className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
        aria-label="Option B"
      >
        <Activity size={18} />
      </button>
      <button
        className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
        aria-label="Option C"
      >
        <Aperture size={18} />
      </button>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
