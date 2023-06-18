
import { Button, Checkbox, Col, Row, Space, Tooltip } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import RangeIcon from '../../../../../assets/icons/OnBoarding/time-range.svg'
import React, { useState } from 'react';
import './FormMain.scss';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useGetRequestByIdQuery, usePostOtherInformationRequestMutation } from '../../../../../store/Slices/OnBoarding';
import { useLocation } from 'react-router-dom';


const format = 'HH:mm';
const ContactPreference = (props: any) => {
    const { handleSelectedStepValue, auditCheck } = props;

    const [preferenceContactInfo ,setPreferenceContactInfo]=useState<any>([])
    const [postOtherInformationRequest]=usePostOtherInformationRequestMutation()
    const userData: any = localStorage.getItem("careUserData");
    const token: any = JSON.parse(userData);
    const { state }: any = useLocation()
    const {data,isLoading,isSuccess,isError}=useGetRequestByIdQuery({id: state?.editProfile?._id ?? token?.id,detail:"OTHERINFO"})
    let profileViewInfoData:any;
    if(isSuccess){
      profileViewInfoData=data
    }
    const [selectedOption, setSelectedOption] = useState<string | null>(profileViewInfoData?.data?.userprofile?.contactPreference
      ?.notificationPreference);
    const handleOptionChange = (optionValue: string) => {
        setSelectedOption(optionValue);
    };
    
    const handleContactInfo=()=>{
      const conatctInfo={
        contactPrefrences:preferenceContactInfo,
        notificationPreference:selectedOption
      }
postOtherInformationRequest({payload:{contactPreference:conatctInfo},id:state?.editProfile?._id})
    }
    const options = [
        {
            value: "email",
            label: "Email",
        },
        {
            value: "mobile",
            label: "Mobile Notification",
        },
        {
            value: "both",
            label: "Both",
        },
        {
            value: "none",
            label: "None of Above",
        },
    ];

    const contactPrefrences = [
        {
            value: "Phone",
            label: "Phone",
        },
        {
            value: "Whatsapp",
            label: "Whatsapp",
        },
        {
            value: "sms",
            label: "SMS",
        },

    ];
    
  
    return (
        <div className='personal-form-wrapper '>
            <Row gutter={[20, 20]}>
                <Col xs={24}>
                    <Space direction='vertical' size={15}
                    >
                        <label className='fw-500 fs-20 form-heading-color'>Contact Preference</label>
                        <Checkbox.Group options={contactPrefrences} defaultValue={['Phone']} onChange={(checkedValues)=>{setPreferenceContactInfo(checkedValues)}} className='d-flex flex-column' />
                    </Space>

                </Col>
                <Col md={16} sm={20} lg={12} xs={24}>
                    <label className='label-color fw-600 fs-14'>Time To Call</label>
                    <Row>
                        <Col xs={12}>
                            <TimePicker  format={format} placeholder='Start Time' suffixIcon={<img src={RangeIcon} alt='dd' />} />
                        </Col>
                        <Col xs={12}>
                            <TimePicker  format={format} placeholder='End Time' suffixIcon={<img src={RangeIcon} alt='dd' />} />
                        </Col>
                    </Row>
                </Col>

                <Col xs={24}>
                    <Space direction='vertical' size={15}
                    >
                        <label className='fw-500 fs-20 form-heading-color' >Notification Preference</label>
                        <div>
                            {options.map((option) => (
                                <div className='d-flex flex-column'>
                                    <Checkbox
                                        value={option.value}
                                        checked={selectedOption === option.value}
                                        onChange={() => handleOptionChange(option.value)}
                                    >
                                        {option.label}
                                    </Checkbox>

                                </div>

                            ))}
                        </div>
                    </Space>
                </Col>
                <Col xs={24} >
                    <div >
                        <Space className='carer-buttons'>
                            {auditCheck && <Tooltip
                                autoAdjustOverflow={true}
                                showArrow={false}
                                placement="bottomLeft" color="#65CDF0"
                                title='Click to mark as audit'
                            >

                                <Button className='edit-module-button  audit-button  align-center d-flex' >Audit</Button>
                            </Tooltip>}
                            <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit' onClick={handleContactInfo}>Save</Button>
                            <Button className='edit-module-button   align-center d-flex btn-secondary'
                                onClick={() => handleSelectedStepValue('Employment Status')} htmlType='submit' >Continue</Button>
                        </Space>
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default ContactPreference