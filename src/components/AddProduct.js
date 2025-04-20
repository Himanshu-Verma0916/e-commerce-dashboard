import {React,useState} from 'react';
import '.././App.css';

const AddProduct=()=>{
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");

    const [error,setError]=useState(false); // creating state for error when input field is empty

    const addProduct=async(e)=>{
        e.preventDefault();
        // console.warn(name,price,category,company);
        console.warn(!name);
        //now we access the userId from localStorage
       if(!name ||!price ||!category ||!company){
        //  alert('please fill all the field correctly');
        setError(true)
        return false;
       }
        

        const userId=JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userId);//userId

        let result=await fetch('http://localhost:5000/addProduct',{
            method:'POST',
            body:JSON.stringify({name,price,category,userId,company}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
               
            }
        })
        result=await result.json();
        console.log(result);
        }
    return (
        <div className='addProduct'>
            <form className="productForm">
                <h1>Add New Product</h1>
                <label htmlFor='name'>Name:
                    <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='enter product name' required='required'/>
                    {/* <span className="span"><i>Invalid Name</i></span> */}
                    {error && !name && <span className="span"><i>Invalid Name</i></span>}           
                </label>
                <label htmlFor='price'>Price:
                    <input type='text' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='enter product price' required='required'/>
                    {error && !price && <span className="span"><i>Invalid Price</i></span>}

                </label>
                <label htmlFor='category'>Category:
                    <input type='text' value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='enter product category' required='required'/>
                    {error && !category && <span className="span"><i>Invalid Category</i></span>}

                </label>
                <label htmlFor='company'>Company:
                    <input type='text' value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder='enter product company' required='required'/>
                    {error && !company && <span className="span"><i>Invalid Company</i></span>}

                </label>
                <button className='addButton' onClick={addProduct}>Add Product</button>
            </form>
             

        </div>
    )
}

export default AddProduct;