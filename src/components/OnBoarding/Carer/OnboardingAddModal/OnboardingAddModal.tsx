import { Button, Col, Form, Input, Modal, Row, Select, Space } from 'antd';
import './OnboardingAddModal.scss';
import Arrow from '../../../../assets/images/OnBoarding/SelectArrow.svg';
import Close from '../../../../assets/images/OnBoarding/Close.svg'
import { Option } from '../../CareCordinator/ClientDetails/AllocateNewCareHomeModal';
import { useGetRequestQuery, usePostRequestMutation } from '../../../../store/Slices/OnBoarding';
import { useState } from 'react';
import AppSnackbar from '../../../../utils/AppSnackbar';
import { useLocation } from 'react-router-dom';
import { I } from '@fullcalendar/core/internal-common';


const OnboardingAddModal = (props: any) => {

  const pagination = {
    limit: 10,
    page: 1
  }
  const query = "&"
  const { data, isSuccess } = useGetRequestQuery({ refetchOnMountOrArgChange: true, pagination, role: "carer", query })
  const [form] = Form.useForm();

  const [postRequest, { isLoading }] = usePostRequestMutation()
  const { isOpenModal, setIsOpenModal, title } = props;
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const location = useLocation();
  let roleType = location.pathname;
 
  let jobTypes: any
  if (isSuccess) {
    jobTypes = data
  }
  let roleTypeValue: string;
switch (roleType) {
  case "/onboarding/carer":
    roleTypeValue = "carer";
    break;
  case "/onboarding/care-coordinator":
    roleTypeValue = "carer_coordinator";
    break;
  default:
    roleTypeValue = "training_instructor";
}

  const userType = jobTypes?.data?.result.map((data: any) => { return data })


  const handleCancel = () => setIsOpenModal(false);
  const onFinish = async (values: any) => {
    try {

      const { error }: any = await postRequest({ payload: { ...values, roleType: roleTypeValue } })

      if (error) {
        // handle the error here
        setIsErrorMessage(error?.data?.message)
        return;
      }

    }
    catch (error) {
      console.log("Unexpected error:", error);
    }
    setIsOpenModal(false);
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "New Candidate Added Successfully" });
    form.resetFields();


  }

  const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);


  return (
    <div className='candidate-wrapper'>

      <Modal title={<span className='fw-500 fs-20'>{title}</span>} centered open={isOpenModal} onCancel={handleCancel} width={800} className='candidate-modal' footer={false} closeIcon={<img src={Close} alt="" />}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[30, 5]} align="bottom">



            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="First Name"
                name="firstName"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="Last Name"
                name="lastName"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="Email"
                name="email"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="Contact"
                name="phone"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            {title !== 'Add New Instructor' && <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>

              <Form.Item
                label="User Type"
                name="userType"

                className="onBoarding-select"
              >

                <Select placeholder="User Type" suffixIcon={<img src={Arrow} />}>

                  {userType && userType.map((item: any) => {
                    return (
                      <Option value={item?.userType?._id}>{item?.userType?.shortForm}</Option>)

                  })}
                </Select>     </Form.Item>

            </Col>}

            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>

              <Form.Item
                label="Gender"
                name="gender"

                className="onBoarding-select"
              >
                <Select placeholder="Gender" suffixIcon={<img src={Arrow} />}>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>

                </Select>

              </Form.Item>

            </Col>
            <p className='error-color'>{isErrorMessage}</p>
            <Col span={24}>
              <Space size={12} className='modal-buttons'>

                <Button onClick={handleCancel} className="modal-button btn-cancel ">Cancel</Button>
                <Button type="primary"
                  htmlType="submit" loading={isLoading} className="modal-button btn-secondary ">Save</Button>
              </Space>
            </Col>


          </Row>
        </Form>


      </Modal>
    </div>
  );
};

export default OnboardingAddModal