import { YouTubeVideoBlockProps } from "@/types/PageBlock";

export const YouTubeVideoBlock = (props: YouTubeVideoBlockProps) => {
    const { url } = props;
    const urlParts = url.split("?v=");
    const VideoId = urlParts[1] ? urlParts[1].split("&")[0] : urlParts[0].split("/").pop() || "";

    return (
        <div className="my-8 flex flex-col gap-4 rounded-lg bg-white p-1 shadow-md bg-yellow-500">
            <iframe
                className="aspect-video w-full"
                title="YouTube video player"
                src={`https://www.youtube.com/embed/${VideoId}`}
                width="560"
                height="auto"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}