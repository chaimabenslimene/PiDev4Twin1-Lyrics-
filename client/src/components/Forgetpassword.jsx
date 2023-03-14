import React , { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 function onChange(value)  {
    console.log("reCAPTCHA value:", value);
//    Insérez votre code ici pour valider la réponse reCAPTCHA
  }



  const Forgetpassword = () => {
    
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
       if (email === '') {
         setMessage('Veuillez saisir votre adresse e-mail.');
         return;
       }
  
      try {
        const response = await axios.post('http://localhost:5000/api/users/verify', { email });
        console.log(response.data);
        if (response.data.message === 'Email not found') {
          setMessage(`L'adresse e-mail n'a pas été trouvée dans la base de données.`);
        } else {
          const token = response.data;
          navigate(`/resetPassword/${token}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  return (
    <div>
    {message && (
  <div className={`alert ${message.includes('envoyé') ? 'alert-success' : 'alert-danger'}`} role="alert">
    {message}
  </div>
)}
  
    <div>
    <div className="container shadow my-5">
      <div className="row">
        <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
          <h1 className="display-4 fw-bolder">Welcome back </h1>
          <p className="lead text-center ">Enter Your Credentials to login</p>
          <h5 className="mb-4">OR</h5>
          <NavLink to="/login" className="btn btn-outline-light
             rounded-pill pb-2 w-50">Login</NavLink>
             
        </div>
        <div className="col-md-6 p-5">
        <h1 className="display-6 fw-bolder mb-5 ">ForgetPassword</h1>

           <form onSubmit={handleSubmit}>
           <div class="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
          
          <input 
          type="email" 
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="email"
          value={email} 
          onChange={(event) => setEmail(event.target.value)}
          //onChange={(event) => setEmail(event.target.value)}
         // onChange={handleEmailChange} 
          class="form-control" 
        />
        </label>
        <div id="emailHelp" className="form-text">please enter email address </div>
        <ReCAPTCHA 
               sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
               onChange={onChange} />
        <button type="submit"  className="btn btn-primary w-100 mt-4 rounded-pill" >Send Mail</button>
        </div>
      </form>
        </div>
      </div>
    </div>  
  </div>   
  </div>     
  );
};

export default Forgetpassword;