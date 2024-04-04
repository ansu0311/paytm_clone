import { useState } from "react"
import { ButtonSmall } from "./Button"
import { Chart } from "react-google-charts";

const AnalyticsChart = ({sentTransaction,receivedTransaction}) => {

    const [filter, setFilter] = useState("month")

    const sumSent = sentTransaction.filter((e)=>{return e.completed == true}).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    const sumReceived = receivedTransaction.filter((e)=>{return e.completed == true}).map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    const data =[["Title","Value"],['Spent', sumSent],['Received',sumReceived]]
    
    const options = {
        legend: "none",
        pieSliceText: "none",
        pieHole: 0.8,
        is3D: false,
        pieStartAngle: 0,
        backgroundColor: "none",
        slices: {
          0: { color: "#5EEAD4" },
          1: { color: "#2D423F" },
        },
      };

    return (
    <div className="flex flex-col mb-5">
        <div className="flex  h-[35vh]">
        <Chart
    chartType="PieChart"
    width={"20vw"}
    height={"20vw"}
    style={{padding:"0px",margin:"0px"}}
    data={data}
    options={options}
  />
        </div>
        {/* <div className="flex justify-center">
            <div className="flex w-1/3">
            <ButtonSmall onClick={()=> setFilter("month")} label={"Month"} />
            <ButtonSmall onClick={()=> setFilter("quarter")} label={"Quarter"} />
            <ButtonSmall onClick={()=> setFilter("year")} label={"Year"} />
        </div>
        </div> */}
    </div>
  )
}

export default AnalyticsChart