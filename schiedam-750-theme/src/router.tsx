import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { PageLayout } from "./shared/PageLayout";
import { HomePage } from "./pages/HomePage";
import { SiteInfo } from "./types/SiteInfo";
import { StoryOverviewPage } from "./pages/StoryOverviewPage";
import { WordPressPost } from "./pages/WordPressPost";
import { WordPressPage } from "./pages/WordPressPage";


export const router = (siteInfo: SiteInfo) =>
    createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<PageLayout />}>
                <Route path="/" element={<HomePage siteInfo={siteInfo} />} />
                <Route path="/odes/:category" element={<StoryOverviewPage />} />
                <Route path="/ode/:slug" element={<WordPressPost />} />
                <Route path="/:slug*" element={<WordPressPage />} />
            </Route>
        )
    )