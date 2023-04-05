import { Form, Modal, Button } from "react-bootstrap"
import {useRef} from "react"
import { useBudgets } from "../contexts/BudgetContext"

export default function AddBudgetModal({ show, handleClose}) {
    const nameRef = useRef()
    const { addBudget} = useBudgets()

    function handleSubmit(e){
        addBudget({
            name: nameRef.current.value
        })
        handleClose()
        console.log("addded budget")
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Budget Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" required/>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button varient="primary" type="submit">Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}