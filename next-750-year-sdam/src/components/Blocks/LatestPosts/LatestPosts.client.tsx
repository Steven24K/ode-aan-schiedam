"use client"

import { StrapiPost } from "@/types/StrapiPost"
import Link from "next/link"

type LatestPostsState = {

}

type LatestPostsProps = {
    items: StrapiPost[]
}
export const LatestPostsLayout: React.FC<LatestPostsProps> = (props) => {
  return (
    <ul className="flex flex-col gap-4 w-full max-w mx-auto p-4">
      {props.items.map((item) => (
        <li key={item.id} className="group">
          <Link 
            href={`/post/${item.slug}`}
            className="flex items-center justify-between p-5 bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            <span className="text-lg font-bold text-gray-900 pr-4">
              {item.Title}
            </span>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-black transition-colors">
                Lees meer
              </span>
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};