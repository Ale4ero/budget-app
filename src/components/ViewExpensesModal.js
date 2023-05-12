import { Modal, Button, Stack, CloseButton } from "react-bootstrap"
import {useBudgets } from "../contexts/BudgetContext"
import { currencyFormatter } from "../utils"


export default function ViewExpensesModal({ categoryId, handleClose}) {
    const { getBudgetExpenses, categories, deleteExpense} = useBudgets()

    //get category using category id 
    const category = categories.find(category=> category.id === categoryId)
    //get expenses in that category id
    const expenses = getBudgetExpenses(categoryId)

  return (
    <Modal show={categoryId != null} onHide={handleClose}>
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
