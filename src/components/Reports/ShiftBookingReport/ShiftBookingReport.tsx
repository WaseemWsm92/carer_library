import React from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { ShiftBookingReportFilters, ShiftBookingReportMockData } from '../../../mock/ReportMockData/ShiftBookingReportMockData';
import { shiftBookingReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetBookingShitReportsQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';

// Shift Booking Report Table Columns
const ShiftBookingReportTableHeader: ColumnsType<shiftBookingReportMockDataInterface> = [
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
        dataIndex: 'shiftName',
        key: 'shiftName',
        align: "center",
        render: (_:any, shiftName: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftName?.shiftType}</span>,
    },
    {
        title: 'Shift Date',
        dataIndex: 'shiftDate',
        key: 'shiftDate',
        align: "center",
        render: (shiftDate: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(shiftDate).format("DD-MM-YYYY")}</span>,
    },
    {
        title: 'Booked By',
        dataIndex: 'bookedBy',
        key: 'bookedBy',
        render: (_:any,bookedBy: any) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{bookedBy?.addedBy?.firstName + " " +bookedBy?.addedBy?.lastName}</span>
        ),
        align: "center",
    },
    {
        title: 'Booked At',
        dataIndex: 'bookedAt',
        key: 'bookedAt',
        render: (_:any,bookedAt: any) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(bookedAt?.createdAt).format("DD-MM-YYYY")}</span>
        ),
        align: "center",
    },
    {
        title: 'Requested By',
        dataIndex: 'requestedBy',
        key: 'requestedBy',
        render: (_:any,requestedBy: any) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{requestedBy?.requestedBy}</span>
        ),
        align: "center",
    },
];

const ShiftBookingReport = () => {
  const {data,isSuccess}=useGetBookingShitReportsQuery({query:"Booked"})
  let bookingShiftReportData:any
  if(isSuccess){
    bookingShiftReportData=data
  }
    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={ShiftBookingReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable tableHeader={ShiftBookingReportTableHeader} tableData={bookingShiftReportData?.data?.shifts} />
                </Col>
            </Row>
        </div>
    )
}

export default ShiftBookingReport