import React, { useState } from 'react'

// Ant Components
import { Col, Modal, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';
import AppSnackbar from '../../../utils/AppSnackbar';

// Table and Filters Mock Data and Interface
import { TerminatedStaffReportFilters } from '../../../mock/ReportMockData/TerminatedStaffMockData';
import { terminatedStaffMockDataInterface } from '../../../types/ReportsInterface';

// SCSS
import "./TerminatedStaffList.scss";

// Assets
import modalBgImage from "../../../assets/images/Reports/modal-bg.png";
import { useGetReportsTerminatedQuery, useReactivateTerminatedReportMutation } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';

const TerminatedStaffList = () => {
   const {data ,isSuccess}=useGetReportsTerminatedQuery({})
   const [reactivateTerminatedReport]=useReactivateTerminatedReportMutation({})
   const [reactivateUserId,setUserReactivateId]=useState("")
   const userData: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
   const handleReactive=()=>{
    reactivateTerminatedReport({id:reactivateUserId ,payload:{reactivate:'true'}})
    setIsOpenReActivateModal(false); AppSnackbar({ type: "success", messageHeading: "Staff Reactivated!", message: "The staff member has been reactivated" })
   }
   let terminatedReportsData:any
   if(isSuccess){
    terminatedReportsData=data
   }
   const handleReactivateRecord=(record:any)=>{
    setUserReactivateId(record?._id )
   

   }
    const [isOpenReActivateModal, setIsOpenReActivateModal] = useState<boolean>(false);

    // Terminated Staff List Table Columns
    const TerminatedStaffTableColumnData: ColumnsType<terminatedStaffMockDataInterface> = [
        {
            title: 'Sr #',
            dataIndex: 'key',
            key: 'key',
            render: (key: React.Key) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            align: "center",
            render: (firstName: string) => (
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{firstName}</span>
            )
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            align: "center",
            render: (lastName: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{lastName}</span>,
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
            title: 'User Role',
            dataIndex: 'userRole',
            key: 'userRole',
            align: "center",
            render: (userRole: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{userRole}</span>,
        },
        {
            title: 'DOJ',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: "center",
            render: (createdAt: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(createdAt).format("DD-MM-YYYY")}</span>,
        },
        {
            title: 'Reason For Leaving',
            dataIndex: 'reasonForLeaving',
            key: 'reasonForLeaving',
            align: "center",
            render: (reasonForLeaving: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>-----</span>,
        },
        {
            title: 'Terminated At',
            dataIndex: 'deletedA',
            key: 'deletedA',
            align: "center",
            render: (deletedA: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(deletedA).format("DD-MM-YYYY")}</span>,
        },
        {
            title: 'Terminated By',
            dataIndex: 'terminatedBy',
            key: 'terminatedBy',
            align: "center",
            render: (_:any,terminatedBy: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{terminatedBy?.deletedBy?.firstName + " " + terminatedBy?.deletedBy?.lastName}</span>,
        },
        {
            title: "Action",
            dataIndex: "action",
            key: 'action',
            render: (_:any,record:any) => (
                <span className='fs-14 fw-400 m-0 line-height-22 secondary-color cursor-pointer' onClick={(e: any) =>{ setIsOpenReActivateModal(true) ;handleReactivateRecord(record)}} >Reactivate</span>
            ),
        },
    ];

    return (
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={TerminatedStaffReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable tableHeader={TerminatedStaffTableColumnData} tableData={terminatedReportsData?.data?.staff} />
                </Col>
            </Row>
            <Modal
                centered
                wrapClassName="terminated-staff-reactivate-modal"
                closeIcon={false}
                closable={false}
                open={isOpenReActivateModal}
                footer={false}
            >
                <div className="position-relative">
                    <p className="fs-24 fw-500 form-heading-color text-center line-height-32 m-0" style={{ paddingBottom: "1.063rem", paddingTop: "2.688rem" }}>
                        Status Confirmation
                    </p>
                    <p className='fs-14 fw-400 title-color line-height-22 m-0'>Are you sure you want to reactivate this user?</p>
                    <img src={modalBgImage} alt="modal bg" style={{ position: "absolute", bottom: "-16%", right: "-5%" }} />
                    <button className="btn-secondary" onClick={ handleReactive } style={{ margin: "3rem auto 2.688rem auto" }}>Submit</button>

                </div>
            </Modal>
        </div>
    )
}

export default TerminatedStaffList