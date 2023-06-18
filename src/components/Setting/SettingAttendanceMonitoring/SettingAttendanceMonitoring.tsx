import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import SwitchWrapper from "../../../shared/SwitchWrapper/SwitchWrapper";
import Counter from "../SettingsStaff/ProfileMetrics/Counter/Counter";
import "./SettingAttendanceMonitoring.scss";

function SettingAttendanceMonitoring() {

    return (
        <div className="setting-attendance-monitoring border-radius-8">
            <div className="heading">
                <h1 className="fs-16 fw-500 m-0">Electronic Attendance Monitoring
                    <InfoCircleOutlined />
                </h1>
            </div>

            <div className="counting-meters">
                <Row>
                    <Col lg={8} xs={24} className="mx-30">
                        <div className="counter-plus-mins d-flex align-items-center">
                            <p className="m-0 fs-12 fw-600 from-text">Check-in Radius:</p>
                            <Counter />
                               <p className="m-0">Meters</p>
                        </div>
                     
                    </Col>
                </Row>

                <Row>
                    <Col lg={12} xs={24}>
                        <div className="d-flex align-items-center">
                        
                               <p className="m-0 fs-12 fw-600">Turn this on if you wanted to activate Electronic Attendance Monitoring ? </p>
                               <SwitchWrapper name="ActivateElectronicAttendance"/>
                        </div>
                     
                    </Col>
                </Row>

            </div>
           
                <Button className="btn-secondary">Save</Button>

        </div>

    );
}

export default SettingAttendanceMonitoring;
