import { Dispatch, ReactNode, createContext, useReducer, useMemo } from "react";
import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  availableAmount: number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => total + expense.amount, 0),
    [state.expenses]
  );
  const availableAmount = useMemo(
    () => state.budget - totalExpenses,
    [state.expenses]
  );

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        availableAmount,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
