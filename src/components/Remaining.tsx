import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";


const Remaining = () => {
  const { expenses } = useContext(AppContext);
  let budget = 1000;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  const remaining = budget - totalExpenses;
  // Exercise: Create an alert when Remaining is less than 0.
  useEffect(() => {
    if(remaining<0){
      window.alert("You have exceeded your budget!");
    }
  }, [remaining]);


  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
