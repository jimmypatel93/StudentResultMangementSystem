import React from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
export const CourseForm = (props) => {
  const { course, handleInputChange, handleSubmit, isSubmitting } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={12} md={6}>
          <Form.Group controlId="courseName">
            <Form.Label className="mt-2">Course Name</Form.Label>
            <Form.Control
              type="text"
              name="courseName"
              placeholder="Enter course name"
              value={course.courseName}
              onChange={handleInputChange}
              required
              autoFocus
              autoComplete="new-password"
            />
          </Form.Group>
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
