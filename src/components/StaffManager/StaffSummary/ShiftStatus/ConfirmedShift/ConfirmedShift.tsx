import { Row, Col, Button, Rate } from "antd";
import { useState } from "react";
import { confirmedShiftData, confirmedShiftDetails } from "../../../../../mock/StaffManagerMock";
import HomeImg from "../../../../../assets/images/staffManager/home.png";
import DeleteModal from "../../../../../shared/DeleteModal/DeleteModal";
import { useGetConfirmedShiftQuery } from "../../../../../store/Slices/StaffManager";
import { useLocation } from "react-router-dom";
import "./ConfirmedShift.scss";

const ConfirmedShift = () => {
  const { state: staffSummaryDetails } = useLocation();
  const { data: confirmedShiftData } = useGetConfirmedShiftQuery({
    staffId: staffSummaryDetails?._id,
  });
  // console.log(confirmedShiftData, "confirmedShiftData");
  const [isCancelShift, setIsCancelShift] = useState(false);
  return (
    <>
      <div className="confirmed-shift-wrapper-main">
        <div className="open-shift-wrapper">
          <Row gutter={[20, 20]}>
            {confirmedShiftData?.data?.shifts.map((item: any) => (
              <Col xl={6} lg={12} md={12} xs={24} sm={24}>
                <div className="open-shift-cards-wrapper d-flex flex-column">
                  <div className="d-flex justify-around" style={{ gap: "10px" }}>
                    <div>
                      <img src={HomeImg} alt="homeIcon" />
                    </div>
                    <div>
                      <h2 className="fs-16 fw-500 m-0 form-heading-color">{`${item?.careHome?.clientName}`}</h2>
                      {item?.careHomeName?.clientRating?.length > 0 ? (
                        item.careHomeName.clientRating.map((data: any) => <Rate disabled defaultValue={data.average || 0} allowHalf style={{ color: "#FABF35" }} />)
                      ) : (
                        <Rate disabled defaultValue={0} allowHalf style={{ color: "#FABF35", opacity: 1.5 }} />
                      )}
                    </div>
                  </div>
                  {confirmedShiftDetails.map((data: any) => (
                    <div className="open-shift-content d-flex align-center">
                      <img src={data.src} alt="contacts-img" />
                      <span>{data.text(item)}</span>
                    </div>
                  ))}

                  <div className="staff-cards-btn d-flex align-item-center">
                    <Button className="assign-btn" onClick={() => setIsCancelShift(true)}>
                      Cancel Shift
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <DeleteModal
        deleteModal={isCancelShift}
        title={"Are you sure you want to cancel this shift?"}
        submitTitle={"Cancel"}
        cancelTitle={"Yes, Discard"}
        setDeleteModal={() => setIsCancelShift(false)}
        onSubmit={() => setIsCancelShift(false)}
        onCancel={() => setIsCancelShift(false)}
      />
    </>
  );
};
export default ConfirmedShift;
