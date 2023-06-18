import {  commonReportFiltersInterface } from "../../types/ReportsInterface";

// Filters Array 
export const TraineesInforFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Course Type",
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
        labelName: "Course Name",
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
        labelName: "Course Status",
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


// dashbaord table data start here
export interface TraineesInfoTable {
  key: React.Key;
  srNo: string;
  TraineeName: string;
  CourseName: string;
  CourseStatus: string;
  AssesmentStatus: string;
}
export const traineesInfoTable: TraineesInfoTable[] = [
  {
    key: "1",
    srNo: "01",
    TraineeName: "Faisal Naeem",
    CourseName: "BLS: Adults & Children , AED and Recovery Position",
    CourseStatus: "Completed",
    AssesmentStatus: "Qualified",
  },
  {
    key: "2",
    srNo: "02",
    TraineeName: "Faisal Naeem",
    CourseName: "BLS: Adults & Children , AED and Recovery Position",
    CourseStatus: "Completed",
    AssesmentStatus: "Qualified",
  },
  {
    key: "3",
    srNo: "03",
    TraineeName: "Faisal Naeem",
    CourseName: "BLS: Adults & Children , AED and Recovery Position",
    CourseStatus: "Completed",
    AssesmentStatus: "Qualified",
  },
  {
    key: "4",
    srNo: "04",
    TraineeName: "Faisal Naeem",
    CourseName: "BLS: Adults & Children , AED and Recovery Position",
    CourseStatus: "Completed",
    AssesmentStatus: "Qualified",
  },
];
