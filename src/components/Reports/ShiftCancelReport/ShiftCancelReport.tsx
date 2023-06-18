import React, { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { ShiftCancelReportFilters } from '../../../mock/ReportMockData/ShiftCancelReportMockData';
import { shiftCancelReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsCancelShiftQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import { debouncedSearch } from '../../../utils/utils';

// Shift Cancel Report Table Columns
const ShiftCancelReportTableHeader: ColumnsType<shiftCancelReportMockDataInterface> = [
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
        title: 'Staff Name',
        dataIndex: 'staffName',
        key: 'staffName',
        align: "center",
        render: (_:any,staffName: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.carerType?.shortForm}</span>,
    },
    {
        title: 'Staff Type',
        dataIndex: 'shiftType',
        key: 'staffType',
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
        title: 'Cancelled By',
        dataIndex: 'cancelledBy',
        key: 'cancelledBy',
        render: (cancelledBy
          : string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{cancelledBy
            }</span>
        ),
        align: "center",
    },
    {
        title: 'Cancelled At',
        dataIndex: 'cancelledDate',
        key: 'cancelledDate',
        render: (cancelledDate: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(cancelledDate).format("DD-MM-YYYY")}</span>
        ),
        align: "center",
    },
    {
        title: 'Cancel Reason',
        dataIndex: 'cancelledReason',
        key: 'cancelledReason',
        render: (cancelledReason: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{cancelledReason}</span>
        ),
        align: "center",
    },
];


const ShiftCancelReport = () => {
  const [searchClientName ,setSearchClientName]=useState("")
  const [filterClientName ,setFilterClientName]=useState("")
  const [carerType ,setCarerType]=useState("")
   //query parameters of search and filter
   const paramsObj: any = {};
   if (searchClientName) paramsObj["clientName"] = searchClientName;
   if (filterClientName) paramsObj["clientName"] = filterClientName;
   if (carerType) paramsObj["carerType"] = carerType;
   const query =   new URLSearchParams(paramsObj).toString();
  const {data ,isSuccess}=useGetReportsCancelShiftQuery({query})
  let cancelShiftData:any
  if(isSuccess){
    cancelShiftData=data
  }
  
   const searchedByClientName = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  };
    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={ShiftCancelReportFilters} setFilterClientName={setFilterClientName} setCarerType={setCarerType} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable searchedByClientName={searchedByClientName} tableHeader={ShiftCancelReportTableHeader} tableData={cancelShiftData?.data?.shifts} />
                </Col>
            </Row>
        </div>
    )
}

export default ShiftCancelReport