import { Button, Col, DatePicker, Form, Input, Modal, Row, TimePicker } from "antd";
import SelectWrapper from "../../../../shared/SelectWrapper/SelectWrapper";
import DatePickerIcon from "../../../../assets/BookingCalander/images/date-picker.png";
import TextArea from "antd/es/input/TextArea";
import "./AddRequestModal.scss";
import { useState } from "react";
import InputWrapper from "../../../../shared/InputWrapper/InputWrapper";
const AddRequestModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [requestType, setRequestType] = useState("");
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(requestType);
  return (
    <Modal
      className="add-request-modal"
      width={890}
      centered
      footer={false}
      title="Add Request"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="modal-content">
        <Form layout="vertical">
          <Row gutter={[20, 20]}>
            <Col md={12} xs={24}>
              <SelectWrapper
                label="Request Type"
                onChange={(value: string) => {
                  setRequestType(value);
                }}
                required={true}
                placeHolder="Select"
                options={[
                  { value: "Time Range", label: "Out Of Office" },
                  { value: "Shift off Time", label: "Emergency Shift Off" },
                  { value: "Actual Check-In Time", label: "Change Check-In time" },
                  { value: "Actual Check-Out Time", label: "Change Check-Out time" },
                  { value: "other", label: "Other" },
                ]}
                name="requestType"
              />
            </Col>
            {requestType === "other" && (
              <Col md={12} xs={24}>
                <InputWrapper
                  label="Specify Other Request Type"
                  required={true}
                  name="otherRequest"
                  placeHolder="Type here"
                  onChange={(e: any) => console.log(e.target.value)}
                />
              </Col>
            )}
            <Col md={12} xs={24}>
              <InputWrapper
                label="Reason"
                required={true}
                name="reason"
                placeHolder="Type here"
                onChange={(e: any) => console.log(e.target.value)}
              />
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                required={true}
                label={<span className="label">Date</span>}
                name="date"
                rules={[{ required: true, message: "Required field" }]}
              >
                <DatePicker
                  size="large"
                  style={{
                    border: "1.5px solid #A0A3BD",
                    borderRadius: "3px",
                    width: "100%",
                    height: "45px",
                  }}
                  placeholder="Choose one or more dates"
                  suffixIcon={<img src={DatePickerIcon} alt="calander-icon" />}
                />
              </Form.Item>
            </Col>
            {requestType !== "other" && requestType !== "" && requestType !== "Time Range" && (
              <Col md={12} xs={24}>
                <Form.Item
                  required={true}
                  label={<span className="label">{requestType}</span>}
                  name="time"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <TimePicker
                    style={{
                      border: "1.5px solid #A0A3BD",
                      borderRadius: "3px",
                      width: "100%",
                      height: "45px",
                    }}
                    use12Hours
                    format="h:mm:ss A"
                  />
                </Form.Item>
              </Col>
            )}
            {requestType === "Time Range" && (
              <Col md={12} xs={24}>
                <Form.Item
                  required={true}
                  label={<span className="label">{requestType}</span>}
                  name="time"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <TimePicker.RangePicker
                    style={{
                      border: "1.5px solid #A0A3BD",
                      borderRadius: "3px",
                      width: "100%",
                      height: "45px",
                    }}
                    use12Hours
                    format="h:mm:ss A"
                  />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} md={12}>
              <Form.Item label={<span className="label">Description</span>}>
                <Input.TextArea
                  rows={4}
                  placeholder="Type here"
                  style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="save-btn" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};
export default AddRequestModal;
