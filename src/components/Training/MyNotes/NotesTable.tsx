import { Dropdown, Space, MenuProps, Table } from "antd";

import dots from "../../../assets/icons/dots.png";
import editIcon from "../../../assets/icons/OnBoarding/edit.svg";
import deleteIcon from "../../../assets/icons/training/delete-icon.png";
import { MyNotesTableData } from "../../../mock/TrainingData/MyNotesTableData";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import { useState } from "react";
import AddEditModal from "./AddEditModal";

type PropsType = {
  showAddModal: boolean;
  setShowAddModal: (value: boolean) => void;
};

const NotesTable = ({ showAddModal, setShowAddModal }: PropsType) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleDeleteSubmit = () => {
    setIsDeleteModal(false);
  };
  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className="dropdown-items"
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          <img src={editIcon} alt="edit" width={18} height={18} /> <p className="title">Edit</p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className="dropdown-items"
          onClick={() => {
            setIsDeleteModal(true);
          }}
        >
          <img src={deleteIcon} alt="delete" width={16} height={18} />{" "}
          <p className="title">Delete</p>
        </div>
      ),
      key: "2",
    },
  ];
  const columns: any = [
    {
      title: "Sr.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "action",
      render: () => (
        <span className="fs-12 fw-400 line-height-18 title-color">
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            overlayClassName="unpublished-dropdown"
            className="actionDropDown"
          >
            <Space>
              <div className="border-color cursor-pointer">
                <img src={dots} alt="menu" />
              </div>
            </Space>
          </Dropdown>
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
        dataSource={MyNotesTableData}
      />
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Delete"
        cancelTitle="Cancel"
        title="Do you want to delete this Note"
        onSubmit={handleDeleteSubmit}
        onCancel={handleCancelSubmit}
      />
      <AddEditModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
    </>
  );
};

export default NotesTable;
