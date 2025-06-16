"use client";

import React, { useState, useEffect } from "react";
import PixelText from "./PixelText";
import { gridConfig } from "@/config/gridConfig";

type AnimationType = "none" | "pulse" | "blink" | "wave";

export default function PixelTextDemo() {
  const [text, setText] = useState("TYPE SOMETHING");
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("");
  const [animation, setAnimation] = useState<AnimationType>("none");
  const [mounted, setMounted] = useState(false);
  const { cellSize } = gridConfig;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full mt-8">
      <h3 className="text-xl font-bold mb-4">Try it yourself:</h3>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label htmlFor="pixelText" className="block mb-2 text-sm font-medium">
            Enter text:
          </label>
          <input
            type="text"
            id="pixelText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
            maxLength={30}
            placeholder="Type something..."
          />
        </div>

        <div>
          <label
            htmlFor="pixelScale"
            className="block mb-2 text-sm font-medium"
          >
            Scale: {scale.toFixed(1)} ({(scale * cellSize.width).toFixed(1)}x
            {(scale * cellSize.height).toFixed(1)} pixels)
          </label>
          <input
            type="range"
            id="pixelScale"
            min="0.5"
            max="3"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="pixelColor"
            className="block mb-2 text-sm font-medium"
          >
            Color:
          </label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setColor("")}
              className={`px-3 py-1 rounded-md ${
                !color
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setColor("rgba(255, 100, 100, 0.8)")}
              className={`px-3 py-1 rounded-md ${
                color === "rgba(255, 100, 100, 0.8)"
                  ? "bg-red-500 text-white"
                  : "bg-red-200"
              }`}
            >
              Red
            </button>
            <button
              onClick={() => setColor("rgba(100, 200, 100, 0.8)")}
              className={`px-3 py-1 rounded-md ${
                color === "rgba(100, 200, 100, 0.8)"
                  ? "bg-green-500 text-white"
                  : "bg-green-200"
              }`}
            >
              Green
            </button>
            <button
              onClick={() => setColor("rgba(100, 100, 255, 0.8)")}
              className={`px-3 py-1 rounded-md ${
                color === "rgba(100, 100, 255, 0.8)"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-200"
              }`}
            >
              Blue
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="pixelAnimation"
            className="block mb-2 text-sm font-medium"
          >
            Animation:
          </label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setAnimation("none")}
              className={`px-3 py-1 rounded-md ${
                animation === "none"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              None
            </button>
            <button
              onClick={() => setAnimation("pulse")}
              className={`px-3 py-1 rounded-md ${
                animation === "pulse"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Pulse
            </button>
            <button
              onClick={() => setAnimation("blink")}
              className={`px-3 py-1 rounded-md ${
                animation === "blink"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Blink
            </button>
            <button
              onClick={() => setAnimation("wave")}
              className={`px-3 py-1 rounded-md ${
                animation === "wave"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Wave
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg min-h-[200px] relative overflow-hidden">
        <div className="absolute top-10 left-10">
          <PixelText
            text={text || "TYPE SOMETHING"}
            scale={scale}
            color={color}
            animate={animation}
          />
        </div>
      </div>
    </div>
  );
}
