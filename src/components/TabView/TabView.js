import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import './TabView.css'
import AddBudgetModal from '../AddBudgetModal'
import BudgetPage from "../../components/BudgetPage";
import {useBudgets} from "../../contexts/BudgetContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus} from '@fortawesome/free-solid-svg-icons'

const minusIcon = <FontAwesomeIcon icon={faCircleMinus} size='sm'/>

function TabView({ editable = false}) {

    const {budgets, setTabIndex, tabBudgets, removeTabBudget, activeTabIndex, deleteClick, setDeleteClick} = useBudgets()

    // const [activeTabIndex, setActiveTabIndex] = useState(localStorage.getItem('currentIndex'))
    const[allTabs, setAllTabs] = useState([{}])

    const NewTabButton = <div className="tabBtn" onClick={()=> addTab()}>+</div>

    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

    const [logClick, setLogClick] = useState(0)

    const tempTabFunc = useRef()
    

    function addTab(){
        setShowAddBudgetModal(true)

        
    }


    const deleteTab = (name, index)=> {
        console.log(logClick)
        setLogClick(logClick+1)
        
        console.log("delete this tab at index "+index)
        const newTabs = allTabs
        newTabs.splice(index, 1)
        removeTabBudget(name)
        console.log("newTabs: "+newTabs)
        setAllTabs(newTabs)
        setTabIndex(newTabs.length)
        setDeleteClick(deleteClick+1)
        
    }

    const activateTab = (index) => {
        index = index || 0
        // console.log("activate tab to index "+ index)
        // setActiveTabIndex(index) //local
        setTabIndex(index) //useBudgets
    }

    const tabFunction = ()=>{
        setAllTabs(tabBudgets)
        if (Number(activeTabIndex) === -1){
            var temp = tabBudgets.length - 1
            console.log('since active tab is null set it to '+ temp)
            activateTab(tabBudgets.length - 1)
        }else{
            // setActiveTabIndex(localStorage.getItem("currentIndex"))
            // console.log("reload save tab at index"+ activeTabIndex)
            activateTab(activeTabIndex)
            
        }

        if(Number(localStorage.getItem("currentIndex")) >= tabBudgets.length){
            var newIndex = tabBudgets.length - 1
            console.log('set new tab index to: '+newIndex)
            setTabIndex(newIndex)
            activateTab(newIndex)
        }
    }

    tempTabFunc.current = tabFunction

    useEffect(()=>{
        // console.log('tab use effect at index'+activeTabIndex)
        tempTabFunc.current()        
        
        // console.log("the active tab is: "+activeTabIndex)
    }, [allTabs, activeTabIndex, budgets, logClick, showAddBudgetModal])


  return (
    <div className='TabView'>
      {/* {title && <h4 className='title'>{title}</h4>} */}
      <div className="body">
        {tabBudgets.length === 0 ? (
            <>
            <div className="tabs">
                {editable ? NewTabButton : null}
                <AddBudgetModal 
                        show={showAddBudgetModal} 
                        handleClose={()=> setShowAddBudgetModal(false)} 
                />
            </div>
            <div className="newBudgetContainer">
                <div className='newBudgetButton'>
                    <h2 className=''>Add Budget</h2>
                    <div className="circle" onClick={()=>setShowAddBudgetModal(true)}>+</div>
                    
                </div>
            </div>
            </>
            
            
            ):(
            <div>
                <div className="tabs">
                    {allTabs.map((tab, index) =>(
                    
                        <label 
                            
                            key={index}
                            className={index === Number(activeTabIndex) ? "active-tab" : "tab"}
                            onClick = {()=> {
                                activateTab(index) //local    
                            }}
                        >
                            {tab.name}
                            <div className="deleteTab" onClick={()=>deleteTab(tab.name, index)}>{minusIcon}</div>
                            <div className='borderRight'></div>
                        </label>
                        
                    ))}
                    {editable ? NewTabButton : null}
                </div>
                <div className="content">   
                            
                    {console.log('active tab index: '+activeTabIndex)}
                    {console.log('console active tab index: '+ localStorage.getItem("currentIndex"))}
                    <BudgetPage title={tabBudgets[Number(activeTabIndex)]?.name} graphCategories={[]}/>

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

