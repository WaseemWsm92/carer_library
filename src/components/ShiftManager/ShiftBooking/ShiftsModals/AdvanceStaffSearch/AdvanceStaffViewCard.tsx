import { Card, Col, Progress, Row } from 'antd'
import React from 'react'
import { advanceStaffCardData } from '../../../../../mock/ShiftManageData';
import LocationIcon from "../../../../../assets/images/manageShift/locationIcon.png";
import GmailIcon from "../../../../../assets/images/manageShift/gmailIcon.png";
import PhoneIcon from "../../../../../assets/images/manageShift/phoneIcon.png";

const AdvanceStaffViewCard = () => {
    return (
        <>
            <div className='advance-search-collapse-card d-flex flex-column'>
                {advanceStaffCardData.map((item: any) => (
                    <Card className='advance-search-card-item bg-white'>
                        <Row gutter={[30, 20]}>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <div className='advance-img d-flex w-100'>
                                    <div> <img src={item.profileImg} alt="" /></div>
                                    <div className='advance-content-wrap w-100'>
                                        <h2 className='fs-14 fw-600 m-0 black-color'>{item.title}</h2>
                                        <p className='fs-14 fw-400 m-0 title-color'>{`User Type: ${item.tag}`}</p>
                                        <div className='advance-progress'>
                                            <p className='fs-12 fw-600 title-color m-0'>{`${item.rating}%`}</p>
                                            <Progress percent={item.rating} size="small" strokeColor={item.id === '1' ? "#EF6327" : item.id === '2' ? '#0BB783' : ''} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                                <div className='staff-view-data d-flex flex-column'>
                                    <div className='staff-card-insert d-flex align-center'><img src={LocationIcon} alt="" />{item.location}</div>
                                    <div className='staff-card-insert d-flex align-center'><img src={GmailIcon} alt="" />{item.gmail}</div>
                                    <div className='staff-card-insert d-flex align-center'><img src={PhoneIcon} alt="" />{item.phoneNumber}</div>
                                </div>
                            </Col>
                        </Row>

                    </Card>
                ))}
            </div>
        </>
    )
}

export default AdvanceStaffViewCard