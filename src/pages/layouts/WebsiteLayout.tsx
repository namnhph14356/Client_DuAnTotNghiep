import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Component/Footer'
import Header from '../../Component/HeaderHome'
import { isTheme } from '../../utils/localStoreR'
import ReactSwitch from 'react-switch';
export const ThemeContext:any = createContext(null)

const WebsiteLayout = () => {
    const [changeColor, setChangeColor] = useState(null);
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
        localStorage.setItem("theme", JSON.stringify(theme));
      }
      console.log(theme);
     const themeStore = isTheme();
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}} >
        <div style={{background: `${changeColor}`}} id={themeStore}>
          <div className='swich__custom'>
        <label className='label__swich'> {themeStore === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch className="" onColor='#8E44AD' onChange={toggleTheme} checked={themeStore === "dark"}/>
          </div>
        <div >

            <Outlet />
          
        </div>
        </div>
    </ThemeContext.Provider>
    )
}

export default WebsiteLayout