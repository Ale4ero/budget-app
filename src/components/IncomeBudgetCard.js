import React from 'react'
import { Button, Stack } from 'react-bootstrap'
import { currencyFormatter } from "../utils"
import { useBudgets } from '../contexts/BudgetContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const trashIcon = <FontAwesomeIcon icon={faTrashCan} size="xs"/>

export default function IncomeBudgetCard({income, addIncomeClick, budget}) {

    const {deleteIncome} = useBudgets()
    const pageIncome = []

    for(var i = 0; i<income.length;i++){
        if(income[i].budget === budget){
            pageIncome.push(income[i])
        }
    }

    const total = pageIncome.reduce((total, income)=> total + income.amount, 0)


    
    // const date = moment()

    // const currentDate = date.format('MM/DD')


  return (
    <div className="incomeContainer my-3">
        <div className="incomeTitle">
            <h2 className="me-auto">Income</h2>
            <h4>{currencyFormatter.format(total)}</h4>
        </div>
        <Button className="addIncomeBtn mb-3" variant="primary" onClick={addIncomeClick}>Add Income</Button>
        <Stack direction="vertical" gap="1">
            {pageIncome.length>0 && <>
                <Stack direction="horizontal" gap="3" >
                    <div className='fs-6 ms-3 me-auto'>Amount</div>
                    <div className='fs-6 me-auto'>Date</div>
                </Stack>
            </>}
            {pageIncome.map(income => (
                // 
                <div className='incomeList' key={income.id}>
                    <div className="fs-3 me-auto">{currencyFormatter.format(income.amount)}</div>
                    <div className="fs-5 me-2">{income.date}</div>
                    <div>
                        <div className="deleteButton" onClick={()=> deleteIncome(income)}>
                            <i>{trashIcon}</i>
                        </div>
                        
                    </div>
                </div>
                    
            ))}
        </Stack>
                       
    </div>
  )
}
