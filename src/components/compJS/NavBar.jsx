import React, { useContext } from "react";
import { Context } from "../../index";

import { Nav, Navbar } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Header from "../header/Header";



const NavBar = observer( () => {
  
    return (
        
             <div>
                <Header/>
            </div>
            
    );
});

export default NavBar;
