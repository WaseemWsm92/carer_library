import { useState } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
} from "antd";
import arrowDown from "../../../assets/icons/arrow-down-icon.svg"
import { usePostJobRequestMutation, useUpdateCrossAllocationMutation, useUpdateJobRequestMutation } from "../../../store/Slices/Setting/JobRole";
import AppSnackbar from "../../../utils/AppSnackbar";

function AddModal(props: any) {
  const { addEditJobRole, setAddEditJobRole, modalType, getTableRowValues, setGetFieldValues } = props;
  const [errorUsers, setErrorUsers] = useState("");
  const [postJobRequest, error, success, isSuccess, reset]: any = usePostJobRequestMutation();
  const [updateJobRequest, { success: updateSuccess }, isError]: any = useUpdateJobRequestMutation();
  const [updateCrossAllocation]: any = useUpdateCrossAllocationMutation();
  const [form] = Form.useForm();


  // Error cases Varaibles
  let apiErrorMessage = error;

  if (modalType !== "Add") {
    const formValues = {
      name: getTableRowValues.name,
      shortForm: getTableRowValues.shortForm,
      userRole: getTableRowValues.userRole
    }
    form.setFieldsValue(formValues)
  }

  //Failed form fields
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  //On Finish used to reset form fields in form
  const onFinish = async (values: any) => {
    apiErrorMessage = null;
    // for error cases
    // const valuessss = { mneee: values?.name, ...values };

    try {
      if (modalType === 'Edit') {
        await updateJobRequest({ id: getTableRowValues._id, payload: values }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        // apiErrorMessage = '';
      }
      else {
        await postJobRequest({ payload: values }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
        // apiErrorMessage = '';
      }

      setAddEditJobRole(false);
      form.resetFields();

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
      title="Manage Job Role"
      open={addEditJobRole}
      onOk={() => {
        setAddEditJobRole(false);
        setGetFieldValues({});
      }}
      onCancel={() => {
        setAddEditJobRole(false);
        setGetFieldValues({});
        apiErrorMessage = '';
      }}
      centered
      className="add-Manage-Job-Role"
      footer={false}
      width="888px"
      maskClosable={false}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={20} style={{ marginTop: "20px" }}>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Position Name</label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Type here"
                id="PositionName"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select User Role</label>
            <Form.Item
              name="userRole"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} />}
                className="d-flex"
                placeholder="Selected Option"
                options={[
                  { value: 'Medical', label: 'Medical' },
                  { value: 'Medical Staff', label: 'Medical Staff' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Position Short Form</label>
            <Form.Item
              name="shortForm"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Type here"
                id="PositionShortForm"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>

          {/* {apiErrorMessage !== undefined && <p className="fs-14 fw-400 line-height-18 error-color  m-0" style={{ marginBottom: "1rem" }}>{apiErrorMessage?.status === 400 ? 'Request not fulfilled! Try again after some time.' : 'Something went wrong.'}</p>} */}
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              setErrorUsers("Required field");
            }}
          >
            {modalType === 'Edit' ? 'Update' : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default AddModal;
