import React, { useState, useEffect } from 'react';
import '.././App.css';

const Profile = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    // const getUser = async () => {
    //     const token = JSON.parse(localStorage.getItem('token'));
    //     console.log("Token being sent:", token);
    //     let result = await fetch('http://localhost:5000/profile', {
    //         headers: {
    //             // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    //             authorization: `Bearer ${token}`
    //         }
    //     });
    //     result = await result.json();
    //     if (result && result.result && result.result.name && result.result.email) {
    //         setUserName(result.result.name);
    //         setUserEmail(result.result.email);
    //     }
        

    //     else {
    //         console.error("Invalid response from server.");
    //     }
    // }
    const getUser = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        console.log("Token being sent:", token);
    
        try {
            const response = await fetch('http://localhost:5000/profile', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
    
            const result = await response.json();
    
            // FULL DEBUG LOG
            console.log("🔍 Raw response from backend:", result);
    
            if (result && result.result && result.result.name && result.result.email) {
                setUserName(result.result.name);
                setUserEmail(result.result.email);
                console.log("✅ User set:", result.result.name, result.result.email);
            } else {
                console.error("❌ Invalid response structure:", result);
            }
        } catch (error) {
            console.error("❗ Error fetching profile:", error);
        }
    };
    

    return (
        <div className='profile'>
            <h1>User Name: {userName}</h1>
            <h3>User Email: {userEmail}</h3>
        </div>
    )
}
export default Profile;