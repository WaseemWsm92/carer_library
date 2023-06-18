import { Input, Select } from "antd";
import DownArrow from '../../../../../assets/icons/finance-setup/down-arrow.png'
import "./StaffRateAccordianBody.scss";

const StaffInputWrapper = ({ className, title, isSelect, options, placeholder }: any) => {
  return (
    <div>
      {title && (
        <p className="fw-600" style={{ paddingLeft: ".5rem" }}>
          {title}
        </p>
      )}
      {isSelect ? (
        <Select 
          options={options}
          suffixIcon={<img src={DownArrow} alt="select-arrow"/>}
          className={`staff-select ${className}`}
          style={{ borderRadius: "0px", width: "100%", marginBottom: "1rem" }}
          placeholder={<span style={{color:'#A0A3BD'}}>{placeholder}</span>}
        />
      ) : (
        <Input type="number" style={{ borderRadius: "0", height: "47px", width: "268px",border:'1px solid #D9DBE9' }} />
      )}
    </div>
  );
};
export default StaffInputWrapper;
