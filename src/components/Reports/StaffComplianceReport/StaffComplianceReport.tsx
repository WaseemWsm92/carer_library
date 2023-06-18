import React from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable'
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { StaffComplianceReportFilters } from '../../../mock/ReportMockData/StaffComplianceReportMockData';
import { staffComplianceReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsComplienceQuery } from '../../../store/Slices/Reports';
import ApiLoader from '../../ApiLoader/ApiLoader';

// Staff Compliance Report Table Columns
const StaffComplianceReportTableHeader: ColumnsType<staffComplianceReportMockDataInterface> = [
    {
        title: 'Sr #',
        dataIndex: 'key',
        key: 'key',
        render: (key: React.Key) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
        title: 'Certificate Name',
        dataIndex: 'courseTitle',
        key: 'courseTitle',
        align: "left",
        render: (_:any ,courseTitle: any) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{courseTitle?.course?.courseTitle}</span>
        )
    },
    {
        title: 'User Type',
        dataIndex: 'firstName',
        key: 'firstName',
        align: "center",
        render: (_:any ,courseTitle: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{courseTitle?.carer?.firstName + " " + courseTitle?.carer?.lastName}</span>,
    },
    {
        title: 'Issue Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: "center",
        render: (createdAt: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{createdAt}</span>,
    },
    {
        title: 'Expired Date',
        dataIndex: 'expiryDate',
        key: 'expiryDate',
        align: "center",
        render: (expiryDate: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{expiryDate}</span>,
    },
];

const StaffComplianceReport = () => {
  const {data ,isSuccess }=useGetReportsComplienceQuery({})
  let compilenceData:any
  if(isSuccess){
    compilenceData=data
  }
    return (
       <>
       {isSuccess ? <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={StaffComplianceReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable tableHeader={StaffComplianceReportTableHeader} tableData={compilenceData?.data?.certificates} />
                </Col>
            </Row>
        </div>:<ApiLoader/>}
       </>
    )
}

export default StaffComplianceReport