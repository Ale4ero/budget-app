import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import './TabView.css'
import AddBudgetModal from '../AddBudgetModal'
import BudgetPage from "../../components/BudgetPage";
import {useBudgets} from "../../contexts/BudgetContext";



function TabView({ editable = false}) {

    const {budgets, setTabIndex} = useBudgets()

    const [activeTabIndex, setActiveTabIndex] = useState(localStorage.getItem('currentIndex'))
    const[allTabs, setAllTabs] = useState([{}])

    const NewTabButton = <div className="tabBtn" onClick={()=>setShowAddBudgetModal(true) }>+</div>

    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

    const [logClick, setLogClick] = useState(0)

    const tempTabFunc = useRef()
    




    const deleteTab = (index)=> {
        console.log(logClick)
        setLogClick(logClick+1)
        
        console.log("delete this tab at index "+index)
        const newTabs = allTabs
        newTabs.splice(index, 1)
        console.log("newTabs: "+newTabs)
        setAllTabs(newTabs)
        setActiveTabIndex(newTabs.length - 1)
        localStorage.setItem('currentIndex', newTabs.length - 1)
        

        if(localStorage.getItem("currentIndex") >= allTabs.length){
            console.log('set new tab index to')
            setTabIndex(allTabs.length - 1)
            activateTab(allTabs.length - 1)
        }
        
    }

    const activateTab = (index) => {
        index = index || 0
        // console.log("activate tab to index "+ index)
        setActiveTabIndex(index) //local
        setTabIndex(index) //useBudgets
    }

    const tabFunction = ()=>{
        setAllTabs(budgets)
        if (activeTabIndex === -1){
            var temp = budgets.length - 1
            console.log('since active tab is null set it to '+ temp)
            activateTab(budgets.length - 1)
        }else{
            setActiveTabIndex(localStorage.getItem("currentIndex"))
            // console.log("reload save tab at index"+ activeTabIndex)
            activateTab(activeTabIndex)
            
        }

        if(Number(localStorage.getItem("currentIndex")) === allTabs.length){
            console.log('set new tab index to')
            setTabIndex(allTabs.length - 1)
            activateTab(allTabs.length - 1)
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
        {budgets.length === 0 ? (
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
                            <div className="deleteTab" onClick={()=>deleteTab(index)}>&times;</div>
                            <div className='borderRight'></div>
                        </label>
                        
                    ))}
                    {editable ? NewTabButton : null}
                </div>
                <div className="content">   
          
                    <BudgetPage title={budgets[Number(activeTabIndex)]?.name} graphCategories={[]}/>

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

