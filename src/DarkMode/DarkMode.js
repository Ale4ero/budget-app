import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import "./DarkMode.css";
import { useBudgets } from "../contexts/BudgetContext";

const sunIcon = <FontAwesomeIcon  icon={faSun}/>
const moonIcon = <FontAwesomeIcon  icon={faMoon}/>



const DarkMode = () => {

    const {setTheme, activeTheme} = useBudgets()

    const setDarkMode = () => {
        // document.querySelector("body").setAttribute('data-theme', 'dark')
        setTheme('dark')
        // localStorage.setItem("selectedTheme", "dark")
    }
    const setLightMode = () => {
        // document.querySelector("body").setAttribute('data-theme', 'light')
        // localStorage.setItem("selectedTheme", "light")
        setTheme('light')
    }

    // const selectedTheme = localStorage.getItem("selectedTheme")
    const selectedTheme = activeTheme

    if(selectedTheme === "dark"){
        setDarkMode()
    }

    const toggleTheme = (e) => {
        if (e.target.checked){
            setDarkMode()
        }else{
            setLightMode()
        } 
        // window.location.reload()
    }
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={selectedTheme==='dark'}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                {/* <Sun />
                <Moon /> */}
                <div className="sunIcon">{sunIcon}</div>

                <div className="moonIcon">{moonIcon}</div>
            </label>
        </div>
    );
};

export default DarkMode;
