import { Col, Divider, Row, Select } from "antd";
import requestedIcon from "../../assets/images/manageShift/requestedIcon.png";
import bookedIcon from "../../assets/icons/ShiftManger/booked-icon.png";
import { RightOutlined } from "@ant-design/icons";
import "./ShiftManager.scss";
import { useNavigate } from "react-router-dom";
import { useShiftsBookingStatusQuery } from "../../store/Slices/ShiftManager";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const ShiftManager = () => {
  const navigate = useNavigate();

  const {data,isError}:any = useShiftsBookingStatusQuery({})

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Manage Shift",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="manager-shift-wrapper bg-white">
        <div className="manager-shift-heading">
          <h2 className="fs-20 fw-600 m-0">7 Days Shift Booking Status</h2>
          <p className="fs-14 fw-400 line-height-22 m-0">
            This Section gives you an overview of client Shift status for the next 7 days. You can
            click on individual client names to view their Shift history, confirmed shifts,
            completed shifts and even the allocated staff for each client.
          </p>
        </div>
        <Row gutter={[30, 30]} className="manager-card-wrap">
          {!isError && data?.data.map((item: any) => (
            <Col xs={24} sm={12} md={12} xl={8} xxl={6} key={item._id}>
              <div className="manager-shift-card-content bg-white w-100">
                <div className="manager-shift-card-select d-flex">
                  <Select
                    labelInValue
                    style={{ width: "100%", maxWidth: "100px" }}
                    defaultValue={{ value: "Days", label: "Days" }}
                    // options={}
                  />
                </div>
                <h2 className="fs-20 m-0 fw-500 line-height-28">{item?.careHome?.clientName || 'Barking Hall'}</h2>
                <div
                  className="manage-shift-details d-flex align-center justify-between"
                  style={{ flexWrap: "wrap", gap: "10px" }}
                >
                  <div
                    className="d-flex align-center manage-shift-details-inner"
                    style={{ gap: "10px" }}
                  >
                    <div className="manage-info-img d-flex align-center justify-center">
                      <img src={requestedIcon} alt="" />
                    </div>
                    <div className="manage-shift-info">
                      <span className="fs-12 fw-400 m-0 line-height-20">Requested</span>
                      <h2 className="fw-500 m-0">{item?.requested}</h2>
                    </div>
                  </div>
                  <Divider type="vertical" style={{ height: "2.5rem" }} className="divider" />
                  <div className="d-flex align-center" style={{ gap: "10px" }}>
                    <div
                      className="manage-info-img d-flex align-center justify-center"
                      style={{ backgroundColor: "rgba(82, 196, 26, 0.25)" }}
                    >
                      <img src={bookedIcon} alt="" />
                    </div>
                    <div className="manage-shift-info">
                      <span className="fs-12 fw-400 m-0 line-height-20">Booked</span>
                      <h2 className="fw-500 m-0">{item?.booked}</h2>
                    </div>
                  </div>
                </div>
                <div className="manage-shift-btn d-flex align-center">
                  <p
                    className="fs-14 fw-500 line-height-18 cursor-pointer"
                    onClick={() => navigate(`/shift-manager/${item?._id}`,{state:{careHome:item?.careHome?.clientName}})}
                  >
                    View Details <RightOutlined style={{ fontSize: "10px" }} />
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ShiftManager;
