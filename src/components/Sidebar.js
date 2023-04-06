import "../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faHouse, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import DarkMode from "../DarkMode/DarkMode"
import { NavLink } from "react-router-dom"

const houseIcon = <FontAwesomeIcon icon={faHouse} />
const educationIcon = <FontAwesomeIcon icon={faGraduationCap} />
const currencyIcon = <FontAwesomeIcon icon={faMoneyBillTransfer} />
const fileIcon = <FontAwesomeIcon icon={faFile} />

export default function Sidebar() {
  return (
    <>    
    <div className="side-nav-container">      
      <div className="nav-brand">
        {/* <img  alt="nav-logo" className="pcLogo"/>
        <img  alt="nav-icon" className="pcIcon"/> */}
        <div className="pcLogo"></div>
        <div className="pcIcon"></div>
      </div>
      <div className="nav-menu">
        <ul>
          {/* <li><a href="/"><i>{houseIcon}</i><p>Home</p></a></li>
          <li><a href="/education"><i>{educationIcon}</i><p>Education</p></a></li> */}
          <li><NavLink to="/"><i>{houseIcon}</i><p>Home</p></NavLink></li>
          <li><NavLink to="/education"><i>{educationIcon}</i><p>Education</p></NavLink></li>
          <li><NavLink to="/currency"><i>{currencyIcon}</i><p>Currency</p></NavLink></li>
          <li><NavLink to="/files"><i>{fileIcon}</i><p>Files</p></NavLink></li>
        </ul>
      </div> 
      <div className="side-nav-bottom">
        <DarkMode/> 
      </div>
    </div>
    </>
  )
}
