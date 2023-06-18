import { emptySplitApi } from "../../Services";

export const staffManager: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getStaffManager: builder.query({
      query: (param: any) => ({
        url: `staff/staff-manager-list?page=1&limit=10&search=${param.search}`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    getRequestByWidgets: builder.query({
      query: () => ({
        url: `staff/widget-staff-manager`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    getStaffSummaryData: builder.query({
      query: (id: any) => ({
        url: `staff/staff-summary?id=${id}`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    getStaffSummaryMetricsInfo: builder.query({
      query: (id: any) => ({
        url: `/staff/matrics-info?userId=${id}`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    getStaffWidgetShiftStatus: builder.query({
      query: (id: any) => ({
        url: `staff/widget-shift-status?userId=${id}`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    deleteProfile: builder.mutation({
      query: ({ id }: any) => ({
        url: `/profile/delete-user?userId=${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["staffManager"],
    }),

    getOpenShift: builder.query({
      query: (data: any) => ({
        url: `shifts/available?carerId=${data.caredId}&userType=${data.userType}`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    getConfirmedShift: builder.query({
      query: (data: any) => ({
        url: `shifts/allocate?page=1&limit=10&staffId=${data.staffId}&shiftStatus=ACCEPTED`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    getCompletedShift: builder.query({
      query: (data: any) => ({
        url: `shifts/allocate?page=1&limit=10&staffId=642f8900c36541ddf5ccd3f0&shiftStatus=SIGNEDOFF`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    sendEmail: builder.mutation({
      query: ({ emailId, message, subject }: any) => ({
        url: `staff/send-email?emailId=${emailId}&subject=${subject}&message=${message}`,
        method: "POST",
      }),
      providesTags: ["staffManager"],
    }),

    sendResendEmail: builder.mutation({
      query: (payload: any) => ({
        url: `/auth/resend-invitation`,
        method: "POST",
        body: payload,
      }),
      providesTags: ["staffManager"],
    }),

    getStaffAvailability: builder.query({
      query: (data: any) => ({
        url: `staff/staff-availability?userId=${data.userId}&startDateRange=2023-03-17&endDateRange=2023-03-23`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    staffAvailabilitysheet: builder.mutation({
      query: (data: any) => ({
        url: `staff/submit-staff-availability?userId=${data.userId}&availabilityDate=${data.availabilityDate}&availableShift=LONGDAY`,
        method: "POST",
      }),
      providesTags: ["staffManager"],
    }),

    getAllClientList: builder.query({
      query: () => ({
        url: `staff/all-client-list`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    staffAllocateCarers: builder.mutation({
      query: (payload: any) => ({
        url: `staff/allocate-carers`,
        method: "POST",
        body: payload,
      }),
      providesTags: ["staffManager"],
    }),

    getStaffViewCarer: builder.query({
      query: () => ({
        url: `staff/view-care-homes?page=1&limit=10&userId=63f71cc52a933ec9b17ed5a7`,
        method: "GET",
      }),
      providesTags: ["staffManager"],
    }),

    staffDeleteAllocate: builder.mutation({
      query: () => ({
        url: `staff/delete-allocate-carer?clientId=63f729ebfffff62317142f74`,
        method: "DELETE",
      }),
      providesTags: ["staffManager"],
    }),
  }),
});

export const {
  useGetStaffManagerQuery,
  useGetRequestByWidgetsQuery,
  useGetStaffSummaryDataQuery,
  useGetStaffSummaryMetricsInfoQuery,
  useGetStaffWidgetShiftStatusQuery,
  useDeleteProfileMutation,
  useGetOpenShiftQuery,
  useGetConfirmedShiftQuery,
  useGetCompletedShiftQuery,
  useSendEmailMutation,
  useSendResendEmailMutation,
  useGetStaffAvailabilityQuery,
  useGetAllClientListQuery,
  useStaffAvailabilitysheetMutation,
  useStaffAllocateCarersMutation,
  useGetStaffViewCarerQuery,
  useStaffDeleteAllocateMutation,
} = staffManager;
