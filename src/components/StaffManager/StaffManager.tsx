import React, { useState } from "react";
import StaffManagerInfo from "./StaffManagerInfo/StaffManagerInfo";
import StaffManagerWidgets from "./StaffManagerWidgets/StaffManagerWidgets";
import { Col, Input, Row, Select } from "antd";
import searchIcon from "../../assets/icons/search.svg";
import { useGetStaffManagerQuery } from "../../store/Slices/StaffManager";
import { debouncedSearch } from "../../utils/utils";
import "./StaffManager.scss";
import '../Reports/StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss'

const StaffManager = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isSuccess, isError } = useGetStaffManagerQuery({
    search: searchValue,
  });

  const debouncedResults = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  
  let staffManagerLists: any;
  if (isLoading) {
    staffManagerLists = <p>Loading...</p>;
  } else if (isSuccess) {
    staffManagerLists = data;
  } else if (isError) {
    staffManagerLists = <p>Error...</p>;
  }

  return (
    <>
      <StaffManagerWidgets />
      <Row className="staff-availability-sheet-common-filter-wrapper staff-main-search-filter bg-white" justify="space-between">
        <Col xs={24} md={16} xl={14} xxl={12}>
          <Row gutter={[0, 20]} className="filter-wrapper">
            <Col xs={24} sm={8}>
              <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                Choose by job Role
              </p>
              <div className="filter-column">
                <Select
                  size="large"
                  placeholder="Choose by job Role"
                  defaultValue="All"
                  optionFilterProp="children"
                  className="app-select-wrap-class"
                  popupClassName="app-select-popup-wrap-class"
                  options={[{ value: "Option One", label: "Option One" }]}
                />
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={8} xl={6} className="gutter-row">
          <div className="input-search-wrapper">
            <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
              &nbsp;
            </p>
            <Input placeholder="search" onChange={debouncedResults} prefix={<img src={searchIcon} className="icon" />}  />
          </div>
        </Col>
      </Row>
      <StaffManagerInfo data={staffManagerLists?.data?.result} />
    </>
  );
};

export default StaffManager;