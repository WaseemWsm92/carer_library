import dayjs from "dayjs";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Input, Table } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ShiftBookingBtn } from "../../../mock/ShiftManageData";
import DirectShiftModal from "./ShiftsModals/DirectShiftModal/DirectShiftModal";
import PostShift from "./ShiftsModals/PostShiftModal/PostShiftModal";
import ActionIcon from "../../../assets/icons/ShiftManger/action-icon.svg";
import AllocateStaffIcon from "../../../assets/icons/ShiftManger/allocate-staff-icon.png";
import ModifyStaffIcon from "../../../assets/images/manageShift/modifyIcon.png";
import PostShiftIcon from "../../../assets/images/manageShift/postShift.png";
import CancelShiftIcon from "../../../assets/icons/ShiftManger/cancel-shift-icon.png";
import CancelShiftModal from "./ShiftsModals/CancelShiftModal/CancelShiftModal";
import ModifyStaffRequirement from "./ShiftsModals/ModifyStaffRequirement/ModifyStaffRequirement";
import AllocateShift from "./ShiftsModals/AllocateShift/AllocateShift";
import ShiftManageFilters from "./ShiftManageFilters/ShiftManageFilters";
import SearchIcon from "../../../assets/images/OnBoarding/Search.svg";
import DropdownNew from "./DropDown/DropDown";
import {
  useAddNewShiftMutation,
  useCancelShiftMutation,
  useDirectBookStaffMutation,
  useGetShiftsQuery,
  useGetStaffListQuery,
  useGetUserTypesListQuery,
} from "../../../store/Slices/ShiftManager";
import {
  useModifyShiftStaffMutation,
  useGetDepartmentsQuery,
} from "../../../store/Slices/ShiftManager";
import "./ShiftBooking.scss";
import AppSnackbar from "../../../utils/AppSnackbar";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

const ShiftBooking = () => {
  const [isPostShiftModalOpen, setIsPostShiftModalOpen] =
    useState<boolean>(false);
  const [isDirectShiftModalOpen, setIsDirectShiftModalOpen] =
    useState<boolean>(false);
  const [isCancelShiftModalOpen, setIsCancelShiftModalOpen] =
    useState<boolean>(false);
  const [isModifyStaffModalOpen, setIsModifyStaffModalOpen] =
    useState<boolean>(false);
  const [isAllocateShiftModalOpen, setIsAllocateShiftModalOpen] =
    useState<boolean>(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [count, setCount] = useState<any>(0);
  const [switchValue, setSwitchValue] = useState(false);
  const [shiftStatus, setShiftStatus] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [shiftId, setShiftId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [postData, setPostData] = useState<any>();

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const columns: ColumnsType<any> = [
    {
      title: "Sr #",
      dataIndex: "",
      key: "",
      render: (_: any, data: any, index: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {index < 10 ? `0${index + 1}` : index + 1}
        </span>
      ),
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {dayjs(text).format("ddd, MMMM DD YYYY")}
        </span>
      ),
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
      key: "shiftType",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text}
        </span>
      ),
    },
    {
      title: "Staff Type",
      dataIndex: "carerType",
      key: "carerType",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text.shortForm}
        </span>
      ),
    },
    {
      title: "Requested By",
      dataIndex: "addedBy",
      key: "addedBy",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">{`${text.firstName} ${text.lastName}`}</span>
      ),
    },
    {
      title: "Staff Required",
      dataIndex: "staffRequired",
      key: "staffRequired",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text}
        </span>
      ),
    },
    {
      title: "Shift Status",
      dataIndex: "shiftStatus",
      key: "shiftStatus",
      render: (text: any) => (
        <span
          className="fs-14 fw-700 m-0 line-height-22 title-color text-capitalize"
          style={{
            color:
              text === "PUBLISHED"
                ? "#F7B923"
                : text === "Partially Booked"
                ? "#65CDF0"
                : text === "BOOKED" || text === "COMPLETED"
                ? "#52C41A"
                : text === "UNPUBLISHED"
                ? "rgb(255 92 0)"
                : "",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_: any, data: any) => (
        <DropdownNew
          items={[
            {
              label: (
                <div
                  className="d-flex flex-column"
                  style={{ gap: "15px", padding: "8px 8px" }}
                >
                  {data.shiftStatus === "Booking Awaiting" && (
                    <div
                      className="d-flex align-center"
                      style={{ gap: "18px" }}
                      onClick={() => setIsAllocateShiftModalOpen(true)}
                    >
                      <img src={AllocateStaffIcon} alt="AllocateStaff" />
                      <span className="fs-14 fw-400 line-height-22 title-color">
                        Allocate Staff
                      </span>
                    </div>
                  )}

                  <div
                    className="d-flex align-center"
                    style={{ gap: "18px" }}
                    onClick={() => {
                      setIsModifyStaffModalOpen(true);
                      setShiftId(data?._id);
                    }}
                  >
                    <img src={ModifyStaffIcon} alt="ModifyStaff" />
                    <span className="fs-14 fw-400 line-height-22 title-color">
                      Modify staff requirement
                    </span>
                  </div>

                  {(data.shiftStatus === "UNPUBLISHED" ||
                    data.shiftStatus === "CANCELED") && (
                    <div
                      className="d-flex align-center"
                      style={{ gap: "18px" }}
                      onClick={() => {setPostData(data);setIsPostShiftModalOpen(true)}}
                    >
                      <img src={PostShiftIcon} alt="PostShift" />
                      <span className="fs-14 fw-400 line-height-22 title-color">
                        Post Shift
                      </span>
                    </div>
                  )}
                  {data.shiftStatus !== "CANCELED" && (
                    <div
                      className="d-flex align-center"
                      style={{ gap: "18px" }}
                      onClick={() => {
                        setIsCancelShiftModalOpen(true);
                        setShiftId(data?._id);
                      }}
                    >
                      <img src={CancelShiftIcon} alt="CancelShift" />
                      <span className="fs-14 fw-400 line-height-22 title-color">
                        Cancel Shift
                      </span>
                    </div>
                  )}
                </div>
              ),
              key: "key",
            },
          ]}
        >
          <img src={ActionIcon} alt="icon" className="cursor-pointer" />
        </DropdownNew>
      ),
    },
  ];

  const handleBookingBtn = (item: any) => {
    if (item.id === "1") {
      setIsPostShiftModalOpen(true);
    } else if (item.id === "2") {
      setIsDirectShiftModalOpen(true);
    } else if (item.id === "3") {
      navigate(`/shift-manager/${id}/confirmed-shift`, {
        state: { careHome: state?.careHome },
      });
    } else if (item.id === "4") {
      navigate(`/shift-manager/${id}/unfilled-shift`, {
        state: { careHome: state?.careHome },
      });
    } else if (item.id === "5") {
      navigate(`/shift-manager/${id}/unpublished-shift`);
    }
  };

  //query parameters of search and filter
  const paramsObj: any = {};
  if (shiftStatus && shiftStatus !== "All")
    paramsObj["shiftStatus"] = shiftStatus;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  //get all shifts
  const { data: shifts, isLoading: shiftLoading }: any = useGetShiftsQuery({
    careHomeId: id,
    query,
    pagination,
  });

  //Post New Shift
  const [addNewShift] = useAddNewShiftMutation();
  const [directBook] = useDirectBookStaffMutation();

  //get Departments and users
  const { data: departments }: any = useGetDepartmentsQuery({ id });
  const { data: userTypesList }: any = useGetUserTypesListQuery({});
  const { data: staffList }: any = useGetStaffListQuery({});

  //Cancel and Modify shift
  const [cancelShift, { isLoading }] = useCancelShiftMutation();
  const [modifyShift, { isLoading: loading }] = useModifyShiftStaffMutation();

  const postShift = async (values: any) => {
    values.careHomeId = id;
    values.markUnPub = switchValue;
    values.staffRequired = +values.staffRequired;
    values.shiftDate = dayjs(values.shiftDate).toISOString();
    values.startTime = dayjs(values.startTime).toISOString();
    values.endTime = dayjs(values.endTime).toISOString();

    const { data, error }: any = await addNewShift(values);
    if (data) {
      setIsPostShiftModalOpen(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
    if (error) setErrorMsg(error?.data?.error);
  };

  const bookstaff = async (values: any) => {
    values.careHomeId = id;
    values.staffId = staffId;
    values.shiftDate = dayjs(values.shiftDate).toISOString();
    values.startTime = dayjs(values.startTime).toISOString();
    values.endTime = dayjs(values.endTime).toISOString();
    values.confirmationReq = switchValue;

    const payload = { ...values, staffRequired: 1 };
    const { data, error }: any = await directBook(payload);
    if (data) {
      setIsDirectShiftModalOpen(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
    if (error) setErrorMsg(error?.data?.error);
  };

  //Cancel Shift function
  const handleCancelShift = async (reason: any) => {
    const payload = reason;
    const { data }: any = await cancelShift({
      id: shiftId,
      payload,
    });
    if (data) {
      setIsCancelShiftModalOpen(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  //Modify shift staff function
  const handleModifyShift = async () => {
    const payload: any = {
      staffRequired: count,
    };
    const { data }: any = await modifyShift({
      id: shiftId,
      payload,
    });
    if (data) {
      setIsModifyStaffModalOpen(loading);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  const userTypesListOptions = userTypesList?.data?.result?.map(
    (userTypeDetails: any) => {
      return {
        value: userTypeDetails?._id,
        label: `${userTypeDetails?.name} (${userTypeDetails?.shortForm})`,
      };
    }
  );

  const staffListOptions = staffList?.data?.result?.map((staffDetails: any) => {
    return {
      value: staffDetails?._id,
      label: `${staffDetails?.firstName} ${staffDetails?.lastName}`,
    };
  });

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Shift Details",
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
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="shift-booking-wrapper">
        <div className="shift-booking-filters bg-white border-radius-10 w-100">
          <div className="shift-manager-filter">
            <ShiftManageFilters
              careHome={state?.careHome}
              setShiftStatus={setShiftStatus}
            />
          </div>
          <div className="booking-btn-wrapper d-flex align-center">
            {ShiftBookingBtn.map((item: any) => (
              <div className="booking-btn-content" key={item.id}>
                <Button
                  type="primary"
                  style={{ backgroundColor: item.color }}
                  onClick={() => handleBookingBtn(item)}
                >
                  {item.btnText}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="shift-booking-table">
          <div className="d-flex justify-end align-center">
            <div
              className="input-search-wrapper d-flex w-100"
              style={{ maxWidth: "350px" }}
            >
              <Input
                className="w-100"
                placeholder="search"
                onChange={(e: any) => console.log(e.target.value)}
                prefix={
                  <img
                    src={SearchIcon}
                    alt="search icon"
                    className="icon"
                    width={20}
                    height={20}
                  />
                }
                style={{ maxWidth: "450px", marginBottom: "5px" }}
              />
            </div>
          </div>
          <Table
            columns={columns}
            loading={shiftLoading}
            dataSource={shifts?.data?.shifts}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: shifts?.data?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            className="booking-table-content"
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
      <PostShift
        errorMsg={errorMsg}
        userTypesList={userTypesListOptions}
        departments={departments}
        switchValue={switchValue}
        setSwitchValue={setSwitchValue}
        onFinish={postShift}
        postData={postData}
        isPostShiftModalOpen={isPostShiftModalOpen}
        setIsPostShiftModalOpen={setIsPostShiftModalOpen}
      />
      <DirectShiftModal
        setStaffId={setStaffId}
        departments={departments}
        switchValue={switchValue}
        setSwitchValue={setSwitchValue}
        staffList={staffListOptions}
        userTypesList={userTypesList}
        onFinish={bookstaff}
        isDirectShiftModalOpen={isDirectShiftModalOpen}
        setIsDirectShiftModalOpen={setIsDirectShiftModalOpen}
      />
      <ModifyStaffRequirement
        onSave={handleModifyShift}
        open={isModifyStaffModalOpen}
        onCancel={() => setIsModifyStaffModalOpen(false)}
        counter={count}
        setCounter={setCount}
      />
      <AllocateShift
        open={isAllocateShiftModalOpen}
        onCancel={() => setIsAllocateShiftModalOpen(false)}
      />
      <CancelShiftModal
        onFinish={handleCancelShift}
        placeholder={"Staff are not Avaliable"}
        label={"Specify reason for Cancelling Shift"}
        open={isCancelShiftModalOpen}
        onCancel={() => setIsCancelShiftModalOpen(false)}
      />
    </>
  );
};

export default ShiftBooking;
