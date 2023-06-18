import { emptySplitApi } from "../../Services";

export const staffBooking: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getStaffBooking: builder.query({
      query: (param: any) => ({
        // url: `staff/staff-manager-list?page=1&limit=10&search=${param.search}`,
        url: `manage-user?page=1&limit=1000&search=${param.search}&roleName=carer`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),

    getAvailableShift: builder.query({
      query: (data: any) => ({
        url: `shifts/available?carerId=${data.caredId}&userType=${data.userType}`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),

    getUpComingShift: builder.query({
      query: (data: any) => ({
        url: `shifts/allocate?page=1&limit=10&staffId=${data.staffId}&shiftStatus=ACCEPTED`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),

    getStaffWorkHistory: builder.query({
      query: (data:any) => ({
        url: `reports/work-history?page=1&limit=10&staffId=${data.staffId}`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),
  }),
});

export const { useGetStaffBookingQuery, useGetAvailableShiftQuery, useGetUpComingShiftQuery,useGetStaffWorkHistoryQuery } = staffBooking;
