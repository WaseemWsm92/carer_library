import { Col, Input, Row } from "antd";

import SearchIcon from "../../../assets/icons/Search.png";
import { myResultsFilter } from "../../../mock/TrainingData/ResultDropDownData";
import CommonReportChildFilters from "../../Reports/CommonReportChildFilters/CommonReportChildFilters";
import "./AllCourses.scss";
import CoursesList from "./CoursesCards/CoursesList";

const AllCourses = () => {
  return (
    <div className="courses-wrapper">
      <div className="top-header">
      <div className="content">
          <div className="select-wrapper">
            <CommonReportChildFilters filtersArray={myResultsFilter} />
          </div>
          <div className="input-search-wrapper">
            <Input
              placeholder="Search"
              prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
            />
          </div>
        </div>
      </div>
      <div className="courses">
        <CoursesList />
      </div>
    </div>
  );
};

export default AllCourses;
