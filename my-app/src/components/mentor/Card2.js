import React from 'react';
import { FaSistrix } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../card.css";
import {useState, useEffect } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import Header from'./Header2';
const axios = require('axios');



function Card2() { 
  const [src, setSrc] = useState('')
    const navigate = useNavigate();
    const [List, setList] = useState([]);
    const [loginStatus, setLoginStatus] = useState("");
    const [category, setCategory] = useState([]);
     axios.defaults.withCredentials = true; 
    const getList = () => {
      axios.get(`http://localhost:3005/posts` )
      .then((res) => {
         setList(res.data);
        //  console.log(typeof List)
           setSrc('http://localhost:3005/'+res.data[2].img)
          // console.log(src)
      });       
     }
     function filter(category)
     {
       axios.get(`http://localhost:3005/getc/${category}`)
           .then((res) => {
             setList(res.data);
           });
     }
     useEffect(() => {
      
      axios.get("http://localhost:3005/login").then((response) => {
        if (response.data.loggedIn == true){
            setLoginStatus(response.data.user.id)
            getList();
        }
       else{
      navigate(`/login`)
       }
    });
    getList();   
  });
  // console.log(List)
    return (
        <div>
      <Header/>
      <div className="mb-3">
      <div style={{marginLeft:'5em', marginTop:'30px'}} className="filter">
      <label for="exampleFormControlInput1" className="form-label"><h5>Domain : </h5></label> &nbsp;
<select className='form-cotrol-card' id='category' style={{height: '2em', width: '20em'}} onChange= {(e) =>{
                  setCategory(e.target.value);
                  }} >
  <option value="">Select</option>
  <option value="Agriculture" onClick={(event) => filter(category)}>Agriculture</option>
  <option value="Healthcare">Healthcare</option>
  <option value="Security & surveilliance" >Security & surveilliance</option>
  <option value="Innovation" >Innovation</option>
  <option value="others" >others</option>
</select>
<button style={{backgroundColor: '#A80505',height: '2.200em', width: '2.400em', borderRadius: '5px'}}
        onClick={(event) => filter(category)}
        ><FaSistrix style={{color: 'white',fontSize:'30',paddingBottom:'6px', paddingRight:'10px'}}/></button>
{/* <button  style={{backgroundColor: '#303f9f',height: '2.06em', width: '2em', borderRadius: '5px', marginTop:'3px'}}
      onClick={(event) => filter(category)}
        ><FaSistrix style={{color: 'white',fontSize:'30', paddingBottom:'6px', paddingRight:'10px'}}/></button> */}
{/* <button onClick={(event) => filter(category)}>*</button> */}
</div></div>
<div className="cards">
<>
{List.map((List) => (
   <div className='mr '>
  <div className="car ">
    <div className='info  card1'>
      <div className='card__image'>
    <img src={List.img} className='im'></img>
    </div>
  <div className='det'>
    <h2 className='title' > {List.title.substring(0,37)}</h2>
    
    <p className='card__info'>{List.description.substring(0,200)}....</p>
    
    {/* <Link to="/about" onClick={()=> navigate(`/details/${List.idea_id}`)} style={{textAlign:'center', fontSize:'1.2em'}}>VIEW MORE </Link> */}
    <Button  color="link" onClick={()=> navigate(`/details2/${List.id}`)} style={{color:'#303f9f'}} >View More</Button>
    </div>
    </div>
  </div>
  </div>
  
))}
</>
</div> 
        </div>
    )
}

export default Card2
