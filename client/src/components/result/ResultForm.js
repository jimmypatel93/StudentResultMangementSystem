import React from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { CustomDropdown } from '../custom/CustomDropdown';

export const ResultForm = (props) => {
  const {
    result,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    students,
    courses,
    scores,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={12} md={6}>
          <CustomDropdown
            labelText={'Student Name'}
            options={students}
            value={result.studentId}
            id={'studentId'}
            handleInputChange={handleInputChange}
            required={true}
            labelClassName={'mt-2'}
          />
        </Col>
        <Col sm={12} md={6}>
          <CustomDropdown
            labelText={'Course Name'}
            options={courses}
            value={result.courseId}
            id={'courseId'}
            handleInputChange={handleInputChange}
            required={true}
            labelClassName={'mt-2'}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <CustomDropdown
            labelText={'Score'}
            options={scores}
            value={result.score}
            id={'score'}
            handleInputChange={handleInputChange}
            required={true}
            labelClassName={'mt-2'}
          />
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
