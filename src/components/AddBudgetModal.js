import { Form, Modal, Button } from "react-bootstrap"
import {useRef} from "react"
import { useBudgets } from "../contexts/BudgetContext"

export default function AddBudgetModal({ show, handleClose}) {
    const newNameRef = useRef()
    const existingNameRef = useRef()
    const { addBudget, addTabBudget, budgets} = useBudgets()

    // function handleNewSubmit(e){
    //     addBudget({
    //         name: newNameRef.current.value
    //     })
    //     handleClose()
    //     console.log("addded budget")
    // }

    // function handleExistingSubmit(e){
    //     addTabBudget({
    //         name: existingNameRef.current.value
    //     })
    //     console.log("addded budget")
    //     handleClose()
        
    // }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form >
            <Modal.Header closeButton>
                <Modal.Title>Add Budget Tab</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Add New Budget</Form.Label>
                    <div className="newBudgetModalContainer">
                        <div className="budgetName">
                            <Form.Control ref={newNameRef} type="text" autoComplete="off" placeholder='Budget Name'/>
                        </div>
                        
                        <Button varient="primary" onClick={()=>addBudget({
                            name: newNameRef.current.value})}>Add New</Button>
                    </div>
                    
                    {budgets.length > 0 && <>
                        <Form.Label >Select Budget</Form.Label>
                        <div className="newBudgetModalContainer">

                            <Form.Select ref={existingNameRef} required>
                                {/* <option selected disabled hidden></option> */}
                                {budgets.map(budget =>(            
                                    <option key={budget.name} value={budget.name} selected>{budget.name}</option>
                                ))}
                            </Form.Select>
                        
                        
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button varient="primary" type="submit" onClick={()=>{
                                addTabBudget({
                                    name: existingNameRef.current.value
                                })
                            }}>Add Budget</Button>
                        </div>
                    
                    </>}
                    
                    
                    
                </Form.Group>
                
            </Modal.Body>
        </Form>
    </Modal>
  )
}