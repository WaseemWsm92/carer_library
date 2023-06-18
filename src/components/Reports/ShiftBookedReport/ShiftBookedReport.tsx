import React, { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { ShiftBookedReportFilters } from '../../../mock/ReportMockData/ShiftBookedReportMockData';
import { shiftBookedReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsBookedShiftQuery } from '../../../store/Slices/Reports';
import { debouncedSearch } from '../../../utils/utils';

// Shift Booked Report Table Columns
const ShiftBookedReportTableHeader: ColumnsType<shiftBookedReportMockDataInterface> = [
    {
        title: 'Sr #',
        dataIndex: 'key',
        key: 'key',
        render: (key: React.Key) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
        title: 'Client Name',
        dataIndex: 'clientName',
        key: 'clientName',
        align: "center",
        render: (_:any,clientName: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.careHome?.clientName}</span>,
    },
    {
        title: 'Staff Type',
        dataIndex: 'staffType',
        key: 'staffType',
        align: "center",
        render: (staffType: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffType}</span>,
    },
    {
        title: 'Shift Name',
        dataIndex: 'shiftType',
        key: 'shiftType',
        align: "center",
        render: (shiftType: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType}</span>,
    },
    {
        title: 'Shift Date',
        dataIndex: 'shiftDate',
        key: 'shiftDate',
        align: "center",
        render: (shiftDate: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftDate}</span>,
    },
    {
        title: 'Booked By',
        dataIndex: 'bookedBy',
        key: 'bookedBy',
        render: (_:any, addedBy: any) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{addedBy?.addedBy?.firstName + " " +addedBy?.addedBy?.lastName }</span>
        ),
        align: "center",
    },
    {
        title: 'Booked At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{createdAt}</span>
        ),
        align: "center",
    },
    {
        title: 'Requested By',
        dataIndex: 'requestedBy',
        key: 'requestedBy',
        render: (requestedBy: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{requestedBy}</span>
        ),
        align: "center",
    },
];

const ShiftBookedReport = () => {
  const [searchClientName ,setSearchClientName]=useState("")
  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchClientName) paramsObj["clientName"] = searchClientName;
  const query =   new URLSearchParams(paramsObj).toString();
  const { data, isSuccess,isLoading} = useGetReportsBookedShiftQuery({query})
  
  let bookedShiftsData: any;
  if (isSuccess) {
    bookedShiftsData = data
  }
     
// const bookedShift=bookedShiftsData?.data?.shifts?.map((clientName:any)=>clientName)
// const bookedShiftClientName=bookedShift?.map((bookedShiftClientName)=>)
// console.log(bookedShift)
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  };
    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={ShiftBookedReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable loading={isLoading} tableHeader={ShiftBookedReportTableHeader} searchedByClientName={searchedByClientName} tableData={bookedShiftsData?.data?.shifts} />
                </Col>
            </Row>
        </div>
    )
}

export default ShiftBookedReport