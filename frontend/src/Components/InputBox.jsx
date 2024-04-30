export function InputBox({label, placeholder,onChange}) {

    return <div>
      <input placeholder={placeholder} onChange={onChange} id={label}
      className="w-full px-4 py-2 text-lg border rounded-full text-white border-none my-2 bg-teal-900 placeholder-teal-300 font-semibold" />
    </div>
}

export function InputBoxProfile({label,type, placeholder,onChange,editable, value}) {

  return <div className="flex items-center justify-between">
    <div className="text-xl font-bold mr-2">{label}{" : "}</div>
    <input id={label} placeholder={placeholder} onChange={onChange} type={type} contentEditable={editable} value={value}
    className="w-2/3 px-4 py-1 text-xl border rounded-full text-teal-300 border-none my-1 bg-teal-900 placeholder-white/35 font-semibold" />
  </div>
}