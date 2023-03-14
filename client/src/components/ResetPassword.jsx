import React from "react";
const ResetPassword = () => {
  return (
    <div className="container shadow my-5">
     <center>
     
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5 text-gris">ResetPassword</h1>
            </div>
            <img src="./image/rest.png" class="img-thumbnail" alt=""></img>
            </center>
            <form >
              <div className=" col-md-6 p-5 mb-3 mx-auto">
                
                <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                
                />
              </div>
               
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                confirm password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  
                />

<button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
                Reset
              </button>
              </div>

              
              </div>
          
            </form>
            
          </div>
       
    
  );
};

export default ResetPassword;
