import { Col, DatePicker, Row, Table } from "antd";
import { useState } from "react";
import { availabilitySheetData } from "../../../../../../mock/StaffManagerMock";
import AvailabilityModal from "./AvailabilityModal/AvailabilityModal";
import { DatePickerProps } from "antd/es/date-picker";
import datePickerIcon from "../../../../../../assets/BookingCalander/images/date-picker.png";
import { useGetStaffAvailabilityQuery } from "../../../../../../store/Slices/StaffManager";
import { useLocation } from "react-router-dom";
import "./AvailabilitySheet.scss";
import dayjs from "dayjs";
import "dayjs/locale/en";
dayjs.locale("en");

const AvailabilitySheet = () => {
  const { state: staffSummaryDetails } = useLocation();
  const [shiftDate, setShiftDate] = useState<any>("");

  const { data: availabilitySheetDetails } = useGetStaffAvailabilityQuery({
    userId: staffSummaryDetails?._id,
  });
  // console.log('availabilitySheetDetails==========>',availabilitySheetDetails?.data?.dataObject);
  const [isAvailability, setIsAvailability] = useState(false);
  const [availability, setAvailability] = useState<string>("");
  console.log("========", availability);

  const handleChangeFrom: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  // Convert the data into an array of objects
  const dataSource = availabilitySheetDetails?.data?.dataObject.map(
    (item: any) => {
      const rowData: any = { key: item.userName };

      availabilitySheetDetails?.data?.header.forEach(
        (headerItem: any, index: any) => {
          rowData[headerItem] = item[headerItem];
        }
      );

      return rowData;
    }
  );

  type MapItemClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
  const handleMapItemClick = (event: MapItemClickEvent, obj: any) => {
    const clickedElement = event.currentTarget as HTMLDivElement;
    const key = clickedElement.getAttribute("data-key");
    key && setAvailability(obj[key]??"");
    setShiftDate(key);
    console.log("Clicked key:", key);
  };

  // Define the columns for the table
  const columns = availabilitySheetDetails?.data?.header.map((item: any) => ({
    title: (
      <div className="d-flex flex-column">
        {!(item === "Name" || item === "Designation" || item === "Phone") &&
          dayjs(item, "YYYY-MM-DD").format("dddd")}
        <span className="fs-12 fw-400">{item}</span>
      </div>
    ),

    dataIndex: item,
    key: item,
    render: (text: any, obj: any) =>
      item !== "Name" ? (
        <div
          className="weather-update-wrapper d-flex align-item-center"
          style={{ gap: "2px", cursor: "pointer" }}
          data-key={item}
          onClick={(event) => {
            setIsAvailability(true);
            // setAvailability(obj);
            handleMapItemClick(event, obj);
          }}

          // onClick={(event) => (
          //   <AvailabilityModal
          //     isAvailability={true}
          //     setIsAvailability={setIsAvailability}
          //     staffSummaryDetails={staffSummaryDetails}
          //     shiftDate={shiftDate}
          //     availability={availability}
          //   />
          // )}
        >
          <div
            className={`${
              text?.includes("LONGDAY") && "long-day-active"
            } long-day`}
          ></div>
          <div
            className="am-update d-flex justify-center align-center"
            style={{
              backgroundColor: `${text?.includes("MORNING") && "#E6B15D"}  `,
            }}
          >
            <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
          </div>
          <div
            className="pm-update d-flex justify-center align-center"
            style={{
              backgroundColor: `${text?.includes("AFTERNOON") && "#F89A0C"}  `,
            }}
          >
            <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
          </div>
          <div
            className={`${
              text?.includes("NIGHT") && "active-moon"
            } moon-update`}
          ></div>
        </div>
      ) : (
        <span className="fs-12 fw-400">{text}</span>
      ),
  }));

  // Collapse;

  return (
    <>
      <Row
        className="staff-availability-sheet-common-filter-wrapper work-histor-search-filter bg-white"
        justify="space-between"
        style={{ marginBlock: "20px" }}
      >
        <Col xs={24} md={16} xl={14} xxl={12}>
          <Row gutter={[0, 20]} className="filter-wrapper">
            <>
              <Col xs={24} sm={8}>
                <p
                  className="fs-14 fw-600 title-color line-height-17 m-0"
                  style={{ marginBottom: "0.563rem" }}
                >
                  Date Range
                </p>
                <div className="filter-column">
                  <DatePicker
                    suffixIcon={<img src={datePickerIcon} alt="calander" />}
                    className="date-picker"
                    onChange={handleChangeFrom}
                    placeholder="Form"
                  />
                </div>
              </Col>
            </>
          </Row>
        </Col>
      </Row>
      <div className="availability-table">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          className=""
          scroll={{ x: "max-content" }}
        />
      </div>
      <AvailabilityModal
        isAvailability={isAvailability}
        setIsAvailability={setIsAvailability}
        staffSummaryDetails={staffSummaryDetails}
        shiftDate={shiftDate}
        availability={availability}
      />
    </>
  );
};
export default AvailabilitySheet;
