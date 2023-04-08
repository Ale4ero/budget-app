import React, { useEffect } from 'react'
import { useState } from 'react'
import './TabView.css'
import AddBudgetModal from '../AddBudgetModal'
import BudgetPage from "../../components/BudgetPage";
import {useBudgets} from "../../contexts/BudgetContext";



function TabView({ editable = false}) {

    const {budgets, setTabIndex} = useBudgets()

    const [activeTabIndex, setActiveTabIndex] = useState(localStorage.getItem('currentIndex'))
    const[allTabs, setAllTabs] = useState([{}])

    const NewTabButton = <div className="tabBtn" onClick={()=>createNewTab()}>+</div>

    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)


    



    const createNewTab = ()=> {
        console.log("push new tab")
        setShowAddBudgetModal(true)
        // const newTabs = allTabs
        // const title = budgets[budgets.length-1].name
        // newTabs.push({name: title, content: <BudgetPage title={title} budget={activeTabIndex}/>})
        // setAllTabs(newTabs)
        
    }

    const deleteTab = (index)=> {
        if(allTabs.length < 2){
            alert("You must have one active tab!")
        }else{
            console.log("delete this tab at index "+index)
            const newTabs = allTabs
            newTabs.splice(index, 1)
            console.log("newTabs: "+newTabs)
            setAllTabs(newTabs)
        }
        
    }

    const activateTab = (index) => {
        index = index || 0
        // console.log("activate tab to index "+ index)
        setActiveTabIndex(index) //local
        setTabIndex(index) //useBudgets
    }

    useEffect(()=>{
        // console.log('tab use effect at index'+activeTabIndex)
        setAllTabs(budgets)
        if (activeTabIndex === -1){
            // console.log('since active tab is null set it to '+ budgets.length - 1)
            activateTab(budgets.length - 1)
        }else{
            setActiveTabIndex(localStorage.getItem("currentIndex"))
            // console.log("reload save tab at index"+ activeTabIndex)
            activateTab(activeTabIndex)
        }
        
        
        // console.log("the active tab is: "+activeTabIndex)
    }, [allTabs, activeTabIndex, budgets])


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
    

                    <BudgetPage title={budgets[activeTabIndex]?.name} graphCategories={[]}/>
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

