import { Button, Col, Modal, Row } from "antd";
import React from "react";
import HomeImg from "../../../../../../assets/images/staffManager/home.png";
import CloseIcon from "../../../../../../assets/icons/close-icon.svg";
import "./MoreInfoModal.scss";

const MoreInfoModal = (props: any) => {
  const { isMoreInfo, setIsMoreInfo } = props;
  return (
    <>
      <Modal
        title="More Information "
        centered
        width={784}
        open={isMoreInfo}
        onOk={() => setIsMoreInfo(false)}
        onCancel={() => setIsMoreInfo(false)}
        footer={false}
        className="staff-more-information-modal"
        closeIcon={<img src={CloseIcon} alt="" />}
      >
        <div className="more-info-modal-wrapper">
          <div className="more-info-heading d-flex align-center">
            <img src={HomeImg} alt="homeIcon" />
            <span className="fs-24 fw-600 line-height-32">
              Tall Tree Care Home
            </span>
          </div>

          <div className="more-information-data d-flex flex-column">
            <Row gutter={[18, 18]} className=" more-information-content" >
              <Col xl={6} lg={8} sm={8} xs={12}>
              <span className="fs-16 fw-600 line-height-22">Address:</span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
              <span className="fs-16 fw-400 line-height-22">
                Tho Grip, Linton, Cambridge, England, Cambridgeshire, CB21 4XN
              </span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
            <Col xl={6} lg={8} sm={8} xs={12}>
              <span className="fs-16 fw-600 line-height-22">
                Total Shift Hours:
              </span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
              <span className="fs-16 fw-400 line-height-22">9.00 Hrs.</span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
            <Col xl={6} lg={8} sm={8} xs={12}>
              <span className="fs-16 fw-600 line-height-22">Date:</span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
              <span className="fs-16 fw-400 line-height-22">
                May 22,Sun - 2022
              </span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
            <Col xl={6} lg={8} sm={8} xs={12}>
              <span className="fs-16 fw-600 line-height-22">Shift Timing:</span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
              <span className="fs-16 fw-400 line-height-22">07:30 - 17:00</span>
              </Col>
            </Row>
            <Row gutter={[18, 18]}  className=" more-information-content" >
            <Col xl={6} lg={8} sm={8} xs={12}>
              <span className="fs-16 fw-600 line-height-22">
                Total Shift Pay:
              </span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
              <span className="fs-16 fw-400 line-height-22">£275.00</span>
              </Col>
            </Row>
            <Row gutter={[18, 18]}  className=" more-information-content" >
            <Col xl={6} lg={8} sm={8} xs={12}>
              <span className="fs-16 fw-600 line-height-22">Department:</span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
              <span className="fs-16 fw-400 line-height-22">DEP-1</span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
            <Col xl={6} lg={8} sm={8} xs={12}>
              <span className="fs-16 fw-600 line-height-22">
                Distance from you:
              </span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
              </Col>
            </Row>
            <span className="fs-16 fw-400 line-height-22">
              About: Care homes provide accommodation and personal care for
              people who need extra support in their daily lives. Personal care
              might include help with eating, washing, dressing, going to the
              toilet or taking medication
            </span>
          </div>

          
        </div>
        <div className="more-info-modal-btn">
          {/* <button type="button" className="more-info-btn-1">
            Accept Without Transport
          </button> */}
          <button type="button" className="more-info-btn-2">
            Accept With Transport
          </button>
        </div>
      </Modal>
    </>
  );
};
export default MoreInfoModal;
