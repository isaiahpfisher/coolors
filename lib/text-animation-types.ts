export type FontFamily =
  | "Inter, sans-serif"
  | "Georgia, serif"
  | "'Courier New', monospace"
  | "'Times New Roman', serif"
  | "Garamond, serif"
  | "'Trebuchet MS', sans-serif"

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
