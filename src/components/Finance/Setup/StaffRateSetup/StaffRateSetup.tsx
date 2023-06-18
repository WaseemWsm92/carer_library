import { Input } from "antd";
import StaffRateSetupAccordians from "./StaffRateSetupAccordians";
import Search from "../../../../assets/icons/Search.png";
import './StaffRateSetup.scss'

const StaffRateSetup = () => {
  return (
    <div className="staff-rate-main">
      <div className="d-flex justify-end align-center">
        <div className="input-search-wrapper">
          <Input placeholder="search" className="staff-rate-search" prefix={<img src={Search} alt="search icon" className="icon" />} />
        </div>
      </div>
      <div style={{ marginBlock: "20px" }}>
        <StaffRateSetupAccordians />
      </div>
    </div>
  );
};

export default StaffRateSetup;
