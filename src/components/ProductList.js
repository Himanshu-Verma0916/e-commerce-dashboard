import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '.././App.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);  //taking products as array
    useEffect(() => {
        getElement();
    }, []);

    const getElement = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });  //although we have to onlyb get data ,so no need to provide other information like header,method...
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.warn(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE",
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            alert("Product record is deleted");
        }
    }

    const searchProduct = async (e) => {
        e.preventDefault();
        const key = e.target.value;
        if (key) {
            // console.warn(key);
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            } else {
                getElement();
            }
        }
        else{
            getElement();
        }


    }

    return (
        <div className='productList'>
            <h1>ProductList</h1>
            <input type='text' placeholder='search product' className='searchInput'
                onChange={searchProduct} />
            <ul>
                <li><b>S.No</b></li>
                <li><b>Name</b></li>
                <li><b>Price</b></li>
                <li><b>Category</b></li>
                <li><b>Company</b></li>
                <li><b>Operation</b></li>
            </ul>
            {
                products.length > 0 ?
                    products.map((item, index) => (
                        <ul key={index}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li><button className='operation' onClick={() => deleteProduct(item._id)}>Delete</button>
                                <button className='operation'><Link className='updateButton' to={`/update/${item._id}`}>Update</Link></button>
                            </li>
                        </ul>
                    )) :
                    <h1 className='searchMessage'>No result found</h1>
            }
        </div>
    );
};

export default ProductList; 
