import AnalyticsChart from '../Components/AnalyticsChart'
import Transaction from '../Components/Transaction'

export const Analytics = ({userId,transaction,pageBill, setPageBill}) => {

  const sentTransaction = transaction.filter((bill)=>{
    return bill.fromAccount === userId
  })
  const receivedTransaction = transaction.filter((bill)=>{
    return bill.toAccount === userId
  })

  return (
    <div className='flex flex-col'>
      <AnalyticsChart receivedTransaction={receivedTransaction} sentTransaction={sentTransaction}/>
        <Transaction menu={false} nowUserId={userId} transaction={transaction}/>
    </div>
  )
}
