import { Modal } from "antd";
import { useStaffAvailabilitysheetMutation } from "../../../../../../../store/Slices/StaffManager";
import dayjs from "dayjs";
import "./AvailabilityModal.scss";
import { useEffect, useState } from "react";

const AvailabilityModal = (props: any) => {
  const {
    isAvailability,
    setIsAvailability,
    staffSummaryDetails,
    shiftDate,
    availability,
  } = props;

  const [isShiftChange, setIsShiftChange] = useState<boolean>();
  const shiftType: any = {};
  useEffect(() => {
    availability?.includes("MORNING") && (shiftType.MORNING = "MORNING");
    availability?.includes("LONGDAY") && (shiftType.LONGDAY = "LONGDAY");
    availability?.includes("NIGHT") && (shiftType.NIGHT = "NIGHT");
    availability?.includes("AFTERNOON") && (shiftType.AFTERNOON = "AFTERNOON");
  }, []);

  const handleShift = (type: string) => {
    console.log(type);
    const res = shiftType[type]
      ? delete shiftType[type]
      : (shiftType[type] = type);
    setIsShiftChange(!isShiftChange);
    console.log(res);
  };

  console.log(shiftType, "shiftType");

  const avialbilityArray = availability[shiftDate]?.split(",") ?? "";
  const [staffAvailabilitySubmit] = useStaffAvailabilitysheetMutation();

  // const [staffAvailability, setStaffAvailability] = useState({
  //   userId: "",
  //   availabilityDate: "",
  // });

  const handleSendEmailSubmit = () => {
    staffAvailabilitySubmit({
      userId: staffSummaryDetails?._id,
      availabilityDate: shiftDate,
      availableShift: "",
    });
  };

  const weatherUpdates = [
    { className: "Long-day", content: "", label: "LONGDAY" },
    {
      className: "morning-update d-flex justify-center align-center",
      content: "A M",
      label: "MORNING",
    },
    {
      className: "afternoon-update d-flex justify-center align-center",
      content: "P M",
      label: "AFTERNOON",
    },
    { className: "night", content: "", label: "NIGHT" },
  ];

  const handleMapItemClick = (className: any) => {
    // Console the key (which is the className)
    console.log("Clicked key:", className);
  };

  const getClassNames = (name: string) => {
    console.log(
      avialbilityArray.includes(name) ? avialbilityArray[name] : "ffdds"
    );
  };

  return (
    <Modal
      title={`Select ${staffSummaryDetails?.fullName} Availability`}
      centered
      open={isAvailability}
      onCancel={() => setIsAvailability(false)}
      onOk={() => setIsAvailability(false)}
      footer={false}
      width={550}
      className="availability-modal-wrapper"
    >
      <div className="availability-modal-content">
        <div
          className="availability-date d-flex align-center"
          style={{ gap: "5px" }}
        >
          <h3 className="m-0 fs-14 fw-600 line-height-17">
            Availability Date:
          </h3>
          <p className="m-0 fs-14 fw-500 line-height-17">
            {dayjs(shiftDate).format("DD-MM-YYYY")}
          </p>
        </div>
        <div className="select-availability">
          <h3
            className="m-0 fs-14 fw-600 line-height-17"
            style={{ paddingBlock: "30px" }}
          >
            Select Availability
          </h3>
          {/* <div
            className="weather-update-wrapper d-flex align-item-center"
            style={{ gap: "40px" }}
          >
            {weatherUpdates.map((update, index) => (
              <div>
                <div
                  key={index}
                  className={`${update.className}
                  ${getClassNames(update.label)} selectAvailability
                  ${availability.toString()?.includes("MORNING")&&"long-day-active"}
                  `}
                  onClick={() => alert(update.label)}
                >
                  {update.content}
                </div>
                <p>{update.label}</p>
              </div>
            ))}
          </div> */}

          <div
            className="weather-update-wrapper d-flex align-item-center"
            style={{ gap: "2px", cursor: "pointer" }}
            // data-key={item}
            // onClick={(event) => {
            // setIsAvailability(true);
            // setAvailability(obj);
            // handleMapItemClick(event, obj);
            // }}

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
              onClick={() => handleShift("LONGDAY")}
              className={`${shiftType?.LONGDAY && "long-day-active"} long-day`}
            ></div>
            <div
              onClick={() => handleShift("MORNING")}
              className={`am-update d-flex justify-center align-center ${
                shiftType?.MORNING && "am-active"
              }`}
            >
              <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
            </div>
            <div
              onClick={() => handleShift("AFTERNOON")}
              className={`pm-update d-flex justify-center align-center ${
                shiftType?.AFTERNOON && "pm-active"
              }`}
            >
              <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
            </div>
            <div
              onClick={() => handleShift("NIGHT")}
              className={`${shiftType?.NIGHT && "active-moon"} moon-update`}
            ></div>
          </div>
        </div>

        <div className="d-flex availability-modal-btn">
          <button
            type="button"
            className="cancel-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="save-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
            onClick={handleSendEmailSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default AvailabilityModal;
