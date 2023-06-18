import React from 'react'



// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { PaymentDataReportFilters } from '../../../mock/ReportMockData/PaymentDataReportMockData';
import { paymentDataReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsPaymentDataQuery } from '../../../store/Slices/Reports';

// Payment Data Report Table Columns
const PaymentDataReportTableColumnData: ColumnsType<paymentDataReportMockDataInterface> = [
    {
        title: 'Sr #',
        dataIndex: 'key',
        key: 'key',
        render: (key: React.Key) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
        title: 'Shift Date',
        dataIndex: 'shiftDate',
        key: 'shiftDate',
        align: "center",
        render: (_:any, shiftDate: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftDate?.shift?.shiftDate}</span>,
    },
    // {
    //     title: 'Shift Day',
    //     dataIndex: 'shiftDay',
    //     key: 'shiftDay',
    //     align: "center",
    //     render: (shiftDay: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftDay}</span>,
    // },
    {
        title: 'Staff Name',
        dataIndex: 'shiftType',
        key: 'shiftType',
        align: "center",
        render: (_:any, shiftType: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType?.shift?.shiftType}</span>,
    },
    {
        title: 'Client Name',
        dataIndex: 'clientName',
        key: 'clientName',
        align: "center",
        render: (_:any, clientName: any) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.careHome ?.clientName}</span>
        )
    },
    // {
    //     title: 'Shift Type',
    //     dataIndex: 'shiftType',
    //     key: 'shiftType',
    //     align: "center",
    //     render: (shiftType: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType}</span>,
    // },
    {
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
        align: "center",
        render: (_:any, designation: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{designation?.carer?.personalInformation?.designation}</span>,
    },
    {
        title: 'Employee Status',
        dataIndex: 'status',
        key: 'status',
        align: "center",
        render: (_:any, status: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{status?.carer?.personalInformation?.status}</span>,
    },
    {
        title: 'Total Hours',
        dataIndex: 'totalWorkingHours',
        key: 'totalWorkingHours',
        align: "center",
        render: (totalWorkingHours: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalWorkingHours}</span>,
    },
    {
        title: 'Pay Rate',
        dataIndex: 'perHours',
        key: 'perHours',
        align: "center",
        render: (perHours: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{perHours}</span>,
    },
    {
        title: 'Total Payable',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        align: "center",
        render: (totalAmount: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalAmount}</span>,
    },
    {
        title: 'Client Rate',
        dataIndex: 'clientRate',
        key: 'clientRate',
        align: "center",
        render: (_:any, clientRate: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(clientRate?.careHome?.clientRate[`${clientRate?.rateDay}`])}</span>,
    },
    {
        title: 'Total Receivable',
        dataIndex: 'totalReceivable',
        key: 'totalReceivable',
        align: "center",
        render: (_:any, totalReceivable: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(totalReceivable?.careHome?.clientRate[`${totalReceivable?.rateDay}`])*totalReceivable?.totalHours}</span>,
    },
];

const PaymentDataReport = () => {
  const {data ,isSuccess,isLoading}= useGetReportsPaymentDataQuery({})
  let paymentData:any
  if(isSuccess){
    paymentData=data
  }
    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={PaymentDataReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable  loading={isLoading} tableHeader={PaymentDataReportTableColumnData} tableData={paymentData?.data?.shifts} />
                </Col>
            </Row>
        </div>
    )
}

export default PaymentDataReport