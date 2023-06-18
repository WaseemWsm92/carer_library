import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  Pagination,
  Select,
  Space,
} from "antd";
import editIcon from "../../../assets/icons/edit-blue.svg";
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import "./SettingBreakTime.scss";
import Table, { ColumnsType } from "antd/es/table";
import searchIcon from "../../../assets/icons/search.svg";
import { useState } from "react";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import AddModal from "./AddModal";
import actionImg from "../../../assets/icons/Setting/actionImg.svg";
import { DataType } from "../../../mock/BreakTime";
import {
  useDeleteBreakTimeMutation,
  useGetBreakTimeFilterQuery,
  useGetBreakTimeQuery,
} from "../../../store/Slices/Setting/BreakTime";
import { debouncedSearch, isNullOrEmpty } from "../../../utils/utils";
import AppSnackbar from "../../../utils/AppSnackbar";

function SettingBreakTime() {
  const [addEditJobRole, setAddEditJobRole] = useState<boolean>(false);
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchName) paramsObj["search"] = searchName;
  // if (selectedFilterValue) paramsObj["applicationStage"] = selectedFilterValue;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  // Integration => first api call if for dropdown i.e to not change the dropdown values upon calling the api again and again
  const { data, isLoading, isSuccess, isError } = useGetBreakTimeQuery({
    refetchOnMountOrArgChange: true,
  });

  // whether to pass filter or not
  const filteredValuesss =
    selectedFilterValue === "All" ? "" : selectedFilterValue;

  const {
    data: filteredData,
    isLoading: isFilteredLoading,
    isSuccess: isFilteredSuccess,
    isError: isFilterError,
  } = useGetBreakTimeFilterQuery({
    refetchOnMountOrArgChange: true,
    filteredValuesss,
    query,
    pagination,
  });
  const [deleteBreakTime] = useDeleteBreakTimeMutation();
  const [editModalFieldValues, setEditModalFieldValues] = useState({});
  const [breakTimeId, setBreakTimeId] = useState<string>("");

  let breakTimeData: any;
  let unchangeUserData: any;
  let optimizedUserRoleDropdown: any;
 if (isSuccess) {
    unchangeUserData = data;
    breakTimeData = filteredData;
    // if (isNullOrEmpty(unchangeUserData)) {
    // Making new array for dropdown from data
    let userRoleDropdown = unchangeUserData?.data?.result?.map((item: any) => ({
      value: item?.careHome?.clientName,
      label: item?.careHome?.clientName,
    }));

    // removing duplicates from dropdowns
    optimizedUserRoleDropdown = Array.from(
      new Set(userRoleDropdown.map((option: any) => option.label))
    ).map((label: any) =>
      userRoleDropdown.find((option: any) => option.label === label)
    );

    optimizedUserRoleDropdown.push({ value: "All", label: "All" });
  } 

  const handleDeleteSubmit = async () => {
    try {
      await deleteBreakTime(breakTimeId).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Deleted!",
        message: "Information deleted successfully",
      });
      setIsDeleteModal(false);
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };
  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Space onClick={() => setAddEditJobRole(true)}>
          <img
            src={editIcon}
            alt="edit"
            className="d-flex align-center"
            height={18}
            width={16}
          />
          <span className="m-0">Edit Details</span>
        </Space>
      ),
      key: "1",
    },
    {
      label: (
        <Space onClick={() => setIsDeleteModal(true)}>
          <img
            src={deleteIcon}
            className="d-flex align-center"
            alt="delete"
            height={18}
            width={16}
          />
          <span>Delete</span>
        </Space>
      ),
      key: "3",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "S.No",
      dataIndex: "_id",
      key: "_id",
      render: (value: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Break Time",
      dataIndex: "break",
    },
    {
      title: "Care Home",
      dataIndex: "careHome",
      key: "careHome",
      render: (careHome: any) => <div>{careHome?.clientName}</div>,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, text: any) => (
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottom"
            trigger={["click"]}
            overlayClassName="actionDropDownBlocking my-dropdown-blocking"
            overlayStyle={{ borderRadius: "4px" }}
          >
            <Space>
              <div
                className="border-color cursor-pointer"
                onClick={() => {
                  setBreakTimeId(text?._id);
                  setEditModalFieldValues(text);
                }}
              >
                <img src={actionImg} alt="ElpiseIcon" />
              </div>
            </Space>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="setting-break-time">
        <div className="header border-radius-10">
          <h1 className="fs-16 fw-600">Add Break Time</h1>
          <Button
            className="add-job-role-btn fs-14 fw-600 border-radius-10 d-flex justify-between align-items-center"
            onClick={() => setAddEditJobRole(true)}
          >
            <span className="fs-14 fw-600">Break Time</span>
            <PlusCircleOutlined />
          </Button>

          <div>
            <label className="fs-14 fw-600"> Care Home</label>
            <br />
            <Select
              className="d-flex"
              placeholder="Select"
              defaultValue="All"
              onChange={(value: string) =>
                value
                  ? setSelectedFilterValue(value)
                  : setSelectedFilterValue("")
              }
              value={selectedFilterValue ? selectedFilterValue : undefined}
              options={optimizedUserRoleDropdown}
              dropdownStyle={{ textTransform: "capitalize" }}
            />
          </div>
        </div>
        <div className="filter-bar input-search-wrapper">
          <Pagination
            current={pagination.page}
            showSizeChanger={true}
            defaultPageSize={5}
            pageSize={pagination.limit}
            rootClassName="custom-pagination-wrapper-class"
            total={
              isNullOrEmpty(breakTimeData?.data?.result) &&
              breakTimeData?.data?.result.length
            }
            onChange={(page, limit) => setPagination({ page, limit })}
          />
          <Space className="input-export-icons" size={[30, 10]}>
            <Input
              className="search-input"
              placeholder="Search"
              onChange={(event: any) =>
                debouncedSearch(event.target.value, setSearchName)
              }
              prefix={
                <img
                  src={searchIcon}
                  alt="searchIcon"
                  width={24}
                  height={24}
                  style={{ marginRight: "0.623rem" }}
                />
              }
            />
          </Space>
        </div>

        <div className="record-table  border-radius-10">
          <Table
            scroll={{ x: 768 }}
            columns={columns}
            dataSource={breakTimeData?.data?.result}
            locale={{ emptyText: !isFilteredLoading ? "No Data" : " " }}
            loading={isFilteredLoading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: breakTimeData?.data?.metadata?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            className="common-setting-table"
          />
        </div>
      </div>
      <AddModal
        addEditJobRole={addEditJobRole}
        setAddEditJobRole={setAddEditJobRole}
        editModalFieldValues={editModalFieldValues}
        setEditModalFieldValues={setEditModalFieldValues}
      />
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Yes"
        cancelTitle="No"
        title="Do you want to discard this ?"
        onSubmit={handleDeleteSubmit}
        onCancel={handleCancelSubmit}
      />
    </>
  );
}

export default SettingBreakTime;
