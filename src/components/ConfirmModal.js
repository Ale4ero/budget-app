import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useBudgets} from '../contexts/BudgetContext'
import { Form } from 'react-bootstrap'


export default function ConfirmModal({show, handleClose, budgetId, budgetName}) {

    const {deleteCategory} = useBudgets()
    const name = "Delete "+ budgetName +" Category?"

    function handleSubmit(e){
      deleteCategory(budgetId)
      handleClose()
    }

  return (
    <>
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header> 
              <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
          <Modal.Body>
          <p>All expenses will be moved into "Uncategorized" category.</p>
              <Button className='mx-3' variant="primary" type='submit'>
                Yes
              </Button>
              <Button variant="danger" onClick={handleClose}>
                No
              </Button>
          </Modal.Body>

          </Form>     
            
        </Modal>
    </>
  )
}

