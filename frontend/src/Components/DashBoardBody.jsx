import { useState } from "react"

const DashBoardBody = ({userTab,transactionTab}) => {

    const [selectedTab, setSelectedTab] = useState(userTab)
    const [selected, setSelected] = useState("user")

  return (
    <>

    <div className="border-b border-slate-700 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
            <li className="mr-2" role="presentation">
                <button onClick={() => {
                    setSelectedTab(userTab)
                    setSelected("user")
                }} 
                className={`inline-block hover:text-rose-500 hover:border-rose-500 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 ${selected=="user"?"text-rose-500 border-rose-500":"text-black"} `} id="profile-tab" type="button" role="tab">
                    User</button>
            </li>
            <li className="mr-2" role="presentation">
                <button onClick={() => {
                    setSelectedTab(transactionTab)
                    setSelected("transaction")
                }} 
                className={`inline-block hover:text-rose-500 hover:border-rose-500 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 ${selected=="transaction"?"text-rose-500 border-rose-500":"text-black"} `} id="dashboard-tab" type="button" role="tab">
                    Transactions</button>
            </li>
        </ul>
    </div>
    <div id="myTabContent">
        {selectedTab}
    </div>

    </>
  )
}

export default DashBoardBody