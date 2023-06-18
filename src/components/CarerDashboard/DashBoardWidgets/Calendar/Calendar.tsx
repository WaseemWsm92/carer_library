import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import ResourcePlugin from "@fullcalendar/resource";
import {
  clientDashboardCalendarData,
  clientDashboardEventsData,
} from "../../../../mock/ClientDashboardData";
import dayjs from "dayjs";
import SunIcon from "../../../../assets/icons/ClientBookingCalendar/sun-icon.png";
import "./Calendar.scss";

const CarerCalendar = () => {
  const handleSlotContent = (slotEvent: any) => {
    return (
      <>
        <div className="slot-event-wrapper">
          <div className="d-flex align-center" style={{ gap: "5px" }}>
            <h2 className="title-color m-0 fs-14 fw-600 line-height-18">
              {dayjs(slotEvent.date).format("h a")}
            </h2>
          </div>
        </div>
      </>
    );
  };
  const handleResourceRender = (info: any) => {
    const resource = info?.resource?._resource;
    return (
      <>
        <div className="resource-render-wrapper d-flex align-center">
          <p className="title-color fs-14 fw-400 line-height-20 cursor-pointer m-0">
            {resource.title}
          </p>
        </div>
      </>
    );
  };

  const handleEventContent = (eventInfo: any) => {
    return (
      <div className="client-booking-event-wrap d-flex align-center">
        <div className="event-icon d-flex align-center">
          <img src={SunIcon} alt="" />
          <h2 className="fs-10 fw-600 snow-white-color m-0">Shifts Interval</h2>
        </div>
        <span className="bg-white"></span>
        <p className="fw-400 m-0 fs-10">(1:00 AM to 9:00 pm)</p>
      </div>
    );
  };

  return (
    <>
      <div className="carer-dashboard-calendar bg-white">
        <h2 className="fs-20 fw-500 m-0 form-heading-color">Calendar</h2>
        <div className="client-calendar">
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin, ResourcePlugin]}
            initialView="resourceTimelineWeek"
            titleFormat={{
              month: "short",
              day: "numeric",
              weekday: "short",
            }}
            headerToolbar={false}
            height="46vh"
            resources={clientDashboardCalendarData}
            events={clientDashboardEventsData}
            eventContent={handleEventContent}
            slotLabelContent={handleSlotContent}
            resourceLabelContent={handleResourceRender}
            editable={true}
            droppable={true}
            slotMinWidth={100}
            resourceAreaWidth={140}
            // contentHeight={600}
            eventMinWidth={100}
            eventBorderColor="1px dotted #DBE4EF !important"
            resourceAreaHeaderContent="Day"
            slotDuration="02:00:00"
            // dateClick={() => setIsRequestShiftModalOpen(true)}
            slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
            // eventClick={handleEventClick}
          />
        </div>
      </div>
    </>
  );
};

export default CarerCalendar;
