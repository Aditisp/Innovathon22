import React,{useState, useEffect} from 'react';
import './Profile.css';
import "./card.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import './Profile.css';
import Header from "./Header";
import {  NavLink,useNavigate,useLocation, useParams} from 'react-router-dom';
const axios = require('axios');
function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState([{}]);
  const [loginStatus, setLoginStatus] = useState("");
  var fetchDateUrl = (id) => `http://localhost:3005/details/${id}`;
  const getDetails = () => {
    axios.get(fetchDateUrl(i_id))
    .then((res) => {
        if (res) {
            setDetails(res.data);
        }
    });       
}
// console.log(details)
var fetchmentors = (id) => `http://localhost:3005/collaborators/${id}`;
const [mentor, setMentor] = useState([]);
const getMentor = () => {
  axios.get(fetchmentors(i_id))
  .then((res) => {
      if (res) {
          setMentor(res.data);
      }
  }); 

}
// console.log(mentor);


var pathArray = location.pathname.split('/');
var i_id = pathArray[2];
var u_id = loginStatus;


useEffect(() => {
  axios.get("http://localhost:3005/login").then((response) => {
        if (response.data.loggedIn == true){
            setLoginStatus(response.data.user.id)
            
        }
       else{
      navigate(`/login`)
       }
    });
     
  getDetails();
  getMentor();
}, []);




 
const handleRequest = event => {
  alert("Your request for collaboration is submitted.");
  axios.post(`http://localhost:3005/collab_request`,
  {
    i_id:i_id,
    u_id: u_id} )
    .then((res) => {
     
        if (res) {
            setDetails(res.data);
        }
    });    
}; 
    return (
      <>
      {details.map((details) => (
        
<div >
  <Header/>
        <Container>
        <div className='"main-body'>
        <div className="card" style={{marginTop:'20px'}}>
        <div className="col-md-12">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Title:</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                {details.title} 
                </div>
              </div>
              <hr/>
              <div className ="row">
              <div className ="col-sm-3">
              <h6 className ="mb-0">Description:</h6>
              </div>
              <div className ="col-sm-9 text-secondary">
              {details.description}
              </div>
              </div>
              <hr/>
              <div className ="row">
              <div className ="col-sm-3">
              <h6 className ="mb-0">Github Links:</h6>
              </div>
              <div className ="col-sm-9 text-secondary">
              <a href={details.github}>{details.github}</a>  
              </div>
              </div>
              <hr/>
              <div className ="row">
              <div className ="col-sm-3">
              <h6 className ="mb-0">Other References:</h6>
              </div>
              <div className ="col-sm-9 text-secondary">
              <a href={details.others}>{details.others}</a>  
              </div>
              </div>
              <hr/>
              <div className ="row">
              <div className ="col-sm-3">
              <h6 className ="mb-0">Collaborators:</h6>
              </div>
              <>
      {mentor.map((mentor) => (
        <ul >
          <li className="list-group list-group-flush" style={{ paddingLeft:'250px'}}>
              <div className ="col-sm-9 text-secondary">
              <a style={{textDecoration:'none'}} href={mentor.ulid}>{mentor.uname}</a>
              </div>
            </li>
              </ul>
      ))}
      </>
              </div>
              <hr/>
              
             
              <div className ="col-sm-9 text-secondary">
              <Button outline color="primary" onClick={handleRequest}>Available To Collaborate?</Button>{'   '}
              {/* <Button outline color="primary" onClick={handleEvent}>Willing To Mentor?</Button>{' '} */}
              </div>
              </div>
              </div>
        </div>
        </div>
        </div>
        </Container>
        </div>

      ))}
     </> 
    )
}

export default Details
