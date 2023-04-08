import Sidebar from "./components/Sidebar";
import TabView from "./components/TabView/TabView";
import './App.css'
import {useBudgets} from "./contexts/BudgetContext"
import AddBudgetModal from "./components/AddBudgetModal";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Education from "./components/Education";
import Files from "./components/Files";
import Currency from "./components/Currency";
import NotFound from "./components/NotFound";


function App() {

  const {budgets} = useBudgets()

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

  useEffect(()=>{
    if(budgets.length === 0){
      console.log("no budgets. Add budget modal")
      setShowAddBudgetModal(true)
      
    }
  }, [budgets])
  

  return (
    
    <Router>
    <div className="App">     

      <Sidebar></Sidebar>

      <div className="content">
        <Routes>
          <Route path="/" element={
            <>
              <TabView editable={true}/>
              <AddBudgetModal show={showAddBudgetModal} handleClose={()=> setShowAddBudgetModal(false)}/>
            </>
          }/>

          <Route path="/education" element={<Education/>}/>
          <Route path="/files" element={<Files/>}/>
          <Route path="/currency" element={<Currency/>}/>
          <Route path="*" element={<NotFound/>}/>
          
        
           

        </Routes>
        
      </div>
         
       
    </div>
    </Router>

  
  )
}

export default App;
