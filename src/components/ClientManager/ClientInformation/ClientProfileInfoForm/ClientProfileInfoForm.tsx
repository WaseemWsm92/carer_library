import {Col, Row, Select, Switch, Tooltip } from 'antd'
import { Form, Input } from 'antd';
import infoIcon from "../../../../assets/icons/info-icon.svg"
import "./ClientManagerForm.scss"
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { useLocation } from 'react-router-dom';
import { useGetManageGroupDataQuery, usePostClientProfileInfoMutation } from '../../../../store/Slices/ClientManager';
import { useState } from 'react';
import AppSnackbar from '../../../../utils/AppSnackbar';

const ClientProfileInfoForm = (props: any) => {
  const [isEmailNotification, setIsEmailNotification] = useState<boolean>()
  const [isPartOfGroup, setIsPartOfGroup] = useState()
  const [postClientProfileInfo] = usePostClientProfileInfoMutation();
  const { state }: any = useLocation()

  // get clieint group api
  const { data,isSuccess, } = useGetManageGroupDataQuery({ refetchOnMountOrArgChange: true });
  let partOfGroupData: any;

  if (isSuccess) {
    partOfGroupData = data
  }
  
 
const getCreateGroupData = partOfGroupData?.data?.result ?? [];
const getGroupNameData = getCreateGroupData?.map((data:any) => ({ value: data._id, label: data.name })) ?? [];

  // Email Validation 
  const emailValidator = (rule: any, value: any, callback: any) => {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      callback();
    } else {
      callback('Please enter a valid email address');
    }
  };

  // switch
  function emailNotificationHandler(checked: any) {
    setIsEmailNotification(checked)
  }
  const handleChange = (value: any) => {
    setIsPartOfGroup(value)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    let userId = state?.editProfile?._id;
    const formValues = {
      clientName: values.clientName,
      emailNotification: isEmailNotification,
      phone: values.phone,
      addtionalPhone: values.addtionalPhone,
      businessName: values.businessName,
      clientType: values.clientType,
      groupId: isPartOfGroup??state?.editProfile?.clientGroups?._id
    }

    let payload = { profileInfo: formValues }
    postClientProfileInfo({ userId, payload });
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Profile comment edited Successfully" });
    let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
    setTimeout(stepperChange, 1000);
  };

  const payLoadInitialData = {
    clientName: state?.editProfile?.clientName,
    email: state?.editProfile?.email,
    phone: state?.editProfile?.phone,
    addtionalPhone: state?.editProfile?.addtionalPhone,
    businessName: state?.editProfile?.businessName,
    clientType: state?.editProfile?.clientType,
    cPartOfGroup: state?.editProfile?.clientGroups?._id,
  }
  return (
    <div className='client-manager-information-form-wrapper'>
      <div className='form-heading heading-flex'>Client Profile Information
        <Tooltip
          placement="bottomLeft"
          autoAdjustOverflow={true}
          showArrow={false}
          color="#65CDF0"
          overlayInnerStyle={{
            backgroundColor: "#65CDF0",
            color: "#ffffff",
            width: "450px",
          }}
          title='You can add basic information about your client here.'
        >
          <img src={infoIcon} alt="infoIcon" />
        </Tooltip>
      </div>
      <Form
        name="basic"
        initialValues={payLoadInitialData}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[30, 5]} align="bottom">
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Client Name"
              name="clientName"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Client Name" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Email"
              name="email"
              
              
              rules={[
                { required: true, message: 'Required field' },
                { validator: emailValidator },]}
            >
              <Input disabled placeholder="Email" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="emailNotification"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <div className='form--label'>
                <label htmlFor="">Email Notification Setting</label>
                <p className='m--0 d--flex fw-500' style={{ marginTop: '11px' }}>
                  <Switch onChange={emailNotificationHandler} />&nbsp;&nbsp;Do you want Email notification to be turned on for this client? </p>
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Mobile Number"
              name="phone"
              rules={[
                { required: true, message: 'Required field' },
              ]}
            >
              <Input type='number' placeholder="Mobile Number" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Additional Phone"
              name="addtionalPhone "
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Input placeholder="Additional Phone" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Business Name"
              name="businessName"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Business Name" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Client Type"
              name="clientType"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Client Type" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Part of a group? "
              name="cPartOfGroup"
              rules={[{ required: true, message: 'Required field' }]}

            >

              <Select
                placeholder="Select Name"
                style={{ width: '100%' }}
                onChange={handleChange}
                options={getGroupNameData}
              >
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <FormLowerButtons />
      </Form>
    </div>
  )
}

export default ClientProfileInfoForm