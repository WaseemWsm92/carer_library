import React, { useState } from 'react'

// Ant Components
import { Col, Form, Modal, Row, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import TextArea from 'antd/es/input/TextArea';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable'
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';
import DatePickerWrapper from '../../../shared/DatePickerWrapper/DatePickerWrapper';
import SelectWrapper from '../../../shared/SelectWrapper/SelectWrapper';
import InputWrapper from '../../../shared/InputWrapper/InputWrapper';

// Table and Filters Mock Data and Intterface
import { CarerRequestReportFilters, CarerRequestReportMockData } from '../../../mock/ReportMockData/CarerRequestReportMockData';
import { carerRequestReportMockDataInterface } from '../../../types/ReportsInterface';

// Assets
import blueEyeIcon from "../../../assets/icons/Report/blue-eye.png";

// SCSS
import "./CarerRequestReport.scss";
import { useGetReportsCarerRequestQuery } from '../../../store/Slices/Reports';


const CarerRequestReport = () => {

    const [openDetailsModal, setOpenDetailsModal] = useState<any>(null);
    const {data ,isSuccess,isLoading}=useGetReportsCarerRequestQuery({})
    const [form] = Form.useForm();
    let carerRequestReportData:any
if(isSuccess){
  carerRequestReportData=data
}
    // Carer Request Report Table Columns
    const CarerRequestReportTableHeader: ColumnsType<carerRequestReportMockDataInterface> = [
        {
            title: 'Sr #',
            dataIndex: 'key',
            key: 'key',
            render: (key: React.Key) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
        },
        {
            title: 'Care Home',
            dataIndex: 'careHome',
            key: 'careHome',
            align: "center",
            render: (careHome: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{careHome}</span>,
        },
        {
            title: 'Requested By',
            dataIndex: 'requestedByName',
            key: 'requestedByName',
            align: "center",
            render: (_, { requestedByImg, requestedBy }: any) => (
                <div style={{ marginLeft: "auto", textAlign: "center", width: "80%" }}>
                    <Space size={16} style={{ width: "100%" }}>
                        <img src={requestedByImg} alt={requestedByImg} />
                        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{requestedBy}</span>
                    </Space>
                </div>
            )
        },
        {
            title: 'Request Type',
            dataIndex: 'requestType',
            key: 'requestType',
            align: "center",
            render: (requestType: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{requestType}</span>,
        },
        {
            title: 'Requested At',
            dataIndex: 'requestedAt',
            key: 'requestedAt',
            align: "center",
            render: (_:any,requestedAt: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{requestedAt?.createdAt}</span>,
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            render: (reason: string) => (
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{reason}</span>
            ),
            align: "center",
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span className={`${status === "APPROVED" ? "approved-color" : status === "PENDING" ? "secondary-color" : "error-color"}   fs-14 fw-400 m-0 line-height-22 `}>{status}</span>
            ),
            align: "center",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: 'action',
            render: (_, { requestedByImg, requestedByName, careHome, requestType, requestedAt, status, reason }) => (
                <div className="fs-12 fw-400 line-height-22">
                    <img src={blueEyeIcon} alt='Delete' className='cursor-pointer' onClick={(e: any) => setOpenDetailsModal({ requestedByImg, requestedByName, careHome, requestType, requestedAt, status, reason })} />
                </div>
            ),
        },
    ];

    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={CarerRequestReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable loading={isLoading} tableHeader={CarerRequestReportTableHeader} tableData={carerRequestReportData?.data?.result} />
                </Col>
            </Row>

            <Modal
                centered
                wrapClassName="care-request-report-details-modal"
                open={!!openDetailsModal}
                footer={false}
                onCancel={() => setOpenDetailsModal(false)}
            >
                <p className="fs-16 fw-400 form-heading-color line-height-32 m-0" style={{ paddingBottom: "1.063rem" }}>
                    Requests
                </p>
                <Space size={25} wrap className='name-email-wrapper'>
                    <img src={openDetailsModal?.requestedByImg} alt="user" width={94} height={94} />
                    <div className='name-wrapper'>
                        <h2 className='fs-16 fw-500 line-height-24 title-color m-0'>{openDetailsModal?.requestedByName}</h2>
                        <p className='fs-14 fw-400 line-height-22 light-grey-color m-0'>{openDetailsModal?.careHome}</p>
                    </div>
                    <div className='email-wrapper'>
                        <p className='fs-14 fw-400 line-height-22 title-color m-0'>carelibrary@orcalo.co.uk</p>
                        <p className='fs-14 fw-400 line-height-22 title-color m-0'>41 333 222 1100</p>
                    </div>
                </Space>
                <Form layout="vertical" form={form} style={{ marginTop: '1.25rem' }}>
                    <Row gutter={[20, { xs: 16, md: 0 }]}>
                        <Col xs={24} md={12}>
                            <DatePickerWrapper
                                name="shiftDate"
                                label="Requested At"
                                placeholder={openDetailsModal?.requestedAt}
                                required={false}
                                disabled={true}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <InputWrapper
                                name="requestType"
                                label='Request Type'
                                size="large"
                                type="number"
                                disabled={true}
                                placeHolder={openDetailsModal?.requestType}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <SelectWrapper
                                label="Status"
                                name="Status"
                                required={false}
                                placeHolder={openDetailsModal?.status}
                                disabled={true}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <InputWrapper
                                name="reason"
                                label="Reason"
                                size="large"
                                type="number"
                                disabled={true}
                                placeHolder={openDetailsModal?.reason}
                            />
                        </Col>
                        <Col xs={24} style={{ marginTop: '1.5rem' }}>
                            <Form.Item label={'Comment Details'} name={['commentDetails']} rules={[{ required: false }]}>
                                <TextArea rows={4} placeholder={openDetailsModal?.reason} maxLength={6} disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div >
    )
}

export default CarerRequestReport