import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from "./Header2";
import { Container, Button } from 'reactstrap';
import {  NavLink,useNavigate} from 'react-router-dom';
// import './components/uploads.css';

function Uploads3() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");
const id = loginStatus;
console.log(id)
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const [github, setGithub]=useState("");
    const [category, setCategory]=useState("");
    const [others, setOthers]=useState("");

  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

   useEffect(() => {
    axios.get("http://localhost:3005/login").then((response) => {
      if (response.data.loggedIn == true) {
       
        setLoginStatus(response.data.user.id)
       
      }
      else{
            navigate(`/mlogin`)
             }
    });
  },[])
  
  const handleInputChange = (event) => {
   
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });
    console.log(userInfo.file)

  }

  const [isSucces, setSuccess] = useState(null);
  const data=()=>{
    axios.put(`http://localhost:3005/uploadidea/${id}`,{
      title: title, 
      description: description,
      github: github,
      others: others}).then(()=>{
    alert("Successful update!");
    });

  }
  // const multiple =()=>{
  //   data();
  //   submit();
    
  // }
  
  const submit = async () =>{
    alert("Your project idea is successfully uploaded.");
    const uid = 1;
    const formdata = new FormData(); 
    formdata.append('title',title);
    formdata.append('description',description);
    formdata.append('github',github);
    formdata.append('others',others);
    formdata.append('category',category);
    formdata.append('upload_file', userInfo.file);
    
console.log(userInfo.file)
axios.post(`http://localhost:3005/imageupload/${id}`,formdata).then(res=>console.log(res)).catch(err=>console.log(err))
    
  }

  return (


    <>
    <Header/>
    <div className="my-5">
      <form></form>
          <h1 className="text-center"> ENTER DETAILS OF IDEA</h1>

          <div className="container contact_div">
              <div className="row">
                  <div className="col-md-6 col-10 mx-auto">
                      <form>
                          <div class="mb-3">
                              <label for="exampleFormControlInput1" class="form-label">Title</label>
                              <input type="text" class="form-control"  placeholder=""
                               id="title"
                               name="title"
                               onChange= {(e) =>{
                                setTitle(e.target.value);
                                }}                              
                              />
                          </div>
                          <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label"><h5>Category : </h5></label>
                <select  className="form-select" id="category" name="category"onChange= {(e) =>{
                  setCategory(e.target.value);
                  }} >
                  <option value=''>-Select-</option>
                  <option value='Agriculture'>Agriculture</option>
                  <option value='Healthcare'>Healthcare</option>
                  <option value='Security & surveilliance'>Security & surveilliance</option>
                  <option value='Innovation'>Innovation</option>
                  <option value='Others'>Others</option>
                  
                </select>
                {/* <input type="text" className="form-control" id="year"  name="year" placeholder="" 
                onChange= {(e) =>{
                  setYear(e.target.value);
                  }} 
                /> */}
              </div>

                          <div class="mb-3">
                              <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                              <textarea class="form-control"  rows="6"
                              id="description"
                              name="description"
                              onChange= {(e) =>{
                               setDescription(e.target.value);
                               }}                              
                              ></textarea>
                          </div>


                          <div class="mb-3">
                              <label for="exampleFormControlInput1" class="form-label">Github Link</label>
                              <input type="url" class="form-control"  placeholder="" 
                              id="github"
                              name="github"
                              onChange= {(e) =>{
                               setGithub(e.target.value);
                               }}
                               />
                          </div>


                          <div class="mb-3">
                              <label for="exampleFormControlInput1" class="form-label">Any other information link</label>
                              <input type="url" class="form-control"  placeholder="" 
                              id="others"
                              name="others"
                              onChange= {(e) =>{
                               setOthers(e.target.value);
                               }}
                               />
                          </div>
                         
                          
                          {/* <h3 className="text-white">React Image Upload And Preview Using Node Js - <span> codeat21.com </span> </h3> */}

              <div className="formdesign">
                  {isSucces !== null ? <h4> {isSucces} </h4> : null}
                  <div className="form-row">
                  <label for="exampleFormControlInput1" class="form-label">Upload Image</label>
                      <label className="text-white">Select Image :</label>
                      <input type="file" className="form-control" name="upload_file" enctype='multipart/form-data'
 onChange={handleInputChange} />
                  </div>
                  <br/>

                  <div className="form-row">
                  <Button type="submit" style={{backgroundColor:'#A80505'}}  onClick={() => submit()}> Save </Button>

                  </div></div>
                  {userInfo.filepreview !== null ?
                  <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                  : null}
                      </form>
                  </div>
              </div>
          </div>


      </div>
      
      {/* <div className="container mr-60">
              <h3 className="text-white">React Image Upload And Preview Using Node Js - <span> codeat21.com </span> </h3>

              <div className="formdesign">
                  {isSucces !== null ? <h4> {isSucces} </h4> : null}
                  <div className="form-row">
                      <label className="text-white">Select Image :</label>
                      <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
                  </div>

                  <div className="form-row">
                      <button type="submit" className="btn btn-dark" onClick={() => submit()}> Save </button>

                  </div>
              </div> */}

              {/* {userInfo.filepreview !== null ?
                  <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                  : null}

          </div></> */}

          </>
  );
}

export default Uploads3;