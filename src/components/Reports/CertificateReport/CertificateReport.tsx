import { Col, Row } from 'antd'
import React from 'react'
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters'
import CommonReportTable from '../CommonReportTable/CommonReportTable'
import { CertificateReportFilters, CertificateReportTable, certificateReportTable } from '../../../mock/ReportMockData/CertificateMockData';
import { ColumnsType } from 'rc-table/lib/interface';

const ActivityReportTableColumnData: ColumnsType<CertificateReportTable> = [
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
      dataIndex: 'Certificate',
      key: 'Certificate',
      align: "center",
      // render: (activityBy: string) =>
      //     <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityBy}</span>,
  },
];

const CertificateReport = () => {
  return (
    <div className='reports-child-wrapper-class'>
    <Row>
        <Col xs={24} className="filter-div">
            <CommonReportChildFilters filtersArray={CertificateReportFilters} />
        </Col>
        <Col xs={24}>
            <CommonReportTable tableHeader={ActivityReportTableColumnData}  tableData={certificateReportTable}/>
            
        </Col>
    </Row>
</div>
  )
}

export default CertificateReport