import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Close from '../../../assets/images/OnBoarding/Close.svg';
interface Props {
    isShowMailModalOpen: any;
    setIsShowMailModalOpen: any
}
const MessageMailModal = (props: Props) => {
    const { isShowMailModalOpen, setIsShowMailModalOpen } = props;
    const handleOk = () => {
        setIsShowMailModalOpen(false);
    };

    const handleCancel = () => {
        setIsShowMailModalOpen(false);
    };

    return (
        <>
            <Modal centered className='mailModal' title={false} open={isShowMailModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
                <Button className='send-btn' key="submit" type="primary" onClick={handleOk}>
                    Send Email
                </Button>
            ]} closeIcon={<img src={Close} alt="" />}>
                <div className="content">
                    <Input placeholder="david@email.com" bordered={false} />
                    <Form.Item label="Subject">
                        <Input bordered={false} style={{paddingTop:'5px'}} />
                    </Form.Item>
                    <TextArea rows={10} bordered={false} placeholder='Write something here ...' />
                </div>
            </Modal>
        </>
    );
};

export default MessageMailModal;