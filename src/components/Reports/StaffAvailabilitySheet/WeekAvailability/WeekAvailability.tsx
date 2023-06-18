import React from 'react'

// Ant Components
import { Col, Row, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import StaffAvailabilitySheetCommonFilter from '../StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter';

// Filters and Table Mock Data and Interface
import { WeekAvailabilityTableMockData } from '../../../../mock/ReportMockData/StaffAvailabilitySheetMockData';
import { weekAvailabilityTableMockDataInterface } from '../../../../types/ReportsInterface';

// Staff availability weekly Report Table Columns
const StaffWeekAvaialabilityTableHeader: ColumnsType<weekAvailabilityTableMockDataInterface> = [
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
        dataIndex: 'monday',
        key: 'monday',
        align: "center",
        render: (monday: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{monday}</span>,
    },
    {
        title: <div className='d-flex flex-column'>Tuesday<span className='fs-12 fw-400'>17/05/2022</span></div>,
        dataIndex: 'tuesday',
        key: 'tuesday',
        align: "center",
        render: (tuesday: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{tuesday}</span>,
    },
    {
        title: <div className='d-flex flex-column'>Wednesday<span className='fs-12 fw-400'>18/05/2022</span></div>,
        dataIndex: 'wednesday',
        key: 'wednesday',
        align: "center",
        render: (wednesday: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{wednesday}</span>,
    },
    {
        title: <div className='d-flex flex-column'>Thursday<span className='fs-12 fw-400'>19/05/2022</span></div>,
        dataIndex: 'thursday',
        key: 'thursday',
        align: "center",
        render: (thursday: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{thursday}</span>,
    },
    {
        title: <div className='d-flex flex-column'>Friday<span className='fs-12 fw-400'>20/05/2022</span></div>,
        dataIndex: 'friday',
        key: 'friday',
        align: "center",
        render: (friday: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{friday}</span>,
    },
    {
        title: <div className='d-flex flex-column'>Saturday<span className='fs-12 fw-400'>21/05/2022</span></div>,
        dataIndex: 'saturday',
        key: 'saturday',
        align: "center",
        render: (saturday: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{saturday}</span>,
    },
    {
        title: <div className='d-flex flex-column'>Sunday<span className='fs-12 fw-400'>22/05/2022</span></div>,
        dataIndex: 'sunday',
        key: 'sunday',
        align: "center",
        render: (sunday: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{sunday}</span>,
    },
];

const WeekAvailability = () => {
    return (
        <div className='reports-child-wrapper-class' style={{ padding: "1.25rem" }}>
            <Row >
                <Col xs={24} >
                    <StaffAvailabilitySheetCommonFilter />
                </Col>
                <Col xs={24}>
                    <Table tableLayout="fixed" columns={StaffWeekAvaialabilityTableHeader} dataSource={WeekAvailabilityTableMockData} pagination={false} className="staff-availability-sheet-table" style={{ marginTop: '1rem' }} scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />
                </Col>
            </Row>
        </div>
    )
}

export default WeekAvailability