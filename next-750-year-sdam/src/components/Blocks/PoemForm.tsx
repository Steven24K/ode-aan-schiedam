"use client"
import { PoemFormBlockProps } from "@/types/PageBlock"
import { FormBuilder } from "../FormBuilder"
import { StrapiPoemBody } from "@/types/StrapiPoem"
import { PostCategory } from "@/types/PostCategory"
import React from "react"
import { StrapiCMSService } from "@/services/StrapiCMSService"

type PoemFormState = {
    categories: PostCategory[] | 'loading'
    formData: StrapiPoemBody | 'submitted'
    error?: string
}

const zeroPoemFormState = (): PoemFormState => ({
    categories: 'loading',
    formData: {
        Title: '',
        slug: '',
        Author: '',
        category: {
            connect: [""]
        },
        Content: ''
    }
})

const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

export const PoemFormBlock = (props: PoemFormBlockProps) => {
    const { Description, Title } = props
    const [state, setState] = React.useState<PoemFormState>(zeroPoemFormState)

    React.useEffect(() => {
        if (state.formData != 'submitted')
            setState({ ...state, formData: { ...state.formData, slug: slugify(state.formData.Title) } })
    }, [state.formData != 'submitted' ? state.formData.Title : false])

    const strapi = new StrapiCMSService()
    if (state.categories == 'loading') {
        strapi.GetCategories().then(res => setState({ ...state, categories: res.data }))
    }

    if (state.formData != 'submitted') {
        return <>
            <FormBuilder<StrapiPoemBody>
                defaultObject={state.formData}
                fields={[
                    { kind: 'text', label: "Naam", name: 'Author', weight: 0, required: true },
                    { kind: 'textarea', label: "Gedicht/verhaal", name: 'Content', weight: 1, required: true },
                    { kind: 'text', label: "Titel", name: 'Title', weight: 2, required: true },
                    {
                        kind: 'dropdown',
                        label: "Categorie",
                        name: 'category',
                        weight: 3,
                        required: true,
                        options: state.categories != 'loading' ? state.categories.map(cat => ({ name: cat.Title, value: cat.documentId })) : []
                    },
                ]}
                handleChange={(key, value) => {
                    if (state.formData != 'submitted')
                        setState({ ...state, formData: { ...state.formData, [key]: value } })
                }}
                handleSubmit={() => {
                    if (state.formData != 'submitted')
                        strapi.CreatePoem({ data: state.formData })
                            .then(res => {
                                if (res.kind == 'left') {
                                    setState({ ...state, formData: 'submitted' })
                                } else {
                                    setState({ ...state, error: res.v })
                                }
                            })
                }}
                formTitle={Title}
            />
            {state.error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {state.error}
            </div>}
        </>
    }


    return <div className="bg-gray-100 rounded p-10 my-5 text-2xl">
        <p>
            {Description}
        </p>
        <button className="bg-blue-400 hover:bg-blue-800 text-white px-8 py-4 my-5"
            onClick={() => setState(zeroPoemFormState)}
        >
            Stuur nog een ode in
        </button>
    </div>

}