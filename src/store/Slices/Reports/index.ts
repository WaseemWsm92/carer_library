import { emptySplitApi } from "../../Services";

export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getReportsDailyShift: builder.query({
      query: () => ({
        url: `/reports/daily-shift`,
        method: "GET",
      }),
    }), 
    getReportsProftGrossProfit: builder.query({
      query: () => ({
        url: `/reports/gross-profit-loss`,
        method: "GET",
      }),
    }), 
    getReportsShiftHours: builder.query({
      query: ({userType}:any) => ({
        url: `/shifts/shiftHours?userType=${userType}`,
        method: "GET",
      }),
    }), 
    getReportsExtraHours: builder.query({
      query: () => ({
        url: `/reports/extra-hours`,
        method: "GET",
      }),
    }), 
    getReportsComplience: builder.query({
      query: () => ({
        url: `/reports/complience`,
        method: "GET",
      }),
    }), 
    getReportsRateSetting: builder.query({
      query: () => ({
        url: `/reports/rate-setting`,
        method: "GET",
      }),
    }), 
    getReportsTerminated: builder.query({
      query: () => ({
        url: `/reports/terminated`,
        method: "GET",
      }),
      provideTags:["TerminatedReport"]
    }), 
    getReportsCarerRequest: builder.query({
      query: () => ({
        url: `/carer-request`,
        method: "GET",
      }),
      provideTags:["TerminatedReport"]
    }), 
    reactivateTerminatedReport: builder.mutation({
      query: ({id,payload}: any) => ({
        url: `manage-user/${id}`,
        method: "PATCH",
        body:payload
      }),

      invalidatesTags: ["TerminatedReport"],
    }),

    getReportsVaccination: builder.query({
      query: () => ({
        url: `/reports/vaccination`,
        method: "GET",
      }),
    }), 
    getReportsBookedShift: builder.query({
      query: ({query}:any) => ({
        url: `reports/booked-shift${query?  "?"+query:""}`,
        method: "GET",
      }),
    }), 
    getReportsWorkedHistory: builder.query({
      query: () => ({
        url: `/reports/work-history`,
        method: "GET",
      }),
    }), 

    getReportsCancelShift: builder.query({
      query: ({query}:any) => ({
        url: `/reports/cancel-shift${query?  "?"+query:""}`,
        method: "GET",
      }),
    }),
    getReportsStaffData: builder.query({
      query: () => ({
        url: `/reports/staff-data`,
        method: "GET",
      }),
    }),
    getReportsStaffAttendance: builder.query({
      query: () => ({
        url: `/reports/staff-attendance`,
        method: "GET",
      }),
    }),
    getReportsPaymentData: builder.query({
      query: () => ({
        url: `/reports/payment-data?`,
        method: "GET",
      }),
    }),
    getReportsFinanceReport: builder.query({
      query: () => ({
        url: `/reports/finance-report`,
        method: "GET",
      }),
    }),
    getActivityReports: builder.query({
      query: () => ({
        url: `/activity-report`,
        method: "GET",
      }),
    }),
    getBookingShitReports: builder.query({
      query: ({query}:any) => ({
        url: `/shifts?page=1&limit=10&shiftStatus=BOOKED`,
        method: "GET",
      }),
    }),
  
  }),
});

export const {
  useGetReportsPaymentDataQuery,
  useGetReportsDailyShiftQuery,
  useGetReportsComplienceQuery,
  useGetReportsCancelShiftQuery,
  useGetBookingShitReportsQuery,
  useGetReportsRateSettingQuery,
  useGetReportsStaffDataQuery,
  useGetReportsStaffAttendanceQuery,
  useGetReportsCarerRequestQuery,
  useGetReportsExtraHoursQuery,
  useReactivateTerminatedReportMutation,
  useGetReportsTerminatedQuery,
  useGetReportsProftGrossProfitQuery,
  useGetReportsShiftHoursQuery,
  useGetReportsFinanceReportQuery,
  useGetReportsBookedShiftQuery,
  useGetReportsWorkedHistoryQuery,
  useGetActivityReportsQuery,
  useGetReportsVaccinationQuery,
 
} = extendedApi;
