import {
  Abril_Fatface,
  Architects_Daughter,
  Bebas_Neue,
  Boogaloo,
  Comfortaa,
  DM_Sans,
  DM_Serif_Display,
  Fredoka,
  Inter,
  Lora,
  Montserrat,
  Nunito,
  Outfit,
  Pacifico,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Poppins,
  Quicksand,
  Righteous,
  Space_Mono,
  Varela_Round,
} from "next/font/google"

export const abrilFatface = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-abril-fatface",
})
export const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-architects-daughter",
})
export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
})
export const boogaloo = Boogaloo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-boogaloo",
})
export const comfortaa = Comfortaa({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-comfortaa",
})
export const dmSans = DM_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
})
export const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
})
export const fredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fredoka",
})
export const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
})
export const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lora",
})
export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
})
export const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
})
export const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
})
export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
})
export const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
})
export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
})
export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
})
export const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
})
export const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
})
export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})
export const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-varela-round",
})

export const ALL_FONT_VARIABLES = [
  abrilFatface,
  architectsDaughter,
  bebasNeue,
  boogaloo,
  comfortaa,
  dmSans,
  dmSerifDisplay,
  fredoka,
  inter,
  lora,
  montserrat,
  nunito,
  outfit,
  pacifico,
  playfairDisplay,
  plusJakartaSans,
  poppins,
  quicksand,
  righteous,
  spaceMono,
  varelaRound,
]
  .map((f) => f.variable)
  .join(" ")
