import { Table } from "antd";
import { ClientRateSetupTableData } from "../../../../mock/FinanceSetupData";
import "./ClientRateSetupTable.scss";

const columns = [
  {
    title: () => (
      <>
        <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
          Staff Category
        </p>
      </>
    ),
    dataIndex: "staffCategory",
    key: "staffCategory",
    render: (_: any, text: any) => (
      <input
        value={text.staffCategory}
        style={{
          paddingLeft: "10px",
          border: "1px solid #D9DBE9",
          color: "#4E4B66",
          width: "268px",
          borderLeft: "5px solid #65CDF0",
          height: "47px",
        }}
        className="staff-category-input fs-16 fw-500"
      />
    ),
  },
  {
    title: () => (
      <>
        <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
          Week Day
        </p>
        <span className="fs-14 fw-400" style={{ color: "#6E7191" }}>
          (Rate per hour)
        </span>
      </>
    ),
    dataIndex: "weekDay",
    key: "weekDay",
    render: (_: any, text: any) => (
      <input
        className="fs-16 fw-500"
        value={text.weekDay}
        style={{ paddingLeft: "10px", color: "#212529", border: "1px solid #D9DBE9", borderLeftColor: "#D9DBE9", width: "268px", height: "47px" }}
      />
    ),
  },
  {
    title: () => (
      <>
        <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
          Saturday
        </p>
        <span className="fs-14 fw-400" style={{ color: "#6E7191" }}>
          (Rate per hour)
        </span>
      </>
    ),
    dataIndex: "saturday",
    key: "saturday",
    render: (_: any, text: any) => (
      <input
        className="fs-16 fw-500"
        value={text.saturday}
        style={{ paddingLeft: "10px", color: "#212529", border: "1px solid #D9DBE9", borderLeftColor: "#D9DBE9", width: "268px", height: "47px" }}
      />
    ),
  },
  {
    title: () => (
      <>
        <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
          Sunday
        </p>
        <span className="fs-14 fw-400" style={{ color: "#6E7191" }}>
          (Rate per hour)
        </span>
      </>
    ),
    dataIndex: "sunday",
    key: "sunday",
    render: (_: any, text: any) => (
      <input
        className="fs-16 fw-500"
        value={text.sunday}
        style={{ paddingLeft: "10px", color: "#212529", border: "1px solid #D9DBE9", borderLeftColor: "#D9DBE9", width: "268px", height: "47px" }}
      />
    ),
  },
  {
    title: () => (
      <>
        <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
          Bank Holiday
        </p>
        <span className="fs-14 fw-400" style={{ color: "#6E7191" }}>
          (Rate per hour)
        </span>
      </>
    ),
    dataIndex: "bankHoliday",
    key: "bankHoliday",
    render: (_: any, text: any) => (
      <input
        className="fs-16 fw-500"
        value={text.bankHoliday}
        style={{ paddingLeft: "10px", color: "#212529", border: "1px solid #D9DBE9", borderLeftColor: "#D9DBE9", width: "268px", height: "47px" }}
      />
    ),
  },
];
const ClientRateSetupTable = () => {
  return (
    <Table
      columns={columns}
      className="client-rate-wrapper-table"
      dataSource={ClientRateSetupTableData}
      scroll={{ x: "max-content" }}
      tableLayout="fixed"
      pagination={false}
    />
  );
};

export default ClientRateSetupTable;
