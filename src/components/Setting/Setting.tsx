
import { Col, Row} from 'antd';
import { Link } from 'react-router-dom';
import "./Setting.scss";
import "../../sass/common.scss";
import {getSettingCard } from '../../mock/SettingCard';



const Setting = () => {
    const { role }: any = JSON.parse(
        localStorage.getItem("careUserData") || "{}"
      );
    return (
        <>
            <div className='setting-main'>
                <Row gutter={16}>
                    {getSettingCard(role).map((item) => {
                        return (

                            <Col className="gutter-row" lg={6} md={12} xs={24}>
                                <Link to={item.path} className={`${item.cardClass} setting-card fw-500 fs-16 d-flex `} style={{ borderLeft: `10px solid ${item.borderColor}` }}>{item.name}</Link>
                            </Col>

                        );
                    })}

                </Row>


            </div>

        </>


    )
}

export default Setting