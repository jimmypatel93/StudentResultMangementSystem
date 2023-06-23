import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CustomPageHeader = (props) => {
  const { headerText, hasButton, buttonText, buttonIcon, redirectURL } = props;

  return (
    <Row className="my-2">
      <Col sm={12}>
        <h3 className="d-inline-block">{headerText}</h3>
        {hasButton && (
          <Link
            className="btn btn-primary float-right d-inline-block"
            to={redirectURL}
          >
            {buttonIcon} {buttonText}
          </Link>
        )}
      </Col>
    </Row>
  );
};
