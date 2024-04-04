import { Balance } from "../Components/Balance";
import Transaction from "../Components/Transaction";
import { SendingMenu } from "../Components/SendingMenu";

const Dashboard = ({firstName, lastName, balance, setPage, userId, setRefresh, transaction}) => {

  const newlist = [{firstName: 'John', lastName: 'lever'},
  {firstName: "Sam", lastName:"Altman"},
  {firstName:"Henry",lastName: "Snider"}]

  return (
    <> 
      <Balance setPage={setPage} setRefresh={setRefresh} balance={balance} firstName={firstName} lastName={lastName}/>
      <SendingMenu list={newlist}/>
      <Transaction nowUserId={userId} transaction={transaction.slice(0,5)} menu={true}/>
      </>
  );
};

export default Dashboard;
