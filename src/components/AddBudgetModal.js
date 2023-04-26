import { Form, Modal, Button } from "react-bootstrap"
import {useRef} from "react"
import { useBudgets } from "../contexts/BudgetContext"

export default function AddBudgetModal({ show, handleClose}) {
    const newNameRef = useRef()
    const existingNameRef = useRef()
    const { addBudget, addTabBudget, budgets, setTabIndex} = useBudgets()

    // function handleNewSubmit(e){
    //     addBudget({
    //         name: newNameRef.current.value
    //     })
    //     handleClose()
    //     console.log("addded budget")
    // }

    function handleExistingSubmit(e){
        addTabBudget({
            name: existingNameRef.current.value
        })
        for(var i = 0; i < budgets.length;i++){
            if(budgets[i].name === existingNameRef.current.value){
                setTabIndex(i)
                console.log('set tab index to:'+i+'from modal.')
            }
        }
        handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleExistingSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Add Budget Tab</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name" >
                    <Form.Label>Create New Budget</Form.Label>
                    <div className="newBudgetModalContainer">
                        <div className="budgetName">
                            <Form.Control ref={newNameRef} type="text" autoComplete="off" maxLength={"10"} placeholder='Enter Name ex. July (10 char max)'/>
                        </div>
                        
                        <Button className="btn-secondary" onClick={()=>{
                            if(newNameRef.current.value.trim() !==""){
                                addBudget({

                                    name: newNameRef.current.value.trim()
                                    })
                            }
                            }}>Create New</Button>
                    </div>
                
                    {budgets.length > 0 && <>
                        <Form.Label >Select From Budget List</Form.Label>
                        <div className="newBudgetModalContainer">
                            <Form.Select ref={existingNameRef} required>
                                {/* <option selected disabled hidden></option> */}
                                {budgets.map(budget =>(            
                                    <option key={budget.name} value={budget.name} selected>{budget.name}</option>
                                ))}
                            </Form.Select> 
                        </div>

                        <div className="d-flex justify-content-end">
                                <Button varient="primary" type="submit">Add Budget Tab</Button>       
                        </div>
                    
                    </>}
                </Form.Group>    
                    
                    
                
                
            </Modal.Body>
        </Form>
    </Modal>
  )
}