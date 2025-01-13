import { JSX } from "react"

export type FormField<T> = DefaultField<T> | Numberfield<T> | DropDownField<T> | RepeatField<T> | InfoText | JsxField | HtmlField

type GenericFormField = {
    hide_label?: boolean
    label: string
    disabled?: boolean
    required?: boolean
    weight: number
}

type DefaultField<T> = GenericFormField & {
    kind: 'text' | 'email' | 'password' | 'textarea' | 'date' | 'time' | 'checkbox'
    name: keyof T
}

type Numberfield<T> = GenericFormField & {
    kind: 'number'
    name: keyof T
    min_value?: number
    max_value?: number
    step?: number
}

type DropDownField<T> = GenericFormField & {
    kind: 'dropdown'
    options: { name: string, value: string }[]
    name: keyof T
}

type RepeatField<T> = GenericFormField & {
    kind: 'repeat'
    edit: boolean
    fields: FormField<any>[]
    name: keyof T
}

type InfoText = { kind: 'info'; name: string, weight: number }

type JsxField = { kind: 'jsx'; name: string; jsx: JSX.Element, weight: number }

type HtmlField = { kind: 'html', name: string, html: string, weight: number }

interface FieldRendererProps<T> {
    field: FormField<T>
    defaultObject: T
    handleChange: <a>(key: keyof T, value: a) => void
}
export function FieldRenderer<T>(props: FieldRendererProps<T>) {
    const { field, defaultObject, handleChange } = props
    if (defaultObject == undefined) return <></>
    switch (field.kind) {
        case 'date':
        case 'text':
        case 'time':
        case 'password':
        case 'email':
            return <div className="input-group">
                {(!field.hide_label || field.hide_label == undefined) && <label className="form-label">{field.label}:</label>}
                <input onChange={e => {
                    e.persist()
                    handleChange(field.name, e.currentTarget.value)
                }}
                    value={String(defaultObject[field.name])}
                    type={field.kind}
                    className="form-field"
                    disabled={field.disabled}
                    required={field.required}
                />
            </div>
        case 'checkbox':
            return <div className="input-group">
                {(!field.hide_label || field.hide_label == undefined) && <label className="form-label">{field.label}:</label>}
                <input onChange={e => {
                    e.persist()
                    handleChange(field.name, !Boolean(defaultObject[field.name]))
                }}
                    checked={Boolean(defaultObject[field.name])}
                    type={field.kind}
                    className="form-field"
                    disabled={field.disabled}
                    required={field.required}
                />
            </div>
        case 'number':
            return <div className="input-group">
                {(!field.hide_label || field.hide_label == undefined) && <label className="form-label">{field.label}:</label>}
                <input onChange={e => {
                    e.persist()
                    handleChange(field.name, Number(e.currentTarget.value))
                }}
                    value={isNaN(Number(defaultObject[field.name])) ? '' : Number(defaultObject[field.name])}
                    type={field.kind}
                    className="form-field"
                    disabled={field.disabled}
                    min={field.min_value}
                    max={field.max_value}
                    step={field.step}
                    required={field.required}
                />
            </div>
        case 'textarea':
            return <div className="input-group">
                {(!field.hide_label || field.hide_label == undefined) && <label className="form-label">{field.label}:</label>}
                <textarea className="form-field"
                    cols={40}
                    rows={10}
                    onChange={e => {
                        e.persist()
                        handleChange(field.name, e.currentTarget.value)
                    }}
                    value={String(defaultObject[field.name])}
                    disabled={field.disabled}
                    required={field.required}
                />
            </div>
        case 'dropdown':
            return <div className="input-group">
                {(!field.hide_label || field.hide_label == undefined) && <label className="form-label">{field.label}:</label>}
                {field.options.length == 0 && <p><i>Niet beschikbaar</i></p>}
                {field.options.length > 0 && <select className="form-field"
                    value={String(defaultObject[field.name])}
                    disabled={field.disabled}
                    required={field.required}
                    onChange={e => {
                        e.persist()
                        handleChange(field.name, e.currentTarget.value)
                    }}
                >
                    <option>Kies een optie</option>
                    {
                        field.options.map(opt => <option key={opt.name} value={opt.value}>{opt.name}</option>)
                    }
                </select>}
            </div>
        case 'info':
            return <i>{field.name}</i>
        case 'jsx':
            return field.jsx
        case 'html':
            return <div id={field.name} dangerouslySetInnerHTML={{ __html: field.html }}></div>
        case 'repeat':
            if (!Array.isArray(defaultObject[field.name])) return <p>Default Object for a repeater needs to be of type Array</p>
            const defaultArray = defaultObject[field.name] as any[]
            if (defaultArray.length == 0) return <p>The default array needs to have atleast 1 sample value</p>
            return <div className="input-group">
                {(!field.hide_label || field.hide_label == undefined) && <h3>{field.label}</h3>}
                {
                    defaultArray.map((singleValue, singleValueIndex) =>
                        field.fields.map((nested_field, nested_field_index) =>
                            <FieldRenderer key={nested_field.name.toString() + singleValueIndex + nested_field_index}
                                defaultObject={singleValue}
                                field={nested_field as any}
                                handleChange={(k, v) => {
                                    let newArray = defaultArray
                                    newArray[singleValueIndex] = ({ ...singleValue, [k]: v })
                                    handleChange(field.name, newArray)
                                }}
                            />
                        )
                    )
                }

                {defaultArray.length > 0 && <button onClick={(e) => {
                    e.preventDefault()
                    let value_array = defaultArray
                    let lastIndex = defaultArray.length - 1
                    let value_object = value_array[lastIndex]
                    value_array.push(value_object)
                    handleChange(field.name, value_array)

                }} className='btn btn-info'>
                    Voeg veld toe
                </button>
                }

                {
                    !field.edit && defaultArray.length > 1 && <button onClick={(e) => {
                        e.preventDefault()
                        let newArray = defaultArray
                        newArray.pop()
                        handleChange(field.name, newArray)

                    }} className='btn btn-danger'>
                        Verwijder laaste veld
                    </button>
                }
            </div>
        default:
            return <b>No renderer implemented for {JSON.stringify(field)}</b>
    }
}

interface FormBuilderProps<T> {
    fields: FormField<T>[]
    defaultObject: T
    handleChange: <a>(key: keyof T, value: a) => void
    handleSubmit: () => void
    isDisabled?: boolean
    submitText?: string
    noSubmit?: boolean
    formTitle?: string
}
export function FormBuilder<T>(props: FormBuilderProps<T>) {
    const { fields, defaultObject, isDisabled, handleChange, handleSubmit, noSubmit, submitText, formTitle } = props
    return <div className='form-card'>
        {formTitle && <h2>{formTitle}</h2>}
        <form className='form-group' onSubmit={e => {
            e.preventDefault()
            handleSubmit()
        }}>
            {
                fields.sort((a, b) => a.weight - b.weight).map(field =>
                    <FieldRenderer<T> key={field.name.toString()}
                        defaultObject={defaultObject}
                        field={field}
                        handleChange={handleChange}
                    />
                )
            }
            {!noSubmit && <button disabled={isDisabled} type="submit" className="btn btn-primary">{submitText || 'Verstuur'}</button>}
        </form>
    </div>
}