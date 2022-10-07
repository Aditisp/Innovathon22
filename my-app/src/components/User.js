import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import './Profile.css';
import img1 from "./images/user.png";
import {  NavLink,useNavigate, useLocation} from 'react-router-dom';
import Header from "./Header";
const axios = require('axios');
function User() {

  const [loginStatus, setLoginStatus] = useState("");
    const location = useLocation();
  const navigate = useNavigate();
  const [List, setList] = useState([{}]);
  var fetchData = (id) => `http://localhost:3005/user/${id}`;
  const getList = () => {
    axios.get( fetchData(uid))
    .then((res) => {
        if (res) {
            setList(res.data);
        }
    });       
}

  const [details, setDetails] = useState([]);
  var fetchtopic = (id) => `http://localhost:3005/topics/${id}`;
  const getDetails = () => {
    axios.get(fetchtopic(uid) )
    .then((res) => {
        if (res) {
            setDetails(res.data);
        }
    });       
}
console.log(details)

const eventHandler = event => {
  
  navigate({
     pathname: '/details',
     state: {...details.idea_id}
  });
}; 
useEffect(() => {
  axios.get("http://localhost:3005/login").then((response) => {
    if (response.data.loggedIn == true) {
     
      setLoginStatus(response.data.user.id)
      
     
    }
    else{
          navigate(`/login`)
           }
  });
  getList();
  getDetails();
},[])  

var pathArray = location.pathname.split('/');
var uid = pathArray[2];
console.log(uid)
return (
<>
<Header/>
  {List.map((List) => (
    <div >
    <Container > 
    <div classNameName="main-body" >
          <div className="row gutters-sm" >
            <div className="col-md-4 mb-3">
              <div className="card" style={{marginTop:'20px'}}>
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={List.img} alt="Admin" className="rounded-circle" width="150"/>
                    <div className ="mt-3">
                    <h4>{List.name}  </h4>
                    <p className ="text-secondary mb-1">{List.year}</p>
                    <p className ="text-muted font-size-sm">{List.branch}</p>
    
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="col-md-8" style={{marginTop:'10px'}}>
              <div className="card mb-3">
                <div className="card-body">
                  
                  
                  <div className ="row">
                  <div className ="col-sm-3">
                  <h6 className ="mb-0">Email</h6>
                  </div>
                  <div className ="col-sm-9 text-secondary">
                  {List.email}
                  </div>
                  </div>
                  <hr/>
                  <div className ="row">
                  <div className ="col-sm-3">
                  <h6 className ="mb-0">Phone No:</h6>
                  </div>
                  <div className ="col-sm-9 text-secondary">
                  {List.phone}
                  </div>
                  </div>
                  <hr/>
                  <div className ="row">
                  <div className ="col-sm-3">
                  <h6 className ="mb-0">City</h6>
                  </div>
                  <div className ="col-sm-9 text-secondary">
                  {List.city}
                  </div>
                  </div>
                  <hr/>
                  <div className ="row">
                  <div className ="col-sm-3">
                  <h6 className ="mb-0">Interests</h6>
                  </div>
                  <div className ="col-sm-9 text-secondary">
                  {List.interests}
                  </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">LinkedIn Profile:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <a href={List.linkedin}>{List.linkedin}</a>
                    </div>
                    
                  </div>
                  <hr/>
                  
                 
                  </div>
                  </div>
                  <div className ="row gutters-sm">
              <div className ="col-md-12">
              <div className ="card h-100">
              <div className ="card-body">
              {'   '}<h6 className ="d-flex align-items-center mb-3" ><i className ="material-icons text-info mr-2">Submitted Ideas</i> </h6>
    {details.map((details) =>(
      <div>
              
              <ul className="list-group list-group-flush">
              
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">{details.title}</h6>
                
                <span className="text-secondary"><button onClick={()=> navigate(`/submitted/${details.id}`)} className ="btn btn-outline-primary">View Details</button></span>

              </li>
              
            </ul>
            <hr/>
              
            </div>   
    ))}
                  
     
   
              </div>
              </div>
            </div>

      </div>             
    
                
                  </div>
                  </div>
    </div>
    </Container>
    
    </div>
))

}

</>
  );
}

export default User
