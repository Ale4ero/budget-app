import { Modal, Button, Stack, CloseButton } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext"
import { currencyFormatter } from "../utils"


export default function ViewExpensesModal({ budgetId, handleClose}) {
    const { getBudgetExpenses, categories, deleteExpense} = useBudgets()

    const category = UNCATEGORIZED_BUDGET_ID === budgetId ? {name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID} : categories.find(b=> b.id === budgetId)
    const expenses = getBudgetExpenses(budgetId)
    // console.log("in view expense: "+budget)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>
                <Stack direction="horizontal" gap="2">
                    <div>{category?.name} Expenses</div>
                </Stack>
            </Modal.Title>
            <CloseButton onClick={()=>{
                handleClose()
                window.location.reload()
            }}/>
        </Modal.Header>
        <Modal.Body>
            <Stack direction="vertical" gap="3">
                {expenses.map(expense => (
                    <Stack direction="horizontal" gap="2" key={expense.id}>
                        <div className="me-auto fs-4">{expense.description}</div>
                        <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                        <div>
                            <Button onClick={()=>deleteExpense(expense)} size="sm" variant="outline-danger">
                                &times;
                            </Button>
                        </div>
                    </Stack>
                ))}
            </Stack>
        </Modal.Body>
    </Modal>
  )
}
