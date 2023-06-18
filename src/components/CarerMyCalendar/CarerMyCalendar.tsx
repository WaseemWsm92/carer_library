import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import ResourcePlugin from "@fullcalendar/resource";
import SearchIcon from "../../assets/images/OnBoarding/Search.svg";
import { Card, Input } from "antd";
import Sun from "../../assets/BookingCalander/images/sun.png";
import Menu from "../../assets/BookingCalander/images/menu.png";
import CarerMyCalendarFilter from "./CarerMyCalendarFilter/CarerMyCalendarFilter";
import ViewEventDetailsModal from "./ViewEventDetailsModal/ViewEventDetailsModal";
import './CarerMyCalendar.scss';
import dayjs from "dayjs";

const CarerMyCalendar = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [eventClicked, setEventClicked] = useState({});

  let curr = new Date();
  let currntWeek = [];
  const locale = "en-US";
  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let completeDate = new Date(curr.setDate(first));
    let date = completeDate.toISOString().slice(0, 10);
    const dayName = completeDate.toLocaleString(locale, { weekday: "long" });
    currntWeek.push({ id: date, title: dayName });
  }

  console.log("currntWeek", currntWeek)

  const handleSlotContent = (slotEvent: any) => {
    return (
      <>
        <div className="slot-event-wrapper">
          <p className="fs-14 fw-600 label-color">{slotEvent.text}</p>
        </div>
      </>
    );
  };

  const handleResourceRender = (info: any) => {
    const resource = info.resource._resource;
    console.log(resource)
    return (
      <>
        <div
          className="resource-render-content"
        >
          <label
            className="grey-color fs-14 fw-400 line-height-20"
          >
            {resource?.title}
          </label>
          <p className="m-0">{dayjs(resource?.id).format('')}</p>
        </div>
      </>
    );
  };

 

  const eventContentHandler = (eventInfo: any) => {
    const { publicId, title } = eventInfo.event._def;
    return (
      <>
        <div className="carer-event-wrapper">
          <div className="event-icon d-flex align-center justify-between">
            <img src={Sun} alt="" />
            <img src={Menu} alt="" />
          </div>
          <div className="event-content">
            <h2 className="m-0 fs-14">{title}</h2>
            <p className="m-0 fs-10">7:15 am - 7:30 am</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="carer-my-calendar-wrapper">
      <Card>
        <div className="d-flex align-center justify-between" style={{ flexWrap: "wrap", margin: "30px 0", gap: "10px", width: "100%" }}>
          <CarerMyCalendarFilter />

          <div className="input-search-wrapper" style={{ maxWidth: "100%" }}>
            <Input
              placeholder="search"
              style={{ width: "100%" }}
              prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
            />
          </div>
        </div>
        <FullCalendar
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[
            resourceTimelinePlugin,
            interactionPlugin,
            dayGridPlugin,
            ResourcePlugin,
          ]}
          headerToolbar={false}
          initialView="resourceTimelineDay"
          resources={currntWeek}
          // events={calanderEvents}
          editable={true}
          height="68vh"
          droppable={true}
          slotMinWidth={50}
          resourceAreaWidth={140}
          eventContent={eventContentHandler}
          resourceAreaHeaderContent="Days"
          resourceLabelContent={handleResourceRender}
          slotDuration="01:00:00"
          slotLabelInterval="02:00:00"
          slotLabelContent={handleSlotContent}
          slotLabelFormat={[
            {
              hour: "numeric",
              // minute: "0-digit",
              omitZeroMinute: false,
              meridiem: "short",
            },
          ]}
          eventClick={(e) => { setIsViewModalOpen(true); setEventClicked(e) }}
        />
      </Card>
      {isViewModalOpen && <ViewEventDetailsModal isViewModalOpen={isViewModalOpen} setIsViewModalOpen={setIsViewModalOpen} eventClicked={eventClicked} />}
    </div>
  )
}

export default CarerMyCalendar