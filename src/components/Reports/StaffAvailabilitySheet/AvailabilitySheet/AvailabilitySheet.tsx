import React, { useState } from 'react'

// Ant Components
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';


// Components
import AvailabilitySheetModal from './AvailabilitySheetModal/AvailabilitySheetModal';
import StaffAvailabilitySheetCommonFilter from '../StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter';

// Mock Data and Interface
import { StaffAvailabilitySheetMockData } from '../../../../mock/ReportMockData/StaffAvailabilitySheetMockData';
import { staffAvailabilitySheetMockDataInterface } from '../../../../types/ReportsInterface';

const AvailabilitySheet = () => {
    const [isAvailability, setIsAvailability] = useState<boolean>(false);

    const AvailabilitySheetTableColumns: ColumnsType<staffAvailabilitySheetMockDataInterface> = [
        {
            title: "Staff Name",
            dataIndex: "stafName",
            key: "stafName",
            render: (_: any, { displayImg, stafName }: any) => (
                <Space size={16} style={{ width: "100%" }}>
                    <img src={displayImg} alt={displayImg} />
                    <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{stafName}</span>
                </Space>
            )
        },
        {
            title: (
                <div className="d-flex flex-column">
                    Monday<span className="fs-12 fw-400">16/05/2022</span>
                </div>
            ),
            dataIndex: "monday",
            key: "monday",
            width: 180,
            render: (text: string) => (
                <div
                    className="update-availabilty-wrapper d-flex align-item-center cursor-pointer"
                    style={{ gap: "2px" }}
                    onClick={() => setIsAvailability(true)}
                >
                    <div className="day-update"></div>
                    <div className="am-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
                    </div>
                    <div className="pm-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
                    </div>
                    <div className="moon-update"></div>
                </div>
            ),
        },
        {
            title: (
                <div className="d-flex flex-column">
                    Tuesday<span className="fs-12 fw-400">17/05/2022</span>
                </div>
            ),
            dataIndex: "tuesday",
            key: "tuesday",
            width: 180,
            render: (text: string) => (
                <div
                    className="update-availabilty-wrapper d-flex align-item-center"
                    style={{ gap: "2px" }}
                >
                    <div className="day-update"></div>
                    <div className="am-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
                    </div>
                    <div
                        className="pm-update d-flex justify-center align-center"
                        style={{ backgroundColor: "#F89A0C", color: "#FCFCFC" }}
                    >
                        <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
                    </div>
                    <div className="moon-update"></div>
                </div>
            ),
        },
        {
            title: (
                <div className="d-flex flex-column">
                    Wednesday<span className="fs-12 fw-400">18/05/2022</span>
                </div>
            ),
            dataIndex: "wednesday",
            key: "wednesday",
            width: 180,
            render: (text: string) => (
                <div
                    className="update-availabilty-wrapper d-flex align-item-center"
                    style={{ gap: "2px" }}
                >
                    <div className="day-update"></div>
                    <div
                        className="am-update d-flex justify-center align-center"
                        style={{ backgroundColor: "#E6B15D", color: "#FCFCFC" }}
                    >
                        <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
                    </div>
                    <div className="pm-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
                    </div>
                    <div className="moon-update"></div>
                </div>
            ),
        },
        {
            title: (
                <div className="d-flex flex-column">
                    Thursday<span className="fs-12 fw-400">19/05/2022</span>
                </div>
            ),
            dataIndex: "thursday",
            key: "thursday",
            width: 180,
            render: (text: string) => (
                <div
                    className="update-availabilty-wrapper d-flex align-item-center"
                    style={{ gap: "2px" }}
                >
                    <div className="day-update"></div>
                    <div className="am-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
                    </div>
                    <div className="pm-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
                    </div>
                    <div className="moon-update moon-color"></div>
                </div>
            ),
        },
        {
            title: (
                <div className="d-flex flex-column">
                    Friday<span className="fs-12 fw-400">20/05/2022</span>
                </div>
            ),
            dataIndex: "friday",
            key: "friday",
            width: 180,
            render: (text: string) => (
                <div
                    className="update-availabilty-wrapper d-flex align-item-center"
                    style={{ gap: "2px" }}
                >
                    <div className="day-update"></div>
                    <div className="am-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
                    </div>
                    <div className="pm-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
                    </div>
                    <div className="moon-update moon-color"></div>
                </div>
            ),
        },
        {
            title: (
                <div className="d-flex flex-column">
                    Saturday<span className="fs-12 fw-400">21/05/2022</span>
                </div>
            ),
            dataIndex: "saturday",
            key: "saturday",
            width: 180,
            render: (text: string) => (
                <div
                    className="update-availabilty-wrapper d-flex align-item-center"
                    style={{ gap: "2px" }}
                >
                    <div className="day-update sun-color"></div>
                    <div className="am-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
                    </div>
                    <div className="pm-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
                    </div>
                    <div className="moon-update"></div>
                </div>
            ),
        },
        {
            title: (
                <div className="d-flex flex-column">
                    Sunday<span className="fs-12 fw-400">22/02/2022</span>
                </div>
            ),
            dataIndex: "sunday",
            key: "sunday",
            width: 180,
            render: (text: string) => (
                <div
                    className="update-availabilty-wrapper d-flex align-item-center"
                    style={{ gap: "2px" }}
                >
                    <div className="day-update sun-color"></div>
                    <div className="am-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
                    </div>
                    <div className="pm-update d-flex justify-center align-center">
                        <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
                    </div>
                    <div className="moon-update"></div>
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: "1.25rem" }}>
            <StaffAvailabilitySheetCommonFilter />
            <Table tableLayout="fixed" columns={AvailabilitySheetTableColumns} dataSource={StaffAvailabilitySheetMockData} pagination={false} className="staff-availability-sheet-table" style={{ marginTop: '1rem' }} scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />

            <AvailabilitySheetModal isAvailability={isAvailability} setIsAvailability={setIsAvailability} />
        </div>
    )
}

export default AvailabilitySheet