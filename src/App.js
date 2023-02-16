import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";

function App() {
  //useState for addCategory button
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

  //useState for addExpense button
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

  //useState for viewExpenses button FOR SPECIFIC BUDGET
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()

  //useState for addExpense button FOR SPECIFIC BUDGET
  const [addExpenseModalBudgetId, setAddExpenseModalModalId] = useState()

  //getting budgets from useBudgets context
  const {budgets, getBudgetExpenses} = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalModalId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={()=> setShowAddBudgetModal(true)}>Add Category</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack> 
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
        }}>
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
        <UncategorizedBudgetCard 
        onAddExpenseClick= {openAddExpenseModal}
        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
        <TotalBudgetCard/>
        </div>


      </Container>
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
    </>
  )
}

export default App;
