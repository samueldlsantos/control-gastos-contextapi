import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";

const BudgetTracker = () => {

  const {state, availableAmount, totalExpenses} = useBudget();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Grafica de gastos" />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button 
        type="button"
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
