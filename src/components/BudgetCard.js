import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const trashIcon = <FontAwesomeIcon icon={faTrashCan} size="xs"/>


export default function BudgetCard({name, amount, max, gray, hideButtons, onAddExpenseClick, onViewExpensesClick, onDeleteBudgetClick, budgetId}) {
  

    const classNames = ["budgetCard "]

    if(amount > max){
        classNames.push("bg-danger", "bg-opacity-10")
    }else if (gray){
        classNames.push("bg-light")
    }
    
    return (
        <Card className={classNames.join(" ")}>
            <Card.Body className="budgetCard">
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)} 
                        {/* only disply max if there is a max, uncategorized doesnt have a max */}
                        {max && (
                            <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>
                        )}
                        
                        {!hideButtons && (
                            <div className="deleteButton" onClick={onDeleteBudgetClick}><i>{trashIcon}</i></div>  
                        )}
                    </div>
                </Card.Title>
                {max&&(
                    <ProgressBar className="rounded-pill"
                    variant={getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                    ></ProgressBar>
                )}
                
                {/* {!hideButtons &&( */}
                    <Stack direction="horizontal" gap={2} className="mt-4">
                    <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>Add Expense</Button>
                    <Button variant="outline-secondary" onClick={onViewExpensesClick}>View Expense</Button>
                    </Stack>
                {/* )} */}
                
            </Card.Body>
        </Card>
    )
}


function getProgressBarVariant(amount, max){
    const ratio = amount / max;
    if (ratio < .5) return "primary"
    if (ratio < .75) return "warning"
    return "danger"
}