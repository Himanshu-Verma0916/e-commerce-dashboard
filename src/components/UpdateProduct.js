import {React,useState,useEffect} from 'react';
import '.././App.css';
import { useNavigate, useParams } from 'react-router-dom';   //for accessing the id from the get api for update

const UpdateProduct=()=>{
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const params=useParams(); //for using useParams hook to get the id from api
    const navigate=useNavigate();
    
    useEffect(() => {
        getProductDetails();
    }, [params.id]);
    

    //getting data for updating product
    const getProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/product/${params.id}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            if (!response.ok) {
                throw new Error(`Product not found: ${response.status}`);
            }
            const result = await response.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
            console.warn("Fetched product details:", result);
        } catch (error) {
            console.error("Error fetching product details:", error);
            alert("Product not found or an error occurred.");
        }
    };
    

    // const [error,setError]=useState(false); // creating state for error when input field is empty
    
    const updatingProduct=async(e)=>{
        e.preventDefault();
        console.warn(name,price,category,company);
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                
            },
            body:JSON.stringify({name,price,category,company})
        })
        result=await result.json();
        console.warn(result);
        navigate('/');
    }

    return (
        <div className='addProduct'>
            <form className="productForm">
                <h1>Update Product</h1>
                <label htmlFor='name'>
                <label htmlFor='price'>Name:
                    <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='enter product name' required='required'/>


                </label>

                </label>
                <label htmlFor='price'>Price:
                    <input type='text' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='enter product price' required='required'/>


                </label>
                <label htmlFor='category'>Category:
                    <input type='text' value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='enter product category' required='required'/>
                    

                </label>
                <label htmlFor='company'>Company:
                    <input type='text' value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder='enter product company' required='required'/>
                   

                </label>
                <button className='addButton' onClick={updatingProduct}>Update</button>
            </form>
             

        </div>
    )
}

export default UpdateProduct;