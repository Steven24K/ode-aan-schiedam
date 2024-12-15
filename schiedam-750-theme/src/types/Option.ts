type None = { kind: 'none' }
type Some<a> = { kind: 'some', v: a }

type OptionMethods<a> = {
    visit: <b>(_onSome: (_v: a) => b, onNone: () => b) => b
    map: <b>(f: (_v: a) => b) => Option<b>
}

const _optionMethods = <a>(): OptionMethods<a> => ({
    visit: function <b>(this: Option<a>, _onSome: (_v: a) => b, onNone: () => b): b {
        if (this.kind == 'some') return _onSome(this.v)
        return onNone()
    },
    map: function <b>(this: Option<a>, f: (_v: a) => b): Option<b> {
        if (this.kind == 'some') return Some<b>(f(this.v))
        return None<b>()
    }
})

export type Option<a> = (Some<a> | None) & OptionMethods<a>


export const Some = <a>(_v: a): Option<a> =>
    ({ kind: 'some', v: _v, ..._optionMethods() })

export const None = <a>(): Option<a> =>
    ({ kind: 'none', ..._optionMethods() })