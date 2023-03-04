import { useState, useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import Sidebar from "./components/Sidebar";
import './App.css';
import {Chart as chartjs, CategoryScale, LinearScale, BarElement, Tooltip, Legend} from 'chart.js/auto';

import { Bar, Doughnut } from 'react-chartjs-2';

// chartjs.register(
//   CategoryScale, LinearScale, BarElement, Tooltip, Legend
// )



function App() {
  //useState for addCategory button
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

  //useState for addExpense button
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

  //useState for viewExpenses button FOR SPECIFIC BUDGET
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()

  //useState for addExpense button FOR SPECIFIC BUDGET
  const [addExpenseModalBudgetId, setAddExpenseModalModalId] = useState()

  //getting budgets and expenses from useBudgets context
  const {budgets, getBudgetExpenses} = useBudgets()

  
 const catNames= []
 const catSpending = []
 const catMax = []



  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalModalId(budgetId)
  }


  

function getChartData(){
  for(var i = 0; i < budgets.length; i++ ){  
    const amount = getBudgetExpenses(budgets[i].id).reduce(
      (total, expense) => total + expense.amount, 0)
    //storing name of budget in array 'catNames[]'
    catNames[i] = budgets[i].name 
    catMax[i] = budgets[i].max 
    catSpending[i] = amount
  }
}

  const [barChartData, setBarChartData] = useState({
    datasets: []
  })
  const [donutChartData, setDonutChartData] = useState({
    datasets: []
  })

  const [barChartOptions, setBarChartOptions] = useState({})
  const [donutChartOptions, setDonutChartOptions] = useState({})


  useEffect(()=>{
  

    getChartData()

    setBarChartData({
      labels: catNames,
      datasets: [
        {
          label: 'Spent',
          data: catSpending,
          backgroundColor: ['#4D9DE0', '#EE4266', '#FFD23F', '#23B476', '#F89A3B']
        },
        // {
        //   label: 'Budget',
        //   data: catMax,
        //   backgroundColor: '#F89A3B'
        // }
      ]
    })

    setDonutChartData({
      labels: catNames,
      datasets: [
        {
          label: 'Spent',
          data: catSpending,
          backgroundColor: ['#4D9DE0', '#EE4266', '#FFD23F', '#23B476', '#F89A3B']
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
          beginAtZero: true
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
            }
          }
        }
        
        
      }
    })

    setDonutChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      },
    })
  }, [])

  return (
    <>
    
    <div className="App">

    
      <Sidebar></Sidebar>


      <div className="graphsContainer">
        <div className="topGraphs">
          <div className="barGraph">
            <Bar data={barChartData} options={barChartOptions}></Bar>
          </div>
          <div  className="donutGraph">
            <Doughnut data={donutChartData} options={donutChartOptions}></Doughnut>
          </div>

        </div>
          
                          
      </div>

      {/* Monthly Budgets Container */}
      <div className="budgets">

        
      
        <Container className="my-4" >

          <Stack direction="horizontal" gap="2" className="mb-4">
            {/*Heading for The Budgets*/}
            <h1 className="me-auto">Monthly Budgets</h1>

            {/* Buttons in heading */}
            <Button variant="primary" onClick={()=> setShowAddBudgetModal(true)}>Add Category</Button>
            {/* <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button> */}
          </Stack> 

          {/* style for the div for budget cards */}
          <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start",
          }}>
            {/* For each budget create a budget card */}
            {budgets.map(budget =>{
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount, 0)
              return (
                      <BudgetCard 
                        key={budget.id}
                        name={budget.name} 
                        amount={amount} 
                        max={budget.max}
                        onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                        onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                      />
                      )   
            })}

            {/* add uncategorized and total budget cards */}
            <UncategorizedBudgetCard onAddExpenseClick= {openAddExpenseModal} onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
            <TotalBudgetCard/>
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
      

    </div>

    </>
  )
}

export default App;
