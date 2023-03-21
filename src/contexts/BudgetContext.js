import React, { useContext} from "react"
import {v4 as uuidv4} from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"


const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets(){
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [categories, setCategories] = useLocalStorage("categories",[])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])

    
    
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId }){
        setExpenses(prevExpenses =>{
            return [...prevExpenses, { id: uuidv4(), description, amount, budgetId }]
        })

    }

    function addBudget({name, max}){
        setCategories(prevBudgets =>{
            if (prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidv4(), name, max }]
        })


    }
    
    function deleteBudget(id){
        //deal with expenses that are now uncategorized
        console.log("contect deleting: "+id)
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.budgetId !== id) return expense
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })

        setCategories(prevBudgets =>{
            return prevBudgets.filter(budget => budget.id !== id)
        })
        window.location.reload()
    }


    function deleteExpense({ id }){
        setExpenses(prevExpenses =>{
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
    

    return <BudgetsContext.Provider value={{
        categories,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
    }}> {children} </BudgetsContext.Provider>
}