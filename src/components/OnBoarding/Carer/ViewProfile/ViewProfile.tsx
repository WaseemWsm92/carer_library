import { Col, Divider, Input, Modal, Rate, Row, Select, Space } from 'antd';
import Arrow from '../../../../assets/images/OnBoarding/SelectArrow.svg';
import Close from '../../../../assets/images/OnBoarding/Close.svg'
import Profile from '../../../../assets/images/MockImages/user-lg-1.png';
import Location from '../../../../assets/images/OnBoarding/Location.svg';
import Email from '../../../../assets/images/OnBoarding/Email.svg';



import './ViewProfile.scss';
import { useEffect, useState } from 'react';
import About from './About';
import Refrences from './Refrences';
import TrainingWorkHistory from './Training&WorkHistory';
import BackgroundChecks from './BackgroundChecks';
import OtherInformation from './OtherInformation';
import { isNullOrEmpty } from '../../../../utils/utils';

const ViewProfile = ({ IsProfileModal, setIsProfileModal, selectedTableData,selectProfileData}: any) => {
    const [IsProfileDetails, setIsProfileDetails] = useState<number>(1);
    const [profileView, setProfileView] = useState<any>(null);
    const handleOk = () => {
        setIsProfileModal(false);
    };
    const handleCancel = () => {
        setIsProfileModal(false);
    };
   
    const ProfileDetails = [
        {
            id: 1,
            component: <About selectedTableData={selectedTableData} />,
            title: 'About'
        },
        {
            id: 2,
            component: <Refrences selectedTableData={selectedTableData} />,
            title: 'References'
        },
        {
            id: 3,
            component: <TrainingWorkHistory selectedTableData={selectedTableData} />,
            title: 'Training & Work History'
        },
        {
            id: 4,
            component: <BackgroundChecks selectedTableData={selectedTableData}/>,
            title: 'Background Checks'
        },
        {
            id: 5,
            component: <OtherInformation selectedTableData={selectedTableData}/>,
            title: 'Other Information'
        }
    ]

    useEffect(() => {
        const profile = ProfileDetails.find((list) => list.id === IsProfileDetails);
        setProfileView(profile?.component);
    }, [IsProfileDetails,selectedTableData]);

    return (
        <Modal title={< span className='fw-500 fs-24 form-heading-color' > Profile Preview</span>} centered open={IsProfileModal} onOk={handleOk} onCancel={handleCancel} width={1394} className='view-profile-wrapper' footer={false} closeIcon={< img src={Close} alt="" />}>
            <Row gutter={[30, 30]}  >

                <Col md={7} xs={24}  >
                    <div className='card-view' >
                        <div className='d-flex  flex-column align-center' style={{ paddingTop: "50px" }} >
                            <span>
                                <img src={ isNullOrEmpty(selectProfileData?.profilePhoto)? `https://ui-avatars.com/api/?rounded=true&name=${selectProfileData?.firstName} ${selectProfileData?.lastName}` :`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${selectProfileData?.profilePhoto[0]?.mediaId}.${selectProfileData?.profilePhoto[0]?.mediaMeta?.extension}`} height={100} width={100} style={{borderRadius:"50%"}} alt="profile" />
                            </span>
                            <Space direction='vertical' className='d-flex align-center' size={1}>
                                <span className='fw-600 fs-14'>{selectProfileData?.firstName + " " + selectProfileData?.lastName}</span>
                                <span className='fw-400 fs-14'>Carer</span>
                                <Rate allowHalf defaultValue={2.5} style={{ color: '#FABF35', marginBottom: "24px" }} />
                            </Space>
                            <Space direction='vertical' size={15}>
                                <div className='d-flex align-center'>
                                    <span className='icon-body d-flex align-center'> <img src={Location} width={10} height={12} alt="location" /></span>
                                    <span className='fw-400 fs-14'>{selectProfileData?.phone}</span>
                                </div>

                                <div className='d-flex align-center'>
                                    <span className='icon-body d-flex align-center'> <img src={Email} width={10} height={12} alt="location" /></span>
                                    <span className='fw-400 fs-14'>{selectProfileData?.email}</span>
                                </div>
                            </Space>
                        </div>
                        <div style={{ padding: '40px 10px 40px 10px' }}>

                            <Divider type="horizontal" dashed style={{
                                borderColor: " #D9DBE9"
                            }} />
                        </div>

                        <div style={{ paddingBottom: "50px" }}>
                            {ProfileDetails.map((item) => (
                                <div key={item.id} onClick={() => { setIsProfileDetails(item.id) }} className={` fw-600 fs-14 details-view cursor-pointer ${IsProfileDetails === item.id && " card-title"}`}>
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>

                <Col md={17} xs={24}    >
                    <Row className='card-view component-card '>
                        <Col xs={24}>
                            <div className='user-card' >
                                {profileView}
                            </div>
                        </Col>
                    </Row>

                </Col>

            </Row>
        </Modal >
    )
}

export default ViewProfile