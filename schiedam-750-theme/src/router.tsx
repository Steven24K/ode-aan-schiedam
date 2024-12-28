import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { PageLayout } from "./shared/PageLayout";
import { HomePage } from "./pages/HomePage";
import { StoryOverviewPage } from "./pages/StoryOverviewPage";
import { DisplayContentType } from "./components/DisplayContentType";

export type CustomRouteParams = {
    slug: string
    category: string
}

export const router = () =>
    createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<PageLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/odes/:category" element={<StoryOverviewPage />} />
                <Route path="/:slug/ode/" element={<DisplayContentType content_type="posts" />} />
                <Route path="/:slug/*" element={<DisplayContentType content_type="pages" />} />
            </Route>
        )
    )