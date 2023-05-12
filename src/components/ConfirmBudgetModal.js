import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useBudgets} from '../contexts/BudgetContext'
import { Form } from 'react-bootstrap'


export default function ConfirmBudgetModal({show, handleClose,budgetName}) {

    const {deleteBudget} = useBudgets()
    const name = "Delete "+ budgetName +" Budget?"

    function handleSubmit(e){
      deleteBudget()
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
          <p>All categories and expenses in this budget will be deleted permanently.</p>
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