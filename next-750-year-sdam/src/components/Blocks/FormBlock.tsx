"use client"
import { FormBlockProps, StrapiFormField } from "@/types/PageBlock"
import { FormBuilder, FormField } from "../FormBuilder"
import { useState } from "react"
import { StrapiCMSService } from "@/services/StrapiCMSService"

type FormState = {
    defaultObject: any
    submitted: boolean
}

const zeroFormState = (_default: any): FormState => ({
    defaultObject: _default,
    submitted: false,
})

export const FormBlock = (props: FormBlockProps) => {
    const { Fields, SubmissionText, Title, submit_url, documentId } = props.form
    const defaultObject = fieldsToDefaultObject(Fields)
    const [state, setState] = useState<FormState>(zeroFormState(defaultObject))

    const strapi = new StrapiCMSService()

    return <>
        <FormBuilder<any>
            formTitle={Title}
            defaultObject={state.defaultObject}
            fields={Fields.map(mapStrapiFieldsfield)}
            handleChange={(key, value) => setState(s => ({ ...s, defaultObject: { ...s.defaultObject, [key]: value } }))}
            // Make sure to only pass defaultObject that matches the content type
            handleSubmit={() => strapi.CreateFormSubmission(submit_url, { data: { data: state.defaultObject, form: documentId } })}
        />
    </>
}

const fieldsToDefaultObject = (fields: StrapiFormField[]): any =>
    fields.reduce((xs, x) => ({ ...xs, [x.name]: fieldToDefaultValue(x) }), {})

const fieldToDefaultValue = (field: StrapiFormField): string | number | boolean => {
    if (field.__component == 'form-fields.checkbox') return false
    if (field.__component == 'form-fields.number') return 0
    return ""
}

const StrapiFieldType2FormFieldType = (strapi_type: StrapiFormField['__component']): FormField<any>['kind'] => {
    switch (strapi_type) {
        case 'form-fields.text':
            return 'text'
        case 'form-fields.email':
            return 'email'
        case 'form-fields.password':
            return 'password'
        case 'form-fields.textarea':
            return 'textarea'
        case 'form-fields.checkbox':
            return 'checkbox'
        case 'form-fields.number':
            return 'number'
        default:
            return 'info'
    }
}

function mapStrapiFieldsfield<T>(field: StrapiFormField, index: number): FormField<T> {
    switch (field.__component) {
        case 'form-fields.text':
        case 'form-fields.checkbox':
        case 'form-fields.email':
        case 'form-fields.textarea':
        case 'form-fields.password':
        case 'form-fields.number':
            return ({ kind: StrapiFieldType2FormFieldType(field.__component), label: field.label, name: field.name, weight: index, required: field.required }) as FormField<T>
        default:
            return ({ kind: 'info', name: `${field.__component} does not exist.`, weight: index })
    }
}