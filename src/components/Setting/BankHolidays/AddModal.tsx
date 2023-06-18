import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Select,
  DatePicker
} from "antd";
import arrowDown from "../../../assets/icons/arrow-down-icon.svg"
import dateIcon from "../../../assets/icons/Setting/dateIcon.svg"
import { usePostBankHolidayMutation, useUpdateBankHolidayMutation } from "../../../store/Slices/Setting/BankHoliday";
import AppSnackbar from "../../../utils/AppSnackbar";
import dayjs from "dayjs";
import "./SettingBankHolidays.scss";

function AddModal(props: any) {
  const { openBankHolidayModal, setOpenBankHolidayModal, editModalFieldValues, setEditModalFieldValues } = props;
  const [errorUsers, setErrorUsers] = useState("");
  const [form] = Form.useForm();

  // Integration
  const [postBankHoliday, error, success, isSuccess, reset]: any = usePostBankHolidayMutation();
  const [updateBankHoliday, { success: updateSuccess }, isError]: any = useUpdateBankHolidayMutation();

  // Set initial value for date picker
  const editFormattedDate = dayjs(editModalFieldValues?.date).format('DD/MM/YYYY');
  const initialDate = dayjs(editFormattedDate, 'DD/MM/YYYY');

  // Update the form fields for edit modal
  if (openBankHolidayModal === "Edit" && editModalFieldValues) {
    const formValues = {
      date: initialDate,
      name: editModalFieldValues?.name,
    }
    form.setFieldsValue(formValues);
  }

  //Failed form fields
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //On Finish used to reset form fields in form
  const onFinish = async (values: any) => {
    const { name, date } = values;
    let newFormattedDate = dayjs(date?.$d).format('YYYY-MM-DD');
    const payload = {
      date: newFormattedDate,
      name
    }

    try {
      if (openBankHolidayModal === "Add") {
        await postBankHoliday({ payload: payload });
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
      }
      else {
        await updateBankHoliday({ id: editModalFieldValues?._id, payload: payload })
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
      }

      form.resetFields();
      setOpenBankHolidayModal('');
      
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
      title={`${openBankHolidayModal === "Add" ? "Add" : 'Edit'} Bank Holiday `}
      open={!!openBankHolidayModal}
      onOk={() => {
        setOpenBankHolidayModal('');
        setEditModalFieldValues({});
      }}
      onCancel={() => {
        setOpenBankHolidayModal('');
        setEditModalFieldValues({});
      }}
      centered
      className="add-bank-holiday"
      footer={false}
      width="888px"
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={20} style={{ marginTop: "20px" }}>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Select Date</label>
            <Form.Item
              name="date"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >

              <DatePicker format={['DD/MM/YYYY']} placeholder="dd/mm/yyyy" suffixIcon={<img src={dateIcon} alt="delete" />} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Select Holiday Type</label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} />}
                className="d-flex"
                placeholder="Select Holiday Type"
                options={[
                  { value: 'Holiday Type', label: 'Holiday Type' },
                  { value: 'Holiday Type 2', label: 'Holiday Type 2' },
                ]}
              />
            </Form.Item>
          </Col>

        </Row>

        <Form.Item style={{ marginTop: "20px" }}>

          <Button
            className="btn-cancel"
            onClick={() => {
              setOpenBankHolidayModal(''); setEditModalFieldValues({}); form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn-secondary"
            type="primary"
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
