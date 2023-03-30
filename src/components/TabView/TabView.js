import React, { useEffect } from 'react'
import { useState } from 'react'
import './TabView.css'
import AddBudgetModal from '../AddBudgetModal'
import BudgetPage from "../../components/BudgetPage";
import {useBudgets} from "../../contexts/BudgetContext";


function TabView({ editable = false}) {

    const {budgets} = useBudgets()

    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const[allTabs, setAllTabs] = useState([{}])

    const NewTabButton = <div className="tabBtn" onClick={()=>createNewTab()}>+</div>

    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

    

    const NewTab = <div>
        <label>New Tab</label>
        <p>This is a new tab.</p>
    </div>

    const createNewTab = ()=> {
        console.log("push new tab")
        setShowAddBudgetModal(true)
        // const newTabs = allTabs
        // const title = budgets[budgets.length-1].name
        // newTabs.push({name: title, content: <BudgetPage title={title} budget={activeTabIndex}/>})
        // setAllTabs(newTabs)
        // setActiveTabIndex(newTabs.length - 1)
        
    }

    const deleteTab = (index)=> {
        console.log("delete this tab at index"+index)
        const newTabs = allTabs

    }

    const activateTab = (index) => {
        setActiveTabIndex(index)
    }

    useEffect(()=>{
        console.log(budgets)
        setAllTabs(budgets)
        setActiveTabIndex(allTabs.length -1)
        console.log(activeTabIndex)
        console.log(allTabs)
    }, [])

     console.log(allTabs)

  return (
    <div className='TabView'>
      {/* {title && <h4 className='title'>{title}</h4>} */}
      <div className="body">
        {budgets.length === 0 ? (
            <div className="tabs">
                <div></div>
                {editable ? NewTabButton : null}
            </div>
            
            ):(
            <div>
                <div className="tabs">
                    {allTabs.map((tab, index) =>(
                        <label 
                            key={index}
                            className={index === activeTabIndex ? "active-tab" : "tab"}
                            onClick = {()=> activateTab(index)}
                        >
                            {tab.name}
                            <div className="deleteTab" onClick={()=>deleteTab(index)}>&times;</div>
                            <div className='borderRight'></div>
                        </label>
                    ))}
                    {editable ? NewTabButton : null}
                </div>
                <div className="content">
                    <BudgetPage title={budgets[activeTabIndex].name}/>
                    <AddBudgetModal 
                        show={showAddBudgetModal} 
                        handleClose={()=> setShowAddBudgetModal(false)} 
                    />
                </div>
            </div>
        )}
      </div>
        
    </div>
  )
}

export default TabView

