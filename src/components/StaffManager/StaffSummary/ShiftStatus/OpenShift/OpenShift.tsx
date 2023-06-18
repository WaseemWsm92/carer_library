import React, { useState } from "react";
import { Row, Col, Rate, Button, Avatar } from "antd";
import { useLocation, useParams } from "react-router-dom";
import HomeImg from "../../../../../assets/images/staffManager/home.png";
import MoreInfoModal from "./Modals/MoreInfoModal";
import DeleteModal from "../../../../../shared/DeleteModal/DeleteModal";
import RangerWrapper from "../../../../../shared/RangeWrapper/RangerWrapper";
import { useGetOpenShiftQuery } from "../../../../../store/Slices/StaffManager";
import { openShiftDetails } from "../../../../../mock/StaffManagerMock";
import "./OpenShift.scss";
import "../../../StaffSummary/StaffSummary.scss";

const OpenShift = () => {
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [isMoreInfoCards, setIsMoreInfoCards] = useState(false);
  const [isAssignShift, setIsAssignShift] = useState(false);
  const [inputValue, setInputValue] = useState(100);
  const { state: staffSummaryDetails } = useLocation();
  const handleProgressBar = (newValue: number) => {
    setInputValue(newValue);
  };
  // const { id } = useParams();
  console.log(staffSummaryDetails, "staffSummaryDetails in open shift");
  const { data: openShiftData } = useGetOpenShiftQuery({
    caredId: staffSummaryDetails?._id,
    userType: staffSummaryDetails?.userType,
  });

  return (
    <>
      <div className="open-shift-wrapper-main">
        <div className="d-flex justify-between align-center staff-manager-avtar-view-btn" style={{ flexWrap: "wrap", gap: "20px" }}>
          <div>
            <Avatar style={{ backgroundColor: "#4E132C", color: "#FFFFFF" }} size="large">
              {`${staffSummaryDetails?.fullName.charAt(0).toUpperCase()}${staffSummaryDetails?.fullName.split(" ")[1]?.charAt(0).toUpperCase()}`}
            </Avatar>
            <span className="fs-14 fw-600 line-height-17" style={{ marginLeft: "10px" }}>
              {`${staffSummaryDetails?.fullName.split(" ")[0]?.charAt(0).toUpperCase()}${staffSummaryDetails?.fullName.split(" ")[0]?.slice(1).toLowerCase()} ${staffSummaryDetails?.fullName
                .split(" ")[1]
                ?.charAt(0)
                .toUpperCase()}${staffSummaryDetails?.fullName.split(" ")[1]?.slice(1).toLowerCase()}`}
            </span>
          </div>
          {/* <div className="d-flex align-center" style={{ gap: "20px" }}>
            <p className="fs-14 fw-600 line-height-17 m-0">Work Radius: </p>
            <RangerWrapper value={inputValue} onChange={handleProgressBar} text={inputValue} />
          </div> */}
          <div>
            <button className="open-shift-btn cursor-pointer" onClick={() => setIsMoreInfoCards(true)}>
              View Available Shifts
            </button>
          </div>
        </div>
        {!isMoreInfoCards && (
          <div
            className="d-flex align-center text-center w-100"
            style={{
              height: "100%",
              minHeight: "80vh",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <p className="fs-14 fw-400 line-height-22 m-0">
              Available shifts in your work area will be listed here. You need to login and accept the shift as soon as you receive shift notification alerts. If you get an alert and find no shift
              when you log in, that means that shift is already accepted by someone else.
            </p>
          </div>
        )}

        {isMoreInfoCards && (
          <div className="open-shift-wrapper">
            <Row gutter={[20, 20]}>
              {openShiftData?.data?.map((item: any) => (
                <Col xl={6} lg={12} md={12} xs={24} sm={24}>
                  <div className="open-shift-cards-wrapper d-flex flex-column">
                    <div className="d-flex justify-around" style={{ gap: "10px" }}>
                      <div>
                        <img src={HomeImg} alt="homeIcon" />
                      </div>
                      <div>
                        <span className="fs-20 fw-500 line-height-28">{item?.careHomeName?.clientName}</span>
                        {item?.careHomeName?.clientRating?.length > 0 ? (
                          item.careHomeName.clientRating.map((data: any) => <Rate disabled defaultValue={data.average || 0} allowHalf style={{ color: "#FABF35" }} />)
                        ) : (
                          <Rate disabled defaultValue={0} allowHalf style={{ color: "#FABF35", opacity: 1.5 }} />
                        )}
                      </div>
                    </div>
                    {openShiftDetails.map((data: any) => (
                      <div className="open-shift-content d-flex align-center">
                        <img src={data.src} alt="contacts-img" />
                        <span>{data.text(item)}</span>
                      </div>
                    ))}

                    <div className="staff-cards-btn d-flex align-item-center">
                      <Button className="more-info-btn" onClick={() => setIsMoreInfo(true)}>
                        More Info
                      </Button>
                      <Button className="assign-btn" onClick={() => setIsAssignShift(true)}>
                        Assign Shift
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
      <MoreInfoModal isMoreInfo={isMoreInfo} setIsMoreInfo={setIsMoreInfo} />
      <DeleteModal
        deleteModal={isAssignShift}
        title={"Do you want assign this shift to David Williams?"}
        submitTitle={"Yes"}
        cancelTitle={"No"}
        setDeleteModal={() => setIsAssignShift(false)}
        onSubmit={() => setIsAssignShift(false)}
        onCancel={() => setIsAssignShift(false)}
      />
    </>
  );
};
export default OpenShift;