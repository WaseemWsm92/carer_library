import { Col, Row,Tooltip } from 'antd'
import { Form} from 'antd';
import "./ClientManagerForm.scss"
import infoIcon from "../../../../assets/icons/info-icon.svg"
import TextArea from 'antd/es/input/TextArea';
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { usePostClientProfileInfoMutation } from '../../../../store/Slices/ClientManager';
import { useLocation } from 'react-router-dom';
import AppSnackbar from '../../../../utils/AppSnackbar';

const ClientPublicInformationForm = (props: any) => {

  const [postClientProfileInfo] = usePostClientProfileInfoMutation();
  const { state }: any = useLocation()

      const onFinish = (values: any) => {
          let userId = state?.editProfile?._id;
          postClientProfileInfo({ userId, payload:values });
              AppSnackbar({ type: "success", messageHeading: "Success!", message: "Profile comment edited Successfully" });
            let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
            setTimeout( stepperChange , 1000);
      };
    const payLoadInitialData = {
      publicInfo: state?.editProfile?.publicInfo,
    }

    return (
        <div className='client-manager-information-form-wrapper'>
            <div className='form-heading heading-flex'>Client Public Information
                <Tooltip
                    placement="bottomLeft"
                    autoAdjustOverflow={true}
                    showArrow={false}
                    color="#65CDF0"
                    overlayInnerStyle={{
                        backgroundColor: "#65CDF0",
                        color: "#ffffff",
                        width: "499px",
                    }}
                    title='Up to 265 characters of text can be entered here which is visible to staff mobile apps when shifts are posted through the apps.'
                >
                    <img src={infoIcon} alt="infoIcon" />
                </Tooltip>

            </div>
            <Form
                name="basic"
                initialValues={payLoadInitialData}
                onFinish={onFinish}
                layout="vertical"
            >
                <Row gutter={[30, 5]} align="bottom">
                    <Col span={20}>
                        <Form.Item
                            label="Enter information here"
                            name="publicInfo"
                            rules={[{ required: false, message: 'Required field' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>

                <FormLowerButtons/>

            </Form>



        </div>
    )
}

export default ClientPublicInformationForm