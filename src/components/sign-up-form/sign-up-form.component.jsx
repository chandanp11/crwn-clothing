import React from "react";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../firebase/firebase.utils";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            alert("passwords do not match");
            return;
        }

        try{
            const response = await auth.createUserWithEmailAndPassword(email, password);
            console.log(response);
        }
        catch(error){
            console.log("User creation encountered an error", error);
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    
    //     const { displayName, email, password, confirmPassword } = this.state;
    
    //     if (password !== confirmPassword) {
    //       alert("Password don't match");
    //       return;
    //     }
    
    //     try {
    //       const user = await auth.createUserWithEmailAndPassword(email, password);
    //       await createUserProfileDocument(user, { displayName });
    //       this.setState({
    //         displayName: "",
    //         email: "",
    //         password: "",
    //         confirmPassword: "",
    //       });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    const handleChange = (event) => {
        const{name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName}></input>

                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email}></input>
                
                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password}></input>
                
                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}></input>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;