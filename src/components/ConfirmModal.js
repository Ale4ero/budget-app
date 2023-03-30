import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useBudgets} from '../contexts/BudgetContext'


export default function ConfirmModal({show, handleClose, budgetId, budgetName}) {

    const {deleteCategory} = useBudgets()
    const name = "Delete "+ budgetName +" Budget?"

  return (
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header> 
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>All expenses will be moved into "Uncategorized" category.</p>
            <Button className='mx-3' variant="primary" onClick={()=>{
                deleteCategory(budgetId)
            }}>
            Yes
            </Button>
            <Button variant="danger" onClick={handleClose}>
            No
            </Button>
        </Modal.Body>
        
         
        
        </Modal>
    </>
  )
}

