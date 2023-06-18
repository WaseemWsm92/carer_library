import React from "react";
import { Row, Col } from "antd";

const TraningsCard = () => {
  return (
    <>
      <div className="tranings-card-wrapper">
        <h4 className="fs-20 fw-500 line-height-28 title-color">Tranings</h4>
        <Row gutter={[16, 16]} className="m-0">
          <Col lg={12} md={24} xs={24} sm={24} className="m-0">
            <span className="fs-12 fw-400 line-height-18">Up To Date</span>
            <p className="fs-14 fw-600 line-height-22 m-0">No</p>
          </Col>
          <Col lg={12} md={24} xs={24} sm={24} className="m-0">
            <p className="fs-12 fw-400 line-height-18 m-0">Next Minimum Expiray Date</p>
            <p className="fs-14 fw-600 line-height-22 m-0">Wednesday March 11 2020</p>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default TraningsCard;