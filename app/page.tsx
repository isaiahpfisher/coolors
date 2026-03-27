"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ControlRow } from "@/components/control-row"
import { AnimatedTextPreview } from "@/components/animated-text-preview"
import {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  LETTER_SPACINGS,
  LINE_HEIGHTS,
  DEFAULT_SETTINGS,
} from "@/lib/text-animation-constants"
import type {
  FontFamily,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextSettings,
} from "@/lib/text-animation-types"

// --- Main component ---

export default function TextAnimationPlayground() {
  const [settings, setSettings] = useState<TextSettings>(DEFAULT_SETTINGS)

  function update<K extends keyof TextSettings>(
    key: K,
    value: TextSettings[K]
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-stone-50 font-sans text-zinc-900">
      {/* ── Preview canvas ──────────────────────────────────────── */}
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-12">
        {/* Subtle dot grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.20]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #71717a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Corner label */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-zinc-300 text-[10px] tracking-widest text-zinc-400 uppercase"
          >
            Preview
          </Badge>
        </div>

        {/* The text preview */}
        <div className="relative z-10 w-full">
          <AnimatedTextPreview settings={settings} />
        </div>

        {/* Font size readout */}
        <div className="absolute right-6 bottom-6 text-[10px] tracking-widest text-zinc-400 uppercase tabular-nums">
          {settings.fontSize}px · {settings.fontWeight} ·{" "}
          {FONT_FAMILIES.find((f) => f.value === settings.fontFamily)?.label}
        </div>
      </main>

      {/* ── Controls panel ──────────────────────────────────────── */}
      <aside className="flex w-72 shrink-0 flex-col overflow-y-auto border-l border-zinc-200 bg-white shadow-[-8px_0_24px_-8px_rgba(0,0,0,0.06)]">
        {/* Panel header */}
        <div className="border-b border-zinc-200 px-5 py-4">
          <h1 className="text-sm font-semibold tracking-widest text-zinc-700 uppercase">
            Type Controls
          </h1>
          <p className="mt-0.5 text-[11px] text-zinc-400">
            Adjust the typographic properties below.
          </p>
        </div>

        <div className="flex flex-col gap-6 px-5 py-6">
          {/* Font family */}
          <ControlRow label="Font Family">
            <Select
              value={settings.fontFamily}
              onValueChange={(v) => update("fontFamily", v as FontFamily)}
            >
              <SelectTrigger className="h-8 border-zinc-200 bg-white text-sm text-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-200 bg-white text-zinc-800">
                <SelectGroup>
                  <SelectLabel>FONT FAMILY</SelectLabel>
                  {FONT_FAMILIES.map((f) => (
                    <SelectItem
                      key={f.value}
                      value={f.value}
                      className="text-sm"
                    >
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </ControlRow>

          {/* Font size */}
          <ControlRow label={`Font Size — ${settings.fontSize}px`}>
            <Slider
              min={12}
              max={120}
              step={1}
              value={[settings.fontSize]}
              onValueChange={(v) =>
                update("fontSize", Array.isArray(v) ? v[0] : v)
              }
              className="[&_.bg-primary]:bg-blue-500 **:[[role=slider]]:border-blue-500 **:[[role=slider]]:bg-blue-500"
            />
          </ControlRow>

          {/* Font weight */}
          <ControlRow label="Font Weight">
            <Select
              value={settings.fontWeight}
              onValueChange={(v) => update("fontWeight", v as FontWeight)}
            >
              <SelectTrigger className="h-8 border-zinc-200 bg-white text-sm text-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-200 bg-white text-zinc-800">
                <SelectGroup>
                  <SelectLabel>FONT WEIGHT</SelectLabel>
                  {FONT_WEIGHTS.map((f) => (
                    <SelectItem
                      key={f.value}
                      value={f.value}
                      className="text-sm"
                    >
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </ControlRow>

          <Separator className="bg-zinc-100" />

          {/* Letter spacing */}
          <ControlRow label="Letter Spacing">
            <Select
              value={settings.letterSpacing}
              onValueChange={(v) => update("letterSpacing", v as LetterSpacing)}
            >
              <SelectTrigger className="h-8 border-zinc-200 bg-white text-sm text-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-200 bg-white text-zinc-800">
                <SelectGroup>
                  <SelectLabel>LETTER SPACING</SelectLabel>
                  {LETTER_SPACINGS.map((f) => (
                    <SelectItem
                      key={f.value}
                      value={f.value}
                      className="text-sm"
                    >
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </ControlRow>

          {/* Line height */}
          <ControlRow label="Line Height">
            <Select
              value={settings.lineHeight}
              onValueChange={(v) => update("lineHeight", v as LineHeight)}
            >
              <SelectTrigger className="h-8 border-zinc-200 bg-white text-sm text-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-200 bg-white text-zinc-800">
                <SelectGroup>
                  <SelectLabel>LINE HEIGHT</SelectLabel>
                  {LINE_HEIGHTS.map((f) => (
                    <SelectItem
                      key={f.value}
                      value={f.value}
                      className="text-sm"
                    >
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </ControlRow>

          <Separator className="bg-zinc-100" />

          {/* Toggles */}
          <ControlRow label="Style Toggles">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-700">Italic</span>
                <Switch
                  checked={settings.italic}
                  onCheckedChange={(v) => update("italic", v)}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-700">Uppercase</span>
                <Switch
                  checked={settings.uppercase}
                  onCheckedChange={(v) => update("uppercase", v)}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>
            </div>
          </ControlRow>

          <Separator className="bg-zinc-100" />

          {/* Editable content */}
          <ControlRow label="Preview Text">
            <Textarea
              value={settings.content}
              onChange={(e) => update("content", e.target.value)}
              rows={4}
              className="resize-none border-zinc-200 bg-white text-sm text-zinc-800 focus-visible:ring-blue-400/50"
              placeholder="Enter preview text…"
            />
          </ControlRow>
        </div>
      </aside>
    </div>
  )
}
