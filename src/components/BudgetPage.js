import { useState, useEffect, useRef} from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddCategoryModal from "./AddCategoryModal";
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
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)

    //useState for addExpense button
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

    //useState for viewExpenses button FOR SPECIFIC BUDGET
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()

    //useState for addExpense button FOR SPECIFIC BUDGET
    const [addExpenseModalBudgetId, setAddExpenseModalModalId] = useState()


    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [confirmModalBudgetId, setConfirmModalBudgetId] = useState()

    const [confirmModalBudgetName, setConfirmModalBudgetName] = useState()

    // const [catNamesArr, setCatNamesArr] = useState([])


    //getting budgets, categroies and expenses from useBudgets context
    const {categories, getBudgetExpenses, activeTabIndex, activeTheme} = useBudgets()

    
    
    const tempBudgetAppFunc = useRef()

    


    function openAddExpenseModal(categoryId){
        setShowAddExpenseModal(true)
        setAddExpenseModalModalId(categoryId)
    }

    function openConfirmModal(categoryId, categoryName){
        setShowConfirmModal(true)
        setConfirmModalBudgetId(categoryId)
        setConfirmModalBudgetName(categoryName)
    }
    
    

    const [barChartData, setBarChartData] = useState({
        datasets: []
    })
    const [donutChartData, setDonutChartData] = useState({
        datasets: []
    })

    const [barChartOptions, setBarChartOptions] = useState({})
    const [donutChartOptions, setDonutChartOptions] = useState({})


    
    // let catNames= useMemo(() => []) 
    let catNames = useRef([])
    let catSpending =  useRef([])
    let catMax =  useRef([])
    

    // console.log('IN BUDGET:' + title)
    
    // console.log('WE ARE IN INDEX: '+activeTabIndex)

    // console.log('THEME IS: '+ activeTheme)

    const budgetAppFunc = ()=>{
        var chartColor = "#666"   

        catNames = []
        catSpending = []
        catMax.current = []
        
        function getChartData(){
            catNames.length = 0
            catSpending.length = 0
            catMax.length = 0
            var j = 0
            for(var i = 0; i < categories.length; i++ ){  
                if(categories[i].budget === title){
                    
                    const amount = getBudgetExpenses(categories[i].id).reduce(
                        (total, expense) => total + expense.amount, 0)
                        //storing name of budget in array 'catNames[]'
                    catNames[j] = categories[i].name 
                    catMax[j] = categories[i].max 
                    catSpending[j] = amount
                    j++
                                 
                }        
            }
        }
    
        getChartData()
        

        

        function checkTheme(){
            if (document.querySelector("body").getAttribute('data-theme') === 'dark'){
                chartColor = "#F2EFF2"
            }else{
                chartColor = "#666"
            }
        }      
        

        checkTheme()

        setBarChartData({
        labels: catNames,
        datasets: [
            {
            label: 'Spent',
            data: catSpending,
            backgroundColor: ['#4D9DE0', '#EE4266', '#FFD23F', '#23B476', '#F89A3B', '#7F4ED9']
            },
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

        
    }

    tempBudgetAppFunc.current = budgetAppFunc


    useEffect(()=>{
    
        
        tempBudgetAppFunc.current()
        
    

    }, [activeTabIndex, activeTheme])



  return (
    
    <div className="background">

        

        <div className="pageTitle display-6 my-2"><h1 className='display-inline fw-bold me-2'>{title}</h1>  |Budget</div>
      
        
        {/* <div className="pageTitle display-6 my-2"><h1 className='display-inline fw-bold me-2'>{title}</h1>  |Budget</div> */}
        
        

        <Container className="graphs">
            <Container className="graphsContainer">
                
                <div className="barGraph">
                <Bar data={barChartData} options={barChartOptions}></Bar>
                </div>
                <div  className="donutGraph">
                <Doughnut data={donutChartData} options={donutChartOptions}></Doughnut>
                </div>
                <div className="dataContainer">
                <TotalBudgetCard title={title}/>
                </div>                   
            </Container>

        </Container>

    {/* Monthly Budgets Container */}
    <div className="budgets">

    

    <Container className="budgetsContainer my-4 mx-3">

        <Stack direction="horizontal" gap="2" className="mb-4">
        {/*Heading for The Budgets*/}
        <h1 className="me-auto">Categories</h1>

        {/* Buttons in heading */}
        <Button variant="primary" onClick={()=> setShowAddCategoryModal(true)}>Add Category</Button>
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
                if(category.budget === title){
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
                }
                 return(null) 
            })}

            {/* add uncategorized and total budget cards */}
            <UncategorizedBudgetCard onAddExpenseClick= {openAddExpenseModal} onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
            
        </div>
    </Container>

    </div>


    {/* MODALS */}
    <AddCategoryModal 
    show={showAddCategoryModal} 
    handleClose={()=> setShowAddCategoryModal(false)}
    budget={title}
    />
    <AddExpenseModal 
    show={showAddExpenseModal} 
    defaultBudgetId={addExpenseModalBudgetId}
    handleClose={()=> setShowAddExpenseModal(false)} 
    budget={title}
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
