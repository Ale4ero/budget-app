import { useState, useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";
import BudgetCard from "./BudgetCard";
import UncategorizedBudgetCard from "./UncategorizedBudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import ConfirmModal from "./ConfirmModal";
import '../App.css';
import {Chart as chartjs, CategoryScale, LinearScale, BarElement, Tooltip, Legend} from 'chart.js/auto';

import { Bar, Doughnut } from 'react-chartjs-2';


chartjs.register(
  CategoryScale, LinearScale, BarElement, Tooltip, Legend
)

export default function BudgetPage({title}) {
    //useState for addCategory button
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

    //useState for addExpense button
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

    //useState for viewExpenses button FOR SPECIFIC BUDGET
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()

    //useState for addExpense button FOR SPECIFIC BUDGET
    const [addExpenseModalBudgetId, setAddExpenseModalModalId] = useState()

    //getting budgets and expenses from useBudgets context
    const {categories, getBudgetExpenses} = useBudgets()

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [confirmModalBudgetId, setConfirmModalBudgetId] = useState()

    const [confirmModalBudgetName, setConfirmModalBudgetName] = useState()

    const [catNamesArr, setCatNamesArr] = useState([])

    const catNames= []
    const catSpending = []
    const catMax = []


    function openAddExpenseModal(budgetId){
        setShowAddExpenseModal(true)
        setAddExpenseModalModalId(budgetId)
    }

    function openConfirmModal(budgetId, budgetName){
        setShowConfirmModal(true)
        setConfirmModalBudgetId(budgetId)
        setConfirmModalBudgetName(budgetName)
    }
    
    
    console.log(catNamesArr)

    const [barChartData, setBarChartData] = useState({
        datasets: []
    })
    const [donutChartData, setDonutChartData] = useState({
        datasets: []
    })

    const [barChartOptions, setBarChartOptions] = useState({})
    const [donutChartOptions, setDonutChartOptions] = useState({})


    useEffect(()=>{
        
        var chartColor = "#666"

        

        function getChartData(){
        for(var i = 0; i < categories.length; i++ ){  
            const amount = getBudgetExpenses(categories[i].id).reduce(
            (total, expense) => total + expense.amount, 0)
            //storing name of budget in array 'catNames[]'
            catNames[i] = categories[i].name 
            catMax[i] = categories[i].max 
            catSpending[i] = amount
        }
        }

        function checkTheme(){
        if (document.querySelector("body").getAttribute('data-theme') === 'dark'){
            console.log("I know the theme is dark")
            chartColor = "#F2EFF2"
        }else{
            console.log("theme is light")
            chartColor = "#666"
        }
        }

        setCatNamesArr(catNames)

        
    

        getChartData()

        checkTheme()

        setBarChartData({
        labels: catNames,
        datasets: [
            {
            label: 'Spent',
            data: catSpending,
            backgroundColor: ['#4D9DE0', '#EE4266', '#FFD23F', '#23B476', '#F89A3B', '#7F4ED9']
            }
        ]
        })

        setDonutChartData({
        labels: catNames,
        datasets: [
            {
            label: 'Spent',
            data: catSpending,
            backgroundColor: ['#4D9DE0', '#EE4266', '#FFD23F', '#23B476', '#F89A3B', '#7F4ED9'],
            borderColor : "rgba(0,0,0,0)"
            },
        ]
        })

        setBarChartOptions({
        responsive: true,
        plugins: {
            legend: {
            display: false,
            position: 'bottom',
            onHover: ((event)=>{
                event.chart.canvas.style.cursor = 'pointer'
            }),
            onLeave: ((event)=>{
                event.chart.canvas.style.cursor = 'default'
            })
            }
        },
        scales: {
            x: {
            grid: {
                drawOnChartArea: false,
                drawTicks: false
            },
            beginAtZero: true,
            ticks: {
                color: chartColor
            }
            },
            y: {
            beginAtZero: true,
            ticks:{
                maxTicksLimit: 10,
                callback: (value, index, values)=>{
                return new Intl.NumberFormat(undefined,{
                    currency: "usd",
                    style: "currency",
                    minimumFractionDigits: 0
                }).format(value)
                },
                color: chartColor
            }
            }

            
            
        }
        })

        setDonutChartOptions({
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            labels: {
                color: chartColor
            }
            }
        },
        })

    }, [])

  return (
    
    <div className="background">

        

        
        
        <h1 className="budgetTitle">{title} Budget</h1>

        <div className="graphs">
            <Container className="graphsContainer">
                
                <div className="barGraph">
                <Bar data={barChartData} options={barChartOptions}></Bar>
                </div>
                <div  className="donutGraph">
                {catNamesArr.length == 0 ? (
                    <div style={{height: "100%"}}>
                        <div className="center">
                        <h3 className="d-block">No Data</h3>
                        </div>            
                    </div>
                ):(
                    <>
                    <Doughnut data={donutChartData} options={donutChartOptions}></Doughnut>
                    </>
                )}
                </div>
                <div className="dataContainer">
                <TotalBudgetCard/>
                </div>                   
            </Container>

        </div>

    {/* Monthly Budgets Container */}
    <div className="budgets">

    

    <Container className="budgetsContainer my-4 mx-3">

        <Stack direction="horizontal" gap="2" className="mb-4">
        {/*Heading for The Budgets*/}
        <h1 className="me-auto">Categories</h1>

        {/* Buttons in heading */}
        <Button variant="primary" onClick={()=> setShowAddBudgetModal(true)}>Add Category</Button>
        {/* <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button> */}
        </Stack> 

        {/* style for the div for budget cards */}
        <div className="budgetGrid">
            {/* For each budget create a budget card */}
            {categories.map(category =>{
                const amount = getBudgetExpenses(category.id).reduce(
                (total, expense) => total + expense.amount, 0)
            const id = category.id
            //  console.log("budget id: "+id)
                return (
                        <BudgetCard 
                        key={category.id}
                        name={category.name} 
                        amount={amount} 
                        max={category.max}
                        onAddExpenseClick={() => openAddExpenseModal(category.id)}
                        onViewExpensesClick={() => setViewExpensesModalBudgetId(category.id)}
                        onDeleteBudgetClick={()=>openConfirmModal(category.id, category.name)}
                        budgetId={id}
                
                        />
                        )   
            })}

            {/* add uncategorized and total budget cards */}
            <UncategorizedBudgetCard onAddExpenseClick= {openAddExpenseModal} onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
            
        </div>
    </Container>

    </div>


    {/* MODALS */}
    <AddBudgetModal 
    show={showAddBudgetModal} 
    handleClose={()=> setShowAddBudgetModal(false)} 
    />
    <AddExpenseModal 
    show={showAddExpenseModal} 
    defaultBudgetId={addExpenseModalBudgetId}
    handleClose={()=> setShowAddExpenseModal(false)} 
    />
    <ViewExpensesModal 
    budgetId={viewExpensesModalBudgetId}
    handleClose={()=> setViewExpensesModalBudgetId()} 
    />

    <ConfirmModal
    show={showConfirmModal}
    handleClose = {()=> setShowConfirmModal(false)}
    budgetId={confirmModalBudgetId}
    budgetName={confirmModalBudgetName}
    />
    </div>
  )
}
