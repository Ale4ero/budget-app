import BudgetPage from "./components/BudgetPage";
import Sidebar from "./components/Sidebar";
import TabView from "./components/TabView/TabView";
import './App.css'
import {useBudgets} from "./contexts/BudgetContext"
import AddBudgetModal from "./components/AddBudgetModal";
import { useState, useEffect } from 'react'

const firstPage = <BudgetPage title="March"/> 
const secondPage = <BudgetPage title="April"/>
const thirdPage = <BudgetPage title="May"/>

function App() {

  const {budgets} = useBudgets()

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

  useEffect(()=>{
    if(budgets.length === 0){
      console.log("no budgets. Add budget modal")
      setShowAddBudgetModal(true)
      
    }
  }, [])
  

  return (
    <>
    
    <div className="App">

      

      <Sidebar></Sidebar>
      <TabView editable={true}/> 
      <AddBudgetModal show={showAddBudgetModal} handleClose={()=> setShowAddBudgetModal(false)}/>

      
       
        



      

    </div>

    </>
  )
}

export default App;
