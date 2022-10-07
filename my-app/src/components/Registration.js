import React,{useState, useEffect, useStyles} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';

import { AiTwotoneUnlock } from "react-icons/ai";
import  Header  from './Header';
import axios from 'axios';
import { NavLink } from "react-router-dom";



// const useStyles = makeStyles((theme) => ({

// }));


export default function Registration() {


  // axios.defaults.withCredentials = true;


  const classes = useState("");
  const [name, setName]=useState("");
  const [status, setStatus]=useState("");
  const [email, setEmail]=useState("");
  const [branch, setBranch]=useState("");
  const [year, setYear]=useState("");
  const [linkedIn, setLinkedIn]=useState("");
  const [phone, setPhone]=useState("");
  const [interests, setInterests]=useState("");
  const [city, setCity]=useState("");
  const [password, setPassword]=useState(""); 

  const insert = () =>{
    alert("Registered");
    axios.post("http://localhost:3005/insert",{
      name: name,
      status: status,
      email: email,
      branch: branch,
      year: year,
      linkedIn: linkedIn,
      phone: phone,
      interests: interests,
      city: city,
      password: password}).then(()=>{
        
        // alert("Successfully Registered!");
      console.log(name,email, branch,linkedIn,year,phone,interests,city,password);
      });     
  };
  
    return (
      <>
      
        
<div>
<Header />
        <Container>
          
        <form>
        <div className='"main-body'>
        <div className="card" style={{marginTop:'50px', maxWidth:'80em', marginLeft: 'auto', marginRight: 'auto'}}>
        <div className="col-md-12">
            <div className="card-body" style={{marginTop:'0px'}}>
            <div className="container contact_div">
            <div className="col-md-6 col-10 mx-auto">
            <div className="row">

              
              
              <center> <AiTwotoneUnlock style={{color:'#FC0076', maxHeight: '200px', maxWidth: '20em'}} /></center>

              <h3 style={{marginTop:'20px', color: '#303699'}} ><strong><center>Registration</center></strong></h3> <br></br>

              <div className="mb-3" style={{marginTop:'30px'}}>
                <label for="exampleFormControlInput1" className="form-label"><h5>Name : </h5></label>
                <input type="text" className="form-control" id="name" name="name" placeholder="" 
                onChange= {(e) =>{
                  setName(e.target.value);
                  }} 
                />
              </div>               
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>Type: </h5></label>
                <select  className="form-select" id="status" name="status"onChange= {(e) =>{
                  setStatus(e.target.value);
                  }} >
                  <option value=''>-Select-</option>
                  <option value='0'>Innovator</option>
                  <option value='1'>Mentor</option>
                  
                  
                </select>
              
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>Email Address : </h5></label>
                <input type="email" className="form-control" id="email" name="email" placeholder=""
                  onChange= {(e) =>{
                    setEmail(e.target.value);
                    }} 
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>Year : </h5></label>
                <select  className="form-select" id="year" name="year"onChange= {(e) =>{
                  setYear(e.target.value);
                  }} >
                  <option value=''>-Select-</option>
                  <option value='First Year'>First Year</option>
                  <option value='Second Year'>Second Year</option>
                  <option value='Third Year'>Third Year</option>
                  <option value='Fourth Year'>Fourth Year</option>
                  <option value='Not Applicable'>Not Applicable</option>
                  
                </select>
                </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>Branch : </h5></label>
                <input type="text" className="form-control" id="branch" name="branch" placeholder="" 
                onChange= {(e) =>{
                  setBranch(e.target.value);
                  }} 
                />
              </div>

              

              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>Phone : </h5></label>
                <input type="text" className="form-control" id="phone" name="phone" placeholder="" 
                onChange= {(e) =>{
                  setPhone(e.target.value);
                  }} 
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>City : </h5></label>
                <input type="text" className="form-control" id="city" name="city" placeholder="" 
                onChange= {(e) =>{
                  setCity(e.target.value);
                  }} 
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>Interest : </h5></label>
                <input type="text" className="form-control" id="interests" name="interests" placeholder="" 
                 onChange= {(e) =>{
                  setInterests(e.target.value);
                  }} 
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>LinkedIn Profile Link : </h5></label>
                <input type="text" className="form-control" id="linkedIn" name="linkedIn" placeholder="" 
                 onChange= {(e) =>{
                  setLinkedIn(e.target.value);
                  }} 
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>Password : </h5></label>
                <input type="password" className="form-control" id="password" name="password" placeholder="" 
                onChange= {(e) =>{
                  setPassword(e.target.value);
                  }} 
                />
              </div>

              <br></br><br></br>

              
              
              <Button outline color="primary" style={{marginTop:'15px'}} className={classes.submit} type="submit" onClick={() => insert()}>Register</Button> 
              <NavLink to="/login" style={{color: 'blue', marginLeft: '22em', marginTop: '30px'}}>Already have an account? Login Here</NavLink>
              <div style={{marginTop:'50px'}}></div>
             

 
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
        </form>
        
        </Container>
</div>

      ))
     </> 
    )
}



