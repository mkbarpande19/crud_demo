import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { db } from "../../src/firebase";
import { useToasts } from 'react-toast-notifications';
import { Form } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import { collection, addDoc } from "firebase/firestore"; 

const initialState = {
    name:"",
    email:"",
    contact:""
}

const AddEdit = () => {

    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { name, email, contact } = state;

    const { addToast } = useToasts();
    const handleInputChange= (e) =>{
        let { name, value } = e.target;
        setState({...state, [name]: value });
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!name || !email || !contact){
            addToast("please provide value in each input field", { appearance:"error" });
        }
        else{

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
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        autoComplete="off"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
               
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control 
                        type="email" 
                        autoComplete="off"
                        id="email"
                        name="email"
                        placeholder="Your E-Mail"
                        value={email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control 
                        type="number" 
                        id="contact"
                        name="contact"
                        placeholder="Your Contact Number"
                        value={contact}
                        onChange={handleInputChange}
                    />
                </Form.Group>  

                <Button className="btn_save" type="submit">SAVE</Button>
            </Form> 
        </div>
    )
}

export default AddEdit
