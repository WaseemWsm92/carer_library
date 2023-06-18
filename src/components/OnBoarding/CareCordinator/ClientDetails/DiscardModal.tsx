import { Modal, Space } from "antd";
import DeleteIcon from "../../../../assets/icons/unpublishedShift/remove.png";
import { useDeleteClientsRequestMutation } from "../../../../store/Slices/OnBoarding";
// import "./style.scss";

type PropsType = {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    onSubmit?: () => void;
    onCancel?: () => void;
};

const DiscardModal = (props: PropsType) => {
    const { openModal, setOpenModal, onSubmit, onCancel } =
        props;

    return (
        <Modal
            width={500}
            centered
            className="cordinator-discard-modal"
            footer={false}
            onCancel={() => setOpenModal(false)}
            open={openModal}
        >
            <div className="modal-content" style={{ textAlign: 'center' }}>
                <img src={DeleteIcon} alt="publish icon" />
                <p className="fs-30 fw-500">Do you want to Remove this Record?</p>

                <Space direction="vertical">
                    <button className="yes-btn" onClick={onSubmit}>
                        Yes and Assign New Care Home
                    </button>
                    <button className="no-btn" onClick={onCancel}>
                        Yes, Discard
                    </button>
                </Space>


            </div>
        </Modal>
    );
};

export default DiscardModal;
