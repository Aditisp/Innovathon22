import React from "react";

const Contact = () => {
    return (
        <>
        <br/>
            <div className="my-5">
                <h4 className="text-center"> CONTACT US</h4>
                <h1 className="text-center"> ____________</h1>
                <br></br><br></br>

                <div className="container contact_div">
                    <div className="row">
                        <div className="col-md-6 col-10 mx-auto">
                            <form>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label" >EMAIL ADDRESS</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div><br></br>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">NAME</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter your name" />
                            </div><br></br>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">MESSAGE</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div><br></br>
                            <div class="col-12">
                                <button class="btn btn-outline-primary" type="submit">Submit form</button>
                            </div><br></br>

                            </form>
                        </div>
                    </div>                    
                </div>
                    </div>

                    <br /><br/><br/><hr/><br/>
                
            
        </>
    )
}

export default Contact;