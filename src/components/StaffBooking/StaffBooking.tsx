import { useState } from "react";
import { Col, Input, Row, Select } from "antd";
import searchIcon from "../../assets/icons/search.svg";
import StaffBookingTable from "./StaffBookingTable/StaffBookingTable";
import "./StaffBooking.scss";
import "../Reports/StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { debouncedSearch } from "../../utils/utils";
import { useGetStaffBookingQuery } from "../../store/Slices/StaffBooking";

const StaffBooking = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isSuccess, isError } = useGetStaffBookingQuery({
    search: searchValue,
  });

  // console.log("data============",data);
  

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  let staffBookingList: any;
  if (isLoading) {
    staffBookingList = <p>Loading...</p>;
  } else if (isSuccess) {
    staffBookingList = data;
  } else if (isError) {
    staffBookingList = <p>Error...</p>;
  }

  return (
    <>
      <Row className="staff-availability-sheet-common-filter-wrapper staff-booking-search-filter bg-white" justify="space-between">
        <Col xs={24} md={16} xl={14} xxl={12}>
          <Row gutter={[0, 20]} className="filter-wrapper">
            <>
              <Col xs={24} sm={8}>
                <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                  User Type
                </p>
                <div className="filter-column">
                  <Select
                    size="large"
                    placeholder=""
                    defaultValue="All"
                    optionFilterProp="children"
                    className="app-select-wrap-class"
                    popupClassName="app-select-popup-wrap-class"
                    options={[
                      { value: "Option One", label: "Option One" },
                      { value: "Option Two", label: "Option Two" },
                    ]}
                  />
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                  User Name
                </p>
                <div className="filter-column">
                  <Select
                    size="large"
                    placeholder=""
                    defaultValue="All"
                    optionFilterProp="children"
                    className="app-select-wrap-class"
                    popupClassName="app-select-popup-wrap-class"
                    options={[
                      { value: "Option One", label: "Option One" },
                      { value: "Option Two", label: "Option Two" },
                    ]}
                  />
                </div>
              </Col>
            </>
          </Row>
        </Col>

        <Col xs={24} md={8} xl={6} className="gutter-row">
          <div className="input-search-wrapper">
            <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
              &nbsp;
            </p>
            <Input placeholder="search" onChange={debouncedResults} prefix={<img src={searchIcon} className="icon" />} />
          </div>
        </Col>
      </Row>

      <StaffBookingTable data={staffBookingList?.data?.result}/>
    </>
  );
};

export default StaffBooking;