import { Input } from "antd";

import SearchIcon from "../../../assets/icons/Search.png";
import { myResultsFilter } from "../../../mock/TrainingData/ResultDropDownData";
import CommonReportChildFilters from "../../Reports/CommonReportChildFilters/CommonReportChildFilters";
import ResultsTable from "./ResultsTable/ResultsTable";
import "./MyResults.scss";

const MyResults = () => {
  return (
    <div className="my-results-wrapper">
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
      <div className="results-table-wrapper">
        <ResultsTable />
      </div>
    </div>
  );
};

export default MyResults;
