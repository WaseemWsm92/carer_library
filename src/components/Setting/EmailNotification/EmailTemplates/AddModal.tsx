import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
} from "antd";
import "./EmailTemplates.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AppSnackbar from "../../../../utils/AppSnackbar";
import { usePostEmailTemplateMutation, useUpdateEmailTemplateMutation } from "../../../../store/Slices/Setting/EmailTemplate";
// import "../../../../sass/common.scss";

function AddModal(props: any) {
  const { openEmailTemplateModal, setOpenEmailTemplateModal, editModalFieldValues, setEditModalFieldValues } = props;
  const [errorUsers, setErrorUsers] = useState("");
  const [value, setValue] = useState<string>('');
  const [postEmailTemplate] = usePostEmailTemplateMutation();
  const [updateEmailTemplate] = useUpdateEmailTemplateMutation();
  const paramsObj: any = {};
  // if (searchName) paramsObj["search"] = searchName;
  // if (selectedFilterValue) paramsObj["applicationStage"] = selectedFilterValue;
  // const query = "&" + new URLSearchParams(paramsObj).toString();


  const [form] = Form.useForm();

  //Failed form fields
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  if (openEmailTemplateModal !== "Add") {

    const formValues = {
      title: editModalFieldValues?.title,
      discription: editModalFieldValues?.discription
    }
    form.setFieldsValue(formValues)
  }

  //On Finish used to reset form fields in form
  const onFinish = async (values: any) => {

    const newPayload = {
      title: values?.title,
      discription: value
    }

    try {

      if (openEmailTemplateModal === "Add") {
        await postEmailTemplate({ payload: newPayload }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
        form.resetFields();
      }

      else {
        await updateEmailTemplate({ id: editModalFieldValues._id, payload: newPayload }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        form.resetFields();
      }

      form.resetFields();
      setValue('');
      setOpenEmailTemplateModal('');

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }

  };


  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline',],
      [{ 'align': [] }],
      [{ 'list': 'ordered' }],
      ['link', 'image'],
    ]
  };


  const handleQuillDescriptionChange = (content: any, delta: any, source: any, editor: any) => {
    // const deltaObj = new Delta(editor.getContents());
    // console.log(content);
    // console.log(delta);
    // console.log(source);
    // console.log(editor);
    // console.log(editor.getText());
    setValue(editor.getText())
    // setDescription(convertDeltaToText(deltaObj));

  }


  return (
    <Modal
      title={`${openEmailTemplateModal === "Add" ? "Create" : 'Edit'} Template`}
      open={!!openEmailTemplateModal}
      onOk={() => {
        setOpenEmailTemplateModal('');
        setEditModalFieldValues({});
      }}
      onCancel={() => {
        setOpenEmailTemplateModal('');
        setEditModalFieldValues({});
      }}
      centered
      className="add-Template"
      footer={false}
      width="888px"
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} style={{ marginTop: "20px" }}>
        <Row gutter={20}>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Template Title</label>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Enter template title"
                id="title"
                style={{ marginTop: "2px" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="template-editor">
          <Form.Item
            name="discription"
            rules={[{ required: true, message: "Required field " }]}
            style={{ marginBottom: "8px" }}
          >
            <ReactQuill theme="snow" onChange={handleQuillDescriptionChange} placeholder="Enter template description" modules={modules} />
          </Form.Item>

        </div>



        <Form.Item style={{ marginTop: "20px" }}>


          <Button
            className="btn-cancel"
            onClick={() => {
              setOpenEmailTemplateModal(''); setEditModalFieldValues({}); form.resetFields();
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
