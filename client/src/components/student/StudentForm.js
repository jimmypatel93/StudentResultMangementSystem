import React from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { convertDateToString } from '../../utils/helper';

export const StudentForm = (props) => {
  const {
    student,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    isValidEmail,
  } = props;

  const todayDate = new Date();
  const tenYearsAgo = new Date(); // Create a new Date object
  tenYearsAgo.setFullYear(todayDate.getFullYear() - 10);

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={12} md={6}>
          <Form.Group controlId="firstName">
            <Form.Label className="mt-2">First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={student.firstName}
              onChange={handleInputChange}
              required
              autoFocus
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={6}>
          <Form.Group controlId="familyName">
            <Form.Label className="mt-2">Family Name</Form.Label>
            <Form.Control
              type="text"
              name="familyName"
              placeholder="Enter family name"
              value={student.familyName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <Form.Group controlId="dateOfBirth">
            <Form.Label className="mt-2">
              Date of Birth (10 years or older)
            </Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              placeholder="Enter date of birth"
              value={student.dateOfBirth}
              onChange={handleInputChange}
              max={convertDateToString(tenYearsAgo)}
              required
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={6}>
          <Form.Group controlId="email">
            <Form.Label className="mt-2">Email Address</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email address"
              value={student.email}
              onChange={handleInputChange}
              required
              isInvalid={student.email && !isValidEmail}
            />
          </Form.Group>
          {!isValidEmail && (
            <Form.Control.Feedback
              type="invalid"
              style={{ display: isValidEmail ? 'none' : 'block' }}
            >
              Please enter a valid email address.
            </Form.Control.Feedback>
          )}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-1"
                />{' '}
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
