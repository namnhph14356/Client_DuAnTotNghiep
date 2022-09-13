import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Typography } from "antd";
import './style.css'
const Education = (props) => {
  return (
    <div className="container"> 
      <Typography.Title level={4} className="my-2 mt-3">EDUCATION</Typography.Title>
      <Row className="mb-2">
        <Col xs={12} sm={12} md={8} lg={8} xl={8} className="my-2 mt-2 mb-2">
          <Typography.Text>2008 – 2010</Typography.Text>
          <Typography.Title level={5}>WEBSTER TECH UNIVERSITY</Typography.Title>
          <Typography.Text>Master of Computer Science</Typography.Text>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="my-2 mt-2 mb-2">
          <p>
            Consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque
            aaliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id,
            mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
            tortor libero sodales leo, eget blandit nunc tortor eu nibh.
          </p>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={12} sm={12} md={8} lg={8} xl={8} className="my-2 mt-2 mb-2">
          <Typography.Text>2008 – 2010</Typography.Text>
          <Typography.Title level={5}>WEBSTER TECH UNIVERSITY</Typography.Title>
          <Typography.Text>Master of Computer Science</Typography.Text>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="my-2 mt-2 mb-2">
          <p>
            Consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque
            aaliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id,
            mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
            tortor libero sodales leo, eget blandit nunc tortor eu nibh.
          </p>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={12} sm={12} md={8} lg={8} xl={8} className="my-2 mt-2 mb-2">
          <Typography.Text>2008 – 2010</Typography.Text>
          <Typography.Title level={5}>WEBSTER TECH UNIVERSITY</Typography.Title>
          <Typography.Text>Master of Computer Science</Typography.Text>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="my-2 mt-2 mb-2">
          <p>
            Consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque
            aaliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id,
            mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
            tortor libero sodales leo, eget blandit nunc tortor eu nibh.
          </p>
        </Col>
      </Row>
    </div>
  );
};

Education.propTypes = {};

export default Education;
