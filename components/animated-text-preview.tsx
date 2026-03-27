import { AnimatedText } from "@/components/animated-text"
import type { TextSettings } from "@/lib/text-animation-types"

interface AnimatedTextPreviewProps {
  settings: TextSettings
}

export function AnimatedTextPreview({ settings }: AnimatedTextPreviewProps) {
  return (
    <p
      className="w-full transition-all duration-200 select-none"
      style={{
        fontFamily: settings.fontFamily,
        fontSize: `${settings.fontSize}px`,
        fontWeight: settings.fontWeight,
        letterSpacing: settings.letterSpacing,
        lineHeight: settings.lineHeight,
        fontStyle: settings.italic ? "italic" : "normal",
        textTransform: settings.uppercase ? "uppercase" : "none",
        color: "#18181b", // zinc-900 — AnimatedText inherits this and overrides per-letter on hover
      }}
    >
      <AnimatedText text={settings.content} />
    </p>
  )
}
