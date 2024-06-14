import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
    const {state} = useBudget();

    const expensesFiltered = useMemo(()=> state.categoryFiltered ? state.expenses.filter((expense) => expense.category === state.categoryFiltered) : state.expenses , [state.categoryFiltered])
  
    const isEmpty = useMemo(() => expensesFiltered.length === 0, [expensesFiltered]) 
    return (
    <div className="mt-10">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>: 
        <>
        <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos.</p>
        {
            expensesFiltered.map(expense => (
                <ExpenseDetail key={expense.id} expense={expense}/>
            ))
        }
        </>}
    </div>
  )
}

export default ExpenseList