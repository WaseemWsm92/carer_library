import React from 'react'

// Ant Components
import { Card, Col, Progress, Row } from 'antd';

// Cards Mock Data and Interface
import { advanceStaffCardData } from '../../../../mock/ReportMockData/AdvanceStaffReportMockData';
import { advanceStaffCardDataInterface } from '../../../../types/ReportsInterface';

// Assets
import LocationIcon from "../../../../assets/images/manageShift/locationIcon.png";
import GmailIcon from "../../../../assets/images/manageShift/gmailIcon.png";
import PhoneIcon from "../../../../assets/images/manageShift/phoneIcon.png";

const AdvanceStaffCollapseCard = () => {
    return (
        <div className='advance-search-collapse-card d-flex flex-column'>
            {advanceStaffCardData.map((item: advanceStaffCardDataInterface) => (
                <Card key={item.key} className='advance-search-card-item bg-white' >
                    <Row gutter={[30, 20]}>
                        <Col xs={24} xl={12}>
                            <div className='advance-img d-flex w-100'>
                                <div> <img src={item.profileImg} alt="" /></div>
                                <div className='advance-content-wrap w-100'>
                                    <h2 className='fs-14 fw-600 m-0 black-color'>{item.title}</h2>
                                    <p className='fs-14 fw-400 m-0 title-color'>{`User Type: ${item.tag}`}</p>
                                    <div className='advance-progress'>
                                        <p className='fs-12 fw-600 title-color m-0'>{`${item.rating}%`}</p>
                                        <Progress percent={+(item.rating)} size="small" strokeColor={item.key === '1' ? "#EF6327" : item.key === '2' ? '#0BB783' : ''} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} xl={12}>
                            <div className='staff-view-data d-flex flex-column'>
                                <div className='staff-card-insert d-flex align-center' style={{ color: "#8F8F8F" }}><img src={LocationIcon} alt="location" />{item.location}</div>
                                <div className='staff-card-insert d-flex align-center' style={{ color: "#8F8F8F" }}><img src={GmailIcon} alt="gmail" />{item.gmail}</div>
                                <div className='staff-card-insert d-flex align-center' style={{ color: "#8F8F8F" }}><img src={PhoneIcon} alt="phone" />{item.phoneNumber}</div>
                            </div>
                        </Col>
                    </Row>

                </Card>
            ))}
        </div>
    )
}

export default AdvanceStaffCollapseCard