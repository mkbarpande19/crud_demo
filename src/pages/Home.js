import React, { useEffect, useState } from 'react';
import { db } from "../../src/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";


import "./Home.css";


const Home = () => {
    
    const [data,setData] = useState({});
    const [id, setId] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    let docs = [];

    useEffect(() => {
        getData();
        return () => {
            setData({});
        }
    }, []);

    const deleteFunction = (id) =>{
        console.log(id);
        setShowDeleteModal(true);
        setId(id);
        deleteData();
    }

    const deleteData = async () =>{
        await deleteDoc(doc(db, `contacts/${id}`));
        getData();
    }

    // Function defined to get data from firestore database of firebase
    const getData = async() =>{
        const querySnapshot = await getDocs(collection(db, "contacts"));
        querySnapshot.forEach((doc) => { docs.push(doc.data()) });

        setData(docs);
        console.log("Data is = ",docs);
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
                {Object.keys(data).map((id)=>{
                    return(
                        <div className="containerWrapper">
                            <div style={{width:"150px", textAlign:"left"}}>{data[id].name}</div>
                            <div style={{width:"150px", textAlign:"left"}}>{data[id].email}</div>
                            <div style={{width:"150px", textAlign:"left"}}>{data[id].contact}</div>
                            <div style={{width:"120px"}}>
                                <Link to={`/update/${id}`} style={{ textDecoration: 'none' }}>
                                    <div className="btn_edit">Edit</div>
                                </Link>
                            </div>
                            <div style={{width:"120px"}}>
                                <div className="btn_delete" onClick={()=>{deleteFunction(id)}}>Delete</div>
                            </div>
                            <div style={{width:"120px"}}>
                                    <Link to={`/view/${id}`} style={{ textDecoration: 'none' }}>
                                        <div className="btn_view"> View </div>
                                    </Link>
                            </div>
                        </div>)
                })}
            
        </div>
    )
}

export default Home
