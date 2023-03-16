import "../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faHouse, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import DarkMode from "../DarkMode/DarkMode"

const houseIcon = <FontAwesomeIcon icon={faHouse} />
const educationIcon = <FontAwesomeIcon icon={faGraduationCap} />
const currencyIcon = <FontAwesomeIcon icon={faMoneyBillTransfer} />
const fileIcon = <FontAwesomeIcon icon={faFile} />

export default function Sidebar() {
  return (
    <>    
    <div className="side-nav-container">      
      <div className="nav-brand">
        <img src="icons/pocketChangeLogo.svg" alt="nav-logo" class="pcLogo"/>
        <img src="icons/pocketChangeIcon.svg" alt="nav-icon" class="pcIcon"/>
      </div>
      <div className="nav-menu">
        <ul>
          <li><a href="#"><i>{houseIcon}</i><p>Home</p></a></li>
          <li><a href="#"><i>{educationIcon}</i><p>Education</p></a></li>
          <li><a href="#"><i>{currencyIcon}</i><p>Currency</p></a></li>
          <li><a href="#"><i>{fileIcon}</i><p>Files</p></a></li>
        </ul>
      </div> 
      <div className="side-nav-bottom">
        <DarkMode/> 
      </div>
    </div>
    </>
  )
}
