import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Cancel = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-center">
          
          </div>
          <h1 className="text-center mb-4">Payment Cancelled</h1>
          <p className="text-center">We're sorry to see you go. If you'd like to try again, simply click the button below to go back to the home page.</p>
          <div className="d-flex justify-content-center">
            <Button variant="success" size="lg" href="/" className="mt-4">Go Back </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Cancel

