import { Badge, Card, Col, Row } from 'antd'
import React from 'react'
import { advanceStaffCardData } from '../../../../../mock/ShiftManageData';
import LocationIcon from "../../../../../assets/images/manageShift/locationIcon.png";
import GmailIcon from "../../../../../assets/images/manageShift/gmailIcon.png";
import PhoneIcon from "../../../../../assets/images/manageShift/phoneIcon.png";

const AdvanceStaffCard = () => {
    return (
        <div className='advance-staff-card-wrapper'>
            <Row gutter={[30, 30]}>
                {advanceStaffCardData.map((item: any) => (
                    <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24} >
                        <Card className='staff-card bg-white'>
                            <div className='staff-card-img text-center'>
                                <Badge count={`${item.rating}%`}  color={item.id === '1' ? "#EF6327" : item.id === '2' ? '#0BB783' : ''}>
                                    <img src={item.profileImg} alt="" />
                                </Badge>
                            </div>
                            <h2 className='fs-14 fw-600 m-0 black-color text-center'>{item.title}</h2>
                            <div className='staff-card-btn text-center'>
                                <p className='fs-12 fw-600 m-0 white-color text-upercase w-100 bg-orange-color'>{item.tag}</p>
                            </div>
                            <div className='staff-card-data d-flex flex-column'>
                                <div className='staff-card-insert d-flex align-center'><img src={LocationIcon} alt="" />{item.location}</div>
                                <div className='staff-card-insert d-flex align-center'><img src={GmailIcon} alt="" />{item.gmail}</div>
                                <div className='staff-card-insert d-flex align-center'><img src={PhoneIcon} alt="" />{item.phoneNumber}</div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div >
    )
}

export default AdvanceStaffCard