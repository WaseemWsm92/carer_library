// Ant Components
import { Card, Col, Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import CommonReportChildFilters from "../Reports/CommonReportChildFilters/CommonReportChildFilters";
import { Link } from "react-router-dom";
import "../../sass/common.scss";
import { apiInventoryFilters, ApiInventoryTableMockData } from "../../mock/ApiInventory";
import ApiInventoryTable from "./ApiInventoryTable";
import { useGetApisListQuery } from "../../store/Slices/ApiInventory";

const ApiInventory = () => {
  return (
    <div className="reports-child-wrapper-class">
      <Row gutter={[20, 20]}>
        {/* <Col xs={24}>
          <Card className='border-radius-8' style={{ boxShadow: "0px 12px 23px rgba(62, 73, 84, 0.04)", border: "1px solid #D9DBE9" }}>
            <CommonReportChildFilters filtersArray={apiInventoryFilters} />
          </Card>
        </Col> */}
        <Col xs={24}>
          <ApiInventoryTable />
        </Col>
      </Row>
    </div>
  );
};

export default ApiInventory;
