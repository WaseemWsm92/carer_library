import dayjs from "dayjs";
import { useState } from "react";
import { Avatar, Input, Table } from "antd";
import { useLocation, useParams } from "react-router-dom";

import DropdownNew from "../DropDown/DropDown";
import AppSnackbar from "../../../../utils/AppSnackbar";
import { debouncedSearch } from "../../../../utils/utils";
import BreadCrumb from "../../../../layout/BreadCrumb/BreadCrumb";
import InputWrapper from "../../../../shared/InputWrapper/InputWrapper";
import ActionIcon from "../../../../assets/images/manageShift/action-icon.png";
import AllocateStaffIcon from "../../../../assets/icons/ShiftManger/allocate-staff-icon.png";
import ModifyStaffIcon from "../../../../assets/images/manageShift/modifyIcon.png";
import CancelShiftIcon from "../../../../assets/icons/ShiftManger/cancel-shift-icon.png";
import CancelShiftModal from "../ShiftsModals/CancelShiftModal/CancelShiftModal";
import ModifyStaffRequirement from "../ShiftsModals/ModifyStaffRequirement/ModifyStaffRequirement";
import AllocateShift from "../ShiftsModals/AllocateShift/AllocateShift";
import SearchIcon from "../../../../assets/images/OnBoarding/Search.svg";
import { useGetPreferenceQuery } from "../../../../store/Slices/ClientPreference";
import {
  useCancelConfirmShiftMutation,
  useGetConfirmShiftsQuery,
  useModifyConfirmShiftStaffMutation,
} from "../../../../store/Slices/ShiftManager";
import "./ConfirmedShift.scss";
import {
  useGetStaffListQuery,
  useReallocateShiftMutation,
} from "../../../../store/Slices/BookingCalendar";

const ConfirmedShift = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isModifyStaffModalOpen, setIsModifyStaffModalOpen] = useState<boolean>(false);
  const [isAllocateShiftModalOpen, setIsAllocateShiftModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [count, setCount] = useState<any>(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [staffId, setStaffId] = useState("");

  const { id } = useParams();
  const {state} = useLocation();

  const columns = [
    {
      title: "Sr #",
      dataIndex: "id",
      key: "id",
      render: (_: any, data: any, index: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {index < 10 ? `0${index + 1}` : index + 1}
        </span>
      ),
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      key: "staffName",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.carer?.firstName} {text?.carer?.lastName}
        </span>
      ),
    },
    {
      title: "Staff Photo",
      dataIndex: "staffPhoto",
      key: "staffPhoto",
      render: (text: any) => (
        <Avatar style={{ backgroundColor: "#65CDF0", verticalAlign: "middle" }} size="large">
          HC
        </Avatar>
      ),
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {dayjs(text?.createdAt).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
      key: "shiftType",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.carer?.userType?.shortForm}
        </span>
      ),
    },
    {
      title: "Shift Name",
      dataIndex: "shiftName",
      key: "shiftName",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.shift?.shiftType}
        </span>
      ),
    },
    {
      title: "Booked By",
      dataIndex: "bookedBy",
      key: "bookedBy",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.allocatedBy?.firstName} {text?.allocatedBy?.lastName}
        </span>
      ),
    },
    {
      title: "Shift Rate",
      dataIndex: "shiftRate",
      key: "shiftRate",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">£{text}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div>
          <DropdownNew
            items={[
              {
                label: (
                  <div
                    className="d-flex align-center"
                    style={{ gap: "18px", paddingBottom: "12px", paddingTop: "12px" }}
                    onClick={() => {
                      setIsAllocateShiftModalOpen(true);
                      setSelectedRow(record);
                    }}
                  >
                    <img src={AllocateStaffIcon} alt="AllocateStaff" />
                    <span className="fs-14 fw-400 line-height-22 title-color">
                      Reallocate Staff
                    </span>
                  </div>
                ),
                key: "1",
              },
              {
                label: (
                  <div
                    className="d-flex align-center"
                    style={{ gap: "18px", paddingBottom: "12px" }}
                    onClick={() => {
                      setIsModifyStaffModalOpen(true);
                      setStaffId(record?._id);
                    }}
                  >
                    <img src={ModifyStaffIcon} alt="ViewProfile" />
                    <span className="fs-14 fw-400 line-height-22 title-color">
                      Modify staff requirement
                    </span>
                  </div>
                ),
                key: "2",
              },
              {
                label: (
                  <div
                    className="d-flex align-center"
                    style={{ gap: "18px", paddingBottom: "12px" }}
                    onClick={() => {
                      setIsCancelModalOpen(true);
                      setStaffId(record?._id);
                    }}
                  >
                    <img src={CancelShiftIcon} alt="ViewProfile" />
                    <span className="fs-14 fw-400 line-height-22 title-color">Cancel Shift</span>
                  </div>
                ),
                key: "3",
              },
            ]}
          >
            <img src={ActionIcon} alt="icon" className="cursor-pointer" />
          </DropdownNew>
        </div>
      ),
    },
  ];

  const debouncedResults: any = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchTerm);
  };

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchTerm) paramsObj["staffName"] = searchTerm;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  //Get confirm shifts
  const { data: confirmShifts, isLoading: confirmShiftLoading }: any = useGetConfirmShiftsQuery({
    pagination,
    query,
  });

  //Get Staff List
  const { data: staffList }: any = useGetStaffListQuery({});

  //Get Prefrences
  const { data: preferences }: any = useGetPreferenceQuery({});

  //Modify, Cancel and reallocate shift
  const [cancelShift, { isLoading }] = useCancelConfirmShiftMutation();
  const [modifyShift] = useModifyConfirmShiftStaffMutation();
  const [reallocateStaff] = useReallocateShiftMutation();

  //Cancel Shift function
  const handleCancelShift = async (reason: any) => {
    
    const payload = {
      staffShiftId: staffId,
      cancelReason: reason.reason,
    };
    const { data }: any = await cancelShift(payload);
    if (data) {
      setIsCancelModalOpen(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
    
  };

  //Modify shift staff function
  const handleModifyShift = async () => {
    const payload: any = {
      staffRequired: count,
    };
    const { data, error }: any = await modifyShift({
      id: staffId,
      payload,
    });
    if (data) {
      setIsModifyStaffModalOpen(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  //Reallocate staff List
  const handleReallocateStaff = async (values: any) => {
    const payload: any = {
      staffShiftId: selectedRow?._id,
      updateReason: values.updateReason,
      confirmationReq: false,
      staffId: values.availableStaff,
      preStaffId: selectedRow?.carer?._id,
    };
    const { data, error }: any = await reallocateStaff(payload);
    if (data) setIsAllocateShiftModalOpen(false);
    if (error) setErrorMsg(error);
  };

  const staffListOptions = staffList?.data?.result?.map((staffDetails: any) => {
    return {
      value: staffDetails?._id,
      label: `${staffDetails?.firstName} ${staffDetails?.lastName}`,
    };
  });

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Confirmed Shifts",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Manage Shift",
      path: "/shift-manager",
    },
    {
      title: "Shift Details",
      path: `/shift-manager/${id}`,
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="manager-confirmed-shift-wrapper w-100">
        <div className="manager-confirmed-shift-filters bg-white border-radius-10">
          <label className="fs-14 fw-600 line-height-18 m-0">Care Home</label>
          <div className="manager-confirmed-select w-100">
            <InputWrapper disabled defaultValue={state?.careHome} type="text" name="careHome" />
          </div>
        </div>
        <div className="manager-confirmed-shift-table">
          <div className="d-flex justify-end align-center">
            <div className="input-search-wrapper d-flex w-100" style={{ maxWidth: "350px" }}>
              <Input
                className="w-100"
                placeholder="Search by staff name"
                onChange={debouncedResults}
                prefix={
                  <img src={SearchIcon} alt="search icon" className="icon" width={20} height={20} />
                }
                style={{ marginBottom: "5px" }}
              />
            </div>
          </div>
          <Table
            columns={columns}
            loading={confirmShiftLoading}
            dataSource={confirmShifts?.data?.shifts}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: confirmShifts?.data?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            className="booking-table-content"
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
      <AllocateShift
        selectedRow={selectedRow}
        preferences={preferences?.data?.result}
        errorMsg={errorMsg}
        onFinish={handleReallocateStaff}
        staffList={staffListOptions}
        open={isAllocateShiftModalOpen}
        onCancel={() => setIsAllocateShiftModalOpen(false)}
      />
      <ModifyStaffRequirement
        onSave={handleModifyShift}
        open={isModifyStaffModalOpen}
        onCancel={() => setIsModifyStaffModalOpen(false)}
        counter={count}
        setCounter={setCount}
      />
      <CancelShiftModal
        onFinish={handleCancelShift}
        placeholder={"Staff are not Avaliable"}
        label={"Specify reason for Cancelling Shift"}
        open={isCancelModalOpen}
        onCancel={() => setIsCancelModalOpen(false)}
      />
    </>
  );
};

export default ConfirmedShift;
