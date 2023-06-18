import { useState } from "react";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import AddClientSelect from "./ClientNameSelect";
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import "./AddClientRateSetupModal.scss";

const clientNameOptions = ["Bell Tree Care Home", "Sunnyside Care Home", "Newcross Care Home"];
const staffCategoryOptions = ["HCA", "SHCA", "SW", "RGN"];

const AddClientRateSetupModal = (props: any) => {
  const { isAddClientRate, setIsAddClientRate } = props;
  const [clientNameCheckedList, setClientNameCheckedList] = useState<CheckboxValueType[]>();
  const [staffCheckedList, setStaffCheckedList] = useState<CheckboxValueType[]>();

  const [form] = Form.useForm();

  const onFinish = () => {
    setIsAddClientRate(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<span className="fs-16 fw-500">Add Client Rate</span>}
      closeIcon={< img src={Close} alt="close-icon" />}
      open={isAddClientRate}
      onOk={() => setIsAddClientRate(false)}
      onCancel={() => setIsAddClientRate(false)}
      className="add-client-modal-main"
      centered
      footer={false}
      width={717}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[12, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Client Name" name="clientName">
              <AddClientSelect
                options={clientNameOptions}
                allCheckOption
                checkedList={clientNameCheckedList}
                setCheckedList={setClientNameCheckedList}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Staff Category" name="staffCategory">
              <AddClientSelect options={staffCategoryOptions} checkedList={staffCheckedList} setCheckedList={setStaffCheckedList} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 16]}>
          <Col xs={24} md={6}>
            <Form.Item label="Week Day" name="weekDay">
              <Input style={{ height: "45px" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Saturday" name="saturday">
              <Input style={{ height: "45px" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Sunday" name="sunday">
              <Input style={{ height: "45px" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Bank Holiday" name="bankHoliday">
              <Input style={{ height: "45px" }} />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => setIsAddClientRate(false)}
            style={{ backgroundColor: "#4E132C", padding: "10px 30px", color: "white", borderRadius: 0, height: "46px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setIsAddClientRate(false)}
            style={{ backgroundColor: "#65CDF0", padding: "10px 30px", color: "white", borderRadius: 0, height: "46px" }}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddClientRateSetupModal;
