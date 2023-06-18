import React from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { ShiftRateSettingFilters } from '../../../mock/ReportMockData/ShiftRateSettingMockData';
import { shiftRateSettingMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsRateSettingQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import { isNullOrEmpty } from '../../../utils/utils';

// Client Shift Details Table Columns
const ClientShiftDetailsTableColumnData: ColumnsType<shiftRateSettingMockDataInterface> = [
    {
        title: 'Sr #',
        dataIndex: 'key',
        key: 'key',
        render: (key: React.Key) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
        title: 'Shift Name',
        dataIndex: 'shiftName',
        key: 'shiftName',
        align: "center",
        render: (_:any,shiftName: any) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(shiftName?.shift?.shiftDate).format("DD-MM-YYYY")}</span>
        )
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
        align: "center",
        render: (_:any,startTime: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(startTime?.shift?.startTime).format('HH:mm:ss a')}</span>,
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
        align: "center",
        render: (_:any,endTime: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(endTime?.shift?.endTime).format('HH:mm:ss a')}</span>,
    },
    {
        title: 'Date',
        dataIndex: 'shiftDate',
        key: 'shiftDate',
        align: "center",
        render: (_:any,shiftDate: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(shiftDate?.shift?.shiftDate).format("DD-MM-YYYY")}</span>,
    },
    {
        title: 'Client Shift Break Pay Status',
        dataIndex: 'breakPayment        ',
        key: 'breakPayment',
        align: "center",
        render: (_:any,breakPayment  : any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{isNullOrEmpty(breakPayment?.breakData)?"Shift Break  payment":"Shift Break without payment" }</span>,
    },
    {
        title: 'Client Shift Break Time',
        dataIndex: 'clientShiftBreakTime',
        key: 'clientShiftBreakTime',
        align: "center",
        render: (_:any,clientShiftBreakTime: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientShiftBreakTime?.breakData[0]?.breakTime?"Break Allowed":"No break allowed"}</span>,
    },
    {
        title: 'Staff Shift Break Time Pay Status',
        dataIndex: 'staffShiftBreakTimePayStatus',
        key: 'staffShiftBreakTimePayStatus',
        align: "center",
        render: (_:any,staffShiftBreakTimePayStatus: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{isNullOrEmpty(staffShiftBreakTimePayStatus?.breakData)?"Shift Break  payment":"Shift Break without payment" }</span>,
    },
    {
        title: 'Staff Shift Break Time',
        dataIndex: 'staffShiftBreakTime',
        key: 'staffShiftBreakTime',
        align: "center",
        render: (_:any,staffShiftBreakTime: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffShiftBreakTime?.breakData[0]?.breakTime?"Break Allowed":"No break allowed"}</span>,
    },
    {
        title: 'Payment Type',
        dataIndex: 'paymentType',
        key: 'paymentType',
        align: "center",
        render: (paymentType: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>Hourly</span>,
    },
    {
        title: 'Split Rate Applicable',
        dataIndex: 'splitRateApplicable',
        key: 'splitRateApplicable',
        align: "center",
        render: (splitRateApplicable: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>Yes</span>,
    },
    {
        title: 'Tax Vat Applicable',
        dataIndex: 'taxVatApplicable',
        key: 'taxVatApplicable',
        align: "center",
        render: (taxVatApplicable: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>No</span>,
    },
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        align: "center",
        render: (department: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{department}</span>,
    },
 
    
   
    {
        title: 'Shift Break Staff Info',
        dataIndex: 'shiftBreakStaffInfo',
        key: 'shiftBreakStaffInfo',
        align: "center",
        render: (_:any,shiftBreakStaffInfo: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftBreakStaffInfo?.breakData[0]?.breakTime?"Break Allowed":"No break allowed"}</span>,
    },
];


const ClientShiftDetails = () => {
  const {data ,isSuccess,isLoading}=  useGetReportsRateSettingQuery({})
  let rateSettingsReports:any
  if(isSuccess){
    rateSettingsReports=data
  }
    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={ShiftRateSettingFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable isLoading tableHeader={ClientShiftDetailsTableColumnData} tableData={rateSettingsReports?.data?.shifts} />
                </Col>
            </Row>
        </div>
    )
}

export default ClientShiftDetails