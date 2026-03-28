import type {
  FontFamily,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextSettings,
} from "./text-animation-types"

export const FONT_FAMILIES: { label: string; value: FontFamily }[] = [
  { label: "Inter (Google)", value: "var(--font-inter)" },
  { label: "Abril Fatface", value: "var(--font-abril-fatface)" },
  { label: "Architects Daughter", value: "var(--font-architects-daughter)" },
  { label: "Bebas Neue", value: "var(--font-bebas-neue)" },
  { label: "Boogaloo", value: "var(--font-boogaloo)" },
  { label: "Comfortaa", value: "var(--font-comfortaa)" },
  { label: "DM Sans", value: "var(--font-dm-sans)" },
  { label: "DM Serif Display", value: "var(--font-dm-serif-display)" },
  { label: "Fredoka One", value: "var(--font-fredoka-one)" },
  { label: "Lora", value: "var(--font-lora)" },
  { label: "Montserrat", value: "var(--font-montserrat)" },
  { label: "Nunito", value: "var(--font-nunito)" },
  { label: "Outfit", value: "var(--font-outfit)" },
  { label: "Pacifico", value: "var(--font-pacifico)" },
  { label: "Playfair Display", value: "var(--font-playfair-display)" },
  { label: "Plus Jakarta Sans", value: "var(--font-plus-jakarta-sans)" },
  { label: "Poppins", value: "var(--font-poppins)" },
  { label: "Quicksand", value: "var(--font-quicksand)" },
  { label: "Righteous", value: "var(--font-righteous)" },
  { label: "Space Mono", value: "var(--font-space-mono)" },
  { label: "Varela Round", value: "var(--font-varela-round)" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Georgia", value: "Georgia" },
  { label: "Courier New", value: "Courier New" },
  { label: "Garamond", value: "Garamond" },
  { label: "Trebuchet MS", value: "Trebuchet MS" },
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
  fontFamily: "var(--font-inter)",
  fontSize: 100,
  fontWeight: "900",
  letterSpacing: "-0.04em",
  lineHeight: "1",
  italic: false,
  uppercase: false,
  content: DEFAULT_CONTENT,
}
