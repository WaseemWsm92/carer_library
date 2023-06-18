import { v4 as uuidv4 } from "uuid";
import { Collapse, Row, Col } from "antd";
import { StaffRateAccordians } from "./StaffRateSetupData";
import StaffRateAccordiansBody from "./StaffRateAccordianBody/StaffRateAccordianBody";
import "./StaffRateSetup.scss";

const StaffRateSetupAccordians = () => {
  const { Panel }: any = Collapse;

  return (
    <>
      {StaffRateAccordians.map((item: any) => (
        <Collapse className="staff-rate-collapse-panel" accordion ghost={true} key={uuidv4()} style={{ marginBlock: "1rem" }}>
          <Panel
            showArrow={false}
            className="clients-panel"
            style={{
              boxShadow: "2px 6px 13px rgba(211, 211, 211, 0.43)",
              alignItem: "center",
            }}
            header={
              <Row justify="center" align="middle" gutter={12} className="accordion-header">
                <img src={item.img} alt="" className="accordianImg" />
                <Col xs={19} sm={21} lg={23}>
                  <p className="fs-16 fw-500 accordian-header-title">{item.name}</p>
                </Col>
              </Row>
            }
          >
            <div className="accordion-body">
              <StaffRateAccordiansBody accordianName={item?.name} />
            </div>
          </Panel>
        </Collapse>
      ))}
    </>
  );
};

export default StaffRateSetupAccordians;
