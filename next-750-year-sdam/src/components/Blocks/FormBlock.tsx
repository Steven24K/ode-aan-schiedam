"use client"
import { FormBlockProps, StrapiFormField } from "@/types/PageBlock"
import { FormBuilder, FormField } from "../FormBuilder"
import { useState } from "react"
import { StrapiCMSService } from "@/services/StrapiCMSService"

type FormState = {
    defaultObject: any
    error?: string
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

    if (state.submitted) {
        return <div className="bg-gray-100 rounded p-10 my-5 text-2xl">
            <p>
                {SubmissionText}
            </p>
            <button className="bg-blue-400 hover:bg-blue-800 text-white px-8 py-4 my-5"
                onClick={() => setState(zeroFormState(defaultObject))}
            >
                Verstuur nog een keer
            </button>
        </div>
    }

    const strapi = new StrapiCMSService()
    return <>
        <FormBuilder<any>
            formTitle={Title}
            defaultObject={state.defaultObject}
            fields={Fields.map(mapStrapiFieldsfield)}
            handleChange={(key, value) => setState(s => ({ ...s, defaultObject: { ...s.defaultObject, [key]: value } }))}
            handleSubmit={() =>
                strapi.SubmitFormBody(submit_url, { data: { ...state.defaultObject, form: documentId } })
                    .then(res => {
                        if (res.kind == 'left')
                            setState(s => ({ ...s, submitted: true }))
                        else
                            setState({ ...state, error: res.v })
                    })
            }
        />
        {state.error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {state.error}
        </div>}
    </>
}

const fieldsToDefaultObject = (fields: StrapiFormField[]): any =>
    fields.reduce((xs, x) => {
        if (x.__component == 'form-fields.info-text') return xs
        return ({ ...xs, [x.name]: fieldToDefaultValue(x) })
    }, {})

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
        case 'form-fields.date-picker':
            return 'date'
        case 'form-fields.time-select':
            return 'time'
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
        case 'form-fields.date-picker':
        case 'form-fields.time-select':
            return ({ kind: StrapiFieldType2FormFieldType(field.__component), label: field.label, name: field.name, weight: index, required: field.required }) as FormField<T>
        case 'form-fields.dropdown':
            return ({ kind: 'dropdown', label: field.label, name: field.name, weight: index, required: field.required, options: field.Options.map(v => ({ name: v.Name, value: v.Value })) }) as FormField<T>
        case 'form-fields.categories-dropdown':
            return ({ kind: 'dropdown', label: field.label, name: field.name, weight: index, required: field.required, options: field.categories.map(v => ({ name: v.Title, value: v.documentId })) }) as FormField<T>
        case 'form-fields.info-text':
            return ({ kind: 'info', name: field.Message, weight: index })
        default:
            return ({ kind: 'info', name: JSON.stringify(field), weight: index })
    }
}