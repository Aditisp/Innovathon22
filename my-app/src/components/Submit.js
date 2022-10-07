import React,{useState, useEffect} from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import './Profile.css';
import Header from "./Header";
import {  NavLink,useNavigate,useLocation, useParams} from 'react-router-dom';
const axios = require('axios');
function Submit() {
  const location = useLocation();
 
  const [details, setDetails] = useState([{}]);
  var fetchDateUrl = (id) => `http://localhost:3005/details/${id}`;
  const getDetails = () => {
    axios.get(fetchDateUrl(i_id))
    .then((res) => {
        if (res) {
            setDetails(res.data);
        }
    });       
}

// var fetchmentors = (id) => `http://localhost:3005/mentors/${id}`;
// const [mentor, setMentor] = useState([]);
// const getMentor = () => {
//   axios.get(fetchmentors(i_id))
//   .then((res) => {
//       if (res) {
//           setMentor(res.data);
//       }
//   }); 

// }
var fetchcollab = (id) => `http://localhost:3005/fetchcollab/${id}`;
const [collab, setCollab] = useState([]);
const getCollab = () => {
  axios.get(fetchcollab(i_id))
  .then((res) => {
      if (res) {
          setCollab(res.data);
      }
  }); 

}


var pathArray = location.pathname.split('/');
var i_id = pathArray[2];
var u_id = 1;


useEffect(() => {
  getDetails();
  // getMentor();
  getCollab();
}, []);



    return (
      <>
      <Header/>
      {details.map((details) => (
        
<div >
        <Container style={{marginTop:'80px'}}>
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
              <h6 className ="mb-0">Collabrators:</h6>
              </div>
              <>
      {collab.map((collab) => (
        <ul >
          <li className="list-group list-group-flush" style={{ paddingLeft:'250px'}}>
              <div className ="col-sm-9 text-secondary">
              <a className ="mb-0" style={{textDecoration:'none'}} href={collab.ulid}>{collab.uname}</a>
              </div>
            </li>
              </ul>
      ))}
      </>
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

export default Submit
