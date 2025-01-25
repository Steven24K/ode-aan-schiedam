import { StrapiCMSService } from "@/services/StrapiCMSService"
import { redirect } from "next/navigation"

export default async function RandomPoem() {
    const strapi = new StrapiCMSService()
    const poems = await strapi.GetAllPoems().then(res => res.data)

    const randomPoem = poems[Math.floor(Math.random() * poems.length)]

    return redirect(`ode/${randomPoem.slug}`)
}