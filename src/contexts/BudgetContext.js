import React, { useContext, useState} from "react"
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
    const [budgets, setBudgets] = useLocalStorage("budgets",[])
    const [tabBudgets, setTabBudgets] = useLocalStorage("tab budgets", [])

    const [activeTabIndex, setActiveTabIndex] = useState(localStorage.getItem('currentIndex'))

    const [activeTheme, setActiveTheme] = useState(localStorage.getItem('selectedTheme'))
    
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId, budget }){
        setExpenses(prevExpenses =>{
            return [...prevExpenses, { id: uuidv4(), description, amount, budgetId, budget }]
        })

    }

    function addCategory({name, max, budget}){
        setCategories(prevCategories =>{
            // if (prevCategories.find(category => (category.name === name) )){
            //     return prevCategories
            // }
            return [...prevCategories, { id: uuidv4(), name, max, budget }]
        })


    }

    function addBudget({name}){
        setBudgets(prevBudgets =>{
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidv4(), name}]
        })
    }

    function addTabBudget({name}){
        setTabBudgets(prevTabBudgets =>{
            
            if(prevTabBudgets.find(tab => tab.name === name)){
                console.log("tab already being shown")
                return prevTabBudgets
            } 
            return [...prevTabBudgets, {id: uuidv4(), name}]
        })
        // var newIndex = tabBudgets.length+1
        // console.log('from context set new index to:'+ newIndex)
        // setTabIndex(newIndex)
    }

    function removeTabBudget({name}){
        setTabBudgets(prevTabBudgets=>{
            return prevTabBudgets.filter(tab => tab.name !== name)
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
        // window.location.reload()
    }


    function deleteExpense({ id }){
        setExpenses(prevExpenses =>{
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    function setTabIndex(index){
        setActiveTabIndex(index)
        localStorage.setItem("currentIndex", index || 0)
    }

    function setTheme(theme){
        localStorage.setItem('selectedTheme', theme)
        setActiveTheme(theme)
        document.querySelector("body").setAttribute('data-theme', theme)
    }
    

    return <BudgetsContext.Provider value={{
        categories,
        expenses,
        budgets,
        tabBudgets,
        activeTabIndex,
        activeTheme,
        getBudgetExpenses,
        addExpense,
        addCategory,
        deleteCategory,
        deleteExpense,
        addBudget,
        addTabBudget,
        removeTabBudget,
        setTabIndex,
        setTheme
    }}> {children} </BudgetsContext.Provider>
}