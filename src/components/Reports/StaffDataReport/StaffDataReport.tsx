import React from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { StaffDataReportFilters } from '../../../mock/ReportMockData/StaffDataReportMockData';
import { staffDataReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsStaffDataQuery } from '../../../store/Slices/Reports';

// Staff Data Report Table Columns
const StaffDataReportTableColumnData: ColumnsType<staffDataReportMockDataInterface> = [
    {
        title: 'Sr #',
        dataIndex: 'key',
        key: 'key',
        render: (key: React.Key) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    // {
    //     title: 'Staff Name',
    //     dataIndex: 'staffName',
    //     key: 'staffName',
    //     align: "center",
    //     render: (staffName: string) => (
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName}</span>
    //     )
    // },
    // {
    //     title: 'Staff Type',
    //     dataIndex: 'staffType',
    //     key: 'staffType',
    //     align: "center",
    //     render: (staffType: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffType}</span>,
    // },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        align: "center",
        render: (_: any,gender: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{gender?.personalInformation?.gender}</span>,
    },
    {
        title: 'DOJ',
        dataIndex: 'doj',
        key: 'doj',
        align: "center",
        render: (doj: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{doj}</span>,
    },
    {
        title: 'DOB',
        dataIndex: 'dob',
        key: 'dob',
        align: "center",
        render: (_: any,dob: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dob?.personalInformation?.dob}</span>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: "center",
        render: (email: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{email}</span>,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        align: "center",
        render: (phone: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{phone}</span>,
    },
    // {
    //     title: 'Staff Band',
    //     dataIndex: 'staffBand',
    //     key: 'staffBand',
    //     align: "center",
    //     render: (staffBand: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffBand}</span>,
    // },
    // {
    //     title: 'EMP. Status',
    //     dataIndex: 'empStatus',
    //     key: 'empStatus',
    //     align: "center",
    //     render: (empStatus: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{empStatus}</span>,
    // },
    // {
    //     title: 'Profile Percentage',
    //     dataIndex: 'profilePercentage',
    //     key: 'profilePercentage',
    //     align: "center",
    //     render: (profilePercentage: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{profilePercentage}</span>,
    // },
    {
        title: 'User Status',
        dataIndex: 'userStatus',
        key: 'userStatus',
        align: "center",
        render: (status: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{status}</span>,
    },
    // {
    //     title: 'Visa Type',
    //     dataIndex: 'visaType',
    //     key: 'visaType',
    //     align: "center",
    //     render: (visaType: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{visaType}</span>,
    // },
];

const StaffDataReport = () => {
  const {data ,isSuccess}=  useGetReportsStaffDataQuery({})
  let staffReportsData:any
  if(isSuccess){
    staffReportsData=data
  }
    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={StaffDataReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable tableHeader={StaffDataReportTableColumnData} tableData={staffReportsData?.data?.staff} />
                </Col>
            </Row>
        </div>
    )
}

export default StaffDataReport