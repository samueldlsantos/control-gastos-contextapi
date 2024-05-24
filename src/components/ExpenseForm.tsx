import { categories } from "../data/categories"
import DatePicker from "react-datepicker";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

const ExpenseForm = () => {
    const [startDate, setStartDate] = useState(new Date);

  return (
<form action="" className="space-y-5">
    <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">Nuevo gasto</legend>
    <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre gasto:</label>
        <input type="text" id="expenseName" placeholder="Añade el nombre del gasto" className="bg-slate-100 p-2" name="expenseName"/>
    </div>
    <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Cantidad:</label>
        <input type="text" id="amount" placeholder="Añade la cantidad del gasto" className="bg-slate-100 p-2" name="amount"/>
    </div>
    <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">Categoria:</label>
        <select name="category" id="category" className="bg-slate-100 p-2">
            <option value="">-- seleccione categoria --</option>
            {categories.map((category)=> <option key={category.id } value={category.id}>{category.name}</option> )}
        </select>
    </div>
    <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">Fecha gasto:</label>
        <DatePicker className="w-full bg-slate-100 p-2" selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>

    <input type="submit" className="bg-blue-600 hover:bg-blue-700 w-full p-2 uppercase text-white font-bold rounded-lg" value="Registrar gasto" />

</form>  )
}

export default ExpenseForm