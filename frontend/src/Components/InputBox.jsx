export function InputBox({label, placeholder,onChange}) {

    return <div>
      <input placeholder={placeholder} onChange={onChange} className="w-full px-2 py-2 my-1 border rounded border-slate-200" />
    </div>
}