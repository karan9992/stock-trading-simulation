import React from 'react';

import { Link } from 'react-router';


const Navbar = ({click, propLogin}) => {
  return (
   
      <div className="navbar-container">
        <div className="logo">
         <Link to={"/"}>TradeX</Link>
        </div>  
     
        <ul className="navbar-links">
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/about"}>About</Link></li>
          <li> <Link to={"/market"}>Market</Link></li>
          <li> <Link to={"/news"}>News</Link></li>
          <li> <Link to={"/portfolio"}>Portfolio</Link></li>
        </ul>

        <ul className="login-links">
          {/* <button className='btn-login'>Register</button>
          <button className='btn-login'>Login</button> */}
           <li><button onClick={ click}>{ sessionStorage.getItem('id') ? sessionStorage.getItem('userName').toUpperCase() : (propLogin ? "Log in" : "Signup")}</button></li>
          {/* <li><Link to={"/home"}>Home</Link></li> */}
        </ul>
      </div>
   
  );
};

export default Navbar;

