import { Form, Modal, Button } from "react-bootstrap"
import {useRef} from "react"
import { useBudgets } from "../contexts/BudgetContext"

export default function AddBudgetModal({ show, handleClose}) {
    const newNameRef = useRef()
    const existingNameRef = useRef()
    const budgetGoalRef = useRef()
    const { addBudget, addTabBudget, budgets, setTabIndex} = useBudgets()

    // function handleNewSubmit(e){
    //     addBudget({
    //         name: newNameRef.current.value
    //     })
    //     handleClose()
    //     console.log("addded budget")
    // }

    function handleNewSubmit(e){
            addBudget({
                name: newNameRef.current.value.trim(),
                goal: parseFloat(budgetGoalRef.current.value)
            })
            addTabBudget({
                name: newNameRef.current.value
            })
            for(var i = 0; i < budgets.length;i++){
                if(budgets[i].name === newNameRef.current.value){
                    setTabIndex(i)
                    console.log('set tab index to:'+i+'from modal.')
                }
            }
            handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose} className="modal-lg">
        <Form onSubmit={handleNewSubmit}>
            <div className="closeModalBtn" onClick={()=>handleClose()}>&times;</div>
            <Modal.Header className="modalHeader">
                <Modal.Title className="modalTitle">Add Budget Tab</Modal.Title>
                <div className="modalDescription">Create a New Budget {budgets.length>0 &&<>or Select an Existing Budget</>}</div>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-1 modalContainer" controlId="name" >
                    <div className="createBudgetCont">
                        <Form.Label><h5>Create New Budget</h5></Form.Label>
                        <div className="newBudgetModalContainer">
                            <div className="budgetName">
                                <Form.Label className="formLabel">Budget Name</Form.Label>
                                <Form.Control required ref={newNameRef} type="text" autoComplete="off" maxLength={"10"} placeholder='ex. July (10 char max)'/>
                            </div>  
                            <div className="budgetGoal">
                                <Form.Label className="formLabel">Budget Goal</Form.Label>
                                <Form.Control 
                                    required 
                                    type="number" 
                                    autoComplete="off"
                                    min={0}
                                    max={1000000}
                                    ref={budgetGoalRef}/>
                            </div>
                                
                                                  
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button type="submit">Create New</Button>
                        </div>
                    </div>
                    

                
                    {budgets.length > 0 && <>
                    <div className="dividerLine"></div>
                    <div className="selectBudgetCont">
                        <Form.Label><h5>Select Existing Budget</h5></Form.Label>
                        <div className="newBudgetModalContainer">
                            <Form.Select ref={existingNameRef} required>
                                {budgets.map(budget =>(            
                                    <option key={budget.name} value={budget.name} >{budget.name}</option>
                                ))}
                            </Form.Select> 
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button varient="primary" onClick={()=>{
                                addTabBudget({
                                    name: existingNameRef.current.value
                                })
                                // for(var i = 0; i < budgets.length;i++){
                                //     if(budgets[i].name === existingNameRef.current.value){
                                //         setTabIndex(i)
                                //         console.log('set tab index to:'+i+'from modal.')
                                //     }
                                // }
                                handleClose()
                            }}>Add Existing</Button>       
                        </div>
                    </div>
                        
                    
                    </>}
                </Form.Group>                   
            </Modal.Body>
        </Form>
    </Modal>
  )
}