import { Modal, Table, Input, Button, Row, Col } from "antd";
import { allocateStaffData } from "../../../../mock/StaffManagerMock";
import searchIcon from "../../../../assets/icons/search.svg";
import CloseIcon from "../../../../assets/icons/close-icon.svg";
import CrossImg from "../../../../assets/images/staffManager/crossImg.png";
import { useState } from "react";
import { useGetAllClientListQuery, useGetStaffViewCarerQuery, useStaffAllocateCarersMutation, useStaffDeleteAllocateMutation } from "../../../../store/Slices/StaffManager";
import AddClientSelect from "../../../Finance/Setup/ClientRateSetup/AddClientRateModal/ClientNameSelect";
import DeleteModal from "../../../../shared/DeleteModal/DeleteModal";
import "./AllocateStaffModal.scss";

const AllocateStaffModal = (props: any) => {
  const { allocateStaff, setAllocateStaff, staffId } = props;
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const { data: allocatedStaff } = useGetAllClientListQuery({});
  const [clientsCheckedList, setClientsCheckedList] = useState<any>();
  const [createAllocateStaff] = useStaffAllocateCarersMutation();
  const { data: getStaffViewCarer, isLoading: getStaffLoading } = useGetStaffViewCarerQuery({});
  console.log(getStaffViewCarer, "getStaffViewCarer");

  const [deleteProfile] = useStaffDeleteAllocateMutation();

  const clientsListOptions = allocatedStaff?.data?.map((userTypeDetails: any) => {
    return { value: userTypeDetails?._id, label: userTypeDetails?.clientName };
  });
  console.log(clientsCheckedList, "clientsCheckedList");

  const handleAllocateStaff = () => {
    createAllocateStaff({ clientId: clientsCheckedList, staffId: [staffId] });
  };

  const handleDeleteModalSubmit = async () => {
    setDeleteModal(false);
    deleteProfile({ id: staffId?._id });
  };

  const columns = [
    {
      title: "Sr #",
      dataIndex: "sr",
      key: "sr",
    },
    {
      title: "Care Home",
      dataIndex: "carerName",
      key: "carerName",
    },
    {
      title: "Allocated ON",
      dataIndex: "allocatedOn",
      key: "allocatedOn",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text: any) => (
        <div onClick={() => setDeleteModal(true)}>
          <img src={CrossImg} alt="" />
        </div>
      ),
    },
  ];
  console.log(clientsCheckedList);

  return (
    <>
      <Modal
        title="Allocate Carer to Care Home"
        centered
        open={allocateStaff}
        footer={false}
        width={1180}
        wrapClassName="allocate-carer-modal"
        onCancel={() => setAllocateStaff(false)}
        className="allocate-staff-modal-wrapper"
        closeIcon={<img src={CloseIcon} alt="" />}
      >
        <div className="overlay-wrapper-modal-content">
          <div className="allocate-staff-modal-wrapper">
            <div>
              <label className="fs-14 fw-600">Select Care Home</label>
              <div style={{ marginTop: "15px" }}>
                <AddClientSelect options={clientsListOptions} checkedList={clientsCheckedList} setCheckedList={setClientsCheckedList} />
              </div>
            </div>
            <div className="bottom-buttons">
              <Button type="primary" className="inner-bottom-btn bg-orange-color">
                Cancel
              </Button>
              <Button type="primary" className="inner-bottom-btn btn-secondary" onClick={handleAllocateStaff}>
                Allocate
              </Button>
            </div>
          </div>
        </div>

        <Row className="total-staff-count-main d-flex align-center justify-end" style={{ paddingTop: "20px", marginInline: "1.5rem" }}>
          <Col lg={10} md={10} xs={24} sm={24}>
            <Input className="search-input" placeholder="Search" prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} />} />
          </Col>
        </Row>
        <div className="allocate-staff-table">
          <Table dataSource={getStaffViewCarer?.data?.result} columns={columns} loading={getStaffLoading} pagination={false} scroll={{ x: "max-content" }} />
        </div>
      </Modal>

      <DeleteModal
        deleteModal={deleteModal}
        title={"Are you sure you want to Delete this ?"}
        submitTitle={"Yes, Delete"}
        cancelTitle={"Cancel"}
        setDeleteModal={() => setDeleteModal(false)}
        onSubmit={handleDeleteModalSubmit}
        onCancel={() => setDeleteModal(false)}
      />
    </>
  );
};
export default AllocateStaffModal;