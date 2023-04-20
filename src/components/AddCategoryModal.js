import { Form, Modal, Button } from "react-bootstrap"
import {useRef} from "react"
import { useBudgets } from "../contexts/BudgetContext"

export default function AddCategoryModal({ show, handleClose, budget}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const { addCategory} = useBudgets()

    function handleSubmit(e){
        addCategory({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value), //parse from string to float
            budget: budget
        })
        handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" autoComplete="off" required maxLength={"15"}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Max Spending</Form.Label>
                    <Form.Control 
                        ref={maxRef} 
                        type="number" 
                        required 
                        min={0}
                        max={1000000} 
                        step={0.01}
                    />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button varient="primary" type="submit">Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}
