import { Checkbox, Collapse } from "antd";
import { collapsData } from "../../../../../mock/TrainingData/CollapsData";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const { Panel } = Collapse;

const CourseContent = ({ setShowDocument, setVideoToPlay }: any) => {
  const RenderPanel = ({ title }: any) => {
    return <div>{title}</div>;
  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleContent = (item: any) => {
    if (item.contentType === "text") setShowDocument(true);
    else {
      setShowDocument(false);
      setVideoToPlay(item.videoLink);
    }
  };

  return (
    <div className="course-content">
      <h1 className="course-title fs-16 fw-500 m-0">
        BSL: Adults & Children Recovery Position
      </h1>
      <div className="collaps-wrapper">
        {collapsData.map((item: any, index: any) => (
          <div key={index} className="collaps-panel">
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusOutlined
                    style={{ color: "#969BA0", width: "10px", height: "10px" }}
                  />
                ) : (
                  <PlusOutlined
                    style={{ color: "#969BA0", width: "10px", height: "10px" }}
                  />
                )
              }
              className="collaps"
            >
              <Panel
                header={<RenderPanel title={item.courseTitle} />}
                key={index + 1}
              >
                {item?.courseContent.map((item: any, index: number) => (
                  <div key={index} className="panel-content">
                    <Checkbox onChange={onChange} />
                    <div
                      onClick={() => handleContent(item)}
                      className="cursor-pointer"
                    >
                      <p className="content-name m-0">
                        {index + 1}. {item.contentTitle}
                      </p>
                      <div
                        style={{ gap: "5px" }}
                        className="d-flex align-center"
                      >
                        <img src={item.icon} alt="icon" />
                        <span className="fs-12 fw-400 label-color">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Panel>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
