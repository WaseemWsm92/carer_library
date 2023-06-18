import { useState } from 'react';
import { Button, Col, Row, Select, Switch, Tooltip } from 'antd'
import { Form, Input } from 'antd';
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import TextArea from 'antd/es/input/TextArea';
import "./ClientManagerForm.scss"
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { useLocation } from 'react-router-dom';
import { usePostClientProfileInfoMutation } from '../../../../store/Slices/ClientManager';
import AppSnackbar from '../../../../utils/AppSnackbar';

const { Option } = Select;

const ClientAddressForm = (props: any) => {
  // state start
    const { state }: any = useLocation()
    const [isAdditionalPhone, setIsAdditionalPhone] = useState(false)
    const [postClientProfileInfo] = usePostClientProfileInfoMutation();

    
  //  onchange handler start here
    const onChange = (checked: boolean) => {
        setIsAdditionalPhone(checked)
    };
    const onFinish = (values: any) => {
        console.log('Success:', values);
        let userId = state?.editProfile?._id;
        const formValues = {
          country: values.country,
          city: values.TownCity,
          line1: values.address,
          postCode: values.postCode,
          typedAddress: values.manualAddress
        }
        
        let payload = { address: formValues }
        postClientProfileInfo({ userId, payload:payload });
        AppSnackbar({ type: "success", messageHeading: "Success!", message: "Client Address edited Successfully" });
        let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
        setTimeout( stepperChange , 1000);
    };
    
    // initial values
    const payLoadInitialData = {
      country: state?.editProfile?.address?.country,
      TownCity: state?.editProfile?.address?.city,
      address: state?.editProfile?.address?.line1,
      postCode: state?.editProfile?.address?.postCode,
    }
    return (
        <div className='client-manager-information-form-wrapper'>
            <div className='form-heading heading-flex'>Client Address</div>
            <Form
                name="basic"
                initialValues={payLoadInitialData}
                onFinish={onFinish}
                layout="vertical"
            >
                <Row gutter={[30, 5]} align="bottom">
                    <Col xs={24} sm={24} md={12} lg={10}>
                        <Form.Item
                            label="County"
                            name="country"
                            rules={[{ required: true, message: 'Required field' }]}
                        >
                            <Select placeholder="Select country"  suffixIcon={<img src={arrowDown} />}>
                                <Option value="uk">uk</Option>
                                
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10}>
                        <Form.Item
                            label="Town/City"
                            name="TownCity"
                            rules={[{ required: true, message: 'Required field' }]}
                        >
                            <Select placeholder="Select Town/City"  suffixIcon={<img src={arrowDown} />}>
                                <Option value="Birmingham">Birmingham</Option>
                                <Option value="Bradford">Bradford</Option>
                                <Option value="Bristol">Bristol</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: false, message: 'Required field' }]}
                        >
                            <Select placeholder="Select Address"  suffixIcon={<img src={arrowDown} />}>
                                <Option value="option1">1D, Carven Court, Carven Street Brierfield, Nelson, BB9 5AJ</Option>
                                <Option value="option2">1D, Bethany Homes, St. Peters Rise Bristol, BS13 7LZ</Option>
                                <Option value="option3">1D, Eithne House, Duncairn Prade Belfast, BT15 2EW</Option>
                                <Option value="option4">1D, Mount Vernon House, Shore Road Belfast, BT15 4BA</Option>
                                <Option value="option5">1D, Chapel Court, Chapel Road Wirral, CH47 3AY</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10}>
                        <Form.Item
                            label="Post Code"
                            name="postCode"
                            rules={[{ required: true, message: 'Required field' }]}
                        >
                            <Input placeholder="Enter Post Code" style={{ width: '100%', height: '45px' }} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Additional Phone "
                            name="additionalPhone "
                            rules={[{ required: false, message: 'Required field' }]}
                        >
                            <div>
                                <Switch defaultChecked onChange={onChange} /> &nbsp; Add address manually?
                            </div>
                        </Form.Item>
                    </Col>

                    {isAdditionalPhone && <Col span={20}>
                        <Form.Item
                            label="Enter address here"
                            name="manualAddress"
                            rules={[{ required: false, message: 'Required field' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>}

                </Row>
                <FormLowerButtons/>

            </Form>
        </div>
    )
}

export default ClientAddressForm