"use client"

import { useMemo, useState, CSSProperties } from "react"
import { motion } from "framer-motion"

// ---------------------------------------------------------------------------
// Seeded deterministic pseudo-random — used for per-letter bounce shape
// ---------------------------------------------------------------------------
function seeded(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function sr(index: number, offset: number): number {
  return seeded(index * 37 + offset)
}

// ---------------------------------------------------------------------------
// Color — fully random vibrant hue each call, so re-hovering the same
// letter always surprises you with a different color.
// ---------------------------------------------------------------------------
function randomColor(): string {
  const hue = Math.random() * 360
  const sat = 80 + Math.random() * 15 // 80 – 95 %
  const lit = 45 + Math.random() * 10 // 45 – 55 %
  return `hsl(${hue.toFixed(1)}, ${sat.toFixed(1)}%, ${lit.toFixed(1)}%)`
}

// ---------------------------------------------------------------------------
// Per-letter bounce parameters — each letter gets a slightly different
// lift height and spring feel so they never look in lockstep.
// ---------------------------------------------------------------------------
function letterBounce(index: number) {
  return {
    x: -(14 + sr(index, 5) * 6), // −14 to −20 px sideways
    rotate: (sr(index, 7) - 0.5) * 12, // −6° to +6°
    stiffness: 200 + sr(index, 8) * 100, // spring stiffness (lower for longer oscillation)
    damping: 8 + sr(index, 9) * 4, // spring damping (lower for more bounces)
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface AnimatedTextProps {
  text: string
  style?: CSSProperties
  className?: string
}

export function AnimatedText({ text, style, className }: AnimatedTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  // Stores the current color for each letter index — updated on every hoverStart
  // so re-hovering the same letter always picks a fresh random color.
  const [colorMap, setColorMap] = useState<Record<number, string>>({})

  function handleHoverStart(i: number) {
    setHoveredIndex(i)
    setColorMap((prev) => ({ ...prev, [i]: randomColor() }))

    setTimeout(() => {
      setHoveredIndex(null)
    }, 2000)
  }

  const words = useMemo(
    () =>
      text
        .split(" ")
        .flatMap((w) => [w, " "])
        .slice(0, -1),
    [text]
  )

  return (
    <span
      className={className}
      style={{ ...style, display: "inline", cursor: "default" }}
    >
      {words.map((word, wordIndex) => {
        const letters = word.split("").map((char, i) => ({
          char,
          i: wordIndex * 1000 + i,
          bounce: letterBounce(i),
        }))

        return (
          <span key={wordIndex} className="whitespace-nowrap">
            {letters.map(({ char, i, bounce }) => {
              const isSpace = char === " "
              const active = !isSpace && hoveredIndex === i
              // Fall back to a placeholder color on first render (before any hover).
              // Framer needs a real color value on both ends to tween correctly.
              const color = colorMap[i] ?? "#18181b"

              if (isSpace) {
                return (
                  <span
                    key={i}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                  >
                    {char}
                  </span>
                )
              }

              return (
                <motion.span
                  key={i}
                  onMouseEnter={() => handleHoverStart(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={
                    active
                      ? {
                          x: bounce.x,
                          rotate: bounce.rotate,
                          color,
                        }
                      : { x: 0, rotate: 0, color: "#18181b" }
                  }
                  transition={{
                    type: "spring",
                    stiffness: bounce.stiffness,
                    damping: bounce.damping,
                    mass: 0.2,
                    // Color uses its own tween: snap to color quickly, fade back slowly
                    color: {
                      type: "tween",
                      duration: active ? 0.1 : 2,
                      delay: active ? 0 : 0.8, // Hold for 0.8s before fading back
                      ease: "easeOut",
                    },
                  }}
                  style={{
                    display: "inline-block",
                    originY: 1,
                    color: "inherit",
                  }}
                >
                  {char}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}
