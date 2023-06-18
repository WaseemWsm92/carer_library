import { Col, Row } from "antd";
import ShiftCards from "./ClientDashBoardWidgets/ShiftCards/ShiftCards";
import "./ClientDashboard.scss";
import { ClientCardData } from "../../mock/ClientDashboardData";
import CarersGraph from "./ClientDashBoardWidgets/CarersGraph/CarersGraph";
import RecentReviews from "./ClientDashBoardWidgets/RecentReviews/RecentReviews";
import ClientCalendar from "./ClientDashBoardWidgets/ClientCalendar/ClientCalendar";
// import CarerBookingCalendar from './CarerBookingCalendar/CarerBookingCalendar';
import OverAllRating from "./ClientDashBoardWidgets/OverAllRating/OverAllRating";
import { useGetCarersPerMonthQuery, useGetLastShiftDetailsQuery, useGetOverAllRatingQuery, useGetOverAllReviewsQuery, useGetShiftsListQuery } from "../../store/Slices/ClientDashboard";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();
  const { data: upcomingShiftsList, isLoading: upcomingIsLoading } = useGetShiftsListQuery("BOOKED");
  const { data: availableShiftsList, isLoading: availableIsLoading } = useGetShiftsListQuery("PUBLISHED");
  const { data: cancelledShiftsList, isLoading: cancelledIsLoading } = useGetShiftsListQuery("CANCELED");
  const { data: lastShiftDetailsList, isLoading: lastShiftIsLoading } = useGetLastShiftDetailsQuery({});
  const { data: overAllRatingData, isLoading: overallRatingIsLoading } = useGetOverAllRatingQuery({});
  const { data: recentReviewsData, isLoading: recentReviewsIsLoading } = useGetOverAllReviewsQuery({});
  const { data: carersPerMonthData, isLoading: carerGraphIsLoading } = useGetCarersPerMonthQuery(currentYear);


  const upComingList = upcomingShiftsList?.data?.shifts?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.carerType?.name} - ${list?.carerType?.shortForm}`,
      shiftDate: list?.shiftDate,
      shiftType: list?.shiftType,
      shiftRate: list?.shiftRate ? list?.shiftRate : "",
    };
  });

  const availableList = availableShiftsList?.data?.shifts?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.carerType?.name} - ${list?.carerType?.shortForm}`,
      shiftDate: list?.shiftDate,
      shiftType: list?.shiftType,
      shiftRate: list?.shiftRate ? list?.shiftRate : "",
    };
  });

  const lastShiftDetails = lastShiftDetailsList?.data?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.shiftData?.client?.clientName} - ${list?.shiftData?.client?.group}`,
      shiftDate: list?.shiftData?.shiftDate,
      shiftType: list?.shiftData?.shiftType,
      shiftRate: list?.shiftRate ? `£ ${list?.shiftRate}` : "",
      timeTracked: list?.timeTrack,
    };
  });

  const cancelledList = cancelledShiftsList?.data?.shifts?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.carerType?.name} - ${list?.carerType?.shortForm}`,
      shiftDate: list?.shiftDate,
      shiftType: list?.shiftType,
      shiftRate: list?.shiftRate ? list?.shiftRate : "",
    };
  });

  return (
    <>
      <div className="client-dashboard-wrapper">
        <Row gutter={[20, 20]}>
          <Col xl={24} lg={24} md={24}>
            <Row gutter={[20, 20]}>
              <Col className="client-shift-cards-wrap" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <ShiftCards
                  title={"Upcoming Shifts"}
                  buttonName={"More Details"}
                  btnFunc={() => {
                    navigate("/client-requested-shift");
                  }}
                  details={upComingList}
                  isLoading={upcomingIsLoading}
                />
              </Col>
              <Col className="client-shift-cards-wrap" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <ShiftCards
                  title={"Available Shifts"}
                  buttonName={"More Details"}
                  btnFunc={() => {
                    navigate("/client-requested-shift");
                  }}
                  details={availableList}
                  isLoading={availableIsLoading}
                />
              </Col>
              <Col className="client-shift-cards-wrap" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <ShiftCards title={"Last Shift Details"} checkStatus details={lastShiftDetails} isLoading={lastShiftIsLoading} />
              </Col>
              <Col className="client-shift-cards-wrap" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <ShiftCards
                  title={"Cancelled Shifts"}
                  buttonName={"Book Again"}
                  btnFunc={() => {
                    navigate("/client-booking-calendar");
                  }}
                  details={cancelledList}
                  isLoading={cancelledIsLoading}
                />
              </Col>
            </Row>
          </Col>
          <Col xxl={12} xl={18} lg={12} md={12} sm={12} xs={24}>
            <CarersGraph carersGraphData={carersPerMonthData?.data?.carersPerMonths} isLoading={carerGraphIsLoading} />
          </Col>
          <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
            <OverAllRating data={overAllRatingData} isLoading={overallRatingIsLoading} />
          </Col>
          <Col xxl={6} xl={6} lg={24} md={24} sm={24} xs={24}>
            <RecentReviews recentReviewsData={recentReviewsData} isLoading={recentReviewsIsLoading} />
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <ClientCalendar />
            {/* <CarerBookingCalendar /> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClientDashboard;
