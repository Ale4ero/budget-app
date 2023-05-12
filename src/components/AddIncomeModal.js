import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useBudgets } from '../contexts/BudgetContext'
import moment from 'moment'


export default function AddIncomeModal({show, handleClose, budget}) {
    const { addIncome } = useBudgets()
    const amountRef = useRef()
    const date = moment()
    const currDate = date.format('MM/DD')

    function handleSubmit(e){
        addIncome({
            budget: budget,
            amount: parseFloat(amountRef.current.value),
            date: currDate
        })

        handleClose()
    }
    
  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Add {budget} Income</Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                    ref={amountRef}
                    type='number'
                    required
                    min={.01}
                    step={0.01}
                    max={1000000}
                    />
                </Form.Group>
                <div className="d-flex justify-content-end mt-3">
                    <Button varient="primary" type="submit">Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}

