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
import Counter from "../SettingsStaff/ProfileMetrics/Counter/Counter";
import SwitchWrapper from "../../../shared/SwitchWrapper/SwitchWrapper";
import { useGetRequestQuery } from "../../../store/Slices/OnBoarding";
import { useGetBreakTimeQuery, usePostBreakTimeMutation, useUpdateBreakTimeMutation } from "../../../store/Slices/Setting/BreakTime";
import AppSnackbar from "../../../utils/AppSnackbar";
// import "../../../../sass/common.scss";

function AddModal(props: any) {
  const { addEditJobRole, setAddEditJobRole, editModalFieldValues, setEditModalFieldValues } = props;
  const { data, isLoading, isSuccess, isError, } = useGetBreakTimeQuery({ refetchOnMountOrArgChange: true, pagination: 1 })
  const [errorUsers, setErrorUsers] = useState("");
  const [form] = Form.useForm();
  const [postBreakTime] = usePostBreakTimeMutation();
  const [updateBreakTime] = useUpdateBreakTimeMutation();


  if (addEditJobRole !== "Add" && editModalFieldValues) {
    const formValues = {
      // careHomeId: editModalFieldValues?.careHomeId,
      careHomeId: editModalFieldValues?.careHomeId,
      from: editModalFieldValues?.from,
      to: editModalFieldValues?.to,
      break: editModalFieldValues?.break,
      breakPayment: editModalFieldValues?.breakPayment,
    }

    form.setFieldsValue(formValues);
  }


  let userData: any = data;
  // console.log("userData ============================",data);


  //Failed form fields
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  //On Finish used to reset form fields in form
  const onFinish = async (values: any) => {
    console.log(" values ==================", values);

    const newPayload = {
      ...values,
      from: Number(values.from),
      to: Number(values.to),
      break: Number(values.break),
      careHomeId: "63f729ebfffff62317142f74"
    }

    try {
      if (addEditJobRole === "Add") {
        await postBreakTime({ payload: newPayload }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
        form.resetFields();
      }

      else {
        await updateBreakTime({ id: editModalFieldValues._id, payload: newPayload }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        form.resetFields();

      }
      form.resetFields();
      setAddEditJobRole(false);
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
      title={`${addEditJobRole === "Add" ? "Add" : "Edit"} Break Time`}
      open={addEditJobRole}
      onOk={() => {
        setAddEditJobRole(false);
        setEditModalFieldValues({});
      }}
      onCancel={() => {
        setAddEditJobRole(false);
        setEditModalFieldValues({});
      }}
      centered
      className="add-break-time"
      footer={false}
      width="888px"
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} >
        <Row gutter={20}>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Client Name</label>
            <Form.Item
              name="careHomeId"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} />}
                className="d-flex"
                placeholder="Selected Option"
                // options={userData?.data?.data.map((item:any)=> {
                //   return {
                //     value: item?._id, label: item?.clientName 
                //   }
                // })}
                options={[
                  { value: 'Client ', label: 'Client ' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} className="d-flex align-items-center justify-center">
            <Form.Item
              name="from"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" , }}
            >
              <div className="counter-plus-mins">
                <p className="m-0 fs-14 fw-600 from-text label-color">From</p>
                <Counter countValue={editModalFieldValues && editModalFieldValues?.from} />
              </div>
            </Form.Item>
            <Form.Item
              name="to"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <div className="counter-plus-mins">
                <p className="m-0 fs-14 fw-600 label-color">To</p>
                <Counter countValue={editModalFieldValues && editModalFieldValues?.to} />
              </div>

            </Form.Item>
            <p className="m-0 fs-14 fw-600 label-color" style={{marginLeft:"10px",marginTop:"9px"}}>Hours</p>
          </Col>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Break Time</label>
            <Form.Item
              name="break"
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
          <Col lg={12} xs={24} className="d-flex align-items-center justify-center" style={{ marginTop: "25px" }}>
            {/* <label className="fs-14 fw-600">Do you Want to pay care for the break time?</label> */}
            <Form.Item
              name="breakPayment"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <SwitchWrapper checked={editModalFieldValues?.breakPayment}  name="PayForBreakTime" label="Do you Want to pay carer for the break time?" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: "20px" }}>

          <Button
            className="btn-cancel"
            onClick={() => {
              setAddEditJobRole(false); setEditModalFieldValues({}); form.resetFields();
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
