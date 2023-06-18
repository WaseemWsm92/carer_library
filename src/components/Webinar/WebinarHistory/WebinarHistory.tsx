import React, { useState } from 'react'
import "./WebinarHistory.scss"
import WebinarHistoryFilters from './WebinarHistoryFilters/WebinarHistoryFilters'
import viewIcon from "../../../assets/icons/view-icon.svg"
import searchIcon from "../../../assets/icons/search.svg";
import { Input, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { WebinarHistoryTableData } from '../../../mock/WebinarHistoryData';
import { useNavigate } from 'react-router-dom';
import { useGetWebinarHistoryDataQuery } from '../../../store/Slices/Webinar/WebinarHistory';
import dayjs from 'dayjs';
import { debouncedSearch } from '../../../utils/utils';

const WebinarHistory = () => {

    const navigate = useNavigate()

    const [searchWebinarHistory, setsearchWebinarHistory] = useState()
    const [filterAttendees ,setFilterAttendees]=useState("")
  const debouncedResults = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setsearchWebinarHistory);
  };
  

  const paramsObj: any = {};
  if (searchWebinarHistory) paramsObj["search"] = searchWebinarHistory;
  if(filterAttendees) paramsObj["attendees"]=filterAttendees;
  const query =  "&" + new URLSearchParams(paramsObj).toString();

    const { data, isLoading, isError, isSuccess } = useGetWebinarHistoryDataQuery({query})

    let webinarHistoryData: any;
    if (isLoading) {
      webinarHistoryData = <p>Loading...</p>
    }
    else if (isSuccess) {
      webinarHistoryData = data
    }
    else if (isError) {
      webinarHistoryData = <p>Error...</p>
    }
    console.log("webinarHistoryData",webinarHistoryData?.data?.result)

  const columns: ColumnsType<any> = [
    {
        title: <span>Sr.No#</span>,
        dataIndex: 'sNo',
        key: 'sNo',
        render: (text, record, index) => index + 1,
    },
    {
        title: <span>Webinar Title</span>,
        dataIndex: 'title',
        key: 'title',
        render: (_, text) =>
            <Space >
                <span className='fs-14 fw-400 title-color'>
                    {text.title}
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
                    {/* {text.date} */}
                   {dayjs(text.date).format('D/M/YYYY')}
                </span>
            </Space>,
    },
    {
        title: <span>Duration</span>,
        dataIndex: 'duration',
        key: 'duration',
        render: (_, text) =>
            <Space >
                <span className='fs-14 fw-400 title-color'>
                    {text.duration}
                </span>
            </Space>,
    },
    {
        title: <span>Venue </span>,
        dataIndex: 'venue',
        key: 'venue',
        render: (_, text) =>
            <Space >
                <span className='fs-14 fw-400 title-color'>
                    {text.venue}
                </span>
            </Space>,
    },
    {
        title: <span>Attendees</span>,
        dataIndex: 'attendees',
        key: 'attendees',
        render: (_, text) =>
            <Space >
                <span className='fs-14 fw-400 title-color'>
                    {text.attendees}
                </span>
            </Space>,
    },


    {
        title: <div className='equal--width-tb'>Actions</div>,
        dataIndex: "actions",
        key: "actions",
        width: 150,
        render: (_, text) => (
           <img src={viewIcon} className='cursor-pointer' onClick={() => navigate(`/webinar/webinar-history/view-details/${text._id}`)} alt="" />
        ),
    },
];
  return (
    <div className='webinar-history-main-wrapper'>
    <div className="inner-main-head">
      <div className="search-and-filters">
        <WebinarHistoryFilters setFilterAttendees={setFilterAttendees}/>
      </div>
      <Input
        className="search-input"
        placeholder="Search"
        onChange={debouncedResults}
        prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
      />
    </div>

    <div className="webinar-history-table-wrapper">
      <Table className="wrapper-table" columns={columns} dataSource={webinarHistoryData?.data?.result} scroll={{ x: "max-content" }} pagination={{ pageSize: 7 }} />
    </div>
  </div>
  )
}

export default WebinarHistory