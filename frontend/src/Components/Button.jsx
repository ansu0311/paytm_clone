export function Button({label, onClick}) {
    return <button onClick={onClick} type="button" className=" w-full text-lg font-semibold rounded-full text-[#242424] bg-teal-300 hover:bg-[#242424] hover:text-teal-300 border-2 border-transparent hover:border-teal-300 px-5 py-2.5 me-2 mb-2">{label}</button>
}

export function ButtonSmall({label, onClick}){
     return <button onClick={onClick} type="button" className=" w-1/2 text-lg font-semibold rounded-full text-[#242424] bg-teal-300 hover:bg-[#242424] hover:text-teal-300 border-2 border-transparent hover:border-teal-300 px-2 py-1 me-2 mb-2">{label}</button>
}

export function ButtomDashboard({label, onClick}){
    return <button onClick={onClick} type="button" className=" w-1/2 text-lg font-semibold rounded-full text-white bg-teal-900 hover:bg-[#242424] hover:text-teal-300 border-2 border-transparent hover:border-teal-300 px-1 py-0.5">{label}</button>
}

export function ButtonMenu({label, onClick}){
    return <button onClick={onClick} type="button"
    className=" w-full text-lg font-semibold text-left rounded-full text-teal-300 hover:text-white px-2 py-1 mb-2">{label}</button>
}
