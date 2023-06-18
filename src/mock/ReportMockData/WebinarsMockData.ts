import {  commonReportFiltersInterface } from "../../types/ReportsInterface";

// Filters Array 
export const WebinarsReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Webinar Name",
        placeholder: "All",
        optionsArray: [
            {
                value: "Timesheet",
                label: "Timesheet",
            },
            {
                value: "Staff Direct Booking",
                label: "Staff Direct Booking",
            },
            {
                value: "Shift Direct Booking",
                label: "Shift Direct Booking",
            },
        ]
    },
    {
        key: "02",
        labelName: "Venue",
        placeholder: "All",
        optionsArray: [
            {
                value: "Shift Direct Booking",
                label: "Shift Direct Booking",
            },
            {
                value: "Shift Direct Staff",
                label: "Shift Direct Staff",
            },
            {
                value: "Shift Allocated Staff",
                label: "Shift Allocated Staff",
            }
        ]
    },
    {
        key: "03",
        labelName: "Status",
        placeholder: "All",
        optionsArray: [
            {
                value: "Morning",
                label: "Morning",
            },
            {
                value: "Afternoon",
                label: "Afternoon",
            },
            {
                value: "Evening",
                label: "Evening",
            }
        ]
    },
]


// table data start here
export interface WebinarsReportTable {
  key: React.Key;
  srNo: string;
  WebinarTitle: string;
  Date: string;
  Venue : string;
  NoOfAttendees: string;
  status: string;
}
export const webinarsReportTable: WebinarsReportTable[] = [
  {
    key: "1",
    srNo: "01",
    WebinarTitle: "Minor Injury Course ",
    Date: "05/12/2022",
    Venue : "Zoom Webinar",
    NoOfAttendees: "200",
    status: "Completed",
  },
  {
    key: "2",
    srNo: "03",
    WebinarTitle: "Minor Injury Course ",
    Date: "06/5/2022",
    Venue : "Zoom Webinar",
    NoOfAttendees: "800",
    status: "Completed",
  },
];
