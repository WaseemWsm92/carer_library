import {
  Button,
  Dropdown,
  MenuProps,
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
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import "./SettingBankHolidays.scss";
import "../../../sass/common.scss";
import { data, DataType } from "../../../mock/BankHolidays";
import AddModal from "./AddModal";
import searchIcon from "../../../assets/icons/search.svg";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import coloredCopyIcon from "../../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../../assets/icons/Report/colored-xls.png";
import { useGetBankHolidayQuery } from "../../../store/Slices/Setting/BankHoliday";
import dayjs from "dayjs";
import AppSnackbar from "../../../utils/AppSnackbar";
import { useDeleteBankHolidayMutation } from "../../../store/Slices/Setting/BankHoliday";
import { debouncedSearch, isNullOrEmpty } from "../../../utils/utils";

const SettingBankHolidays = () => {
  const [openBankHolidayModal, setOpenBankHolidayModal] = useState<string>("");
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchName, setSearchName] = useState<string>("");

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchName) paramsObj["name"] = searchName;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  // Integration
  const { data, isLoading, isSuccess, isError } = useGetBankHolidayQuery({
    refetchOnMountOrArgChange: true,
    query,
    pagination
  });
  const [deleteBankHoliday] = useDeleteBankHolidayMutation();
  const [editModalFieldValues, setEditModalFieldValues] = useState({});
  const [bankHolidayId, setBankHolidayId] = useState<string>("");

  console.log("searchName=====", searchName);

  let bankHolidayData: any;

  if (isLoading) {
    bankHolidayData = <p>Loading...</p>;
  } else if (isSuccess) {
    bankHolidayData = data;
  } else if (isError) {
    bankHolidayData = <p>Error...</p>;
  }

  const handleDeleteSubmit = async () => {
    try {
      await deleteBankHoliday(bankHolidayId).unwrap();
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
        <Space onClick={() => setOpenBankHolidayModal("Edit")}>
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
      title: "Sr.no",
      dataIndex: "_id",
      key: "_id",
      render: (value: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Holiday Name",
      dataIndex: "name",
    },
    {
      title: "Holiday Date",
      dataIndex: "date",
      render: (date: any) => <div>{dayjs(date).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, text: any) => (
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            trigger={["click"]}
            overlayClassName="actionDropDownBlocking my-dropdown-blocking"
            overlayStyle={{ borderRadius: "4px" }}
          >
            <Space>
              <div
                className="border-color cursor-pointer"
                onClick={() => {
                  setBankHolidayId(text._id);
                  setEditModalFieldValues(text);
                }}
              >
                <img
                  src={actionImg}
                  alt="ElpiseIcon"
                  style={{ marginLeft: "14px" }}
                />
              </div>
            </Space>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="setting-Bank-Holiday">
        <div className="record-table  border-radius-10">
          <div className="header">
            <Button
              className="add-job-role-btn fs-14 fw-600 border-radius-10 d-flex justify-center align-items-center"
              onClick={() => {
                setEditModalFieldValues({});
                setOpenBankHolidayModal("Add");
              }}
            >
              Add Bank Holiday
              <PlusCircleOutlined />
            </Button>
          </div>
          <div className="filter-bar">
            <Pagination
              current={pagination.page}
              showSizeChanger={true}
              defaultPageSize={5}
              pageSize={pagination.limit}
              rootClassName="custom-pagination-wrapper-class"
              total={
                isNullOrEmpty(bankHolidayData?.data?.result) &&
                bankHolidayData?.data?.result?.length
              }
              onChange={(limit, page) => setPagination({ limit, page })}
            />
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
                    width={24}
                    height={24}
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
          <Table
            scroll={{ x: 768 }}
            columns={columns}
            dataSource={bankHolidayData?.data?.result}
            locale={{ emptyText: !isLoading ? "No Data" : " " }}
            loading={isLoading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: bankHolidayData?.data?.metadata?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            className="common-setting-table"
          />
        </div>
      </div>
      <AddModal
        openBankHolidayModal={openBankHolidayModal}
        setOpenBankHolidayModal={setOpenBankHolidayModal}
        editModalFieldValues={editModalFieldValues}
        setEditModalFieldValues={setEditModalFieldValues}
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

export default SettingBankHolidays;
