import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import './table.css';
import {  NavLink,useNavigate} from 'react-router-dom';
import Header from "./Header";
const axios = require('axios');

function Collab() {
  const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("");
  const id = loginStatus;
  var fetchDateUrl = (id) => `http://localhost:3005/getcollab/${id}`;
    const [details, setDetails] = useState([]);
    const getDetails = () => {
      axios.get(fetchDateUrl(id))
      .then((res) => {
        
          if (res) {
              setDetails(res.data);
          }
      });       
  }
  console.log(typeof details)
  console.log(id)
 
  
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
  });
  //  function appr(cid){
  //    alert("cid opened")
  //   axios.put(`http://localhost:3005/approvecollab/${cid}`)
  //   .then((res) => {
  //     if (res) {
  //         setDetails(res.data);
  //     }
  // });
  //  }
  
  function handleApproval(cid, uemail,iname, uname) {
 
  // appr(cid)
  axios.put(`http://localhost:3005/approvecollab/${cid}`)
  .then((res) => {
    if (res) {
        setDetails(res.data);
    }
});
  mail(uemail,iname,uname)
  getDetails();
  }; 
  function mail(uemail,iname,uname){
  
    axios.post(`http://localhost:3005/mailc/${uemail}/${iname}/${uname}`)
    .then((res) => {
      if (res) {
          setDetails(res.data);
      }
    
    }); 
    alert("Mail sent");
  }
  function handleRejection(cid) {
    axios.put(`http://localhost:3005/rejectcollab/${cid}` )
    .then((res) => {
      if (res) {
          setDetails(res.data);
      }
  });   
  getDetails();
  };

    return (
       <div>
          <Header/>
         <h4 style={{textAlign:'center', paddingTop:'20px'}}>Requests for Collaborations</h4>
         <br/>
    <table>
      <thead>
        <tr>
          <th>USER NAME</th>
          <th>TITLE</th>
          <th>ACTION</th>
          
        </tr>
      </thead>
      <tbody>
      <>
{details.map((details) =>(
        <tr>
          <td><a style={{textDecoration:'none'}} href=''  onClick={()=> navigate(`/user/${details.uid}`)}>{details.uname}</a></td>
          <td><a style={{textDecoration:'none'}} href='' onClick={()=> navigate(`/submitted/${details.iid}`)} > {details.iname}</a></td>
          <td>
          <span className="text-secondary"><button onClick={(event) => handleApproval(details.cid,details.uemail, details.iname,details.uname)} className ="btn btn-outline-primary">Approve</button></span>
    {'  '}{'  '} <span className="text-secondary"><button onClick={(event) => handleRejection(details.cid)} className ="btn btn-outline-primary">Ignore</button></span>
          </td>
          
        </tr>
       ))}
        </> 
      </tbody>
    </table>
      
    
       </div>
    )
}

export default Collab
