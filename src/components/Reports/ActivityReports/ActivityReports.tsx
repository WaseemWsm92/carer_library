import React from 'react'

// Ant Components
import { Col, Popover, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { activityReportInterface } from '../../../types/ReportsInterface';
import { ActivityReportFilters } from '../../../mock/ReportMockData/ActivityReportMockData';
import { useGetActivityReportsQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';

// Activity Report Table Columns
const ActivityReportTableColumnData: ColumnsType<activityReportInterface> = [
    {
        title: 'Sr #',
        dataIndex: 'key',
        key: 'key',
        render: (key: React.Key) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
        title: 'Activity Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: "center",
        render: (createdAt: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(createdAt).format("DD-MM-YYYY")}</span>
        )
    },
    {
        title: 'Activity Name',
        dataIndex: 'activityName',
        key: 'activityName',
        width: 150,
        align: "center",
        ellipsis: true,

        render: (activityName: string) => (
            <Popover
                arrow={false}
                overlayInnerStyle={{ margin: "1rem", padding: 0, height:"auto" }}
                trigger="hover"
                placement="top"
                content={
                    <>
                        <span className='fs-14 fw-400 m-0 line-height-22 white-color btn-secondary card-box-shadow common-border border-radius-8' style={{ padding: "0.938rem 1.125rem" }} >{activityName}</span>
                    </>
                }
            >
                <p className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityName}</p>
            </Popover>
        )
    },
    {
        title: 'Activity Type',
        dataIndex: 'activityType',
        key: 'activityType',
        align: "center",
        render: (activityType: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityType}</span>,
    },
    {
        title: 'Activity By',
        dataIndex: 'activityBy',
        key: 'activityBy',
        align: "center",
        render: (activityBy: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityBy}</span>,
    },
];

const ActivityReports = () => {
  const {data ,isSuccess,isLoading}=useGetActivityReportsQuery({})
  let activityReportsData:any
  if(isSuccess){
    activityReportsData=data
  }
    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={ActivityReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable isLoading={isLoading} tableHeader={ActivityReportTableColumnData} tableData={activityReportsData?.result} />
                </Col>
            </Row>
        </div>
    )
}

export default ActivityReports