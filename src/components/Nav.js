import React from "react";
import { Link, useNavigate } from 'react-router-dom';  //we use link instead of anchor href nhi to pura page reload  hoga
import '.././App.css'

const Nav = () => {
  const auth = localStorage.getItem('user');
  // console.log(auth);
  // console.log(JSON.parse(auth));
  // let parseAuth=JSON.parse(auth);
  const parsedAuth = auth ? JSON.parse(auth) : {}
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.clear();
    navigate('/signUp');


  }
  return (
    <div>
      <img src="https://nmgprod.s3.amazonaws.com/media/files/77/79/777972aa95a5599e872d727616925b9d/cover_image_1698325190.jpeg" alt="logo" className="logo"/>
      {
        auth ?
         <ul className="navUl">
          <li> <Link to="/">Products</Link></li>
          <li> <Link to="/add">Add Products</Link></li>
          <li> <Link to="/update/:id">Update Product</Link></li>

          <li> <Link to="/profile">Profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="16px"
              height="16px"
              style={{ marginRight: "8px", marginTop: "8px", marginLeft: "4px" }}
            >
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg></Link> <i class="fa-solid fa-user"></i>
          </li>

          <li><Link onClick={LogOut} to="/signUp">LogOut
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="16px"
              height="16px"
              style={{ marginRight: "8px" }}
            >
              <path d="M13 3v7h-2V6l-4 4 4 4v-3h2v7l-6-6 6-6zM18 13h-2v7h-2v-7H8v-2h6V4h2v7h2v2z" />
            </svg>
            ({parsedAuth.name})
            </Link></li>
         </ul>
          :
          <ul className="navUl">
            <li><Link to="/signUp">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>

      }
      {/* <ul className="navUl">
        <li> <Link to= "/">Products</Link></li>
        <li> <Link to= "/add">Add Products</Link></li>
        <li> <Link to= "/update">Update Product</Link></li>
        
        <li> <Link to= "/profile">Profile 
        <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="16px"
              height="16px"
              style={{ marginRight: "8px",marginTop: "8px",marginLeft:"4px" }}
            >
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg></Link> <i class="fa-solid fa-user"></i></li>

        {
          auth? <li><Link onClick={LogOut} to= "/signUp">LogOut</Link></li>:
          <>
          <li><Link to= "/signUp">SignUp</Link></li>
          <li><Link to= "/login">Login</Link></li>

          </>
        }

        
       </ul> */}
    </div>
  );
};

export default Nav; 
