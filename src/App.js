import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import About from "./pages/About";
import Header from './components/Header';
import './App.css';

function App() {
  return (
   <Router>
     
     <div>
        <Header/>
        <Routes>
            <Route exact path="/" element={ <Home/> }/>            
            <Route exact path="/add" element={ <AddEdit/> }/>
            <Route exact path="/update/:id" element={ <AddEdit/> }/>
            <Route exact path="/about" element={ <About/> }/>
            <Route exact path="/view/:id" element={ <AddEdit isView={true}/> }/>
        </Routes>
     </div>
   
   </Router>
  )
}

export default App
