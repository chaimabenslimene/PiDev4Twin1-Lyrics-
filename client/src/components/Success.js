import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios';

const Success = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState("");
  useEffect(() => {
    axios
    .post(`http://localhost:5000/api/payment/${searchParams.get("payment_id")}`)
    .then((res) => {
      setResult(res.data.result.status);
    })
    .catch((err) => console.error(err));
  }, []);
  return (
    
<React.Fragment>
     
      
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <i className="fas fa-check-circle fa-7x text-success mb-4"></i>
          <h1 className="mb-3">Thank you for your purchase!</h1>
          <p>Your payment has been successfully processed.</p>
          <Link to="/">
          <Button variant="success" className="mt-3">
            Back to Home
          </Button>
          </Link>
        </div>
      </div>
      
    </React.Fragment>
  )
}

export default Success
