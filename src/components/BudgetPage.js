import { useState, useEffect, useRef} from "react";
import { Button, Stack } from "react-bootstrap";
import AddCategoryModal from "./AddCategoryModal";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";
import BudgetCard from "./BudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";
import { useBudgets } from "../contexts/BudgetContext";
import ConfirmModal from "./ConfirmModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faBullseye, faSackDollar, faFileInvoiceDollar, faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import '../App.css';
import {Chart as chartjs, CategoryScale, LinearScale, BarElement, Tooltip, Legend} from 'chart.js/auto';
import ChartDataLabels from'chartjs-plugin-datalabels';




import { Bar, Doughnut } from 'react-chartjs-2';
import OptionsDropDown from "./OptionsDropDown";
import ConfirmBudgetModal from "./ConfirmBudgetModal";
import AddIncomeModal from "./AddIncomeModal";
import IncomeBudgetCard from "./IncomeBudgetCard";
import TitleInfoCard from "./TitleInfoCard";



const trashIcon = <FontAwesomeIcon icon={faTrashCan} />
const earningsIcon = <FontAwesomeIcon icon={faSackDollar} size="2xl"/>
const goalIcon = <FontAwesomeIcon icon={faBullseye} size="2xl"/>
const expenseIcon = <FontAwesomeIcon icon={faFileInvoiceDollar} size="2xl"/>
const incomeIcon = <FontAwesomeIcon icon={faMoneyBill} size="2xl"/>

chartjs.register(
  CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels
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
    const [addExpenseModalBudgetName, setAddExpenseModalModalName] = useState()

    //show confirm modal for delete category
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [confirmModalCategoryId, setConfirmModalCategoryId] = useState()

    const [confirmModalCategoryName, setConfirmModalCategoryName] = useState()

    //confirm modal for delete Budget
    const [showConfirmBudgetModal, setShowConfirmBudgetModal] = useState(false)

    const [confirmBudgetModalName, setConfirmBudgetModalName] = useState()

    //income modal
    const [showIncomeModal, setShowIncomeModal] = useState(false)

    //show state for budget options
    const [openSettings, setOpenSettings] = useState(false)

    const [budgetIncomeTotal, setBudgetIncomeTotal] = useState()

    const [budgetExpenseTotal, setBudgetExpenseTotal] = useState()

    const [budgetEarningsTotal, setBudgetEarningsTotal] = useState()

    


    //getting budgets, categroies and expenses from useBudgets context
    const {categories, getBudgetExpenses, activeTabIndex, activeTheme, income, budgets, deleteClick} = useBudgets()

    const curBudget = budgets.find(budget => budget.name === title)
    
    const tempBudgetAppFunc = useRef()


    function openAddExpenseModal(categoryId, categoryName){
        setShowAddExpenseModal(true)
        setAddExpenseModalModalId(categoryId)
        setAddExpenseModalModalName(categoryName)
    }

    function openConfirmModal(categoryId, categoryName){
        setShowConfirmModal(true)
        setConfirmModalCategoryId(categoryId)
        setConfirmModalCategoryName(categoryName)
    }

    function openConfirmBudgetModal(budgetName){
        setShowConfirmBudgetModal(true)
        setConfirmBudgetModalName(budgetName)
    }
    
    

    const [barChartData, setBarChartData] = useState({
        datasets: []
    })
    const [donutChartData, setDonutChartData] = useState({
        datasets: []
    })

    const [barChartOptions, setBarChartOptions] = useState({})
    const [donutChartOptions, setDonutChartOptions] = useState({})


    
    // initialize arrays for chartData 
    let catNamesBar = useRef([])
    let catNamesDonut = useRef([])
    let catSpending =  useRef([])
    let catMax =  useRef([])
    

    // console.log('IN BUDGET:' + title)
    
    // console.log('WE ARE IN INDEX: '+activeTabIndex)

    // console.log('THEME IS: '+ activeTheme)
    let budgetIncomeList = useRef([])

    
    

    const budgetAppFunc = ()=>{
        //default chartColor
        var chartColor = "#666"   

        //reset arrays for chartData
        catNamesBar = []
        catNamesDonut = []
        catSpending = []
        catMax = []
        budgetIncomeList = []
        
        //function to retrieve data for charts
        function getChartData(){
            catNamesBar.length = 0
            catNamesDonut.length = 0
            catSpending.length = 0
            catMax.length = 0
    
            var j = 0
            for(var i = 0; i < categories.length; i++ ){  
                if(categories[i].budget === title){
                    
                    const amount = getBudgetExpenses(categories[i].id).reduce(
                        (total, expense) => total + expense.amount, 0)
                        //storing name of budget in array 'catNames[]'
                    catNamesBar[j] = categories[i].name 
                    catNamesDonut[j] = categories[i].name 
                    catMax[j] = categories[i].max 
                    catSpending[j] = amount
                    j++
                                 
                }        
            }
            // const maxSum = catMax.reduce((total, num)=> total + num, 0)

            // const unused = curBudget?.goal - maxSum

            // catMax.push(unused)
            // catNamesDonut.push('Unused')
              
        }
        getChartData()
        
        //function to check theme of app
        function checkTheme(){
            if (document.querySelector("body").getAttribute('data-theme') === 'dark'){
                chartColor = "#F2EFF2"
            }else{
                chartColor = "#666"
            }
        }      
        checkTheme()

        //set data for bar chart
        setBarChartData({
        labels: catNamesBar,
        datasets: [
            {
            label: 'Spent',
            data: catSpending,
            backgroundColor: ['#4D9DE0', '#EE4266', '#FFD23F', '#23B476', '#F89A3B', '#7F4ED9']
            },
        ]
        })
        
        //set donut chart data
        setDonutChartData({
        labels: catNamesDonut,
        datasets: [
            {
            label: 'Budget',
            data: catMax,
            backgroundColor: ['#4D9DE0', '#EE4266', '#FFD23F', '#23B476', '#F89A3B', '#7F4ED9'],
            borderColor : "rgba(0,0,0,0)"
            },
        ]
        })

        //set bar chart options
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
                },
                datalabels: {
                    color: '#363C4F',
                    formatter: (value)=>{
                        return '$'+value
                    }
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

        //set options for donut chart
        setDonutChartOptions({
            responsive: true,
            plugins: {
                legend: {
                position: 'top',
                labels: {
                    color: chartColor
                }
                },
                datalabels: {
                    color: '#363C4F',
                    formatter: (value, context) => {
                        const datapoints = context.chart.data.datasets[0].data;
                        const totalvalue = datapoints.reduce((total, datapoint)=>total + datapoint, 0)
                        const percValue = (value / totalvalue * 100).toFixed(1)

                        return percValue+'%';
                    }
                }
            },
            // plugins: [ChartDataLabels]
        }) 
        
        income.map(income=>{
            income.budget === title && budgetIncomeList.push(income)
            return(null)
        })
        const incomeTotal = budgetIncomeList.reduce((total, income)=>total+ income.amount, 0)
        setBudgetIncomeTotal(incomeTotal)

        const expenseTotal = catSpending.reduce((total, amount)=> total + amount, 0)
        setBudgetExpenseTotal(expenseTotal)

        const earningsTotal = incomeTotal - expenseTotal
        setBudgetEarningsTotal(earningsTotal)

        if(earningsTotal < 0) setBudgetEarningsTotal(0)
    }

    tempBudgetAppFunc.current = budgetAppFunc


    useEffect(()=>{   
        tempBudgetAppFunc.current()
    }, [activeTabIndex, activeTheme, income, deleteClick])


  return (
    
    // background div sits behind everything
    <div className="background">

        {/* if openSettings is true show OptionsDropDown */}
        {openSettings && <>
            <div className="blankSpace" onClick={()=>setOpenSettings((prev)=>!prev)}></div>
            <OptionsDropDown 
            onDeleteBudgetClick={()=>openConfirmBudgetModal(title)}/>
        </>}

        {/* Budget Title */}
        <div className="pageTitleContainer">
            <div className="pageTitle display-6 my-2 ">
                <h1 className='display-inline fw-bold me-2'>{title}</h1>|Budget
            </div>
            <div className="deleteIcon" onClick={()=>openConfirmBudgetModal(title)}><i>{trashIcon}</i></div>
            <TitleInfoCard
                mainInfo={curBudget?.goal}
                description={'Budget Goal'}
                icon={goalIcon}
            />
            <TitleInfoCard
                mainInfo={budgetExpenseTotal?.toFixed(2)}
                description={'Expenses'}
                icon={expenseIcon}
            />
            <TitleInfoCard
                mainInfo={budgetIncomeTotal?.toFixed(2)}
                description={'Income'}
                icon={incomeIcon}
            />
            <TitleInfoCard
                mainInfo={budgetEarningsTotal?.toFixed(2)}
                description={'Earnings'}
                icon={earningsIcon}
            />
        </div>
        
          

        {/* Budget Contnet */}
        <div className="budgetContentContainer">
            <div className="budgetContent">
                {/* graphs */}
                <div className="barGraph">
                    <div className="graphTitle">
                        <h5>Expenses</h5>
                    </div>
                    <div className="graphBody">
                        <Bar data={barChartData} options={barChartOptions}></Bar>
                    </div>
                    
                    
                    
                </div>
                <div  className="donutGraph">
                    <div className="graphTitle">
                        <h5>% of Budget Goal</h5>
                    </div>
                    <div className="graphBody">
                        <Doughnut data={donutChartData} options={donutChartOptions}></Doughnut>
                    </div>
                    
                </div>
                <div className="dataContainer">
                    <TotalBudgetCard title={title}/>
                </div>

                {/* budget cards */}
                <div className="budgetsContainer my-3">

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
                            if(category.budget === title){
                                return (
                                    <BudgetCard 
                                    key={category.id}
                                    name={category.name} 
                                    amount={amount} 
                                    max={category.max}
                                    onAddExpenseClick={() => openAddExpenseModal(category.id, category.name)}
                                    onViewExpensesClick={() => setViewExpensesModalBudgetId(category.id)}
                                    onDeleteCategoryClick={()=>openConfirmModal(category.id, category.name)}
                                    budgetId={id}
                                    />
                                ) 
                            }
                            return(null) 
                        })}                
                    </div>
                </div>

                {/* Income  */}
                <IncomeBudgetCard
                    income={income}
                    addIncomeClick={()=>setShowIncomeModal(true)}
                    budget={title}
                />

            </div>
        </div>
        
        {/* <Container className="graphsContainer">
                               
        </Container> */}

        {/* Monthly Budgets Container */}
        {/* <div className="budgets">


        </div> */}
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
        budgetName={addExpenseModalBudgetName}
        />

        <ViewExpensesModal 
        categoryId={viewExpensesModalBudgetId}
        handleClose={()=> setViewExpensesModalBudgetId()} 
        />

        <ConfirmModal
        show={showConfirmModal}
        handleClose = {()=> setShowConfirmModal(false)}
        categoryId={confirmModalCategoryId}
        categoryName={confirmModalCategoryName}
        />

        <ConfirmBudgetModal
        show={showConfirmBudgetModal}
        handleClose = {()=> setShowConfirmBudgetModal(false)}
        budgetName={confirmBudgetModalName}
        />

        <AddIncomeModal
        show={showIncomeModal}
        handleClose = {()=> setShowIncomeModal(false)}
        budget={title}
        />
    </div>
  )
}
