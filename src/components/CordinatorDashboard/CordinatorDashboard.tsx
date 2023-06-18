import { Button, Card, Col, Divider, Row } from "antd";
import ShiftRequestedGraph from "./ShiftRequestedGraph";
import CarerStatusGraph from "./CarerStatusGraph";
import ShiftInsightTabs from "./ShiftInsightTabs";
import TopRatedCarers from "./TopRatedCarers";
import { useNavigate } from "react-router-dom";
import CarerBookingCalendar from "./CarerBookingCalendar/CarerBookingCalendar";
import { useGetCoordinatorShiftBookingQuery, useGetCoordinatorShiftQuery } from "../../store/Slices/CoordinatorDashboard";
import CustomCarousel from "./CustomCarousel/CustomCarousel";
import "./CordinatorDashboard.scss";

const CordinatorDashboardPage = () => {
  const navigate = useNavigate();


  const { data, isLoading, isSuccess, isError } = useGetCoordinatorShiftBookingQuery({ refetchOnMountOrArgChange: true });
  const { data: shiftsData, isLoading: isShiftsDataLoading, isSuccess: isShiftsDataSuccess, isError: isShiftsDataError } = useGetCoordinatorShiftQuery({ refetchOnMountOrArgChange: true });


  let coordinatorShiftBookingData: any;

  if (isLoading) {
    coordinatorShiftBookingData = <p>Loading...</p>
  }
  
  else if (isSuccess) {
    coordinatorShiftBookingData = data;
  }
  else if (isError) {
    coordinatorShiftBookingData = <p>Error...</p>
  }

  let coordinatorShiftData: any;

  if (isShiftsDataLoading) {
    coordinatorShiftData = <p>Loading...</p>
  }
  else if (isShiftsDataSuccess) {
    coordinatorShiftData = shiftsData;
  }

  else if (isShiftsDataError) {
    coordinatorShiftData = <p>Error...</p>
  }
    

  return (
    <div className="cordinator-dashboard">
      <Row gutter={[25, 25]}>
        <Col xs={24} xl={18}>
          <Row gutter={[25, 25]}>        

            <Col xs={24} md={12} xl={8} style={{ height: "100%" }}>
              <Card className="detailed-card">
                <Button
                  className="btn fs-20 fw-500 line-height-28 cursor-pointer d-flex align-center"
                  style={{ backgroundColor: "#65CDF0" }}
                  onClick={() => navigate("/shift-manager")}
                  type="primary"
                >
                  <span style={{ marginTop: '2px' }}>Shift Requests</span>
                </Button>
                {/* {!isShiftsDataLoading && ( */}
                  <CustomCarousel isShiftsDataLoading={isShiftsDataLoading} items={coordinatorShiftData?.data?.shifts?.map((item: any) => item)} type="shift_request" />
                {/* )} */}
              </Card>
            </Col>

            <Col xs={24} md={12} xl={8}>
              <Card className="detailed-card">
                <Button
                  className="btn fs-20 fw-500 line-height-28 cursor-pointer d-flex align-center"
                  style={{ backgroundColor: "#EE2E7E" }}
                  onClick={() => navigate("/shift-manager")}
                  type="primary"
                >
                  <span style={{ marginTop: '2px' }}>Shift Bookings</span>
                </Button>
                {/* {!isLoading && ( */}
                <CustomCarousel isShiftsDataLoading={isShiftsDataLoading} items={coordinatorShiftBookingData?.data?.map((item: any) => item)} type="shift_booking" />
                {/* )} */}
              </Card>
            </Col>

            <Col xs={24} md={12} xl={8}>
              <Card className="detailed-card">
                <Button
                  className="btn fs-20 fw-500 line-height-28 cursor-pointer d-flex align-center"
                  style={{ backgroundColor: "#4E132C" }}
                  onClick={() => navigate("/shift-manager")}
                  type="primary"
                >
                  <span style={{ marginTop: '2px' }}>Whistle Blowing</span>
                </Button>
                {/* {!isLoading && ( */}
                  <CustomCarousel isShiftsDataLoading={isShiftsDataLoading} items={coordinatorShiftBookingData?.data?.map((item: any) => item)} type="whistle_blowing" />
                {/* )} */}
              </Card>
            </Col>

            <Col xs={24} md={12} xl={16}>
              <ShiftRequestedGraph />
            </Col>
            <Col xs={24} md={12} xl={8}>
              <CarerStatusGraph />
            </Col>
          </Row>
        </Col>
        <Col xs={24} xl={6}>
          <Card className="insight">
            <div className="shiftInsights d-flex">
              <ShiftInsightTabs />
              <Divider />
              <TopRatedCarers />
            </div>
          </Card>
        </Col>
        <Col xs={24}>
          <CarerBookingCalendar />
        </Col>
      </Row>
    </div>
  );
};

export default CordinatorDashboardPage;
