import { StrapiPoem } from "@/types/StrapiPoem";
import Link from "next/link";
import { FC } from "react";

interface PoemSliderProps {
    poems: StrapiPoem[]
}

export const PoemSliderLayout: FC<PoemSliderProps> = props => <div className="w-full py-12 bg-stone-50">
    <div className="max-w-6xl mx-auto px-4">
        {/* Scroll Container */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {props.poems.map((poem) => (
                <Link
                    key={poem.id}
                    href={poem.slug}
                    className="text-sm font-medium uppercase tracking-widest text-stone-500 
                           hover:text-stone-800 border-b border-stone-300 hover:border-black-800 
                           transition duration-200"
                >
                    <div className="flex-shrink-0 w-64 h-40 bg-white border-4 border-black shadow-sm flex flex-col items-center justify-center p-6 rounded-sm">
                        <h3 className="text-xl font-serif text-stone-900 text-center mb-4 leading-tight underline underline-offset-4 break-words">
                            {poem.Title}
                        </h3>
                        {poem.Author && poem.Author !== "" && <span className="text-sm">{poem.Author}</span>}
                    </div>
                </Link>
            ))}
        </div>
    </div>
</div>