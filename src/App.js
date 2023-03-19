import BudgetPage from "./components/BudgetPage";
import Sidebar from "./components/Sidebar";
import TabView from "./components/TabView/TabView";
import './App.css'

const firstPage = <BudgetPage title="March"/> 
const secondPage = <BudgetPage title="April"/>
const thirdPage = <BudgetPage title="May"/>

function App() {
  

  return (
    <>
    
    <div className="App">

      

      <Sidebar></Sidebar>
      {/* <div className="appCenter"> */}
        <TabView 
          tabs={[
            {name: "March", content: firstPage},
            {name: "April", content: secondPage},
            {name: "May", content: thirdPage}
          ]}
          editable={true}
        />    

      {/* </div> */}


      

    </div>

    </>
  )
}

export default App;
