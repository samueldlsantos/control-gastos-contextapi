import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useMemo } from "react";

const BudgetTracker = () => {

  const {state,dispatch, availableAmount, totalExpenses} = useBudget();

  const percentage = useMemo(()=> +((totalExpenses * 100) / state.budget).toFixed(0),[state.budget, totalExpenses])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
      <CircularProgressbar value={percentage} text={`${percentage}%`} />;
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button 
        type="button"
        onClick={() => dispatch({type:'restart-app'})}
         className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg">
            Resetear app
         </button>


         <AmountDisplay label="Presupuesto" amount={state.budget}/>
         <AmountDisplay label="Disponible" amount={availableAmount}/>
         <AmountDisplay label="Gastado" amount={totalExpenses}/>
      </div>
    </div>
  );
};

export default BudgetTracker;
