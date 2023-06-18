import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Input, MenuProps, Pagination, Table } from 'antd';
import ActionIcon from "../../../assets/icons/ShiftManger/action-icon.svg";
import ModifyIcon from "../../../assets/icons/ClientManageShift/modify-icon.png";
import CancelIcon from "../../../assets/icons/ClientManageShift/cancel-icon.png";
import { ColumnsType } from 'antd/es/table';
import RequestNewShift from './RequestNewShift/RequestNewShift';
import ModifyStaffRequirement from '../../ShiftManager/ShiftBooking/ShiftsModals/ModifyStaffRequirement/ModifyStaffRequirement';
import SelectWrapper from '../../../shared/SelectWrapper/SelectWrapper';
import { useGetShiftDataQuery, useUpdateCancelShiftMutation, useUpdateModifyStaffMutation } from '../../../store/Slices/ClientShiftManage';
import SearchIcon from "../../../assets/images/OnBoarding/Search.svg";
import CancelShiftModal from '../../ShiftManager/ShiftBooking/ShiftsModals/CancelShiftModal/CancelShiftModal';
import { debouncedSearch } from '../../../utils/utils';
import './ClientRequestedShift.scss';

const ClientRequestedShift = () => {
  const [clientSearch, setClientSearch] = useState('');
  const [clientStatusFilter, setStatusFilter] = useState('');
  const [isRequestNewShift, setIsRequestNewShift] = useState<boolean>(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [isModifyStaffModalOpen, setIsModifyStaffModalOpen] = useState<boolean>(false);
  const [clientId, setClientId] = useState('');
  const [isCancelModelOpen, setIsCancelModelOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetShiftDataQuery({ filter: clientStatusFilter, search: clientSearch });
  const [updateCancelShift] = useUpdateCancelShiftMutation();
  const [updateModify] = useUpdateModifyStaffMutation();
  const [count, setCount] = useState<any>(0);

  const handleCancelShift = async (e:any) => {
    const payload = e;
    await updateCancelShift({clientId, payload});
  }

  const handleModifyStaff = async () => {
    const payload = count;
    await updateModify({clientId, payload});
    setIsModifyStaffModalOpen(false);
  }

  const debouncedResults = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setClientSearch);
  };

  const items: MenuProps['items'] | undefined = [
    {
      label: (
        <div className="d-flex align-center" style={{ gap: "18px", paddingBottom: "12px", paddingTop: "12px" }} onClick={() => setIsModifyStaffModalOpen(true)}>
          <img src={ModifyIcon} alt="AllocateStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">Modify staff requirement</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className="d-flex align-center" style={{ gap: "18px", paddingBottom: "12px" }} onClick={() => setIsCancelModelOpen(true)}>
          <img src={CancelIcon} alt="ModifyStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">Cancel Shift</span>
        </div>
      ),
      key: "2",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: 'Sr #',
      dataIndex: 'no',
      key: 'no',
      render: (_: any, data: any, index: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{index < 9 ? `0${index + 1}` : index + 1}</span>,
    },
    {
      title: 'Shift Date',
      dataIndex: 'shiftDate',
      key: 'shiftDate',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(text).format('ddd, MMMM DD YYYY')}</span>,
    },
    {
      title: 'Shift Type',
      dataIndex: 'shiftType',
      key: 'shiftType',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{text}</span>,
    },
    {
      title: 'Staff Type',
      dataIndex: 'carerType',
      key: 'carerType',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{text.shortForm}</span>,
    },
    {
      title: 'Requested By',
      dataIndex: 'addedBy',
      key: 'addedBy',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{`${text.firstName} ${text.lastName}`}</span>,
    },
    {
      title: 'Staff Required',
      dataIndex: 'staffRequired',
      key: 'staffRequired',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{text}</span>,
    },
    {
      title: 'Shift Status',
      dataIndex: 'shiftStatus',
      key: 'shiftStatus',
      render: (text: any) =>
        <span className='fs-14 fw-700 m-0 line-height-22 title-color ' style={{ color: text === 'PUBLISHED' ? '#F7B923' : text === 'Partially Booked' ? '#65CDF0' : text === 'BOOKED' || text === 'COMPLETED' ? '#52C41A' : text === 'UNPUBLISHED' ? 'rgb(255 92 0)' : '', textTransform: "capitalize" }}>{text.toLowerCase()}</span>,
    },
    {
      title: 'Action',
      dataIndex: "id",
      key: 'id',
      render: (_: any, action: any) => (
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            overlayClassName="distraction-alerts-dropdown"
            className="actionDropDown "
          >
            <div className="border-color cursor-pointer" onClick={() => {setClientId(action.id); }}>
              <img src={ActionIcon} alt="" />
            </div>
          </Dropdown>
        </div >
      ),
    }
  ];

  return (
    <>
      <div className='client-requested-shifts-wrapper'>
        <div className='client-requested-wrap bg-white'>
          <div className='client-requested-btn' onClick={() => setIsRequestNewShift(true)}>
            <button type='button' className='cursor-pointer fs-16 line-height-22 white-color fw-600'>Request New Shift</button>
          </div>
          <div className='client-requested-filters w-100'>
            <label className="fs-14 fw-600 line-height-18 m-0 label-color">Shift Status</label>
            <SelectWrapper
              size="large"
              name="manageSelect"
              placeHolder="All"
              options={[
                { value: "", label: 'All' },
                { value: "UNPUBLISHED", label: 'UnPublished' },
                { value: "PUBLISHED", label: 'Published' },
                { value: "REJECTED", label: 'Rejected' },
                { value: "COMPLETED", label: 'Completed' },
                { value: "BOOKED", label: 'BOOKED' },
                { value: "CANCELED", label: 'CANCELED' },
              ]}
              defaultValue="All"
              onChange={(e:any) => setStatusFilter(e)}
            />
          </div>
        </div>
        <div className='client-requested-table'>
          <div className="d-flex justify-between align-center">
            <Pagination
              current={pagination.current}
              showSizeChanger={true}
              defaultPageSize={5}
              pageSize={pagination.pageSize}
              rootClassName="custom-pagination-wrapper-class"
              total={data?.data?.shifts?.length}
              // showTotal={(total) => `Total ${total} items`}
              onChange={(current, pageSize) => setPagination({ current, pageSize })}
            />
            <div className="input-search-wrapper d-flex w-100" style={{ maxWidth: "350px" }}>
              <Input className="w-100" placeholder="search" prefix={<img src={SearchIcon} alt="search icon" className="icon" width={20} height={20} />} style={{ maxWidth: "450px", marginBottom: "5px" }} onChange={debouncedResults}  />
            </div>
          </div>
          <Table columns={columns} dataSource={data?.data?.shifts} loading={isLoading} pagination={false} className="booking-table-content" scroll={{ x: "max-content" }} />
        </div>
      </div>
      <CancelShiftModal placeholder={'Staff are not Avaliable'} label={'Specify reason for Cancelling Shift'} open={isCancelModelOpen} onCancel={() => setIsCancelModelOpen(false)}  onFinish={(e:any) => {handleCancelShift(e); setIsCancelModelOpen(false)}}  />
      <RequestNewShift isRequestNewShift={isRequestNewShift} setIsRequestNewShift={setIsRequestNewShift} />
      <ModifyStaffRequirement open={isModifyStaffModalOpen} onCancel={() => setIsModifyStaffModalOpen(false)} counter={count} setCounter={setCount} onSave={handleModifyStaff} />
    </>
  )
}

export default ClientRequestedShift