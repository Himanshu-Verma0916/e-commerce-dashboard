import React from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom';  
import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';


import PrivateComponent from './components/PrivateComponent';
  //jis jis component ko private banana hai usko inside private component rout me daal denge ,sothat jo sign in nhi hai vo pages ko access nhi kr paaye

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element={<PrivateComponent/>}>

        <Route path='/' element={<ProductList />}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}/>
        <Route path='/logout' element={<h1>log out</h1>}/>
        <Route path='/profile' element={<Profile/>}/>
        

        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>

    </div>
  );
}

export default App;
