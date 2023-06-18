import { carerRequestReportMockDataInterface, commonReportFiltersInterface } from "../../types/ReportsInterface"

// Assets
import harryJoseph2Img from "../../assets/images/MockImages/harry-joseph-2.png";
import harryJosephImg from "../../assets/images/MockImages/harry-joseph.png";
import jittuJoseph2Img from "../../assets/images/MockImages/jittu-joseph-2.png";
import jittuJosephImg from "../../assets/images/MockImages/jittu-joseph.png";
import sallyBreayImg from "../../assets/images/MockImages/sally-breay.png";

// Filters Array 
export const CarerRequestReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Care Home",
        placeholder: "Select care home",
        optionsArray: [
            {
                value: "Care Home",
                label: "Care Home",
            },
        ]
    },
    {
        key: "02",
        labelName: "Request Type",
        placeholder: "Select request type",
        optionsArray: [
            {
                value: "Out of Office",
                label: "Out of Office",
            },
            {
                value: "Emergency Shift Off",
                label: "Emergency Shift Off",
            },
            {
                value: "Change Check-In Time",
                label: "Change Check-In Time",
            },
            {
                value: "Other",
                label: "Other",
            },
        ]
    },
    {
        key: "03",
        labelName: "Status",
        placeholder: "Select status",
        optionsArray: [
            {
                value: "Pending",
                label: "Pending",
            },
            {
                value: "Approved",
                label: "Approved",
            },
            {
                value: "Rejected",
                label: "Rejected",
            }
        ]
    },
    {
        key: "04",
        labelName: "Time Frame",
        placeholder: "Select time frame",
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

// Table Mock Data
export const CarerRequestReportMockData: carerRequestReportMockDataInterface[] = [
    {
        key: "01",
        careHome: "Care Home",
        requestedByName: "Arsalan Khan",
        requestedByImg: harryJoseph2Img,
        requestType: "Out of Office",
        requestedAt: "08 / 05 / 2022 14:13",
        reason: "Have to run personal errands",
        status: "Pending",
    },
    {
        key: "02",
        careHome: "Care Home",
        requestedByName: "Maaz Khan",
        requestedByImg: harryJosephImg,
        requestType: "Out of Office",
        requestedAt: "08 / 05 / 2022 14:13",
        reason: "Have to run personal errands",
        status: "Approved",
    },
    {
        key: "03",
        careHome: "Care Home",
        requestedByName: "Aesa Khan",
        requestedByImg: jittuJoseph2Img,
        requestType: "Out of Office",
        requestedAt: "08 / 05 / 2022 14:13",
        reason: "Have to run personal errands",
        status: "Rejected",
    },
    {
        key: "04",
        careHome: "Care Home",
        requestedByName: "Kashif",
        requestedByImg: jittuJosephImg,
        requestType: "Out of Office",
        requestedAt: "08 / 05 / 2022 14:13",
        reason: "Have to run personal errands",
        status: "Pending",
    },
    {
        key: "05",
        careHome: "Care Home",
        requestedByName: "Ali Rehman",
        requestedByImg: sallyBreayImg,
        requestType: "Out of Office",
        requestedAt: "08 / 05 / 2022 14:13",
        reason: "Have to run personal errands",
        status: "Approved",
    },
]