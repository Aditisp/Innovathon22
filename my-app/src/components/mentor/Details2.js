import React,{useState, useEffect} from 'react';
import '../Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';

import Header from'./Header2';
import { useLocation, useNavigate} from 'react-router-dom';
const axios = require('axios');

function Details2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState([{}]);
  const [loginStatus, setLoginStatus] = useState("");
  const m_id = parseInt(loginStatus);
  var fetchDateUrl = (id) => `http://localhost:3005/details/${id}`;
  const getDetails = () => {
    axios.get(fetchDateUrl(i_id))
    .then((res) => {
        if (res) {
            setDetails(res.data);
        }
    });       
}
// console.log(details[0].userid)
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
// console.log(details);
var fetchmail = (uid) => `http://localhost:3005/getmail/${uid}`;
const[mail, setMail] = useState();
const getMail =()=>{
  axios.get(fetchmail(details[0].userid)).then((res) => {
    if (res) {
        setMail(res.data);
    }
}); 
}
// console.log(mail)
// console.log(details[0].userid)
var pathArray = location.pathname.split('/');
var i_id = pathArray[2];



useEffect(() => {
  
  axios.get("http://localhost:3005/login").then((response) => {
    if (response.data.loggedIn == true){
        setLoginStatus(response.data.user)
        getDetails();
        getMail();
        
    }
   else{
  navigate(`/mlogin`)
   }
});
  getDetails();
  getMentor();
  getMail();
});

function handleApproval(title, email,memail,name) {
  axios.post(`http://localhost:3005/mail/${email}/${title}/${memail}/${name}`)
  .then((res) => {
    if (res) {
        setDetails(res.data);
    }
  
  }); 
  alert("Mail sent");


getDetails();
}; 


 
    return (
      <>
      <Header/>
      {details.map((details) => (
        
<div >
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
              <h6 className ="mb-0">Collabrators:</h6>
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
              {/* <Button outline color="primary" onClick={handleRequest}>Willing To Collaborate?</Button>{'   '} */}
              <Button outline color="primary" onClick={(event) => handleApproval(details.title,mail[0].email, loginStatus.email,loginStatus.name)}>Available To Mentor?</Button>{' '}
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

export default Details2
