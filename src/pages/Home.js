import React, { useEffect, useState } from 'react';
import { db } from "../../src/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";


import "./Home.css";


const Home = () => {
    
    const [data,setData] = useState({});

    useEffect(() => {
        getData();
        return () => {
            setData({});
        }
    }, []);

    const deleteFunction = (id) =>{
        console.log(id);
        let confirmData = window.confirm("Are you sure you want to delete contact?");
        if(confirmData) deleteData(id);
    }

    //Function to delete selected data from firebase firestore data
    const deleteData = async (id) =>{
        const ref = doc(db, "contacts", id) //here db is database conncection, contacts is collection name i.e database name &  id is the unique id of selected tuple
        await deleteDoc(ref);
        getData();
    }

    // Function defined to get data from firestore database of firebase
    const getData = async() =>{
        const querySnapshot = await getDocs(collection(db, "contacts"));
       setData(querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id }))); // setting the response with the id
    }

    return (
        <div className="wrapper">

            <div className="containerWrapper">
                <div className="tableHeader" style={{width:"150px", textAlign:"left"}}>Name</div>
                <div className="tableHeader" style={{width:"150px", textAlign:"left"}}>Email</div>
                <div className="tableHeader" style={{width:"150px", textAlign:"left"}}>Contact</div>
                <div className="tableHeader" style={{width:"120px"}}>&nbsp;</div>
                <div className="tableHeader" style={{width:"120px"}}>Actions</div>
                <div className="tableHeader" style={{width:"120px"}}>&nbsp;</div>
                
            </div>
            
            <div>
                {Object.keys(data).map((i)=>{
                        return(
                            <div key={data[i].id} className="containerWrapper">
                                <div style={{width:"150px", textAlign:"left"}}>{data[i].name}</div>
                                <div style={{width:"150px", textAlign:"left"}}>{data[i].email}</div>
                                <div style={{width:"150px", textAlign:"left"}}>{data[i].contact}</div>
                                <div style={{width:"120px"}}>
                                    <Link to={`/update/${data[i].id}`} style={{ textDecoration: 'none' }}>
                                        <div className="btn_edit">Edit</div>
                                    </Link>
                                </div>
                                <div style={{width:"120px"}}>
                                    <div className="btn_delete" onClick={()=>{deleteFunction(data[i].id)}}>Delete</div>
                                </div>
                                <div style={{width:"120px"}}>
                                        <Link to={`/view/${data[i].id}}`} style={{ textDecoration: 'none' }}>
                                            <div className="btn_view"> View </div>
                                        </Link>
                                </div>
                            </div>)
                    })}
            </div>
            
        </div>
    )
}

export default Home
