import React from "react";
import { NavLink,useNavigate} from "react-router-dom";
import  Header1  from './Header1';
import  Contact  from './Contact';
import pic from "./small.jpeg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';



const Home = () => {
    const navigate = useNavigate();
    return (
        <>
        
        <Header1 />
            <section id="header" className="d-flex align-items-center home-background" style={{maxHeight: '120em'}}>
                <div className="container-fluid nav_bg" ><br></br><br></br><br></br>
                    <div className="row">
                    <center>
                    <img className="full-somaiya" src={pic} style={{maxWidth: '10em', maxHeight: '10em'}}></img>
                                <h1><strong className="brand-name" style={{fontSize: '90px'}}>
                                     Idea Portal<br/> </strong></h1>
                                     <h4 style={{color: 'black'}}>"A place where you can present your ideas"</h4>
                                     <Button type="submit" outline color="danger"onClick={()=> navigate(`/mlogin`)} > Mentor Login </Button> {'    '} &nbsp;&nbsp;
                                     <Button type="submit" outline color="danger"onClick={()=> navigate(`/login`)} > Innovator Login </Button>          
                                    </center>
                                </div>
                            </div>
            </section><br/><br/><br/><br/><br/><br/><br/><br/>
<hr/>
           
< Contact/>
            


        </>
    )
}

export default Home;