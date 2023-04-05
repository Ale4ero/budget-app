import { Form, Modal, Button } from "react-bootstrap"
import {useRef} from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext"

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addExpense, categories} = useBudgets()

    function handleSubmit(e){
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value), //parse from string to float
            budgetId: budgetIdRef.current.value
        })

        handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} type="text" autoComplete="off" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                        ref={amountRef} 
                        type="number" 
                        required 
                        min={0} 
                        step={0.01}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="budgetId">
                    <Form.Label>Budget</Form.Label>
                    <Form.Select 
                        defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            <option id={UNCATEGORIZED_BUDGET_ID}> Uncategorized </option>
                            {categories.map(category =>(
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button varient="primary" type="submit">Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}
