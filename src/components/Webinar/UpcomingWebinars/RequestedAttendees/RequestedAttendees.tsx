import { Button, Input, Space } from 'antd'
import React, { useState } from 'react'
import './RequestedAttendees.scss'
import RequestedAttendeesFilters from './TraineeInfoFilters/RequestedAttendeesFilters'
import searchIcon from "../../../../assets/icons/search.svg";
import Table, { ColumnsType } from 'antd/es/table';
import { RequestedAttendeesTableData } from '../../../../mock/Webinar/UpcomingWebinar/RequestedAttendeesMockData';

import pdfFileIcon from '../../../../assets/icons/Webinar/pdf-file-icon.svg'
import BirthDayModal from '../../../../shared/BirthDayModal/BirthDayModal';
import iconRoundedCheck from '../../../../assets/icons/Webinar/check-rounded-icon.svg'

const RequestedAttendees = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [isSendInvitationModal, setIsSendInvidationModal] = useState(false)

    const columns: ColumnsType<any> = [
        {
          title: <span>S.No#</span>,
          dataIndex: 'sNo',
          key: 'sNo',
          render: (_, text) =>
            <Space >
              <span className='fs-14 fw-400 title-color'>
                {text.sNo}
              </span>
            </Space>,
        },
        {
          title: <span>Webinar Title</span>,
          dataIndex: 'webinarTitle',
          key: 'webinarTitle',
          render: (_, text) =>
            <Space >
              <span className='fs-14 fw-400 title-color'>
                {text.webinarTitle}
              </span>
            </Space>,
        },
        {
          title: <span>Requested By</span>,
          dataIndex: 'requestedBy',
          key: 'requestedBy',
          render: (_, text) =>
            <Space >
              <span className='fs-14 fw-400 title-color'>
                {text.requestedBy}
              </span>
            </Space>,
        },
        {
          title: <span>Date</span>,
          dataIndex: 'date',
          key: 'date',
          render: (_, text) =>
            <Space >
              <span className='fs-14 fw-400 title-color'>
                {text.date}
              </span>
            </Space>,
        },
        {
          title: <div>Registration form </div>,
          dataIndex: "actions",
          key: "actions",
          width: 160,
          render: (_, text) => (
            <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                <img className='cursor-pointer' src={pdfFileIcon} alt="" />
            </div>
          ),
        },
      ];

      const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };
    
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };

  return (
    <div className='requested-attendees-main-wrapper'>
      
      <div className="wrapper-inner-main-head">
      <Button className='send-invitation-btn' onClick={()=> setIsSendInvidationModal(true)}>Send Invitation</Button>
      <div className="inner-main-head">
        <div className="search-and-filters">
          <RequestedAttendeesFilters/>
        </div>
        <Input
          className="search-input"
          placeholder="Search"
          prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
        />
      </div>
      </div>

      <div className="requested-attendees-table-wrapper">
        <Table className="wrapper-table" rowSelection={rowSelection} columns={columns} dataSource={RequestedAttendeesTableData} scroll={{ x: "max-content" }} pagination={{ pageSize: 7 }} />
      </div>

      <BirthDayModal iconImage={iconRoundedCheck} isModalOpen={isSendInvitationModal} setIsOpenModal={setIsSendInvidationModal} birthDayMessage="Invitation email Successfully send to David williams " wishButtonText={<span style={{padding:"0px 34px"}}>OK</span>} backgroundColor="#F7B923" />
    </div>
  )
}

export default RequestedAttendees