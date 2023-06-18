import { Col, Popover, Row } from 'antd'
import React from 'react'
import { TraineesInfoTable, TraineesInforFilters, traineesInfoTable } from '../../../mock/ReportMockData/TraineesInfoMockData'
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters'
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import { ColumnsType } from 'rc-table/lib/interface';


const ActivityReportTableColumnData: ColumnsType<TraineesInfoTable> = [
  {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      width:90,
      render: (key: React.Key) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
  },
  {
      title: 'Trainee Name',
      dataIndex: 'TraineeName',
      key: 'TraineeName',
      width:350,
      align: "center",
     
  },
  {
      title: 'Course Name',
      dataIndex: 'CourseName',
      key: 'CourseName',
      width:450,
      align: "center",
     
  },
  {
      title: 'Course Status',
      dataIndex: 'CourseStatus',
      key: 'CourseStatus',
      width:350,
      align: "center",
      // render: (activityType: string) =>
      //     <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityType}</span>,
  },
  {
      title: 'Assesment Status',
      dataIndex: 'AssesmentStatus',
      key: 'AssesmentStatus',
      align: "center",
      // render: (activityBy: string) =>
      //     <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityBy}</span>,
  },
];




const TraineesInforReports = () => {
  return (
    <div className='reports-child-wrapper-class'>
    <Row>
        <Col xs={24} className="filter-div">
            <CommonReportChildFilters filtersArray={TraineesInforFilters} />
        </Col>
        <Col xs={24}>
            <CommonReportTable tableHeader={ActivityReportTableColumnData}  tableData={traineesInfoTable}/>
            
        </Col>
    </Row>
</div>
  )
}

export default TraineesInforReports