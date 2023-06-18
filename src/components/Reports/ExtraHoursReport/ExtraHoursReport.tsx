import React from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { ExtraHoursReportFilters } from '../../../mock/ReportMockData/ExtraHoursMockData';
import { extraHoursReportTableMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsExtraHoursQuery } from '../../../store/Slices/Reports';

// Extra Hours Report Table Columns
const ExtraHoursReportTableHeader: ColumnsType<extraHoursReportTableMockDataInterface> = [
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
    align: "center",
    render: (_:any ,staffName: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.carer?.firstName + " " + staffName?.carer?.lastName    }</span>,
  },
  {
    title: 'Client Name',
    dataIndex: 'clientName',
    key: 'clientName',
    align: "center",
    render: (_:any ,clientName: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.careHome?.clientName}</span>,
  },
  {
    title: 'Shift Name',
    dataIndex: 'shiftType',
    key: 'shiftType ',
    align: "center",
    render: (_:any,shiftType: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType?.shift?.shiftType }</span>,
  },
  {
    title: 'First Check In',
    dataIndex: 'firstCheckIn',
    key: 'checkIn',
    align: "center",
    render: (_:any ,checkIn: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{checkIn?.timeTrack[0]?.checkIn}</span>,
  },
  {
    title: 'Last Check In',
    dataIndex: 'checkOut',
    key: 'checkOut',
    render: (_:any ,checkOut: any) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{checkOut?.timeTrack?.slice(-1)[0]?.checkOut }</span>
    ),
    align: "center",
  },
  {
    title: 'Extra Hours',
    dataIndex: 'extraHours',
    key: 'extraHours',
    render: (extraHours: string) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{extraHours}</span>
    ),
    align: "center",
  },
  {
    title: 'Approval Status',
    dataIndex: 'approvalStatus',
    key: 'approvalStatus',
    render: (approvalStatus: string) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{approvalStatus}</span>
    ),
    align: "center",
  },
];

const ExtraHoursReport = () => {
  const {data ,isSuccess} =useGetReportsExtraHoursQuery({})
  let extraReportsData:any
  if(isSuccess){
    extraReportsData=data
  }
  return (
    <div className='reports-child-wrapper-class'>
      <Row>
        <Col xs={24} className="filter-div">
          <CommonReportChildFilters filtersArray={ExtraHoursReportFilters} />
        </Col>
        <Col xs={24}>
          <CommonReportTable tableHeader={ExtraHoursReportTableHeader} tableData={extraReportsData?.data?.shifts} />
        </Col>
      </Row>
    </div>
  )
}

export default ExtraHoursReport