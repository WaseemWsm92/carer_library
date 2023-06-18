import {
  Button,
  Dropdown,
  MenuProps,
  Select,
  Space,
  Table,
  Pagination,
  Input,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import actionImg from "../../../assets/icons/Setting/actionImg.svg";
import editIcon from "../../../assets/icons/edit-blue.svg";
import crossAllocation from "../../../assets/icons/Setting/crossAllocation.svg";
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import "./SettingJobRole.scss";
import "../../../sass/common.scss";
// import { data, DataType } from "../../../mock/SettingJobRole.ts";
import AddModal from "./AddModal";
import CrossAllocationModal from "./CrossAllocationModal";
import searchIcon from "../../../assets/icons/search.svg";
import coloredCopyIcon from "../../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../../assets/icons/Report/colored-xls.png";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import {
  useDeleteJobRequestMutation,
  useGetJobRequestFilterQuery,
  useGetJobRequestQuery,
} from "../../../store/Slices/Setting/JobRole";
import AppSnackbar from "../../../utils/AppSnackbar";
import { isNullOrEmpty, debouncedSearch } from "../../../utils/utils";

const SettingJobRole = () => {
  const [addEditJobRole, setAddEditJobRole] = useState<boolean>(false);
  const [showCrossAllocation, setShowCrossAllocation] =
    useState<boolean>(false);
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState<
    string | undefined
  >();
  const [searchName, setSearchName] = useState<string>("");

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchName) paramsObj["name"] = searchName;
  if (selectedFilterValue) paramsObj[""] = selectedFilterValue;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  //for Integration
  const { data, isLoading, isSuccess, isError } = useGetJobRequestQuery({
    refetchOnMountOrArgChange: true,
  });

  // whether to pass filter or not
  const filteredValuesss =
    selectedFilterValue === "All" ? "" : selectedFilterValue;
  const {
    data: jobRoleFilterData,
    isLoading: jobRoleFilterIsLoading,
    isSuccess: jobRoleFilterIsSuccess,
    isError: jobRoleFilterIsError,
  } = useGetJobRequestFilterQuery({
    refetchOnMountOrArgChange: true,
    filteredValuesss,
    query,
    pagination,
  });
  const [jobID, setJobID] = useState("");
  const [modalType, setModalType] = useState("");
  const [getTableRowValues, setGetFieldValues] = useState({});
  const [deleteJobRequest] = useDeleteJobRequestMutation();

  let optimizedUserRoleDropdown: any;
  let JobRole: any;
  let unchangeUserData: any;
  if (isSuccess) {
    JobRole = jobRoleFilterData;
    unchangeUserData = data;

    // if (isNullOrEmpty(unchangeUserData)) {
    // Making new array for dropdown from data
    let userRoleDropdown = unchangeUserData?.data?.result?.map((item: any) => ({
      value: item?.userRole,
      label: item?.userRole,
    }));

    // removing duplicates from dropdowns
    optimizedUserRoleDropdown = Array.from(
      new Set(userRoleDropdown.map((option: any) => option.label))
    ).map((label: any) =>
      userRoleDropdown.find((option: any) => option.label === label)
    );

    optimizedUserRoleDropdown.push({ value: "All", label: "All" });
    // }
  }

  const handleDeleteSubmit = async () => {
    try {
      await deleteJobRequest(jobID).unwrap();
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
        <Space
          onClick={() => {
            setAddEditJobRole(true);
            setModalType("Edit");
          }}
        >
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
        <Space
          onClick={() => {
            setShowCrossAllocation(true);
          }}
        >
          <img
            src={crossAllocation}
            className="d-flex align-center"
            alt="delete"
            height={18}
            width={16}
          />
          <span>Cross Allocation</span>
        </Space>
      ),
      key: "2",
    },
    {
      label: (
        <Space
          onClick={() => {
            setIsDeleteModal(true);
          }}
        >
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


  const columns: ColumnsType<any> = [
    {
      title: "Sr.No",
      dataIndex: "_id",
      key: "_id",
      render: (value: any, record: any, index: any) => {
        return <span>{(index + pagination?.limit * pagination?.page) - pagination?.limit + 1}</span>;
      },
    },
    {
      title: "Position Name",
      dataIndex: "name",
    },
    {
      title: "Short Form",
      dataIndex: "shortForm",
    },
    {
      title: "Role",
      dataIndex: "userRole",
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
                  setJobID(text._id);
                  setGetFieldValues(text);
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
      <div className="setting-job-role">
        <div className="header border-radius-10">
          <Button
            className="add-job-role-btn fs-14 fw-600 border-radius-10 d-flex justify-center align-items-center"
            onClick={() => {
              setAddEditJobRole(true);
              setModalType("Add");
              setGetFieldValues({});
            }}
          >
            Add Job Role
            <PlusCircleOutlined style={{ marginLeft: "20px" }} />
          </Button>

          <div>
            <label className="fs-14 fw-600">User Role</label>
            <br />
            <Select
              // suffixIcon={<img src={deleteIcon} className="d-flex align-center" alt="delete" height={18} width={16} />}
              className="d-flex"
              placeholder="Select User Role"
              defaultValue="All"
              onChange={(value: string) =>
                value
                  ? setSelectedFilterValue(value)
                  : setSelectedFilterValue("")
              }
              value={selectedFilterValue}
              options={optimizedUserRoleDropdown}
            />
          </div>
        </div>
        <div className="filter-bar">
          <Space
            className="input-export-icons input-search-wrapper"
            size={[30, 10]}
          >
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
                  width={22}
                  height={22}
                  style={{ marginRight: "0.623rem" }}
                />
              }
            />
            <Space size={[25, 0]}>
              <img src={coloredCopyIcon} alt="csv" className="img-hover" />
              <img src={coloredCsvIcon} alt="csv" className="img-hover" />
              <img src={coloredXlsIcon} alt="csv" className="img-hover" />
            </Space>
          </Space>
        </div>

        <div className="record-table  border-radius-10">
          <Table
            scroll={{ x: 768 }}
            columns={columns}
            dataSource={JobRole?.data?.result}
            locale={{ emptyText: !jobRoleFilterIsLoading ? "No Data" : " " }}
            loading={jobRoleFilterIsLoading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: unchangeUserData?.data?.metadata?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            className="common-setting-table"
          />
        </div>
      </div>
      <AddModal
        addEditJobRole={addEditJobRole}
        setAddEditJobRole={setAddEditJobRole}
        modalType={modalType}
        setGetFieldValues={setGetFieldValues}
        getTableRowValues={getTableRowValues}
      />
      <CrossAllocationModal
        showCrossAllocation={showCrossAllocation}
        setShowCrossAllocation={setShowCrossAllocation}
        getTableRowValues={getTableRowValues}
      />
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Yes"
        cancelTitle="No"
        title="Do you want to discard this Details?"
        onSubmit={handleDeleteSubmit}
        onCancel={handleCancelSubmit}
      />
    </>
  );
};

export default SettingJobRole;
