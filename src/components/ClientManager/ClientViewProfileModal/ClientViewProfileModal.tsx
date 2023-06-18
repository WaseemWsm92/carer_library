import { Col, Divider, Modal, Rate, Row, Space } from 'antd'
import React, { useState } from 'react'
import './ClientViewProfileModal.scss'

import Close from '../../../assets/images/OnBoarding/Close.svg'
import Profile from '../../../assets/images/clientManager/profile-home.svg';
import Location from '../../../assets/images/OnBoarding/Location.svg';
import Email from '../../../assets/images/OnBoarding/Email.svg';
import { addressDetails, profileAboutDetails, RecentReviewsData } from '../../../mock/ClientManagerData';



const ClientViewProfileModal = ({ viewClientModal, setviewClientModal,profileViewData }: any) => {

    const handleOk = () => {
        setviewClientModal(false);
    };
    const handleCancel = () => {
        setviewClientModal(false);
    };

    return (
        <Modal title={< span className='fw-500 fs-24' > Profile Preview</span>} centered open={viewClientModal} onOk={handleOk} onCancel={handleCancel} width={1394} className='view-user-profile-wrapper ' footer={false} closeIcon={< img src={Close} alt="" />}>
            <Row gutter={[30, 30]}  >

                <Col md={7} xs={24}  >
                    <div className='card-view' style={{ paddingBottom: "12px" }}>
                        <div className='d-flex  flex-column align-center' style={{ paddingTop: "50px" }} >
                            <span>
                                <img src={Profile} alt="profile" />
                            </span>
                            <Space direction='vertical' className='d-flex align-center' size={1} style={{ marginTop: '20px', gap: "11px" }}>
                                <span className='fw-600 fs-14'>{profileViewData?.clientName}</span>
                                {/* <span className='fw-400 fs-14'>Carer</span> */}
                                <Rate allowHalf defaultValue={4} style={{ color: '#FABF35', marginBottom: "24px" }} />
                            </Space>
                            <Space direction='vertical' size={15}>
                                <div className='d-flex align-center'>
                                    <span className='icon-body d-flex align-center'> <img src={Location} width={10} height={12} alt="location" /></span>
                                    <span className='fw-400 fs-14'>{profileViewData?.phone}</span>
                                </div>

                                <div className='d-flex align-center'>
                                    <span className='icon-body d-flex align-center'> <img src={Email} width={10} height={12} alt="email" /></span>
                                    <span className='fw-400 fs-14'>{profileViewData?.email}</span>
                                </div>
                            </Space>
                        </div>
                        <div style={{ width: '90%', margin: "0 auto" }}>
                            <Divider type="horizontal" dashed style={{
                                borderColor: " #D9DBE9"
                            }} />
                        </div>
                        <div className='recent-reviews-container'>
                            <span className='fs-20 fw-500'>Recent Reviews</span>
                            <div className="gripper-recent-reviews">
                                {RecentReviewsData.map((item: any, index: any) => (
                                    <div className="inner-recent-reviews d-flex align-center" key={index}>
                                        <div className="thumb-box"><img src={item.userProfile} alt='user-image' /></div>
                                        <div className='d-flex flex-column'>
                                            <span className='fs-12 fw-400 text-ellipsis form-heading-color'>{item.title}</span>
                                            <span className='fs-10 fw-400 light-grey-color'>{item.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </Col>

                <Col md={17} xs={24} className='card-view'>
                    <div className='wrapper-details'>
                        <div className='fs-20 fw-500 form-heading-color'>About</div>
                        <Row gutter={[0, 20]}>
                            <Col xs={24} sm={24} md={18} lg={18}>
                                <span className='fs-14 fw-500'>{profileViewData?.publicInfo}</span>
                            </Col>
                          

                                   <Col xs={24} sm={24} md={20} lg={12}>
                                        <div className='d-flex flex-column'>
                                            <label className='fs-12 fw-600 form-heading-color'>Care Home Name</label>
                                            <span className='fs-14 fw-400'>{profileViewData?.clientName}</span>
                                        </div>
                                    </Col>
                                   <Col xs={24} sm={24} md={20} lg={12}>
                                            <label className='fs-12 fw-600 form-heading-color'>Care Home Group</label>
                                            <div>
                                               
                                                <span className='fs-14 fw-400'>{profileViewData?.clientGroups?.name}</span>
                                                
                                             </div>
                                    </Col>
                                   <Col xs={24} sm={24} md={20} lg={12}>
                                        <div className='d-flex flex-column'>
                                            <label className='fs-12 fw-600 form-heading-color'>Phone Number</label>
                                            <span className='fs-14 fw-400'>{profileViewData?.phone}</span>
                                        </div>
                                    </Col>
                                   <Col xs={24} sm={24} md={20} lg={12}>
                                        <label className='fs-12 fw-600 form-heading-color'>Departments</label>
                                        <div>
                                            
                                            {profileViewData?.departments?.map((department:any,index:number) => (
                                             <span className='fs-14 fw-400'>{department.name}{profileViewData.length>index+1? " " :" ,"}</span>
                                             ))}
                                        </div>
                                    </Col>
                                   <Col xs={24} sm={24} md={20} lg={12}>
                                        <div className='d-flex flex-column'>
                                            <label className='fs-12 fw-600 form-heading-color'>Email</label>
                                            <span className='fs-14 fw-400'>{profileViewData?.email}</span>
                                        </div>
                                    </Col>
                        </Row>

                        <div>
                            <Divider type="horizontal" dashed style={{
                                borderColor: " #D9DBE9"
                            }} />
                        </div>

                        <div className='fs-20 fw-500' style={{ marginBottom: '20px' }}>Address Detail</div>
                        <Row gutter={[0, 20]}>
                        <Col xs={24} sm={24} md={20} lg={12}>
                                        <div className='d-flex flex-column'>
                                            <label className='fs-12 fw-600 form-heading-color'>Address First Line</label>
                                            <span className='fs-14 fw-400'>{profileViewData?.address?.line1}</span>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={20} lg={12}>
                                        <div className='d-flex flex-column'>
                                            <label className='fs-12 fw-600 form-heading-color'>Address Second Line</label>
                                            <span className='fs-14 fw-400'>{profileViewData?.address?.country}</span>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={20} lg={12}>
                                        <div className='d-flex flex-column'>
                                            <label className='fs-12 fw-600 form-heading-color'>Country</label>
                                            <span className='fs-14 fw-400'>{profileViewData?.address?.city}</span>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={20} lg={12}>
                                        <div className='d-flex flex-column'>
                                            <label className='fs-12 fw-600 form-heading-color'>County</label>
                                            <span className='fs-14 fw-400'>{profileViewData?.address?.country}</span>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={20} lg={12}>
                                        <div className='d-flex flex-column'>
                                            <label className='fs-12 fw-600 form-heading-color'>Town/City</label>
                                            <span className='fs-14 fw-400'>{profileViewData?.address?.city}</span>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={20} lg={12}>
                                        <div className='d-flex flex-column'>
                                            <label className='fs-12 fw-600 form-heading-color'>Post Code</label>
                                            <span className='fs-14 fw-400'>{profileViewData?.address?.postCode}</span>
                                        </div>
                                    </Col>
                        </Row>
                    </div>
                </Col>

            </Row>
        </Modal >
    )
}

export default ClientViewProfileModal