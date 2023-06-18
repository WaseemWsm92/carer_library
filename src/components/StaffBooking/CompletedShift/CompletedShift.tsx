import React, { useState } from "react";
import { Layout, Card, Row, Col, Divider, Select, Form, Avatar } from "antd";
import { completedShiftData } from "../../../mock/ShiftDetailsMockData/ShiftDetailsMock";
import "./CompletedShift.scss";
import CompletedShiftModal from "./Modal/CompletedShiftModal";

const CompletedShift = () => {
  const [isCompletedConfirmModal, setIsCompletedConfirmModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Layout className="wrap-shifts-details-completed-shift">
        <Card className="shifts-details-completed-shift border-radius-10">
        <Row gutter={[23, 23]}  > 
        <Col xxl={6} xl={6} lg={9} md={24}sm={24} xs={24}> 
          <Avatar style={{ backgroundColor: "#4E132C", color: "#FFFFFF" }} size="large" > 
          {/* `${staffSummaryDetails?.fullName.charAt(0).toUpperCase()}  */} KM
          </Avatar> <span className="fs-14 fw-600 line-height-17" style={{ marginLeft: "10px" }} > 
          {/* {`${staffSummaryDetails?.fullName.split(' ')[0]?.charAt(0).toUpperCase()}
          ${staffSummaryDetails?.fullName.split(' ')[0]?.slice(1).toLowerCase()} 
          ${staffSummaryDetails?.fullName.split(' ')[1]?.charAt(0).toUpperCase()}
          ${staffSummaryDetails?.fullName.split(' ')[1]?.slice(1).toLowerCase()}`}  */}
          Khalid
          </span> 
          </Col>

          <Col  xxl={18} xl={18} lg={15} md={24} sm={24} xs={24}>
          <Form
            layout="vertical"
            form={form}
            name="control-hooks"
            onFinish={onFinish}
           style={{marginLeft:"6px"}} 
          >
            <Form.Item
              name="gender"
              label={
                <span className="fs-14 fw-600 line-height-17 title-color">
                  Sign off Status
                </span>
              }
            >
              <Select
                className="completed-shift-select-input border-radius-4"
                defaultValue="All"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "jack", label: "Jack" },
                ]}
              />
            </Form.Item>
          </Form>
          </Col>

        
          </Row>
          <Row gutter={[23, 23]} className="wrap-main-completed-shift">
            {completedShiftData.map((shiftData: any, id) => {
              return (
                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  key={id}
                  className="gutter-row  "
                >
                  <Card className="wrap-completed-shift-card-content  border-radius-10">
                    <div className="d-flex justify-between main-cancelled-shift-detail-content">
                      <Col
                       xxl={6} xl={6} lg={8} md={24}sm={24} xs={24}
                        className="shift-details-cancel-left-content"
                      >
                        <div className="d-flex align-center cancel-shift-img-text">
                          <img
                            src={shiftData.titleImg}
                            alt="HomeIcon"
                            width="32px"
                            height="32px"
                            className="shift-img"
                          />
                          <span className="fw-500 fs-20 shift-title title-color cancel-shift-title">
                            {shiftData.title}
                          </span>
                        </div>

                        <div className="shift-cancel-bottom-content">
                          <Row
                            gutter={[18, 18]}
                            className="d-flex align-items-center shift-cancel-card-content"
                          >
                            <Col xl={3}>
                              <img
                                src={shiftData.weatherImg}
                                alt="HomeIcon"
                                width={18}
                                height={24}
                              />
                            </Col>
                            <Col xl={10}>
                              <span className="fw-400 fs-14 line-height-22 title-color text-left">
                                {shiftData.weather}
                              </span>
                            </Col>
                          </Row>
                          <Row
                            gutter={[18, 18]}
                            className=" d-flex align-items-center shift-cancel-card-content"
                          >
                            <Col xl={3}>
                              <img
                                src={shiftData.dateImg}
                                alt="HomeIcon"
                                width={21}
                                height={21}
                              />
                            </Col>
                            <Col xl={20}>
                              <span className="fw-400 fs-14 line-height-22 title-color">
                                {shiftData.date}
                              </span>
                            </Col>
                          </Row>
                          <Row
                            gutter={[18, 18]}
                            className="d-flex align-items-center shift-cancel-card-content"
                          >
                            <Col xl={3}>
                              <img
                                src={shiftData.shiftRateImg}
                                alt="HomeIcon"
                                width={16}
                                height={16}
                              />
                            </Col>
                            <Col xl={18}>
                              {" "}
                              <span
                                className="fw-400 fs-14 line-height-22 title-color"
                                dangerouslySetInnerHTML={{
                                  __html: shiftData?.rate,
                                }}
                              ></span>
                            </Col>
                          </Row>
                          <Row
                            gutter={[18, 18]}
                            className="d-flex align-items-center shift-cancel-card-content"
                          >
                            <Col xl={3}>
                              {" "}
                              <img
                                src={shiftData.departmentImg}
                                alt="HomeIcon"
                                width={16}
                                height={16}
                                className=""
                                style={{
                                  borderRadius: "50%",
                                  border: "1px solid #65CDF0",
                                }}
                              />
                            </Col>
                            <Col xl={18}>
                              <span
                                className="fw-400 fs-14 line-height-22 title-color"
                                dangerouslySetInnerHTML={{
                                  __html: shiftData?.department,
                                }}
                              ></span>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      {/* <Divider type="vertical" style={{height:"210px",border:"1px solid  #D9DBE9"}}/> */}
                      <Col  xxl={18} xl={18} lg={15} md={24} sm={24} xs={24}>
                        <div className="m-auto wrapper-left-card-shift-completed-content">
                          <Card className="completed-shift-details-left-content">
                            <p
                              className="fw-500 fs-16 line-height-24 title-color "
                              style={{ paddingBottom: "4px", marginTop: "0px" }}
                            >
                              Shift Calculation
                            </p>
                            <Row
                              gutter={[8, 8]}
                              style={{ paddingBottom: "12px" }}
                            >
                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Total Shift Hours
                                </span>
                              </Col>
                              <Col xl={4}>
                                <span
                                  className="fw-600 fs-14 line-height-17 title-color"
                                  dangerouslySetInnerHTML={{
                                    __html: shiftData?.totalShiftHours,
                                  }}
                                ></span>
                              </Col>
                              <Col xl={4}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Shift Rate
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span
                                  className="fw-600 fs-14 line-height-17 title-color"
                                  dangerouslySetInnerHTML={{
                                    __html: shiftData?.shiftRate,
                                  }}
                                ></span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Shift Type
                                </span>
                              </Col>
                              <Col xl={2}>
                                <span
                                  className="fw-600 fs-14 line-height-17 title-color"
                                  dangerouslySetInnerHTML={{
                                    __html: shiftData?.shiftType,
                                  }}
                                ></span>
                              </Col>

                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  End Shift Rate
                                </span>
                              </Col>
                              <Col xl={2}>
                                <span
                                  className="fw-600 fs-14 line-height-17 title-color"
                                  dangerouslySetInnerHTML={{
                                    __html: shiftData?.endShiftRate,
                                  }}
                                ></span>
                              </Col>
                            </Row>

                            <Row gutter={[12, 12]}>
                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Shift Time
                                </span>
                              </Col>
                              <Col xl={4}>
                                <span
                                  className="fw-600 fs-14 line-height-17 title-color"
                                  dangerouslySetInnerHTML={{
                                    __html: shiftData?.shiftTime,
                                  }}
                                ></span>
                              </Col>

                              <Col xl={4}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Total Shift Amount:
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span
                                  className="fw-600 fs-14 line-height-17 title-color"
                                  dangerouslySetInnerHTML={{
                                    __html: shiftData?.totalShiftAmount,
                                  }}
                                ></span>
                              </Col>

                              <Col span={3.7}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Extra Hours Worked:
                                </span>
                              </Col>
                              <Col xl={2}>
                                <span
                                  className="fw-600 fs-14 line-height-17 title-color"
                                  dangerouslySetInnerHTML={{
                                    __html: shiftData?.extraHoursWorked,
                                  }}
                                ></span>
                              </Col>

                              <Col xl={2}>
                                <span
                                  className="fw-400 fs-14 line-height-22 title-color completed-shift-signed-off-title cursor-pointer"
                                  onClick={() => setIsCompletedConfirmModal(true)}
                                >
                                  {shiftData.signedOff}
                                </span>
                              </Col>
                            </Row>
                          </Card>

                          <Card className="completed-shift-signed-off-left-content">
                            {/* <p className='fw-500 fs-16 line-height-24 title-color ' style={{paddingBottom:"4px",marginTop:"0px"}}>  Shift Calculation</p> */}
                            <Row
                              gutter={[8, 8]}
                              style={{ paddingBottom: "12px" }}
                            >
                              <Col xl={5}>
                                <span className="fw-600 fs-14 line-height-17 title-color ">
                                  Signed-off by:
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color">
                                  {shiftData.signedOffBy}
                                </span>
                              </Col>

                              <Col xl={5}>
                                <span className="fw-400 fs-14 line-height-22 title-color">
                                  {shiftData.signedOffDateTime}
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-600 fs-14 line-height-17 title-color ">
                                  Modified By:
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color">
                                  {shiftData.modifiedBy}
                                </span>
                              </Col>
                              <Col xl={5}>
                                <span className="fw-400 fs-14 line-height-22 title-color">
                                  {shiftData.modifiedByDateTime}
                                </span>
                              </Col>
                            </Row>

                            <Row gutter={[10, 10]}>
                              <Col xl={5}>
                                <span className="fw-600 fs-14 line-height-17 title-color ">
                                  Modification Reason:
                                </span>
                              </Col>
                              <Col xl={19}>
                                <span className="fw-400 fs-14 line-height-22 title-color">
                                  {shiftData.modificationReason}
                                </span>
                              </Col>
                            </Row>
                          </Card>
                        </div>
                      </Col>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card>
      </Layout>
      <CompletedShiftModal
        isCompletedConfirmModal={isCompletedConfirmModal}
        setIsCompletedConfirmModal={setIsCompletedConfirmModal}
      />
    </>
  );
};
export default CompletedShift;
