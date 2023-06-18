import { Fragment, useState } from "react";
import { Button, Col, Form, Modal, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
import MockUser from "../../../../assets/BookingCalander/images/mock-user.png";
import Close from "../../../../assets/images/OnBoarding/Close.svg";
import SelectWrapper from "../../../../shared/SelectWrapper/SelectWrapper";
import dayjs from "dayjs";
import TimePickerWrapper from "../../../../shared/TimePickerWrapper/TimePickerWrapper";
import { useUpdateShiftTimeMutation } from "../../../../store/Slices/BookingCalendar";

function ChangeShiftModal(props: any) {
  const [errorMsg, setErrorMessage] = useState("");
  const { isChangeShiftTimeOpen, setIsChangeShiftTimeOpen, shiftDetails } = props;

  const [updateShiftTime, { isLoading, isSuccess }] = useUpdateShiftTimeMutation();

  const shiftInfoMock = [
    { heading: "Staff Name", detail: shiftDetails?.careHome?.clientName },
    { heading: "Shift Date", detail: dayjs(shiftDetails?.shiftDate).format("DD/MM/YYYY") },
    { heading: "Shift Type", detail: shiftDetails?.shiftType },
  ];

  const onFinish = async (values: any) => {
    const payload = {
      startTime: `${dayjs(shiftDetails?.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.startTime).format("hh:mm:ss")}`,
      endTime: `${dayjs(shiftDetails?.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.endTime).format("hh:mm:ss")}`,
    };
    const { error }: any = await updateShiftTime({ id: shiftDetails?._id, payload });
    if (error) {
      setErrorMessage(error?.data?.message);
    }
  };

  if (isSuccess) {
    setIsChangeShiftTimeOpen(false);
  }

  return (
    <Modal
      centered
      width={636}
      closeIcon={<img src={Close} alt="close" />}
      title={<span className="fs-20 fw-600">Change Shift Time</span>}
      footer={false}
      className="change-shift-modal"
      open={isChangeShiftTimeOpen}
      onOk={() => {
        setIsChangeShiftTimeOpen(false);
      }}
      onCancel={() => {
        setIsChangeShiftTimeOpen(false);
      }}
    >
      <Row className="d-flex align-items-center justify-between">
        <Col xs={24} sm={12} md={12} style={{ margin: "2rem 0 3rem 0" }}>
          <img src={MockUser} alt="mock_user" />
          <h3 className="fs-20 fw-500 m-0">{shiftDetails?.careHome?.clientName}</h3>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Row style={{ lineHeight: 2.5 }}>
            {shiftInfoMock.map((data) => {
              return (
                <Fragment key={uuidv4()}>
                  <Col xs={12} className="fs-14 fw-600">
                    {data.heading}:
                  </Col>
                  <Col xs={12}>{data.detail}</Col>
                </Fragment>
              );
            })}
          </Row>
        </Col>
        <Col xs={24} md={24}>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={[10, 0]}>
              <Col xs={24} md={12}>
                <TimePickerWrapper
                  label="Start Time"
                  name="startTime"
                  required={false}
                  placeHolder="hh:mm:ss"
                  // defaultValue={dayjs(shiftDetails?.startTime).format('HH:mm')}
                />
              </Col>
              <Col xs={24} md={12}>
                <TimePickerWrapper
                  label="End Time"
                  name="endTime"
                  required={false}
                  placeHolder="hh:mm:ss"
                  // defaultValue={dayjs(shiftDetails?.endTime).format('HH:mm')}
                />
              </Col>
              {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
              <Button loading={isLoading} style={{ marginLeft: "auto" }} htmlType="submit" type="primary">
                Change
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}

export default ChangeShiftModal;
