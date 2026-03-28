export type FontFamily =
  | "Georgia"
  | "Courier New"
  | "Times New Roman"
  | "Garamond"
  | "Trebuchet MS"
  | "var(--font-abril-fatface)"
  | "var(--font-architects-daughter)"
  | "var(--font-bebas-neue)"
  | "var(--font-boogaloo)"
  | "var(--font-comfortaa)"
  | "var(--font-dm-sans)"
  | "var(--font-dm-serif-display)"
  | "var(--font-fredoka)"
  | "var(--font-inter)"
  | "var(--font-lora)"
  | "var(--font-montserrat)"
  | "var(--font-nunito)"
  | "var(--font-outfit)"
  | "var(--font-pacifico)"
  | "var(--font-playfair-display)"
  | "var(--font-plus-jakarta-sans)"
  | "var(--font-poppins)"
  | "var(--font-quicksand)"
  | "var(--font-righteous)"
  | "var(--font-space-mono)"
  | "var(--font-varela-round)"

export type FontWeight = "300" | "400" | "500" | "600" | "700" | "800" | "900"

export type LetterSpacing =
  | "-0.05em"
  | "-0.04em"
  | "-0.02em"
  | "0em"
  | "0.05em"
  | "0.1em"
  | "0.2em"

export type LineHeight = "1" | "1.2" | "1.4" | "1.6" | "2"

export interface TextSettings {
  fontFamily: FontFamily
  fontSize: number
  fontWeight: FontWeight
  letterSpacing: LetterSpacing
  lineHeight: LineHeight
  italic: boolean
  uppercase: boolean
  content: string
}
