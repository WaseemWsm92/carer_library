import React from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable'
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';
import GrossProfitLossTopFilters from './GrossProfitLossTopFilters/GrossProfitLossTopFilters';

// Table and Filters Mock Data and Interface
import { GrossProfitLossReportFilters } from '../../../mock/ReportMockData/GrossProfitLossReport';
import { grossProfitLossReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsProftGrossProfitQuery } from '../../../store/Slices/Reports';

// Gross Profit Loss Report Table Columns
const GrossProfileLossReportTableHeader: ColumnsType<grossProfitLossReportMockDataInterface> = [
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
        align: "left",
        render: (clientName: string) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName}</span>
        )
    },
    {
        title: 'Worked Hours',
        dataIndex: 'totalWorkingHours',
        key: 'totalWorkingHours',
        align: "center",
        render: (totalWorkingHours: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalWorkingHours}</span>,
    },
    {
        title: 'Client Amount',
        dataIndex: 'clientAmount',
        key: 'clientAmount',
        align: "center",
        render: (clientAmount: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientAmount}</span>,
    },
    {
        title: 'Staff Amount',
        dataIndex: 'staffAmount',
        key: 'staffAmount',
        align: "center",
        render: (staffAmount: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffAmount}</span>,
    },
    {
        title: 'Diff. |£|',
        dataIndex: 'diff',
        key: 'diff',
        align: "center",
        render: (diff: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{diff}</span>,
    },
];

const GrossProfitLossReport = () => {
  const {data ,isSuccess} =useGetReportsProftGrossProfitQuery({})
  let profitGrossLoss:any
  if(isSuccess){
    profitGrossLoss=data
  }

    const extraCardsData = {
        totalHoursWorked: "6789.78",
        clientAmount: "20,550.30",
        staffAmount: "11795.25",
        diff: "8,755.13"
    }

    return (
        <div className='reports-child-wrapper-class'>
            <Row gutter={[0, 20]}>
                <Col xs={24} className="filter-div">
                    <GrossProfitLossTopFilters />
                </Col>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={GrossProfitLossReportFilters} extraCards={true} extraCardsData={extraCardsData} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable tableHeader={GrossProfileLossReportTableHeader} tableData={profitGrossLoss?.data?.shifts} />
                </Col>
            </Row>
        </div>
    )
}

export default GrossProfitLossReport;