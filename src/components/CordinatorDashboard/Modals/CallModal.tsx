import { Modal } from 'antd';
import { v4 as uuidv4 } from "uuid";
import User from "../../../assets/images/MockImages/user-lg-1.png";
import Mobile from "../../../assets/images/CordinatorDashboard/mobile.png";
import Pickup from "../../../assets/images/CordinatorDashboard/pickup.png";
import "./DashboardModal.scss";
interface Props {
    isShowCallModalOpen: any;
    setIsShowCallModalOpen: any
}
const CallModal = (props: Props) => {
    const { isShowCallModalOpen, setIsShowCallModalOpen } = props;

    const handleOk = () => {
        setIsShowCallModalOpen(false);
    };

    const handleCancel = () => {
        setIsShowCallModalOpen(false);
    };
    const callModalData = [
        { title: 'Redmi Note 10', img: Mobile },
        { title: 'Pick an app', img: Pickup }
    ]
    return (
        <>
            <Modal className='callModal' footer={false} title={<div className='empty-div'>
                <img src={User} alt='userImg' width={70} />
            </div>} open={isShowCallModalOpen} onOk={handleOk} onCancel={handleCancel} width={190}>
                <div className="card-body">
                    <h3 className='fs-16 fw-500 title-color'>Make a Call from</h3>
                    {callModalData.map((item: any) => (
                        <div className="d-flex" key={uuidv4()}>
                            <img src={item.img} alt={item.title} width={15} height={20} />
                            <span className='title-color fs-14'>{item.title}</span>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default CallModal;