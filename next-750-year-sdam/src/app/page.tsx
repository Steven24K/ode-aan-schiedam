"use client"
import { useState } from "react"
import { Splash } from "@/components/Splash"
import { Hero } from "@/components/Hero"
import { DisplayContent } from "@/components/DisplayContent"
import { Grid, GridItem } from "@/components/Grid"

type HomeState = {
  splash: boolean
}

export default function Home() {
  const [state, setState] = useState<HomeState>({ splash: true })

  if (state.splash) {
    return <Splash unSplash={() => setState(s => ({ ...s, splash: false }))} />
  }

  const categories: GridItem[] = [
    { id: 1, title: "Poëzie", color: "black", slug: "/odes/poezie/" },
    { id: 2, title: "Uit de stad", color: "royal-purple", slug: "/odes/uit-de-stad/" },
    { id: 3, title: "Liefde", color: "fiery-red", slug: "/liefde/odes/" },
    { id: 4, title: "Gedachtenspinsels", color: "sky-blue", slug: "/odes/gedachtenspinsels/" }
  ];

  return <main>
    <Hero title={'750 jaar Schiedam in Odes'} />
    <DisplayContent>
      <h1 className="text-4xl">Schiedam viert de toekomst</h1>
      <p>
        Schiedam viert in 2025 haar 750-jarig bestaan. Dat is een feest voor iedereen. Inwoners, ondernemers, verenigingen, scholen en instellingen.
        Samen maken we er een onvergetelijk feest van. Een feest dat Schiedam op de kaart zet. Een feest dat Schiedam verbindt.
      </p>
    </DisplayContent>

    <div className="page-content container mx-auto my-2 p-5">
      <h1 className="text-4xl my-4 px-4">Thema's</h1>
      
      <Grid items={categories} />
    </div>

  </main>
}
