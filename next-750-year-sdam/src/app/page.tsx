"use client"
import { useState } from "react"
import { Splash } from "@/components/Splash"
import { Hero } from "@/components/Hero"
import { DisplayContent } from "@/components/DisplayContent"

type HomeState = {
  splash: boolean
}

export default function Home() {
  const [state, setState] = useState<HomeState>({ splash: true })

  if (state.splash) {
    return <Splash unSplash={() => setState(s => ({ ...s, splash: false }))} />
  }

  return <div>
    <Hero title={'750 jaar Schiedam in Odes'} />
    <DisplayContent />
  </div>
}
