"use client"
import { FormBlockProps, StrapiFormField } from "@/types/PageBlock"
import { FormBuilder, FormField } from "../FormBuilder"

export const FormBlock = (props: FormBlockProps) => {
    const { Fields, SubmissionText, Title, submit_url } = props.form
    return <>
        <FormBuilder<object>
            formTitle={Title}
            defaultObject={fieldsToDefaultObject(Fields)}
            fields={Fields.map(mapStrapiFieldsfield)}
            handleChange={(key, value) => { }}
            handleSubmit={() => { }}
        />
    </>
}

const fieldsToDefaultObject = (fields: StrapiFormField[]): object =>
    fields.reduce((xs, x) => ({ ...xs, [x.name]: fieldToDefaultValue(x) }), {})

const fieldToDefaultValue = (field: StrapiFormField): string | number | boolean => {
    if (field.__component == 'form-fields.checkbox') return false
    // (field.__component == 'form-fields.number') return 0
    return ""
}

function mapStrapiFieldsfield<T>(field: StrapiFormField, index: number): FormField<T> {
    switch (field.__component) {
        case 'form-fields.text':
            return ({ kind: 'text', label: field.label, name: field.name, weight: index, required: field.required }) as FormField<T>
        case 'form-fields.checkbox':
            return ({ kind: 'checkbox', label: field.label, name: field.name, weight: index, required: field.required }) as FormField<T>
        case 'form-fields.email':
            return ({ kind: 'email', label: field.label, name: field.name, weight: index, required: field.required }) as FormField<T>
        case 'form-fields.textarea':
            return ({ kind: 'textarea', label: field.label, name: field.name, weight: index, required: field.required }) as FormField<T>
        case 'form-fields.password':
            return ({ kind: 'password', label: field.label, name: field.name, weight: index, required: field.required }) as FormField<T>
        default:
            return ({ kind: 'info', name: `${field.__component} does not exist.`, weight: index })
    }
}