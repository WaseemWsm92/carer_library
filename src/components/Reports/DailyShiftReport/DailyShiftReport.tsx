import React, { useState } from 'react'

// Ant Components
import { Col, Modal, Row, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { DailyShiftReportFilters } from '../../../mock/ReportMockData/DailyShiftReportMockData';
import { dailyShiftReportMockDataInterface, detailsShiftReportMockDataInterface } from '../../../types/ReportsInterface';

// SCSS
import "./DailyShiftReport.scss";

// Assets
import blueEyeIcon from "../../../assets/icons/Report/blue-eye.png";
import { useGetReportsDailyShiftQuery } from '../../../store/Slices/Reports';
import { isNullOrEmpty } from '../../../utils/utils';
import dayjs from 'dayjs';


// Single Details Modal Table Column Data
const DetailsModalTableColumnData: ColumnsType<detailsShiftReportMockDataInterface> = [
  {
    title: <span style={{ paddingLeft: "2rem" }}>Staff Name</span>,
    dataIndex: 'shiftType',
    key: 'shiftType',
    width: 300,
    render: (shiftType: any) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color' style={{ paddingLeft: "2rem" }}>{shiftType}</span>
    )
  },
  {
    title: 'Shift Name',
    dataIndex: 'shiftName',
    key: 'shiftName',
    align: "center",
    render: (shiftType: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType}</span>,
  },
  {
    title: <span style={{ paddingRight: "2rem" }}>Shift Start time</span>,
    dataIndex: 'startTime',
    key: 'startTime',
    align: "right",
    render: (startTime: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color' style={{ paddingRight: "2rem" }}>{dayjs(startTime).format("YYYY-MM-DD")}</span>,
  },
];

const DailyShiftReport = () => {
  const [isOpenDailyShiftDetailsModal, setIsOpenDailyShiftDetailsModal] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState([])

  const { data, isSuccess} = useGetReportsDailyShiftQuery({})
  let dailyShiftsData: any;
  if (isSuccess) {
    dailyShiftsData = data
  }
  const handleDailyShiftView = (record: any) => {
    setSelectedRowData(record?.shifts)
  };

  // Daily Shift Report Table Columns
  const DailyShiftReportTableColumnData: ColumnsType<dailyShiftReportMockDataInterface> = [
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
      render: (_: any, client: any) => (
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{client?.careHome?.clientName}</span>

      )
    },
    {
      title: 'Booked Shifts',
      dataIndex: 'booked',
      key: 'booked',
      align: "center",
      render: (booked: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{booked}</span>,
    },
    {
      title: 'Accepted Shifts',
      dataIndex: 'accepted',
      key: 'accepted',
      align: "center",
      render: (accepted: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{accepted}</span>,
    },
    {
      title: 'Booking Pending',
      dataIndex: 'pending',
      key: 'pending',
      align: "center",
      render: (pending: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{pending}</span>,
    },
    {
      title: "View",
      dataIndex: "View",
      key: 'View',
      render: (_: any, record: any) => (
        <div className="fs-12 fw-400 line-height-22">
          <img src={blueEyeIcon} alt='Delete' className='cursor-pointer' onClick={(e: any) => { setIsOpenDailyShiftDetailsModal(true); handleDailyShiftView(record) }} />
        </div>
      ),
    },
  ];


  return (
    <div className='reports-child-wrapper-class'>
      <Row>
        <Col xs={24} className="filter-div">
          <CommonReportChildFilters filtersArray={DailyShiftReportFilters} />
        </Col>
        <Col xs={24}>
          <CommonReportTable tableHeader={DailyShiftReportTableColumnData} tableData={dailyShiftsData?.data} />
        </Col>
      </Row>

      {/* Details Modal */}
      <Modal
        centered
        wrapClassName="daily-shit-report-details-modal"
        closeIcon={false}

        closable={false}
        open={isOpenDailyShiftDetailsModal}
        footer={false}
      >
        <p className="fs-20 fw-500 title-color line-height-28 m-0 common-border-bottom" style={{ paddingBottom: "1.063rem" }}>
          Shift Booking Details
        </p>
        {selectedRowData.length > 0 && <Table columns={DetailsModalTableColumnData} dataSource={selectedRowData} pagination={false} className="common-report-table" scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />}

        <button className="btn-secondary" onClick={() => setIsOpenDailyShiftDetailsModal(false)} style={{ marginTop: "2rem" }}>Close</button>
      </Modal>
    </div>
  )
}

export default DailyShiftReport