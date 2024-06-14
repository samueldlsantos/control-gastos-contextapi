import { categories } from "../data/categories";
import { useEffect, useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DraftExpense, Expense } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState('');
  const [previousAmount, setPreviousAmount] = useState(0);
  const {state, dispatch, availableAmount} = useBudget();

  useEffect(()=> {
    if(state.idExpense){
      const currentExpense = state.expenses.filter((value: Expense) => value.id === state.idExpense)[0];
      setExpense(currentExpense)
      setPreviousAmount(currentExpense.amount)
    }
  },[state.idExpense])

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const isAmountField = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const onChangeDate: ReactDatePickerProps["onChange"] = (date) => {
    setExpense({
      ...expense,
      date: date as Date,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(Object.values(expense).includes('')){
        setError('Todos los campos son obligatorios')
        return
    }

    if((expense.amount - previousAmount) > availableAmount){
      console.log(expense.amount)
      console.log(previousAmount)
      console.log(availableAmount)
      setError('La cantidad sobre pasa el monto disponible')
      return
  }

    if(state.idExpense){
      dispatch({type: 'update-expense', payload:{ expense : { ...expense, id: state.idExpense}}  })
    }else {
      dispatch({type: 'add-expense', payload:{ expense }})
    }

    setError('')
    //Se reinicia el formulario
    setExpense({
      expenseName: "",
      amount: 0,
      category: "",
      date: new Date(),
    })
    setPreviousAmount(0);

  };

  return (
    <form action="" className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.idExpense ? "Editar gasto" : "Nuevo gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="text"
          id="amount"
          placeholder="Añade la cantidad del gasto"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          name="category"
          id="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={onChange}
        >
          <option value="">-- seleccione categoria --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha gasto:
        </label>
        <DatePicker
          className="w-full bg-slate-100 p-2"
          selected={expense.date}
          onChange={onChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 w-full p-2 uppercase text-white font-bold rounded-lg"
        value={state.idExpense ? "Actualizar gasto" : "Nuevo gasto"}

      />
    </form>
  );
};

export default ExpenseForm;
