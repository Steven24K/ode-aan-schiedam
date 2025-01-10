import { StrapiCMSService } from "@/services/StrapiCMSService";
import { NavBar } from "./NavBar";

export function NavBarWrapper() {
    const strapi = new StrapiCMSService()
    const menu = strapi.GetMainMenu().then(res => res.data.Item)

    return <nav>
        <NavBar items={menu}/>
    </nav>
}