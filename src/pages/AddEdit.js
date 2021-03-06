import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "./AddEdit.css";
import { db } from "../../src/firebase";
import { useToasts } from 'react-toast-notifications';
import { Form } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore"; 

const initialState = {
    name:"",
    email:"",
    contact:""
}

const AddEdit = ({isView}) => {

    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { name, email, contact } = state;

    const { addToast } = useToasts();

    const { id } = useParams();

    console.log(id);
    useEffect(() => {
        getData();
        return () => {
            setData({});
        }
    }, [id]);


    useEffect(()=>{
        let fdata = Object.values(data).filter((i)=> { return id === i.id });
        if(id) setState({...fdata[0]});
        else setState({...initialState});
        
        return ()=>{
            setState({...initialState});
        }
    },[id,data]);

    const handleInputChange= (e) =>{
        let { name, value } = e.target;
        setState({...state, [name]: value });
    }
    
    // Function defined to get data from firestore database of firebase
     const getData = async() =>{
        const querySnapshot = await getDocs(collection(db, "contacts"));
        // if(querySnapshot.docs.length) 
        setData(querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id }))); // setting the response with the id
    }


    const navigate = useNavigate();


    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!name || !email || !contact){
            addToast("please provide value in each input field", { appearance:"error" });
        }
        else{

            if(!id){
                // Adding Data to firebase firestore database 
                try {
                        const docRef = await addDoc(collection(db, "contacts"), {
                            name: name,
                            email: email,
                            contact: contact
                        });
                        if(docRef.id)
                        {   
                            setState(initialState);
                            setTimeout(()=> navigate('../', { replace: true }), 500); // navigate is use to navigate to component. useHistory is removed and navigate is added in latest version of the react-router-dom
                            addToast("Contact Saved Successfully!", { appearance:"success" })
                        }
                    } catch (e) {
                            addToast("Error in Saving Contact!", { appearance:"error" })
                    }
            } // Functionality for update data is added here 
            else{
                    const updateContact = doc(db,"contacts",id);
                    const newFields = {
                        name:name,
                        email:email,
                        contact:contact
                    }
                    await updateDoc(updateContact, newFields);
                    setTimeout(()=> navigate('../', { replace: true }), 500);   
                }
            }
        }
    
    return (
        <div style={{ marginTop:"100px" }}>
            <Form style={{ 
                    margin:"auto", 
                    padding:"15px", 
                    maxWidth:"400px", 
                    alignContent:"center" 
                }}
                onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label for="name">Name</Form.Label>
                    <Form.Control
                        disabled = {isView}
                        type="text" 
                        autoComplete="off"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={name || "" }
                        onChange={handleInputChange}
                    />
                </Form.Group>
               
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label for="email">E-Mail</Form.Label>
                    <Form.Control
                        disabled = {isView}
                        type="email" 
                        autoComplete="off"
                        id="email"
                        name="email"
                        placeholder="Your E-Mail"
                        value={email || ""}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContact">
                    <Form.Label for="contact">Contact</Form.Label>
                    <Form.Control
                        disabled = {isView}
                        type="number" 
                        id="contact"
                        name="contact"
                        placeholder="Your Contact Number"
                        value={contact || ""}
                        onChange={handleInputChange}
                    />
                </Form.Group>  

               {!isView && <Button className="btn_save" type="submit">{!id ? "SAVE" : "UPDATE"}</Button>}
               {isView && <Button className='btn_save' type="button" onClick={()=>{navigate('../', { replace: true })}}>BACK</Button>}
            </Form> 
        </div>
    )
}

export default AddEdit
