import { Row, Col, Space, Progress, Dropdown, Select, Input } from "antd";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Dots from "../../../assets/images/OnBoarding/dots.png";
import Edit from "../../../assets/icons/OnBoarding/edit.svg";
import View from "../../../assets/images/OnBoarding/View.svg";
import Search from "../../../assets/images/OnBoarding/Search.svg";
import "./Carer.scss";
import { applicationStage, ICarerDetails } from "../../../mock/OnBoarding";
import { useState } from "react";
import ViewProfile from "./ViewProfile/ViewProfile";
import { useNavigate } from "react-router-dom";
import "../../Reports/StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import OnboardingAddModal from "./OnboardingAddModal/OnboardingAddModal";
import { useGetRequestQuery } from "../../../store/Slices/OnBoarding";
import { debouncedSearch, isNullOrEmpty } from "../../../utils/utils";

const Carer = () => {
  const navigate = useNavigate();
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [isShowCandidate, setIsShowCandidate] = useState(false);
  const [selectedTableData, setSelectedRowData] = useState("");
  const [selectedFilterValue, setSelectedFilterValue] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectProfileData, setSelectProfileData] = useState<any>(null);

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchName) paramsObj["search"] = searchName;
  if (selectedFilterValue) paramsObj["applicationStage"] = selectedFilterValue;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isLoading, isSuccess, isError } = useGetRequestQuery({
    refetchOnMountOrArgChange: true,
    pagination,
    query,
    role: "carer",
  });

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchName);
  };

  let onBoardingData: any;
  let totalRecords: any = 0;
  if (isLoading) {
    onBoardingData = <p>Loading...</p>;
  } else if (isSuccess) {
    onBoardingData = data;
    totalRecords = data;
  } else if (isError) {
    console.log("error");
  }
  const total = totalRecords?.data?.metadata?.total;
  console.log(totalRecords?.data?.metadata?.total);

  const handleProfileViewById = (record: any) => {
    setSelectedRowData(record?._id);
    setSelectProfileData(record);
  };
  const handleEditProfile = () => {
    navigate(`edit-profile`, { state: { editProfile: selectProfileData } });
  };

  function handleSelectFilter(value: any) {
    if (value) {
      setSelectedFilterValue(value);
    } else {
      setSelectedFilterValue("");
    }
  }

  const items: any = [
    {
      label: (
        <div onClick={() => {}}>
          <Space onClick={() => setIsProfileModal(true)}>
            <img src={View} alt="Edit" className="d-flex align-center" width={24} height={24} />
            <span>View Profile</span>
          </Space>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Space onClick={handleEditProfile}>
          <img src={Edit} alt="Delete" className="d-flex align-center" width={24} height={24} />
          <span>Edit Profile</span>
        </Space>
      ),
      key: "2",
    },
  ];

  const columns: ColumnsType<ICarerDetails> = [
    {
      title: <span style={{ paddingLeft: "75px" }}>Display Name</span>,
      dataIndex: " Display Name",
      key: "name",
      ellipsis: true,
      width: 270,
      render: (_, text) => (
        <div className="cursor-pointer d-flex align-center ">
          <img
            src={
              isNullOrEmpty(text?.profilePhoto)
                ? `https://ui-avatars.com/api/?rounded=true&name=${text.firstName} ${text.lastName}`
                : `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.profilePhoto[0]?.mediaId}.${text?.profilePhoto[0]?.mediaMeta?.extension}`
            }
            height={30}
            width={30}
            alt="avatar"
          />
          <span className="fs-14 fw-400 title-color" style={{ marginLeft: "30px" }}>
            {text.firstName + " " + text.lastName}
          </span>
        </div>
      ),
    },
    {
      title: <span>Contact </span>,
      dataIndex: "Contact",
      key: "email",
      width: 300,
      render: (_, text) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text.email}</span>
        </Space>
      ),
    },
    {
      title: "Profile Status",
      dataIndex: "status",
      key: "status",
      width: 300,
      render: (_, text) => (
        <div>
          <div className="fs-14 fw-400 title-color" style={{ minWidth: "70px" }}>
            <span className="fw-700 fs-14">{text?.percentageComplete}%</span>{" "}
            <span style={{ marginLeft: "5px" }} className="fw-400 fs-14">
              Done
            </span>
          </div>
          <Progress
            percent={text?.percentageComplete}
            strokeColor="#F7B923"
            strokeWidth={9}
            showInfo={false}
          />
        </div>
      ),
    },

    {
      title: "Application Stage",
      dataIndex: "status",
      key: "status",
      width: 300,
      render: (_, text) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text.applicationStage}</span>
        </Space>
      ),
    },

    {
      title: <span>Days In </span>,
      dataIndex: "days",
      key: "days",

      render: (_, text) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text.days}</span>
        </Space>
      ),
    },
    {
      title: "View Details",
      dataIndex: "view",
      key: "id",
      width: 150,
      render: (_: any, record: any) => (
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
          className="actionDropDown"
        >
          <div
            className="border-color cursor-pointer d-flex algin-center  justify-center"
            onClick={() => handleProfileViewById(record)}
          >
            <img src={Dots} alt="menu" />
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="carer-wrapper">
      <Row className="carer-main carer-style">
        <Col xs={24} style={{ marginBottom: "20px" }}>
          <div className="candidate-wrapper">
            <button
              onClick={() => setIsShowCandidate(true)}
              className="candidate-button fw-600 fs-16 cursor-pointer"
            >
              Add New Candidate
            </button>
            <OnboardingAddModal
              isOpenModal={isShowCandidate}
              setIsOpenModal={setIsShowCandidate}
              title="Add New Candidate"
            />
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
                      Application Stage
                    </p>
                    <div className="filter-column">
                      <Select
                        size="large"
                        placeholder="Select Staff Name"
                        defaultValue="All"
                        onChange={handleSelectFilter}
                        value={selectedFilterValue}
                        optionFilterProp="children"
                        className="app-select-wrap-class"
                        popupClassName="app-select-popup-wrap-class"
                        options={applicationStage}
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
                  onChange={debouncedResults}
                  placeholder="search"
                  prefix={<img src={Search} className="icon" />}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="carer-main">
        <Col span={24} className="onboarding-table-wrapper">
          <Table
            className="wrapper-table"
            loading={isLoading}
            columns={columns}
            dataSource={onBoardingData?.data?.result}
            scroll={{ x: "max-content" }}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
          />
        </Col>
      </Row>

      <ViewProfile
        selectedTableData={selectedTableData}
        selectProfileData={selectProfileData}
        IsProfileModal={isProfileModal}
        setIsProfileModal={setIsProfileModal}
      />
    </div>
  );
};

export default Carer;
