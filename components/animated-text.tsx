"use client"

import { useMemo, useState, useRef, CSSProperties } from "react"
import { motion } from "framer-motion"

// ---------------------------------------------------------------------------
// Palette — vibrant, playful colors drawn from the reference image
// ---------------------------------------------------------------------------
const PALETTE = [
  "#F87213", // orange
  "#F59E0C", // amber
  "#EAB305", // gold
  "#84CC11", // lime
  "#0EBA81", // emerald
  "#12B9A5", // teal
  "#06B6D5", // cyan
  "#0FA4E9", // sky blue
  "#3777E2", // royal blue
  "#3C80F7", // bright blue
  "#6366F2", // indigo
  "#8C5CF9", // violet
  "#A954FA", // purple
  "#DA46EF", // fuchsia
  "#ED4799", // pink
  "#F43F5E", // rose
  "#F04243", // coral red
]

// ---------------------------------------------------------------------------
// Per-character motion profile
// Tall/narrow chars pivot at the bottom and rotate a lot but barely slide.
// Wide/round chars slide a lot and barely rotate.
// ---------------------------------------------------------------------------
const NARROW_CHARS = new Set([..."!|iltIfj1:;"])
const WIDE_CHARS = new Set([..."oOsSmMwWuUncCeE0dbpqg"])

interface Profile {
  xAmp: number
  rotAmp: number
  originY: number
}

function getProfile(char: string): Profile {
  if (NARROW_CHARS.has(char)) return { xAmp: 4, rotAmp: 6, originY: 1 }
  if (WIDE_CHARS.has(char)) return { xAmp: 12, rotAmp: 3, originY: 0.5 }
  return { xAmp: 10, rotAmp: 4, originY: 0.5 }
}

// ---------------------------------------------------------------------------
// Keyframe builder — decaying oscillation (fast → slow, smooth)
// ---------------------------------------------------------------------------
interface Keyframes {
  x: number[]
  rotate: number[]
  times: number[]
}

function buildKeyframes(xAmp: number, rotAmp: number): Keyframes {
  //          0     1      2      3      4      5      6      7     8
  const decay = [0, 1, 0.72, 0.52, 0.36, 0.24, 0.15, 0.07, 0]
  const signs = [0, 1, -1, 1, -1, 1, -1, 1, 0]
  const times = [0, 0.08, 0.2, 0.35, 0.5, 0.63, 0.76, 0.88, 1.0]

  return {
    x: signs.map((s, i) => s * xAmp * decay[i]),
    rotate: signs.map((s, i) => s * rotAmp * decay[i]),
    times,
  }
}

// ---------------------------------------------------------------------------
// Per-letter state
// ---------------------------------------------------------------------------
interface LetterState {
  shakeVersion: number // increment to replay keyframe animation
  isShaking: boolean
  color: string | null // null = black / resting
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
  const [states, setStates] = useState<Record<number, LetterState>>({})

  // Mirror state in a ref so callbacks always see fresh values
  const statesRef = useRef<Record<number, LetterState>>({})

  // Color tracking
  const paletteIndexRef = useRef(Math.floor(Math.random() * PALETTE.length))
  const activeColorCountRef = useRef(0)
  const colorTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({})

  // Tracks the last letter index triggered via pointer move, so we don't
  // re-fire the same letter while the cursor lingers inside it.
  const lastTriggeredIdxRef = useRef<number | null>(null)

  function pickNextColor(): string {
    if (activeColorCountRef.current === 0) {
      // Re-randomize when all letters are dark so every fresh run feels new
      paletteIndexRef.current = Math.floor(Math.random() * PALETTE.length)
    }
    paletteIndexRef.current = (paletteIndexRef.current + 1) % PALETTE.length
    return PALETTE[paletteIndexRef.current]
  }

  function commit(next: Record<number, LetterState>) {
    statesRef.current = next
    setStates({ ...next })
  }

  function handleMouseEnter(idx: number) {
    const cur: LetterState = statesRef.current[idx] ?? {
      shakeVersion: 0,
      isShaking: false,
      color: null,
    }

    const wasColored = cur.color !== null
    const isResting = !cur.isShaking && !wasColored
    const newColor = pickNextColor()

    // Track active color count
    if (!wasColored) activeColorCountRef.current++

    const next: LetterState = {
      shakeVersion: isResting ? cur.shakeVersion + 1 : cur.shakeVersion,
      isShaking: isResting ? true : cur.isShaking,
      color: newColor,
    }

    commit({ ...statesRef.current, [idx]: next })

    // Reset color hold timer — always 3s from now
    clearTimeout(colorTimers.current[idx])
    colorTimers.current[idx] = setTimeout(() => {
      activeColorCountRef.current = Math.max(0, activeColorCountRef.current - 1)
      const updated = {
        ...statesRef.current,
        [idx]: { ...statesRef.current[idx], color: null },
      }
      commit(updated)
    }, 3000)

    // Clear shake flag after 2s — only if we just started the shake
    if (isResting) {
      setTimeout(() => {
        const updated = {
          ...statesRef.current,
          [idx]: { ...statesRef.current[idx], isShaking: false },
        }
        commit(updated)
      }, 2000)
    }
  }

  // Fired on the container so we never miss a letter, even at high cursor speed.
  // elementFromPoint finds what's actually under the cursor; closest() walks up
  // to the nearest letter span; data-letter-idx maps it back to our state.
  function handleMouseMove(e: React.MouseEvent) {
    const el = document.elementFromPoint(e.clientX, e.clientY)
    const letterEl = (el as Element)?.closest(
      "[data-letter-idx]"
    ) as HTMLElement | null
    if (!letterEl) return
    const idx = parseInt(letterEl.dataset.letterIdx ?? "", 10)
    if (isNaN(idx)) return
    if (idx === lastTriggeredIdxRef.current) return // still on same letter
    lastTriggeredIdxRef.current = idx
    handleMouseEnter(idx)
  }

  function handleMouseLeaveContainer() {
    lastTriggeredIdxRef.current = null
  }

  // ---------------------------------------------------------------------------
  // Build word / letter structure with globally-unique indices
  // ---------------------------------------------------------------------------
  const segments = useMemo(() => {
    // Split into words and spaces, preserving spaces as their own segment
    const words = text.split(" ")
    const result: Array<{ word: string; startIdx: number }> = []
    let idx = 0
    words.forEach((word, wi) => {
      result.push({ word, startIdx: idx })
      idx += word.length
      if (wi < words.length - 1) idx++ // account for space character
    })
    return result
  }, [text])

  return (
    <span
      className={className}
      style={{ ...style, display: "inline", cursor: "default" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveContainer}
    >
      {segments.map(({ word, startIdx }, wordIndex) => (
        <span key={wordIndex} className="whitespace-nowrap">
          {word.split("").map((char, charPos) => {
            const idx = startIdx + charPos
            const state: LetterState = states[idx] ?? {
              shakeVersion: 0,
              isShaking: false,
              color: null,
            }
            const profile = getProfile(char)
            const kf = buildKeyframes(profile.xAmp, profile.rotAmp)
            const currentColor = state.color ?? "#18181b"

            return (
              // Outer span: owns color animation only.
              // data-letter-idx lets handleMouseMove identify this element.
              <motion.span
                key={idx}
                data-letter-idx={idx}
                animate={{ color: currentColor }}
                transition={{
                  color: {
                    type: "tween",
                    duration: state.color ? 0.1 : 0.3,
                    ease: "easeOut",
                  },
                }}
                style={{ display: "inline-block" }}
              >
                {/* Inner span: owns shake animation, re-keyed to replay cleanly */}
                <motion.span
                  key={state.shakeVersion}
                  animate={{ x: kf.x, rotate: kf.rotate }}
                  transition={{
                    duration: 1.5,
                    times: kf.times,
                    ease: "easeOut",
                  }}
                  style={{
                    display: "inline-block",
                    transformOrigin:
                      profile.originY === 1 ? "bottom center" : "center center",
                  }}
                >
                  {char}
                </motion.span>
              </motion.span>
            )
          })}

          {/* Space between words (no animation) */}
          {wordIndex < segments.length - 1 && (
            <span style={{ display: "inline-block", whiteSpace: "pre" }}>
              {" "}
            </span>
          )}
        </span>
      ))}
    </span>
  )
}
