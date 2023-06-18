import { Table } from "antd";
import { totalHoursTableData } from "../../../../mock/StaffManagerMock";
import { ColumnsType } from "antd/es/table";
import "./WorkHistoryTable.scss";
import dayjs from "dayjs";

const WorkHistoryTable = (props: any) => {
  const { data } = props;

  const columns: ColumnsType<any> = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (_: any, text: any, index: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{index < 10 ? `0${index + 1}` : index + 1}</span>,
    },
    {
      title: "Shift Name",
      dataIndex: "shiftName",
      key: "shiftName",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text.shift?.shiftType}</span>,
    },
    {
      title: "Client Name ",
      dataIndex: "clientName",
      key: "clientName",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text.careHome?.clientName}</span>,
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{dayjs(text.shift?.shiftDate).format("MM/DD/YYYY")}</span>,
    },
    {
      title: "Shift Hours ",
      dataIndex: "perHour",
      key: "perHour",
    },
    {
      title: "Shift Rate ( £ ) ",
      dataIndex: "shiftRate",
      key: "shiftRate",
    },
    {
      title: "Shift Amount ",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Invoice Number ",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Shift Status ",
      dataIndex: "shiftStatus",
      key: "shiftStatus",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text.shift?.shiftStatus}</span>,
    },
    {
      title: "Payment Status ",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Payment Date ",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
  ];

  return (
    <div className="work-history-table">
      <Table columns={columns} dataSource={data} pagination={false} className="total-table-content" scroll={{ x: "max-content" }} />
    </div>
  );
};
export default WorkHistoryTable;
