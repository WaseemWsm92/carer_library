import { Row, Col, Space, Input, Select } from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Edit from '../../../../assets/images/OnBoarding/edit.svg';
import View from '../../../../assets/images/OnBoarding/View.svg';
import Search from '../../../../assets/images/OnBoarding/Search.svg';
import ActionArrow from '../../../../assets/images/OnBoarding/ActionArrow.svg';
import ProfileImage from '../../../../assets/images/OnBoarding/temporary-profile-image.png';
import "../../../Reports/StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import '../../Carer/Carer.scss';
import AllocateNewCareHomeModal from './AllocateNewCareHomeModal';
import DiscardModal from './DiscardModal';
import { useState } from 'react';
import { cordinatorClientDetails } from '../../../../mock/OnBoarding';
import { useGetClientsRequestQuery } from '../../../../store/Slices/References';
import { useLocation } from 'react-router-dom';
import { useDeleteClientsRequestMutation } from '../../../../store/Slices/OnBoarding';




interface ICordinatorClientDetails {
  careHome: string,
  firstName:string,
  country:string;
  careCooridatorAssignedDate:string;
  lastName:string,
  phone:string,
  carers: string,
  image: string,
  location: string,
  number: string,
  date: string
}

const CareCordinatorClientDetails = () => {
  const { state }: any = useLocation();
const {data ,isLoading,isSuccess}=useGetClientsRequestQuery({id:state?.editProfile?._id})

let clientsData: any;
let totalRecords:any=0
if (isSuccess) {
  clientsData = data
}
  const [discardModal, setDiscardModal] = useState(false);
  const [selectedRowData ,setSelectedRowData]=useState("")
  console.log(selectedRowData)
  const[deleteClientsRequest] =useDeleteClientsRequestMutation()
  const handleDeleteSubmit=()=>{
    deleteClientsRequest({id:selectedRowData})
  }
  const handleClientsRowData = (record: any) => {
      
    setSelectedRowData(record?._id)
    
}

  const columns: ColumnsType<ICordinatorClientDetails> = [
    {
      title: <span style={{ paddingLeft: "75px" }}>Instructor Name</span>,
      dataIndex: ' Display Name',
      key: 'name',
      ellipsis: true,
      render: (_, text) =>
        <div className="cursor-pointer d-flex align-center "  >
          <img src={text.image} alt="avatar" />
          <Space size={1} direction='vertical' className='fs-14 fw-400 title-color d-flex align-center ' style={{ marginLeft: "30px" }}>
            {text.firstName + "" + text.lastName}
            {text.carers}
          </Space>
        </div>
    },

    {
      title: <span>Location </span>,
      dataIndex: 'Contact',
      key: 'Contact',
      width: 300,

      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color blue-color' >
            {text?.country}
          </span>
        </Space>,
    },



    {
      title: <span> Contact Number </span>,
      dataIndex: 'number',
      key: 'number',


      render: (_, text) =>

        <div className='fs-14 fw-400 title-color '>
          {text.phone}
        </div>

    },
    {
      title: <span>Allocation Date </span>,
      dataIndex: 'date',
      key: 'date',

      render: (_, text) =>

        <span className='fs-14 fw-400 title-color'>
          {text?.careCooridatorAssignedDate}
        </span>

    },
    {
      title: <span>Action </span>,
      dataIndex: 'date',
      key: 'date',
      render: (_: any, record: any) =>
        <span className='cursor-pointer' onClick={() => {setDiscardModal(true); handleClientsRowData(record)}} >
          <img src={ActionArrow} alt="arrow" />
        </span>

    },

  ];

  return <div className='client-details'>

    <Space>

      <img src={ProfileImage} alt="ProfileImage" />
      <Space direction='vertical' size={0}>
        <span className='fw-600 fs-14 title-color'>Bella Watson</span>
        <span className='fw-500 fs-12 title-color'>Carer Cordinator</span>
      </Space>
    </Space>
    <Row className="carer-main d-flex justify-end carer-style"   >
      <Col span={24} className="gutter-row" style={{ marginBottom: "20px" }}>
        <div>
          <AllocateNewCareHomeModal careCordinatorId={state?.editProfile?._id}/>
        </div>
      </Col>
      <Col xs={24}>
        <Row
          gutter={[20, 20]}
          className="staff-availability-sheet-common-filter-wrapper"
          justify="space-between"
        >
          <Col xs={24} md={16} xl={14} xxl={12}>
            <Row gutter={[0, 20]} className="filter-wrapper">
              <>
                <Col xs={24} sm={8}>
                  <p
                    className="fs-14 fw-600 title-color line-height-17 m-0"
                    style={{ marginBottom: "0.563rem" }}
                  >
                    Carer Home
                  </p>
                  <div className="filter-column">
                    <Select
                      size="large"
                      placeholder="Select Staff Name"
                      defaultValue="All"
                      optionFilterProp="children"
                      className="app-select-wrap-class"
                      popupClassName="app-select-popup-wrap-class"
                      options={[
                        { value: "Tall Tree Care Home", label: "Tall Tree Care Home" },
                        { value: " Tree Care Home", label: " Tree Care Home" },
                        { value: "Ivy Grove Care Home", label: "Ivy Grove Care Home" },
                      ]}
                    />
                  </div>
                </Col>

                <Col xs={24} sm={8}>
                  <p
                    className="fs-14 fw-600 title-color line-height-17 m-0"
                    style={{ marginBottom: "0.563rem" }}
                  >
                    Application Date
                  </p>
                  <div className="filter-column">
                    <Select
                      size="large"
                      placeholder="Select Staff Name"
                      defaultValue="Select"
                      optionFilterProp="children"
                      className="app-select-wrap-class"
                      popupClassName="app-select-popup-wrap-class"
                      // onChange={handleCommonFilterChange}
                      // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                      options={[
                        { value: "Arsalan Khan", label: "Arsalan Khan" },
                        { value: "Ali Rehman", label: "Ali Rehman" },
                        { value: "Kashif", label: "Kashif" },
                      ]}
                    />
                  </div>
                </Col>
              </>
            </Row>
          </Col>

          <Col xs={24} md={8} xl={6} className="gutter-row">
            <div className="input-search-wrapper">
              <p
                className="fs-14 fw-600 title-color line-height-17 m-0"
                style={{ marginBottom: "0.563rem" }}
              >
                &nbsp;
              </p>
              <Input
                placeholder="search"
                prefix={<img src={Search} className="icon" />}
              />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>

    <Row className='carer-main'>
      <Col span={24}>

        <Table className="wrapper-table" columns={columns} dataSource={clientsData?.data} scroll={{ x: "max-content" }} pagination={{ pageSize: 7 }} />
      </Col>
    </Row>

    <DiscardModal
      openModal={discardModal}
      setOpenModal={setDiscardModal}
      onSubmit={handleDeleteSubmit}
      onCancel={() => { }}
    />
  </div>
}

export default CareCordinatorClientDetails