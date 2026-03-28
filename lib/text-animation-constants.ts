import type {
  FontFamily,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextSettings,
} from "./text-animation-types"

export const FONT_FAMILIES: { label: string; value: FontFamily }[] = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
]

export const FONT_WEIGHTS: { label: string; value: FontWeight }[] = [
  { label: "Light (300)", value: "300" },
  { label: "Regular (400)", value: "400" },
  { label: "Medium (500)", value: "500" },
  { label: "Semi-Bold (600)", value: "600" },
  { label: "Bold (700)", value: "700" },
  { label: "Extra-Bold (800)", value: "800" },
  { label: "Black (900)", value: "900" },
]

export const LETTER_SPACINGS: { label: string; value: LetterSpacing }[] = [
  { label: "Tightest (−0.05em)", value: "-0.05em" },
  { label: "Tighter (−0.04em)", value: "-0.04em" },
  { label: "Tight (−0.02em)", value: "-0.02em" },
  { label: "Normal", value: "0em" },
  { label: "Wide (0.05em)", value: "0.05em" },
  { label: "Wider (0.1em)", value: "0.1em" },
  { label: "Widest (0.2em)", value: "0.2em" },
]

export const LINE_HEIGHTS: { label: string; value: LineHeight }[] = [
  { label: "None (1)", value: "1" },
  { label: "Tight (1.2)", value: "1.2" },
  { label: "Snug (1.4)", value: "1.4" },
  { label: "Normal (1.6)", value: "1.6" },
  { label: "Loose (2)", value: "2" },
]

export const DEFAULT_CONTENT =
  "For I decided to know nothing among you except Jesus Christ and him crucified."

export const DEFAULT_SETTINGS: TextSettings = {
  fontFamily: "Inter, sans-serif",
  fontSize: 100,
  fontWeight: "900",
  letterSpacing: "-0.04em",
  lineHeight: "1",
  italic: false,
  uppercase: false,
  content: DEFAULT_CONTENT,
}
