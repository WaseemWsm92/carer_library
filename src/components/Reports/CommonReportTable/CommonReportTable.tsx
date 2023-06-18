import React, { useState } from 'react'

// Ant Components
import { Input, Pagination, Space, Table } from 'antd'

// SCSS
import "./CommonReportTable.scss";

// Assets
import searchIcon from "../../../assets/icons/search.svg";
import coloredCopyIcon from "../../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../../assets/icons/Report/colored-xls.png";


const CommonReportTable = (props: any) => {
    const { tableHeader, tableData,searchedByClientName ,isLoading} = props;
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

    return (
        <div className='common-report-table-wrapper'>
            <div className='custom-pagination-search'>
                <Pagination
                    current={pagination.current}
                    // responsive={true}
                    showSizeChanger={true}
                    defaultPageSize={5}
                    pageSize={pagination.pageSize}
                    rootClassName="custom-pagination-wrapper-class"
                    // total={tableData.length}

                    // showTotal={(total) => `Total ${total} items`}
                    onChange={(current, pageSize) =>
                        setPagination({ current, pageSize })
                    }
                />
                <Space className='input-export-icons' size={[30, 0]}>
                    <Input
                    onChange={searchedByClientName}
                        className="search-input"
                        placeholder="Search"
                        prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
                    />
                    <Space size={[25, 0]}>
                        <img src={coloredCopyIcon} alt="csv" className='img-hover' />
                        <img src={coloredCsvIcon} alt="csv" className='img-hover' />
                        <img src={coloredXlsIcon} alt="csv" className='img-hover' />
                    </Space>
                </Space>

            </div>
            <Table tableLayout="fixed" loading={isLoading} columns={tableHeader} dataSource={tableData} pagination={pagination} onChange={(pagination: any) => setPagination(pagination)} className="common-report-table" scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />
        </div>
    )
}

export default CommonReportTable