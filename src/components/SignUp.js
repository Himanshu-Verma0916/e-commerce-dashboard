import {React,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '.././App.css';

const SignUp = () => {
    //taking states for putting values of input fields
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const collectData=async(e)=>{ 
        e.preventDefault();
        console.warn(name,email,password);
        const result=await fetch('http://localhost:5000/signUp',{
            method:'POST',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await result.json()
        console.warn(data); 

        localStorage.setItem("user",JSON.stringify(data.result));  //storing data in localstorage temporaly for making private component with help of this data
        localStorage.setItem("token",JSON.stringify(data.auth));
        if(data){
            navigate('/');
        }
    }
    

    return (
        <div className="signUp">
            <h1>Register Here</h1>
            <form className="form">
                <label htmlFor="fname">Name:
                <input type="text" id="fname" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </label>
                <label htmlFor="email">Email:
                <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label htmlFor="password">Password:
                <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </label>
                {/* <label for="cpassword">Confirm Password:
                <input type="password" id="cpassword" name="cpassword"/>
                </label> */}
                <button className="formButton" onClick={collectData}>SignUp</button>
                </form>
                
        </div>
    );
}

export default SignUp;

