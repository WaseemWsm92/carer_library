import React, { useState } from 'react';

// Ant Components
import { Col, Row, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable'
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';
import AttendanceReportDetails from './AttendanceReportDetails/AttendanceReportDetails';

// Table and Filters Mock Data and Interface
import { StaffAttendanceReportFilters } from '../../../mock/ReportMockData/StaffAttendanceReportMockData';
import { staffAttendanceReportMockDataInterface } from '../../../types/ReportsInterface';

// Assets
import blueEyeIcon from "../../../assets/icons/Report/blue-eye.png";
import { useGetReportsStaffAttendanceQuery } from '../../../store/Slices/Reports';


const StaffAttendanceReport = () => {
    const [isAttendanceReportDetails, setIsAttendanceReportDetails] = useState<boolean>(false);
    const {data ,isSuccess}=useGetReportsStaffAttendanceQuery({})
    let staffAttendanceData: any;
    if (isSuccess) {
      staffAttendanceData = data
    }
    // Staff Attendance Report Table Columns
    const StaffAttendaceReportTableHeader: ColumnsType<staffAttendanceReportMockDataInterface> = [
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
            align: "center",
            render: (_, { staffImg, staffName }: any) => (
                <div style={{ marginLeft: "auto", textAlign: "center", width: "80%" }}>
                    <Space size={16} style={{ width: "100%" }}>
                        <img src={staffImg} alt={staffImg} />
                        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.staff?.firstName + " " +  staffName?.staff?.lastName}</span>
                    </Space>
                </div>
            )
        },
        {
            title: 'Client Name',
            dataIndex: 'clientName',
            key: 'clientName',
            align: "center",
            render: (_:any ,clientName: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.client?.clientName}</span>,
        },
        {
            title: 'Shift Date',
            dataIndex: 'shiftDate',
            key: 'shiftDate',
            align: "center",
            render: (_:any,  shiftDate: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftDate?.shift ?.shiftDate
                }</span>,
        },
        {
            title: 'Shift Name',
            dataIndex: 'shiftName',
            key: 'shiftName',
            align: "center",
            render: (_:any,  staffName: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.shift
                  ?.shiftType
              }</span> },
        {
            title: 'Total Hours',
            dataIndex: 'totalHours',
            key: 'totalHours',
            render: (totalHours: string) => (
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalHours}</span>
            ),
            align: "center",
        },
        {
            title: 'Out of Office Hours',
            dataIndex: 'takenBreak',
            key: 'takenBreak',
            render: (takenBreak: any) => (
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{takenBreak}</span>
            ),
            align: "center",
        },
        {
            title: "View",
            dataIndex: "View",
            key: 'View',
            render: () => (
                <div className="fs-12 fw-400 line-height-22">
                    <img src={blueEyeIcon} alt='Delete' className='cursor-pointer' onClick={() => setIsAttendanceReportDetails(true)} />
                </div>
            ),
        },
    ];

    return (
        <div className='reports-child-wrapper-class'>
            {!!isAttendanceReportDetails ? (
                <AttendanceReportDetails />
            ) : (
                <Row>
                    <Col xs={24} className="filter-div">
                        <CommonReportChildFilters filtersArray={StaffAttendanceReportFilters} />
                    </Col>
                    <Col xs={24}>
                        <CommonReportTable tableHeader={StaffAttendaceReportTableHeader} tableData={staffAttendanceData?.data?.staff} />
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default StaffAttendanceReport