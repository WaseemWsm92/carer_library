import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { Collapse, Row, Col, Progress } from "antd";
import ClientRateSetupTable from "./ClientRateSetupTable";
import { ClientSetupAccordians } from "./ClientSetupData";
import "./ClientRateSetup.scss";

const ClientsRateSetupAccordians = () => {
  const { Panel }: any = Collapse;

  return (
    <Fragment>
      {ClientSetupAccordians.map((item: any) => (
        <Collapse
          className="client-collapse-panel"
          key={uuidv4()}
          accordion
          ghost={true}
          expandIconPosition="end"
          style={{ marginBlock: "1.5rem" }}
          expandIcon={({ isActive }) => {
            return (
              !isActive && (
                <Progress
                  type="circle"
                  style={{ marginTop: ".5rem" }}
                  className="fs-12 fw-600 m-auto text-center"
                  size={39}
                  format={(percent: any) => <span style={{ fontSize: "14px" }}>{`${percent}%`}</span>}
                  strokeWidth={5}
                  trailColor="#D9DBE9"
                  percent={25}
                  strokeColor={"#52C41A"}
                />
              )
            );
          }}
        >
          <Panel
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
              <ClientRateSetupTable />
            </div>
          </Panel>
        </Collapse>
      ))}
    </Fragment>
  );
};

export default ClientsRateSetupAccordians;
