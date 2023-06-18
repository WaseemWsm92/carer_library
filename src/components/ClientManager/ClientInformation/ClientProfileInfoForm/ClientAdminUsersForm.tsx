import { Col, Row, Select, Tooltip } from 'antd'
import { Form, Input } from 'antd';
import infoIcon from "../../../../assets/icons/info-icon.svg"
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import "./ClientManagerForm.scss"
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { useLocation } from 'react-router-dom';
import { usePostClientAdminUserMutation } from '../../../../store/Slices/ClientManager';
import AppSnackbar from '../../../../utils/AppSnackbar';

const { Option } = Select;


const ClientAdminUsersForm = (props: any) => {
  const [postClientAdminUser] = usePostClientAdminUserMutation();
  const { state }: any = useLocation()
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
    let userId = state?.editProfile?._id;
    postClientAdminUser({ userId, payload: values });
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Client Admin Users edited Successfully" });
    let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
    setTimeout( stepperChange , 1000);
  };
 

  const payLoadInitialData = {}
  return (
    <div className='client-manager-information-form-wrapper'>
      <div className='form-heading heading-flex'>Client Admin Users
        <Tooltip
          placement="bottomLeft"
          autoAdjustOverflow={true}
          showArrow={false}
          color="#65CDF0"
          overlayInnerStyle={{
            backgroundColor: "#65CDF0",
            color: "#ffffff",
            width: "499px",
          }}
          title='If your clients use the client portalor client mobile apps, you can add additional client admins here. They can post and sign off shifts.'
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
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="LastName"
              name="lastName"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Mobile Number"
              name="phone"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Admin Type "
              name="type"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: 'Required field' }]}

            >
              <Select placeholder="Selected option"  suffixIcon={<img src={arrowDown} />}>
                {state?.editProfile?.departments.map((option: any) => {
                  return (
                    <Option value={option?._id}>{option?.name}</Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <FormLowerButtons />

      </Form>



    </div>
  )
}

export default ClientAdminUsersForm