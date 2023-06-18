import { ClientReportMockDataInterface, commonReportFiltersInterface, incidentReportMockDataInterface } from "../../types/ReportsInterface";
import Attachment from '../../assets/icons/Report/Attachment.svg'
// Filters Array 
export const ClientRatingFilter: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Client Name",
        placeholder: "Select client name",
        optionsArray: [
            {
                value: "Maaz Khan",
                label: "Maaz Khan",
            },
            {
                value: "Aesa Khan",
                label: "Aesa Khan",
            },
            {
                value: "Ali Rehman",
                label: "Ali Rehman",
            }
        ]
    },
    {
        key: "02",
        labelName: "Staff Name",
        placeholder: "Select staff name",
        optionsArray: [
            {
                value: "Maaz Khan",
                label: "Maaz Khan",
            },
            {
                value: "Aesa Khan",
                label: "Aesa Khan",
            },
            {
                value: "Ali Rehman",
                label: "Ali Rehman",
            }
        ]
    },
    {
        key: "03",
        labelName: "Shift Status",
        placeholder: "Select shift status",
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
export const ClientReportMockData: ClientReportMockDataInterface[] = [
    {
        key: "01",
        staffName: "David",
        shiftName: "Long Day",
        shiftDate: "06/06/2022",
        shiftTime: "14:13",
        bookedBy: "Jithin Sebastion",
        staffType:"HCA",
        rating:"5",
    
    },
    {
      key: "02",
      staffName: "David",
      shiftName: "Long Day",
      shiftDate: "06/06/2022",
      shiftTime: "14:13",
      bookedBy: "Jithin Sebastion",
      staffType:"HCA",
      rating:"5",
  
  },
  {
    key: "03",
    staffName: "David",
    shiftName: "Long Day",
    shiftDate: "06/06/2022",
    shiftTime: "14:13",
    bookedBy: "Jithin Sebastion",
    staffType:"HCA",
    rating:"5",

},
{
  key: "04",
  staffName: "David",
  shiftName: "Long Day",
  shiftDate: "06/06/2022",
  shiftTime: "14:13",
  bookedBy: "Jithin Sebastion",
  staffType:"HCA",
  rating:"5",

},
{
  key: "05",
  staffName: "David",
  shiftName: "Long Day",
  shiftDate: "06/06/2022",
  shiftTime: "14:13",
  bookedBy: "Jithin Sebastion",
  staffType:"HCA",
  rating:"5",

},
{
  key: "06",
  staffName: "David",
  shiftName: "Long Day",
  shiftDate: "06/06/2022",
  shiftTime: "14:13",
  bookedBy: "Jithin Sebastion",
  staffType:"HCA",
  rating:"5",

},
{
  key: "07",
  staffName: "David",
  shiftName: "Long Day",
  shiftDate: "06/06/2022",
  shiftTime: "14:13",
  bookedBy: "Jithin Sebastion",
  staffType:"HCA",
  rating:"5",

},

]