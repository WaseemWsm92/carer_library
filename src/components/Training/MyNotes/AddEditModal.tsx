import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";

import bookingIcon from "../../../assets/icons/training/modal-icon.png";
import InputWrapper from "../../../shared/InputWrapper/InputWrapper";

type PropsType = {
  showAddModal: boolean;
  setShowAddModal: (value: boolean) => void;
};

const AddEditModal = ({ showAddModal, setShowAddModal }: PropsType) => {
  return (
    <Modal
      centered
      width={610}
      title={<span className="fs-20 fw-600">My Notes</span>}
      footer={false}
      className="add-edit-modal"
      open={showAddModal}
      onOk={() => {
        setShowAddModal(false);
      }}
      onCancel={() => {
        setShowAddModal(false);
      }}
    >
      <div className="date-wrapper">
        <img src={bookingIcon} alt="" />
        <p className="date fs-14">20-02-2022</p>
      </div>
      <Form layout="vertical">
        <Row gutter={[0,20]} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Col xs={24}>
            <InputWrapper
              label="Title"
              name="noteTitle"
              placeHolder="Type here"
              onChange={(e: any) => console.log(e.target.value)}
            />
          </Col>
          <Col xs={24} md={24}>
            <Row>
              <Col xs={24} md={24}>
                <Form.Item>
                  <Input.TextArea
                    rows={4}
                    placeholder="Type here"
                    style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} className="btn-wrapper">
            <Button className="cancel-btn fs-16 fw-600" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button className="add-btn fs-16 fw-600" onClick={() => setShowAddModal(false)}>
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddEditModal;
