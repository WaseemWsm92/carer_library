import React,{useState} from 'react'

// Ant Components
import { Col, Row,Dropdown,Button } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import blueEyeIcon from "../../../assets/icons/Report/blue-eye.png";
import { ClientWorkHistoryReportFilters, IncidentReportMockData } from '../../../mock/ReportMockData/IncidentReportMockData';
import { incidentReportMockDataInterface } from '../../../types/ReportsInterface';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import IncidentReportFilter from './IncidentReportFilter/IncidentFilter';
import AddModal from './IncidentReportModal/AddModal.tsx/AddModal';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className=' d-flex align-items-center justify-center border-radius-4 ' style={{backgroundColor:"#FF4D4F",width:"100px", height:"30px"}}>
        <span className='fw-500 fs-14 line-height-22 d-flex align-items-center text-center white-color '>New</span>
      </div>
    ),
   
   
   
  },
  {
    key: '2',
    label: (
      <div className=' d-flex align-items-center justify-center border-radius-4 ' style={{backgroundColor:"#1890FF",width:"100px", height:"30px"}}>
       <span className='fw-500 fs-14 line-height-22  d-flex align-items-center  text-center white-color '>Pending</span>
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div className=' d-flex align-items-center justify-center border-radius-4 ' style={{backgroundColor:"#52C41A",width:"100px", height:"30px"}}>
       <span className='fw-500 fs-14 line-height-22  d-flex align-items-center text-center white-color '>Resolved</span> 
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div className=' d-flex align-items-center justify-center border-radius-4 ' style={{backgroundColor:"#FAAD14",width:"100px", height:"30px"}}>
       <span className='fw-500 fs-14 line-height-22  d-flex align-items-center text-center white-color '>Reopened</span> 
      </div>
    ),
  },
];

const IncidentReport = () => {
  const [IsOpenIncidentAddModal, setIsOpenIncidentAddModal]=useState(false)
  const handleSubmitReport =(items:any)=>{
   console.log("data ",items);
   
  
  }
   //BreadCrumb Items
   const breadCrumbItems = [
    {
      title: "Incidents Reports",
      path: "",
    },
    {
      title: "Carer Coordinator Reports",
      path: "/reports",
    },
  ];
  const IncidentReportTableHeader: ColumnsType<incidentReportMockDataInterface> = [
    {
        title: 'Sr #',
        dataIndex: 'key',
        key: 'key',
        render: (key: React.Key) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
        title: 'Nature of Incident',
        dataIndex: 'natureOfIncident',
        key: 'natureOfIncident',
        // align: "center",
        render: (_,item: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.natureOfIncident}</span>,
    },
    {
        title: 'Date of Incident',
        dataIndex: 'dateOfIncident',
        key: 'dateOfIncident',
        // align: "center",
        render: (_,item: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.dateOfIncident}</span>,
    },
  
    {
        title: 'User Role',
        dataIndex: 'userRole',
        key: 'userRole',
        // align: "center",
        render: (_,item: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.userRole}</span>,
    },
  
    {
        title: 'Reported by',
        dataIndex: 'reportedBy',
        key: 'reportedBy',
        render: (_,item: any) => (
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.reportedBy}</span>
        ),
        // align: "center",
    },
    {
        title: 'Attachment',
        dataIndex: 'Attachment',
        key: 'Attachment',
        render: (_,item: any) => (
            <div className='fs-14 fw-400 m-0 line-height-22 title-color'><img src={item?.Attachment} alt ="attachment" width="29px" height="37px"/></div>
        ),
        // align: "center",
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_,status:any) => (
        <Dropdown menu={{ items }} placement="bottom" trigger={['click']}  className='d-flex align-items-center text-center justify-center '>
          <Button onChange={(items) => handleSubmitReport(items)} style={{width:"100px", height:"30px" , backgroundColor: ` ${status.btnBackground}`}} className='fw-500 fs-14 line-height-22 m-0 border-radius-4   d-flex align-items-center text-center white-color'>{status?.status}</Button>
        </Dropdown>
        
        ),
        // align: "center",
    },
   
    {
      title: "Action",
      dataIndex: "action",
      key: 'action',
      render: (_, {  }) => (
          <div className="fs-12 fw-400 line-height-22">
              <img src={blueEyeIcon} alt='Delete' className='cursor-pointer'  onClick={() => setIsOpenIncidentAddModal(true)}/>
          </div>
      ),
  },
  ];
 
 
    return (
      <>
       <BreadCrumb breadCrumbItems={breadCrumbItems} />
        <div className='reports-child-wrapper-class'>
            <Row>
            
                <Col xs={24} className="filter-div">
                <IncidentReportFilter />
                </Col>
                <Col xs={24}>
                <CommonReportTable tableHeader={IncidentReportTableHeader} tableData={IncidentReportMockData} />
                </Col>
            </Row>
            <AddModal onFinish={(e:any) => {handleSubmitReport(e); setIsOpenIncidentAddModal(false)}} IsOpenIncidentAddModal={IsOpenIncidentAddModal} IsCancelIncidentAddModal={() => setIsOpenIncidentAddModal(false)} disabled={true}/>
        </div>
        </>
    )
}

export default IncidentReport