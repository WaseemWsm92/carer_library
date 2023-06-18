import React from "react";
import CountWedgits from "../TotalHoursMonth/CountWedgits/CountWedgits";
import TotalHoursTable from "./TotalHoursTable/TotalHoursTable";
import searchIcon from "../../../../../assets/icons/search.svg";
import { Avatar, Col, Input, Row, Select } from "antd";
import "../ShiftStatus.scss";

const TotalHoursLifeTime = () => {
  return (
    <>
      <div style={{ paddingBlock: "30px" }}>
        <Avatar style={{ backgroundColor: "#4E132C", color: "#FFFFFF" }} size="large">
          NB
        </Avatar>
        <span className="fs-14 fw-600 line-height-17" style={{ marginLeft: "10px" }}>
          Nassira Boateng
        </span>
      </div>
      <Row className="staff-availability-sheet-common-filter-wrapper staff-search-filter bg-white" justify="space-between">
        <Col xs={24} md={16} xl={14} xxl={12}>
          <Row gutter={[0, 20]} className="filter-wrapper">
            <>
              <Col xs={24} sm={8}>
                <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                  Shift Name
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
                  Shift Status
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
                  Client Name
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
            <Input placeholder="search" prefix={<img src={searchIcon} className="icon" />} />
          </div>
        </Col>
      </Row>
      <div style={{ marginBottom: "20px" }}>
        <CountWedgits />
      </div>
      <TotalHoursTable />
    </>
  );
};

export default TotalHoursLifeTime;