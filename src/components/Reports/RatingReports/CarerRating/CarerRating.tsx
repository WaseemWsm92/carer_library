import { Rate,Row,Col } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React,{useState} from 'react'
import { ClientReportMockDataInterface } from '../../../../types/ReportsInterface';
import CommonReportTable from '../../CommonReportTable/CommonReportTable';
import { ClientReportMockData } from '../../../../mock/ReportMockData/ClientRatingReportMockData';
import CarerRatingCommonFilters from './CarerRatingCommonFilters/CarerRatingCommonFilters';
import '../RatingReportTabs/RatingReportTabs.scss'
const ClientReportTableHeader: ColumnsType<ClientReportMockDataInterface> = [
  {
    title: 'Sr #',
    dataIndex: 'key',
    key: 'key',
    render: (key: React.Key) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
  },
  {
    title: 'Care Home Name',
    dataIndex: 'staffName',
    key: 'staffName',
    render: (_, item: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.staffName}</span>,
  },
  {
    title: 'Shift Name',
    dataIndex: 'shiftName',
    key: 'shiftName',
    render: (_, item: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.shiftName}</span>,
  },

  {
    title: 'Shift Date',
    dataIndex: 'shiftDate',
    key: 'shiftDate',
    render: (_, item: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.shiftDate}</span>,
  },
  {
    title: 'Shift Time',
    dataIndex: 'shiftTime',
    key: 'shiftTime',
    render: (_, item: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.shiftTime}</span>,
  },
  {
    title: 'Booked By',
    dataIndex: 'bookedBy',
    key: 'bookedBy',
    render: (_, item: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.bookedBy}</span>,
  },

  {
    title: 'Staff Type',
    dataIndex: 'staffType',
    key: 'staffType',
    render: (_, item: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.staffType}</span>,
  },
  {
    title: 'Ratinngs',
    dataIndex: 'rating',
    key: 'rating',
    render: (_, item: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'><Rate defaultValue={item?.rating} style={{ fontSize: "15px" }} /></span>,
  },
];
const CarerRating = () => {
  
  return (
    <div>
    <Row>
        <Col xs={24}>
          <CarerRatingCommonFilters IsProgressClient={true} IsShownUserTypeFilter={true}/>
        </Col>
        <Col xs={24}  style={{marginTop:"60px"}}>
          <div className='wrapper-report-carer-and-client-ratings-table-style'>
          <CommonReportTable  tableHeader={ClientReportTableHeader} tableData={ClientReportMockData} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CarerRating
