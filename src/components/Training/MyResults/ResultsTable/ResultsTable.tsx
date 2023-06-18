import { Space, Table } from "antd";

import { resultsTableData } from "../../../../mock/TrainingData/ResultsTableData";
import viewIcon from "../../../../assets/icons/training/view.png";
import DisableviewIcon from "../../../../assets/icons/training/disable-view-icon.png";
import { Link } from "react-router-dom";

const ResultsTable = () => {
  const columns: any = [
    {
      title: "Sr.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructorName",
      key: "instructorName",
    },
    {
      title: "Assessment Date",
      dataIndex: "assessmentDate",
      key: "assessmentDate",
    },
    {
      title: "Grade Achieved",
      dataIndex: "gradeAchieved",
      key: "gradeAchieved",
    },
    {
      title: "Certificate Status",
      dataIndex: "certificateStatus",
      key: "certificateStatus",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      key: "action",
      render: ({ certificateStatus, key }: any) => (
        <span className="fs-12 fw-400 line-height-18 title-color">
          <Space>
            <div className="border-color cursor-pointer">
              {certificateStatus === "Available" ? (
                <Link to={`certificate/${key}`}>
                  <img src={viewIcon} alt="viewIcon" />
                </Link>
              ) : (
                <img src={DisableviewIcon} alt="viewIcon" />
              )}
            </div>
          </Space>
        </span>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={false}
        dataSource={resultsTableData}
      />
    </>
  );
};

export default ResultsTable;
