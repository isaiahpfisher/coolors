import React from "react"
import { Label } from "@/components/ui/label"

interface ControlRowProps {
  label: string
  children: React.ReactNode
}

export function ControlRow({ label, children }: ControlRowProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
        {label}
      </Label>
      {children}
    </div>
  )
}
