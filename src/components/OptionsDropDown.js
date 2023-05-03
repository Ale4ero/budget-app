import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons'

const trashIcon = <FontAwesomeIcon icon={faTrashCan} size="sm"/>
const penIcon = <FontAwesomeIcon icon={faPen} size="sm"/>

export default function OptionsDropDown({onDeleteBudgetClick}) {
  return (
    <>
    
    <div className='optionsDropDown'>
        <div className='optionsItemEdit'>Edit <i className='mx-2'>{penIcon}</i></div>
        <div className='optionsItemDelete' onClick={onDeleteBudgetClick}>Delete <i className='mx-1'>{trashIcon}</i></div>
    </div>
    </>   
  )
}
