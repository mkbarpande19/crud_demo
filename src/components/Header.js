import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Header.css'

const Header = () => {

    const [activeTab, setActiveTab] = useState('Home');
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/") setActiveTab("Home");
        else if(location.pathname === "/add") setActiveTab("AddContact");
        else if(location.pathname.includes("update") || location.pathname.includes("view")) setActiveTab("AddContact");
        else if (location.pathname === "/about") setActiveTab("About");
    }, [location]);
    
    return (
        <div className="header">
            <p className="logo">Contact App</p>
            <div className="header-right">
                <Link to="/">
                    <p 
                        className={`${activeTab==="Home" ? "active" : ""}`}
                        onClick={()=> setActiveTab('Home')}
                    >
                        Home
                    </p>
                </Link>
                <Link to="/add">
                    <p 
                        className={`${activeTab==="AddContact" ? "active" : ""}`}
                        onClick={()=> setActiveTab('AddContact')}
                    >
                        {location.pathname.includes("view") ? "Contact Details" :"Add Contact"}
                    </p>
                </Link>
                <Link to="/about">
                    <p 
                        className={`${activeTab==="About" ? "active" : ""}`}
                        onClick={()=> setActiveTab('About')}
                    >
                        About
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default Header
