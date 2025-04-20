import {React,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '.././App.css';

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        e.preventDefault();
        console.log(email,password);
        let result=await fetch('http://localhost:5000/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json();
        if(!result.auth){
            alert("Please enter valid data");
        }else{
            localStorage.setItem("user",JSON.stringify(result.userData));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }
        console.warn(result);
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <form className="loginForm">
                <label htmlFor="email">Email:
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email"/>
                </label>
                <label htmlFor="password">Password:
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password"/>
                </label>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}
export default Login; ;
