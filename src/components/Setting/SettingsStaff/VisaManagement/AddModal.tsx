import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
} from "antd";
import "./VisaManagement.scss";
import AppSnackbar from "../../../../utils/AppSnackbar";
import { usePostVisaManagementMutation, useUpdateVisaManagementMutation } from "../../../../store/Slices/Setting/StaffSettings/VisaManagement";
// import "../../../../sass/common.scss";

function AddModal(props: any) {
  const { addEditVisa, setAddEditVisa, editModalFieldValues, setEditModalFieldValues } = props;
  const [errorUsers, setErrorUsers] = useState("");
  const [postVisaManagement] = usePostVisaManagementMutation();
  const [updateVisaManagement, { success: updateSuccess }, isError]: any = useUpdateVisaManagementMutation();

  const [form] = Form.useForm();

  if (addEditVisa !== "Add") {
    const formValues = {
      title: editModalFieldValues?.title,
    }
    form.setFieldsValue(formValues)
  }



  //Failed form fields
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //On Finish used to reset form fields in form
  const onFinish = async (values: any) => {

    const newpayload = {
      studentVisaApplicable: true,
      ...values,
      enable: true,
      id: editModalFieldValues._id
    }

    try {
      if (addEditVisa === "Add") {
        await postVisaManagement({ payload: newpayload }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
        // form.resetFields();
      }

      else {
        await updateVisaManagement({ payload: newpayload }).unwrap()
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        // form.resetFields();
      }

      form.resetFields();
      setAddEditVisa('');
      setEditModalFieldValues({})
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  };





  return (
    <Modal
      title={`${addEditVisa === "Add" ? "Add" : "Edit"} Visa Type`}
      open={!!addEditVisa}
      onOk={() => {
        setAddEditVisa('');
        setEditModalFieldValues({});
      }}
      onCancel={() => {
        setAddEditVisa('');
        setEditModalFieldValues({});
      }}
      centered
      className="add-visa-type"
      footer={false}
      width="888px"
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} style={{ marginTop: "20px" }}>
        <Row gutter={20}>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Visa Type</label>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Type here"
                id="title"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: "20px" }}>

          <Button
            className="btn-cancel"
            onClick={() => {
              setAddEditVisa('');
              setEditModalFieldValues({});
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn-save btn-secondary"
            htmlType="submit"
            onClick={() => {
              setErrorUsers("Required field");
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default AddModal;
