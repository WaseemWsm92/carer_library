// import "../../../../sass/common.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Row, Col, Tooltip, Button, Spin } from "antd";
import "./ProfileMetrics.scss";
import { ProfileMetricsData } from "../../../../mock/ProfileMetricsSetting"
import Counter from "./Counter/Counter";
import { useGetProfileMetricsQuery } from "../../../../store/Slices/Setting/StaffSettings/ProfileMetrics";


function ProfileMetrics(props: any) {
  const { rowData } = props;
  const { data, isLoading, isSuccess, isError } = useGetProfileMetricsQuery({ refetchOnMountOrArgChange: true });

  let stafMetricsData: any;
  if (isLoading) {
    stafMetricsData = <p>Loading...</p>
  }
  else if (isSuccess) {
    stafMetricsData = data
  }
  else if (isError) {
    stafMetricsData = <p>Error...</p>
  }


  // console.log("stafMetricsData===========", stafMetricsData?.data);

  // filter main array with selected item in Registration Configuration
  const newArray = rowData.filter((value: any) => {
    return ProfileMetricsData.some(obj => obj.profilemetricslist === value);
  });

  // console.log(newArray);
  //useGetProfileMetricsQuery

  const handleProfileMetrics = () => {
    console.log("Profile Metrics Submitted");
    
  }




  return (
    <div className='profile-metrics'>
      <div className="heading">

        <h1 className="fs-16 fw-600 m-0">Profile % required for activation
          <Tooltip placement="bottomLeft"
            color="#65CDF0"
            overlayInnerStyle={{
              width: "499px",
            }}
            title="This relates to the minimum percentage of candidate profile (in the registration form) required to activate them. Even if the profile percentage is less, you have the ability to force activate them from their ‘Activation & Settings’ menu.">
            <InfoCircleOutlined />
          </Tooltip>

        </h1>
        <input type="text" placeholder="Type here" />
        <h1 className="fs-20 fw-500 m-0">Profile Metrics
          <Tooltip placement="bottomLeft"
            color="#65CDF0"
            overlayInnerStyle={{
              width: "499px",
            }}
            title="This relates to the minimum percentage of candidate profile (in the registration form) required to activate them. Even if the profile percentage is less, you have the ability to force activate them from their ‘Activation & Settings’ menu.">
            <InfoCircleOutlined />
          </Tooltip>

        </h1>
      </div>
      {(isLoading && !isError) ? (
        <Spin size="large" style={{ width: "100%", margin: "auto" }} />
      ) : (
        <div className="profile-metrics">
          <Row className="counter-plus-mins align-items-center">
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Personal Info</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.personalInfo} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Address Details</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.addressDetail} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Photo for ID Badge</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.photoForIdBadge} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">ID Upload (Passport/DL)</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.IdUpload} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Add Reference</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.addReference} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Certificate Status</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.certificateStatus} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Additional Training Details</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.additionalTrainingDetail} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Work Experience</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.workExperiance} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Regulatory Registration</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.regulatoryRegistration} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Right to Work</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.rightToWork} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Next of Kin</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.nextOfKin} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Contact Preference</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.contactPreference} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Employment Status</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.employeeStatus} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Equal Opportunity Declaration</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.equalOpportunityDeclaration} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Immunisation</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.Immunisation} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Row style={{ marginBottom: "25px" }} className="align-items-center">
                <Col lg={12} md={12} xs={24}>
                  <div className="profile-metrics-counter d-flex align-items-center">
                    <p className="m-0 fs-16 fw-500">Medical Questionnaire</p>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                  <Counter countValue={stafMetricsData?.data?.medicalQuestionnaire} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                </Col>
              </Row>
            </Col>
          </Row>

          {stafMetricsData?.data && <Button className="save-btn" onClick={handleProfileMetrics}> Save</Button>}
        </div>
      )}

    </div>

  );
}

export default ProfileMetrics;
