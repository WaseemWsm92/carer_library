import { useState } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
} from "antd";
import { usePostDbsConfigurationMutation, useUpdateDbsConfigurationMutation } from "../../../store/Slices/Setting/DbsConfiguration";
import AppSnackbar from "../../../utils/AppSnackbar";
import form from "antd/es/form";
// import "../../../../sass/common.scss";

function AddModal(props: any) {
  const { openDbsConfigurationModal, setOpenDbsConfigurationModal, editModalFieldValues, setEditModalFieldValues } = props;
  const [errorUsers, setErrorUsers] = useState("");
  const [form] = Form.useForm();

  const [postDbsConfiguration] = usePostDbsConfigurationMutation();
  const [updateDbsConfiguration] = useUpdateDbsConfigurationMutation();


  if (openDbsConfigurationModal !== "Add") {

    const formValues = {
      websiteName: editModalFieldValues?.websiteName,
      websiteLink: editModalFieldValues?.websiteLink,
    }

    form.setFieldsValue(formValues)
  }


  //Failed form fields
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  //On Finish used to reset form fields in form
  const onFinish = async (values: any) => {

    try {
      if (openDbsConfigurationModal === "Add") {
        await postDbsConfiguration({ payload: values }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
      }
      else {
        await updateDbsConfiguration({ payload: values, id: editModalFieldValues?._id }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
      }

      form.resetFields();
      setOpenDbsConfigurationModal('');
      setEditModalFieldValues({});

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
      title={`${openDbsConfigurationModal === "Add" ? "Add" : 'Edit'} DBS Check Link`}
      open={!!openDbsConfigurationModal}
      onOk={() => {
        setOpenDbsConfigurationModal('');
        setEditModalFieldValues({})
      }}
      onCancel={() => {
        setOpenDbsConfigurationModal('');
        setEditModalFieldValues({})
      }}
      centered
      className="add-dbs-check"
      footer={false}
      width="888px"
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={20} style={{ marginTop: "20px" }}>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Website Name</label>
            <Form.Item
              name="websiteName"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Enter website name"
                // id="websiteName"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Wesite URL</label>
            <Form.Item
              name="websiteLink"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Enter website link"
                // id="websiteLink"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>

        </Row>

        <Form.Item style={{ marginTop: "20px" }}>

          <Button
            className="btn-cancel"
            onClick={() => {
              setOpenDbsConfigurationModal(''); setEditModalFieldValues({}); form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn-secondary"
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
