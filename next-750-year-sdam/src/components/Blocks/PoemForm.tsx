"use client"
import { PoemFormBlockProps } from "@/types/PageBlock"
import { FormBuilder } from "../FormBuilder"
import { StrapiPoem } from "@/types/StrapiPoem"

export const PoemFormBlock = (props: PoemFormBlockProps) => {
    const { Description, Title } = props
    return <section className="poem-form">
        {Title && <h1>{Title}</h1>}
        {Description && <p>{Description}</p>}

        <FormBuilder<StrapiPoem>
            defaultObject={{
                id: -1,
                Author: "",
                Content: "",
                Title: "",
                category: { Color: 'fiery-red', Description: "", id: 1, slug: "", Title: "" },
                slug: "",
            }}
            fields={[
                { kind: 'text', label: "Naam", name: 'Author', weight: 0, required: true },
                { kind: 'textarea', label: "Gedicht/verhaal", name: 'Content', weight: 1, required: true },
                { kind: 'text', label: "Titel", name: 'Title', weight: 2, required: true },
                { kind: 'dropdown', label: "Categorie", name: 'category', weight: 3, required: true, options: [
                    {name: 'Poëzie', value: "poezie"},
                    {name: 'Poëzie', value: "poezie"},
                    {name: 'Verhaal', value: "verhaal"},
                    {name: 'Essay', value: "essay"},
                    {name: 'Liedtekst', value: "liedtekst"},
                    {name: 'Haiku', value: "haiku"},
                    {name: 'Sonnet', value: "sonnet"},
                    {name: 'Limerick', value: "limerick"},
                ] },
            ]}
            handleChange={(key, value) => { }}
            handleSubmit={() => { }}
            formTitle={Title}
            submitText={Description}
        />
    </section>
}