import {
  Button,
  Input,
  Form,
  Row,
  Col,
} from "antd";
import "./SettingChangePassword.scss";
import "../../../sass/common.scss";
import { useNavigate } from "react-router-dom";

const SettingChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //Failed form fields
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  //On Finish used to reset form fields in form
  const onFinish = (values: any) => {
    form.resetFields();
  };

    return (
        <Form className="setting-change-password border-radius-8" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <h1 className="fs-24 fw-500 m-0">Change Password </h1>
        <Row gutter={20} style={{ marginBottom: "15px" }}>
          <Col lg={8} xs={24}>
            <label className="fs-14 fw-600">Enter Current Password<span style={{color:"#FF4D4F"}}>*</span></label>
            <Form.Item
              name="CurrentPassword"
              // label="Current Password"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Type here"
                id="CurrentPassword"
                style={{ marginTop: "2px" }}
              />
            </Form.Item>
          </Col>
        
        </Row>
        <Row gutter={20} style={{ marginBottom: "15px" }}>
          <Col lg={8} xs={24}>
            <label className="fs-14 fw-600">Enter New Password<span style={{color:"#FF4D4F"}}>*</span></label>
            <Form.Item
              name="NewPassword"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Type here"
                id="NewPassword"
                style={{ marginTop: "2px" }}
              />
            </Form.Item>
          </Col>
        
        </Row>
        <Row gutter={20} style={{ marginBottom: "15px" }}>
          <Col lg={8} xs={24}>
            <label className="fs-14 fw-600">Confirm Password<span style={{color:"#FF4D4F"}}>*</span></label>
            <Form.Item
              name="ConfirmPassword"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Type here"
                id="ConfirmPassword"
                style={{ marginTop: "2px" }}
              />
            </Form.Item>
          </Col>
        
        </Row>
        <Form.Item style={{ marginTop: "10px" }}>


          <Button
            className="btn-cancel"
            onClick={() => {
              form.resetFields();navigate("/settings");
            }}
          >
            Cancel
          </Button>
          <Button
          style={{ marginLeft: "10px" }}
            className="btn-secondary"
            htmlType="submit"
          >
            Reset
          </Button>
        </Form.Item>
      </Form>


    )
}

export default SettingChangePassword