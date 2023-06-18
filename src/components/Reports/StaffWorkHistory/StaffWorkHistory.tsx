import React from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { StaffWorkHistoryReportFilters } from '../../../mock/ReportMockData/StaffWorkHistoryMockData';
import { staffWorkHistoryReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsWorkedHistoryQuery } from '../../../store/Slices/Reports';

// Staff Work History Report Table Columns
const StaffWorkHistoryTableHeader: ColumnsType<staffWorkHistoryReportMockDataInterface> = [
    {
        title: 'Sr #',
        dataIndex: 'key',
        key: 'key',
        render: (key: React.Key) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
        title: 'Shift Name',
        dataIndex: 'shiftName',
        key: 'shiftName',
        align: "center",
        render: (_:any,shiftName: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftName?.carer?.firstName + " " +shiftName?.carer?.lastName}</span>,
    },
    {
        title: 'Client Name',
        dataIndex: 'clientName',
        key: 'clientName',
        align: "center",
        render: (_:any,clientName: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.carer?.firstName + " " +clientName?.carer?.lastName }</span>,
    },

    {
        title: 'Shift Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: "center",
        render: (createdAt: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{createdAt}</span>,
    },

    {
        title: 'Shift Hours',
        dataIndex: 'shiftRate',
        key: 'shiftRate',
        render: (shiftRate: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftRate}</span>
        ),
        align: "center",
    },
    {
        title: 'Hourly Rate(£)',
        dataIndex: 'perHour',
        key: 'perHour',
        render: (perHour: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{perHour}</span>
        ),
        align: "center",
    },
    {
        title: 'Shift Amount',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: (totalAmount: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalAmount}</span>
        ),
        align: "center",
    },
    {
        title: 'Invoice Number',
        dataIndex: 'invoiceNumber',
        key: 'invoiceNumber',
        render: (invoiceNumber: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{invoiceNumber}------</span>
        ),
        align: "center",
    },
    {
        title: 'Shift Status',
        dataIndex: 'shiftStatus',
        key: 'shiftStatus',
        render: (shiftStatus: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftStatus}</span>
        ),
        align: "center",
    },
    {
        title: 'Payment Date',
        dataIndex: 'paymentDate',
        key: 'paymentDate',
        render: (paymentDate: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{paymentDate}------</span>
        ),
        align: "center",
    },
];

const StaffWorkHistory = () => {
  const {data ,isSuccess}=useGetReportsWorkedHistoryQuery({})
  let workHistoryData: any;
  if (isSuccess) {
    workHistoryData = data
  }
    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={StaffWorkHistoryReportFilters} extraCards={true} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable tableHeader={StaffWorkHistoryTableHeader} tableData={workHistoryData?.data?.shifts} />
                </Col>
            </Row>
        </div>
    )
}

export default StaffWorkHistory