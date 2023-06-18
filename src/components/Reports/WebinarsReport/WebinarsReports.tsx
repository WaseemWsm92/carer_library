import { Col, Row } from 'antd'
import React from 'react'
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters'
import { WebinarsReportFilters, WebinarsReportTable, webinarsReportTable } from '../../../mock/ReportMockData/WebinarsMockData'
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import { ColumnsType } from 'rc-table/lib/interface';

const ActivityReportTableColumnData: ColumnsType<WebinarsReportTable> = [
  {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      width:100,
      render: (key: React.Key) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
  },
  {
      title: 'Webinar Title',
      dataIndex: 'WebinarTitle',
      key: 'WebinarTitle',
      width:330,
      align: "center",
     
  },
  {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
      width:280,
      align: "center",
     
  },
  {
      title: 'Venue ',
      dataIndex: 'Venue',
      key: 'Venue',
      width:290,
      align: "center",
      // render: (activityType: string) =>
      //     <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityType}</span>,
  },
  {
      title: 'No. of Attendees',
      dataIndex: 'NoOfAttendees',
      key: 'NoOfAttendees',
      width:290,
      align: "center",
      // render: (activityBy: string) =>
      //     <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityBy}</span>,
  },
  {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width:160,
      align: "center",
      // render: (activityBy: string) =>
      //     <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityBy}</span>,
  },
];

const WebinarsReports = () => {
  return (
    <div className='reports-child-wrapper-class'>
    <Row>
        <Col xs={24} className="filter-div">
            <CommonReportChildFilters filtersArray={WebinarsReportFilters} />
        </Col>
        <Col xs={24}>
            <CommonReportTable tableHeader={ActivityReportTableColumnData}  tableData={webinarsReportTable}/>
            
        </Col>
    </Row>
</div>
  )
}

export default WebinarsReports