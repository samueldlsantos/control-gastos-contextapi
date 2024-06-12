import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions =
{type: 'add-budget', payload:{'budget': number}} |
{type: 'handle-modal'} |
{type: 'add-expense', payload: {expense: DraftExpense}} |
{type: 'delete-expense', payload: {id: Expense["id"] }}

export type BudgetState = {
    budget: number,
    showModal: boolean,
    expenses: Expense[]
}

export const initialState: BudgetState = {
    budget: 0,
    showModal: false,
    expenses:[] 
}

const createExpense = (expense : DraftExpense) : Expense => {
    return {
        ...expense,
        id: uuidv4()
    }
}

export const budgetReducer = (
state: BudgetState = initialState,
action: BudgetActions
) =>{
    if(action.type === 'add-budget'){
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === 'handle-modal'){
        return {
            ...state,
            showModal: !state.showModal
        }
    }

    if(action.type === 'add-expense'){

        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense],
            showModal:false
        }
    }

    if(action.type === 'delete-expense'){
        const expensesUpdated = state.expenses.filter((expense)=> expense.id !== action.payload.id )

        return {
            ...state,
            expenses: expensesUpdated
        }
    }

    return state

}