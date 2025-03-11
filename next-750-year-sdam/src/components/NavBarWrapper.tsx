import { StrapiCMSService } from "@/services/StrapiCMSService";
import { NavBarContent } from "./NavBar";

export function NavBar() {
    const strapi = new StrapiCMSService()
    const menu = strapi.GetMainMenu().then(res => res.kind == 'ok' ? res.data.Item : [])

    return <NavBarContent items={menu} />
}