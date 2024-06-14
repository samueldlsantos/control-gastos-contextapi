import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

const Filter = () => {

    const {dispatch} = useBudget();

  return (
    <div className="bg-white p-10 rounded-md shadow-lg">
      <form action="">
        <div className="flex flex-col md:flex-row gap-5 md:items-center">
          <label htmlFor="category">Filtrar gastos</label>
          <select id="category" className="p-2 bg-slate-200 flex-1 rounded-md" onChange={(e) => dispatch({type: 'filter-category', payload:{'category': e.target.value}})}>
            <option value="">-- selecciona categoria --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filter;
