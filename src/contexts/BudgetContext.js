import React, { useContext} from "react"
import {v4 as uuidv4} from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"
import BudgetPage from "../components/BudgetPage"


const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets(){
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [categories, setCategories] = useLocalStorage("categories",[])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])
    const [budgets, setBudgets] = useLocalStorage("budgets",[])

    
    
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId }){
        setExpenses(prevExpenses =>{
            return [...prevExpenses, { id: uuidv4(), description, amount, budgetId }]
        })

    }

    function addCategory({name, max, budget}){
        setCategories(prevCategories =>{
            if (prevCategories.find(category => category.name === name)){
                return prevCategories
            }
            return [...prevCategories, { id: uuidv4(), name, max, budget }]
        })


    }

    function addBudget({name}){
        setBudgets(prevBudgets =>{
            return [...prevBudgets, {id: uuidv4(), name}]
        })
    }
    
    function deleteCategory(id){
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
        budgets,
        getBudgetExpenses,
        addExpense,
        addCategory,
        deleteCategory,
        deleteExpense,
        addBudget
    }}> {children} </BudgetsContext.Provider>
}