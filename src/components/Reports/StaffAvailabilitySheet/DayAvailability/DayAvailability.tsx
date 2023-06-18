import React from 'react'

// Ant Components
import { Col, Row, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import StaffAvailabilitySheetCommonFilter from '../StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter';

// Mock Data and Interface
import { DailyAvaialabilityTableMockData } from '../../../../mock/ReportMockData/StaffAvailabilitySheetMockData';
import { dailyAvaialabilityTableMockDataInterface } from '../../../../types/ReportsInterface';

// Staff Daily Availability Report Table Columns
const StaffDailyAvaialabilityTableHeader: ColumnsType<dailyAvaialabilityTableMockDataInterface> = [
    {
        title: 'Sr #',
        dataIndex: 'key',
        key: 'key',
        render: (key: React.Key) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
        title: 'Staff Name',
        dataIndex: 'staffName',
        key: 'staffName',
        align: "left",
        render: (_, { staffImg, staffName }: any) => (
            <Space size={16} >
                <img src={staffImg} alt={staffImg} />
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName}</span>
            </Space>
        )
    },
    {
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
        align: "center",
        render: (designation: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{designation}</span>,
    },
    {
        title: 'Mobile Number',
        dataIndex: 'mobileNumber',
        key: 'mobileNumber',
        align: "center",
        render: (mobileNumber: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{mobileNumber}</span>,
    },
    {
        title: <div className='d-flex flex-column'>Monday<span className='fs-12 fw-400'>16/05/2022</span></div>,
        dataIndex: 'todayDate',
        key: 'todayDate',
        align: "center",
        render: (todayDate: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{todayDate}</span>,
    },
];

const DayAvailability = () => {
    return (
        <div className='reports-child-wrapper-class' style={{ padding: "1.25rem" }}>
            <Row>
                <Col xs={24}>
                    <StaffAvailabilitySheetCommonFilter dayAvailability={true} />
                </Col>
                <Col xs={24}>
                    <Table tableLayout="fixed" columns={StaffDailyAvaialabilityTableHeader} dataSource={DailyAvaialabilityTableMockData} pagination={false} className="staff-availability-sheet-table" style={{ marginTop: '1rem' }} scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />
                </Col>
            </Row>
        </div>
    )
}

export default DayAvailability