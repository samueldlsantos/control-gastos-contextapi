import { Category, DraftExpense, Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';
 
export type BudgetActions =
  | { type: 'add-budget'; payload: { budget: number } }
  | { type: 'handle-modal' }
  | { type: 'add-expense'; payload: { expense: DraftExpense } }
  | { type: 'delete-expense'; payload: { id: Expense['id'] } }
  | { type: 'get-expense-id'; payload: { id: Expense['id'] } }
  | { type: 'update-expense'; payload: { expense: Expense } }
  | { type: 'restart-app' }
  | { type: 'filter-category'; payload: { category: Category['id'] } };
 
export type BudgetState = {
  budget: number;
  showModal: boolean;
  expenses: Expense[];
  idExpense: Expense['id'];
  categoryFiltered: Category['id'];
};
 
//Estado del local Storage, se ejecuta antes del estado inicial del state para evaluar el dato actual en LS
const localStorageBudget = (): number => {
  const budget = localStorage.getItem('budget');
 
  return budget ? Number(budget) : 0;
};
const localStorageExpenses = (): Expense[] => {
  const expenses = localStorage.getItem('expenses');
 
  return expenses ? JSON.parse(expenses) : [];
};
 
export const initialState: BudgetState = {
  budget: localStorageBudget(),
  showModal: false,
  expenses: localStorageExpenses(),
  idExpense: '',
  categoryFiltered: '',
};
 
const createExpense = (expense: DraftExpense): Expense => {
  return {
    ...expense,
    id: uuidv4(),
  };
};
 
export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions): BudgetState => {
  if (action.type === 'add-budget') {
    localStorage.setItem('budget', action.payload.budget.toString());
    return {
      ...state,
      budget: action.payload.budget,
    };
  }
 
  if (action.type === 'handle-modal') {
    return {
      ...state,
      showModal: !state.showModal,
      idExpense: state.showModal ? '' : state.idExpense,
    };
  }
 
  if (action.type === 'add-expense') {
    const expense = createExpense(action.payload.expense);
    const expenses = [...state.expenses, expense];
    localStorage.setItem('expenses', JSON.stringify(expenses));
 
    return {
      ...state,
      expenses: expenses,
      showModal: false,
    };
  }
 
  if (action.type === 'delete-expense') {
    const expensesUpdated = state.expenses.filter((expense) => expense.id !== action.payload.id);
    localStorage.setItem('expenses', JSON.stringify(expensesUpdated));
 
    return {
      ...state,
      expenses: expensesUpdated,
    };
  }
 
  if (action.type === 'get-expense-id') {
    return {
      ...state,
      idExpense: action.payload.id,
      showModal: true,
    };
  }
 
  if (action.type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map((expense) => (expense.id === action.payload.expense.id ? action.payload.expense : expense)),
      idExpense: '',
      showModal: false,
    };
  }
 
  if (action.type === 'restart-app') {
    localStorage.setItem('budget', '0');
    localStorage.setItem('expenses', '');
 
    return {
      ...state,
      budget: 0,
      showModal: false,
      expenses: [],
      idExpense: '',
      /* categoryFiltered: '', */
      categoryFiltered: '',
    };
  }
 
  if (action.type === 'filter-category') {
    return {
      ...state,
      categoryFiltered: action.payload.category,
    };
  }
 
  return state;
};