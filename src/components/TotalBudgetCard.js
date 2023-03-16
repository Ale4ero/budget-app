// import { useBudgets } from "../contexts/BudgetContext";
// import BudgetCard from "./BudgetCard";

// export default function TotalBudgetCard() {
//     const { expenses, budgets } = useBudgets()
//     const amount = expenses.reduce((total, expense) => total + expense.amount, 0)

//     const max = budgets.reduce((total, budget) => total + budget.max, 0)

//     if (max === 0) return null
    
//   return <BudgetCard amount={amount} name="Total"  max={max} hideButtons/>
// }

import { useBudgets } from "../contexts/BudgetContext";
import { Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function TotalBudgetCard() {
      const { expenses, budgets } = useBudgets()
      const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  
      const max = budgets.reduce((total, budget) => total + budget.max, 0)

      const free = max - amount
  
      if (max === 0) return (
        <>
          <div style={{height: "100%"}}>
            <div className="center">
              <p>No Data</p>
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
              {currencyFormatter.format(amount)}                        
              <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>
            </div>
          </Card.Title>

          <ProgressBar  className="rounded-pill"
                        variant={getProgressBarVariant(amount, max)}
                        min={0}
                        max={max}
                        now={amount}
          ></ProgressBar>

          <div className="totalDetails">
            <div className="rowDetails d-flex my-4">
              <div  className="me-auto ">Amount Spent:</div>
              <div >{currencyFormatter.format(amount)}</div>
            </div>
            <div className="rowDetails d-flex mb-4">
              <div  className="me-auto">Total Budget:</div>
              <div >{currencyFormatter.format(max)}</div>
            </div>
            <div className="rowDetails d-flex ">
              <div  className="me-auto">Free to Spend:</div>
              <div >{currencyFormatter.format(free)}</div>
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