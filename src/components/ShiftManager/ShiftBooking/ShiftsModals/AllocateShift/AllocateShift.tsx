import { Col, Form, Input, Modal, Row } from "antd";
import DatePickerWrapper from "../../../../../shared/DatePickerWrapper/DatePickerWrapper";
import SelectWrapper from "../../../../../shared/SelectWrapper/SelectWrapper";
// import SwitchWrapper from "../../../../../shared/SwitchWrapper/SwitchWrapper";
import "./AllocateShift.scss";
import ViewPreferences from "./ViewPreferences";
import InputWrapper from '../../../../../shared/InputWrapper/InputWrapper';
import TextArea from "antd/es/input/TextArea";
import CloseIcon from "../../../../../assets/icons/ShiftManger/close-icon.svg";
import TimePickerWrapper from "../../../../../shared/TimePickerWrapper/TimePickerWrapper";

const AllocateShift = (props: any) => {
  const { open, onCancel, onFinish,staffList,errorMsg,preferences,selectedRow } = props;

  console.log(selectedRow)

  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title="Reallocate Staff"
        open={open}
        footer={false}
        onCancel={onCancel}
        className="booking-allocate-modal-wrapper"
        width={890}
        centered
        closeIcon={<img src={CloseIcon} alt="close" />}
      >
        <p className="allocate-paragraph light-black-color fw-400 line-height-22 m-0">
          This feature should be used only for booking a particular staff member for a shift
        </p>
        <div className="allocate-modal-content">
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Row gutter={[30, 20]}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SelectWrapper
                  label="Care Home"
                  name="careHome"
                  required={false}
                  placeHolder="Select"
                  disabled={true}
                  defaultValue={"Arlington Manor"}
                  options={[]}
                />
              </Col>
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="post-shift-fields date-picker-wrap"
              >
                <DatePickerWrapper name="shiftDate" label="Shift Date" required={true} />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SelectWrapper
                  label="Choose user type"
                  name="userType"
                  disabled
                  defaultValue={selectedRow?.carer?.userType?.name || ''}
                  placeHolder="Select"
                  options={[]}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SelectWrapper
                  label="Choose a shift"
                  name="chooseShift"
                  disabled
                  defaultValue={selectedRow?.shift?.shiftType || selectedRow?.shiftType}
                  placeHolder="Select"
                  options={[]}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <TimePickerWrapper
                  label="Start Time"
                  name="startTime"
                  required={true}
                  placeHolder="hh:mm:ss"
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <TimePickerWrapper
                  label="End Time"
                  name="endTime"
                  required={true}
                  placfeHolder="hh:mm:ss"
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SelectWrapper
                  label="Department"
                  name="department"
                  // required={true}
                  placeHolder="Select"
                  options={[]}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
              <InputWrapper
                  name="requestedBy"
                  type="text"
                  disabled
                  defaultValue={selectedRow?.shift?.requestedBy || selectedRow?.requestedBy}
                  placeHolder='Requested by'
                  label="Shift requested by"
                />
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <ViewPreferences preferences={preferences} />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SelectWrapper
                  label="Available Staff Member"
                  name="availableStaff"
                  required={true}
                  placeHolder="Select"
                  options={staffList}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields ">
                <Form.Item
                  label={"Optional Information, if any."}
                  name={["updateReason"]}
                  rules={[{ message: "Required Field", required: false }]}
                >
                  <TextArea rows={4} placeholder="Type here" />
                </Form.Item>
              </Col>
              {/* <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SwitchWrapper
                  name="acceptence"
                  label="Staff acceptence required[Optional]"
                  required={false}
                />
              </Col> */}
            </Row>
            <p style={{color:'#ff4d4f'}} className='fw-16 fw-400'>{errorMsg?.data?.message}</p>
            <div className="allocate-shift-btn d-flex align-center">
              <button
                type="button"
                className="cancel-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
                onClick={() => {
                  form.resetFields();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="save-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
              >
                Book Staff
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AllocateShift;
