import React from 'react'
// Ant Components
import { Badge, Card, Col, Row } from 'antd';

// Cards Mock Data and Interfaces
import { advanceStaffCardData } from '../../../../mock/ReportMockData/AdvanceStaffReportMockData';
import { advanceStaffCardDataInterface } from '../../../../types/ReportsInterface';

// Assets
import LocationIcon from "../../../../assets/images/manageShift/locationIcon.png";
import GmailIcon from "../../../../assets/images/manageShift/gmailIcon.png";
import PhoneIcon from "../../../../assets/images/manageShift/phoneIcon.png";

const AdvanceStaffCard = () => {
    return (
        <div className='advance-staff-card-wrapper'>
            <Row gutter={[30, 30]}>
                {advanceStaffCardData.map((item: advanceStaffCardDataInterface) => (
                    <Col key={item.key} xs={24} xxl={12}>
                        <Card className='staff-card bg-white'>
                            <div className='staff-card-img text-center'>
                                <Badge count={`${item.rating}%`} color={item.key === '1' ? "#EF6327" : item.key === '2' ? '#0BB783' : ''}>
                                    <img src={item.profileImg} alt="" />
                                </Badge>
                            </div>
                            <h2 className='fs-14 fw-600 m-0 black-color text-center'>{item.title}</h2>
                            <div className='staff-card-btn text-center'>
                                <p className='fs-12 fw-600 m-0 white-color text-upercase w-100 bg-orange-color'>{item.tag}</p>
                            </div>
                            <div className='staff-card-data d-flex flex-column'>
                                <div className='staff-card-insert d-flex align-center' style={{ color: '#8F8F8F' }}><img src={LocationIcon} alt="location" />{item.location}</div>
                                <div className='staff-card-insert d-flex align-center' style={{ color: '#8F8F8F' }}><img src={GmailIcon} alt="gmail" />{item.gmail}</div>
                                <div className='staff-card-insert d-flex align-center' style={{ color: '#8F8F8F' }}><img src={PhoneIcon} alt="phone" />{item.phoneNumber}</div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div >
    )
}

export default AdvanceStaffCard