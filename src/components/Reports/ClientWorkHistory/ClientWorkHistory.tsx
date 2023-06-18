import React, { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { ClientWorkHistoryReportFilters } from '../../../mock/ReportMockData/ClientWorkHistoryMockData';
import { clientWorkHistoryMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsWorkedHistoryQuery } from '../../../store/Slices/Reports';




const ClientWorkHistory = () => {
  const {data ,isSuccess}=useGetReportsWorkedHistoryQuery({})
  const [currentPage ,setCurrentPage]=useState(1)
  const [pageLimit ,setPageLimit]=useState(10)
  let workHistoryData: any;
  if (isSuccess) {
    workHistoryData = data
  }
  // Client Work History Table Columns
const ClientWorkHistoryReportTableHeader: ColumnsType<clientWorkHistoryMockDataInterface> = [
  {
      title: 'Sr #',
      dataIndex: 'currentPage',
      key: 'currentPage',
      render: (_: any, item: any, index: number) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index-4}</span>,
  },
  {
      title: 'Shift Name',
      dataIndex: 'shiftName',
      key: 'shiftName',
      align: "center",
      render: (shiftName: string) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftName}</span>,
  },
  {
      title: 'Staff Name',
      dataIndex: 'staffName',
      key: 'staffName',
      align: "center",
      render: (_:any,staffName: any) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.carer?.firstName + " " +staffName?.carer?.lastName}</span>,
  },

  {
      title: 'Job Date',
      dataIndex: 'jobDate',
      key: 'jobDate',
      align: "center",
      render: (_:any,jobDate: any) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{jobDate?.createdAt}</span>,
  },

  {
      title: 'Worked Hours',
      dataIndex: 'workedHours',
      key: 'workedHours',
      render: (workedHours: string) => (
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{workedHours}</span>
      ),
      align: "center",
  },
  {
      title: 'Hourly Rate(£)',
      dataIndex: 'hourlyRate',
      key: 'hourlyRate',
      render: (_:any,hourlyRate: any) => (
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{hourlyRate?.perHour}</span>
      ),
      align: "center",
  },
  {
      title: 'Shift Amount',
      dataIndex: 'shiftAmount',
      key: 'shiftAmount',
      render: (_:any,shiftAmount:any) => (
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftAmount?.totalAmount}</span>
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
];

    return (
        <div className='reports-child-wrapper-class'>
            <Row>
       ASFASF         <Col xs={24} className="filter-div">
                    <CommonReportChildFilters  filtersArray={ClientWorkHistoryReportFilters} extraCards={true} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable   pagination={{
              currentPage: currentPage,
              pageLimit: pageLimit,
           
              onChange: (currentPage:any,pageLimit:any) => {setCurrentPage( currentPage);setPageLimit(pageLimit)},
            }} tableHeader={ClientWorkHistoryReportTableHeader} tableData={workHistoryData?.data?.shifts} />
                </Col>
            </Row>
        </div>
    )
}

export default ClientWorkHistory