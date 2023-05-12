import { useBudgets } from "../contexts/BudgetContext";
import { Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter } from "../utils";


export default function TotalBudgetCard({title}) {
      const { expenses, categories, budgets, income } = useBudgets()
      const pageExpenses = []
      const pageCategories = []
      const pageBudgets = []
      const pageIncome = []
    
      expenses.map(expense =>{
        if(expense.budget === title){
          pageExpenses.push(expense)
        }
        return(null)
      })

      categories.map(category =>{
        if(category.budget === title){
          pageCategories.push(category)
        }
        return(null)
      })

      income.map(income=>{
        if(income.budget === title){
          pageIncome.push(income)
        }
        return(null)
      })
      
      const expenseAmount = pageExpenses.reduce((total, pageExpenses) => total + pageExpenses.amount, 0)

      budgets.map(budget =>{
        if(budget.name === title){
          pageBudgets.push(budget)
        }
        return(null)
      })

      const goal = pageBudgets.reduce((total, pageBudgets) => total + pageBudgets.goal, 0)
  
      // const budgeted = pageCategories.reduce((total, pageCategories) => total + pageCategories.max, 0)

      // const incomeAmt = pageIncome.reduce((total, pageIncome) => total + pageIncome.amount, 0)

      var freeToSpend = goal - expenseAmount

      if(freeToSpend < 0 ) freeToSpend = 0

      // const leftToBudget = goal - budgeted
  
      if (goal === 0) return (
        <>
          <div style={{height: "100%"}}>
            <div className="center">
              <h3>No Data</h3>
            </div>            
          </div>
            
        </>
      )

  
      
    return (
      <Card style={{height: "100%"}}>
        <Card.Body className="budgetCard">
          <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3 budgetCard">
            <div style={{ fontSize: "25px"}} className="me-2 fw-bold ">Total</div>
            <div className="d-flex align-items-baseline">
              {currencyFormatter.format(expenseAmount)}                        
              <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(goal)}</span>
            </div>
          </Card.Title>

          <ProgressBar  className="rounded-pill"
                        variant={getProgressBarVariant(expenseAmount, goal)}
                        min={0}
                        max={goal}
                        now={expenseAmount}
          ></ProgressBar>

          <div className="totalDetails">
            <div className="rowDetails d-flex my-4">
              <div  className="me-auto">Status:</div>
              <div className={getStatusStyle(expenseAmount, goal)}>{getBudgetStatus(expenseAmount, goal)}</div>
            </div>
            <div className="rowDetails d-flex mb-4">
              <div  className="me-auto">Budget Goal:</div>
              <div >{currencyFormatter.format(goal)}</div>
            </div>
            {/* <div className="rowDetails d-flex mb-4">
              <div  className="me-auto ">Expenses:</div>
              <div >{currencyFormatter.format(amount)}</div>
            </div> */}
            {/* <div className="rowDetails d-flex mb-4">
              <div  className="me-auto ">Income:</div>
              <div >{currencyFormatter.format(incomeAmt)}</div>
            </div> */}
            <div className="rowDetails d-flex mb-4">
              <div  className="me-auto">Free to Spend:</div>
              <div >{currencyFormatter.format(freeToSpend)}</div>
            </div>
            
            
           
          </div>

        </Card.Body>        
      </Card>
    )
  }

  function getProgressBarVariant(amount, max){
    const ratio = amount / max;
    if (ratio < .5) return "primary"
    if (ratio < .75) return "warning"
    return "danger"
  }

  function getBudgetStatus(expenses, goal){
    const toSpend = goal - expenses

    if(toSpend >= 0) return "Under Budget"
    return "Over Budget"
  }

  function getStatusStyle(expenses, goal){
    const toSpend = goal - expenses
    if(toSpend >= 0) return "bg-success statusContainer"
    return "bg-danger statusContainer"
  }