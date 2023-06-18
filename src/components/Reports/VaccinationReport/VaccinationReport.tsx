import React, { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { VaccinationReportFilters } from '../../../mock/ReportMockData/VaccinationReportMockData';
import { vaccinationReportTableMockDataInterface } from '../../../types/ReportsInterface';

// Assets
import pdfDownloadImage from "../../../assets/images/Reports/pdf-download.png";
import { useGetReportsVaccinationQuery } from '../../../store/Slices/Reports';
import { isNullOrEmpty } from '../../../utils/utils';
import dayjs from 'dayjs';




const VaccinationReport = () => {
    const [isOpenPdfModal, setIsOpenPdfModal] = useState<boolean>(false);
    const {data ,isSuccess,isLoading}=useGetReportsVaccinationQuery({})
    let vaccinationData:any
     if(isSuccess){
      vaccinationData=data
     }

    // Vaccination Report Table Columns
    const VaccinationReportTableColumnData: ColumnsType<vaccinationReportTableMockDataInterface> = [
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
            render: (_:any,staffName: any) => (
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.firstName + " " + staffName?.lastName}</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: "center",
            render: (email: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{email}</span>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            align: "center",
            render: (phone: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{phone}</span>,
        },
        {
            title: 'User Type',
            dataIndex: 'userType',
            key: 'userType',
            align: "center",
            render: (userType: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{userType}</span>,
        },
        {
            title: 'User Status',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (status: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{status}</span>,
        },
        {
            title: 'Vaccination Name',
            dataIndex: 'vaccinationName',
            key: 'vaccinationName',
            align: "center",
           render: (_:any,vaccinationName: any) => {
  if (!vaccinationName || !vaccinationName.immunisation) {
    return <span className='fs-14 fw-400 m-0 line-height-22 title-color'>No Vaccination</span>;
  }
  const immunisationKeys = Object.keys(vaccinationName.immunisation);
  return <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{immunisationKeys}</span>;
}},
        {
            title: 'Vaccination Date',
            dataIndex: 'vaccinationDate',
            key: 'vaccinationDate',
            align: "center",
            render: (_:any,vaccinationDate: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(vaccinationDate?.updatedAt).format("DD-MM-YYYY")}</span>,
        },
        {
            title: "View Certification",
            dataIndex: "ViewCertification",
            key: 'ViewCertification',
            align: "center",
            render: () => (
                <div className="fs-12 fw-400 line-height-22">
                    <img src={pdfDownloadImage} alt='Delete' className='cursor-pointer' onClick={(e:any) => setIsOpenPdfModal(true)} />
                </div>
            ),
        },
    ];

    console.log("PDF Modal open => ",isOpenPdfModal);
    

    return (
        <div className='reports-child-wrapper-class'>
            <Row >
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={VaccinationReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable loading={isLoading} tableHeader={VaccinationReportTableColumnData} tableData={vaccinationData?.data?.users} />
                </Col>
            </Row>
        </div>
    )
}

export default VaccinationReport