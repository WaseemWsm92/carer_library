import React, { useState } from 'react'

import { Row, Col, Rate } from 'antd';
import CommonReportTable from '../../CommonReportTable/CommonReportTable';
import { debouncedSearch } from '../../../../utils/utils';
import { ClientReportMockDataInterface } from '../../../../types/ReportsInterface';
import { ClientReportMockData } from '../../../../mock/ReportMockData/ClientRatingReportMockData';
import { ColumnsType } from 'antd/es/table';
import CarerRatingCommonFilters from '../CarerRating/CarerRatingCommonFilters/CarerRatingCommonFilters';
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
    title: 'Staff Name',
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

const ClientRating = () => {
  const [filterClientName, setFilterClientName] = useState("")
  const [carerType, setCarerType] = useState("")
  const [searchClientName, setSearchClientName] = useState("")
  
  const paramsObj: any = {};
  if (searchClientName) paramsObj["clientName"] = searchClientName;
  if (filterClientName) paramsObj["clientName"] = filterClientName;
  if (carerType) paramsObj["carerType"] = carerType;
  const query = new URLSearchParams(paramsObj).toString();

  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  }
  return (
    <div className='reports-child-wrapper-class'>
      <Row>
        <Col xs={24}>
          <CarerRatingCommonFilters IsProgressCarer={true}/>
        </Col>
        <Col xs={24}  style={{marginTop:"60px"}} className='wraper-report-rating-table'>
        <div className='wrapper-report-carer-and-client-ratings-table'>
          <CommonReportTable searchedByClientName={searchedByClientName} tableHeader={ClientReportTableHeader} tableData={ClientReportMockData} />
        </div>
        </Col>
      </Row>
    </div>
  )
}

export default ClientRating
