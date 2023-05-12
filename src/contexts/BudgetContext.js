import React, { useContext, useState} from "react"
import {v4 as uuidv4} from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"


const BudgetsContext = React.createContext()

export function useBudgets(){
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [categories, setCategories] = useLocalStorage("categories",[])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])
    const [budgets, setBudgets] = useLocalStorage("budgets",[])
    const [tabBudgets, setTabBudgets] = useLocalStorage("tab budgets", [])
    const [income, setIncome] = useLocalStorage("income", [])

    const [activeTabIndex, setActiveTabIndex] = useState(localStorage.getItem('currentIndex'))

    const [activeTheme, setActiveTheme] = useState(localStorage.getItem('selectedTheme'))
    
    const [deleteClick, setDeleteClick] = useState(0)



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
            return [...prevCategories, { id: uuidv4(), name, max, budget }]
        })
    }

    function addBudget({name, goal}){
        setBudgets(prevBudgets =>{
            //if budget already exists simply return prevBudgets
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidv4(), name, goal}]
        })
    }

    function deleteBudget(){
        //filter out budget and its respective categories and expenses

        //get current index from local storage
        var index = localStorage.getItem("currentIndex")

        //get current page budget name
        var name = budgets[index].name

        //remove budget tab
        setTabBudgets(prevTabBudgets=>{
            return prevTabBudgets.filter(tab => tab.name !== name)
        }) 
        
        setExpenses(prevExpenses=>{
            return prevExpenses.filter(expense => expense.budget !== name)
        })
        setCategories(prevCategories=>{
            return prevCategories.filter(category => category.budget !== name)
        })
        setBudgets(prevBudgets =>{
            return prevBudgets.filter( budget => budget.name !== name)
        })
        setIncome(prevIncome =>{
            return prevIncome.filter(income=> income.budget !== name)
        })

        
        
    }

    function setTabIndex(index){
        setActiveTabIndex(index)
        localStorage.setItem("currentIndex", index || 0)
    }

    function addTabBudget({name}){
        setTabBudgets(prevTabBudgets =>{
            
            if(prevTabBudgets.find(tab => tab.name === name)){
                console.log("tab already being shown")
                return prevTabBudgets
            } 
            return [...prevTabBudgets, {id: uuidv4(), name}]
        })
        const newIndex = tabBudgets.length
        console.log("i want to set index to "+ newIndex)

        setTabIndex(newIndex)
    }

    function removeTabBudget({name}){
        setTabBudgets(prevTabBudgets=>{
            return prevTabBudgets.filter(tab => tab.name !== name)
        })
    }
    
    function deleteCategory(id){
        //delete exoense in category we just deleted
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.budgetId !== id)
        })

        //filter out category we just deleted
        setCategories(prevCategories =>{
            return prevCategories.filter(budget => budget.id !== id)
        })
    }


    function deleteExpense({ id }){
        setExpenses(prevExpenses =>{
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    

    function setTheme(theme){
        localStorage.setItem('selectedTheme', theme)
        setActiveTheme(theme)
        document.querySelector("body").setAttribute('data-theme', theme)
    }

    function addIncome({budget, amount, date}){
        setIncome(prevIncome =>{
            return [...prevIncome, {id: uuidv4() ,budget, amount, date}]
        })
    }

    function deleteIncome({id}){
        setIncome(prevIncome =>{
            return prevIncome.filter(income => income.id !== id)
        })
    }
    

    return <BudgetsContext.Provider value={{
        categories,
        expenses,
        budgets,
        tabBudgets,
        activeTabIndex,
        activeTheme,
        income,
        deleteClick,
        getBudgetExpenses,
        addExpense,
        addCategory,
        deleteCategory,
        deleteExpense,
        addBudget,
        deleteBudget,
        addTabBudget,
        removeTabBudget,
        setTabIndex,
        setTheme,
        addIncome,
        deleteIncome,
        setDeleteClick
    }}> {children} </BudgetsContext.Provider>
}