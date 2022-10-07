import React, {useState} from 'react';
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { Link , NavLink} from 'react-router-dom';
import { Sidebar } from './Sidebar';
import "../nav.css"
import "../Header.css"

import { IconContext } from "react-icons";



function Header() {
    const [sidebar, setsidebar] = useState(false)
    const showsidebar =() =>
    {setsidebar(!sidebar)} 
    return (
        <>
           <div > 
        <div className='navbar'>
            <Link to="#" className='menu-bars'>
            <AiOutlineBars style={{color:'white'}} onClick={showsidebar}/>
            </Link>
 <span>     </span>
<h3 className='cp'>Idea Portal</h3> 
<span>     </span><span>     </span><span>     </span><span>     </span>


<NavLink className='list' to="/about" >Logout</NavLink>


 
  
  
   
  
        </div>

        <IconContext.Provider value={{color:'#fff', fontSize:'1.9em'}}>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showsidebar}>
                <li className='navbar-toggle'>
                    <Link to="#" className='menu-bars'>
                    <AiOutlineClose/>
                    </Link>
                </li>
                {Sidebar.map((item,index) => {
                    return(
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
              
            </ul>

        </nav>
        </IconContext.Provider>


       
       
      
      </div>  

        </>
    )
}

export default Header;
