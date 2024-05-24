export type BudgetActions = 
{type: 'add-budget', payload:{'budget': number}} |
{type: 'handle-modal'} 

export type BudgetState = {
    budget: number,
    showModal: boolean
}

export const initialState: BudgetState = {
    budget: 0,
    showModal: false
}

export const budgetReducer = (
state: BudgetState = initialState,
actions: BudgetActions
) =>{
    if(actions.type === 'add-budget'){
        return {
            ...state,
            budget: actions.payload.budget
        }
    }

    if(actions.type === 'handle-modal'){
        return {
            ...state,
            showModal: !state.showModal
        }
    }

    return state

}