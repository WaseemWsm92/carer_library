import { emptySplitApi } from "../../../Services";

export const SettingShiftTimeSettingsApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getShifTime: builder.query({
      query: ({ selectedFilterValue}:any) => ({
        url: `/shift-time?&careHomeId=${selectedFilterValue ? selectedFilterValue : "642f89fdc36541ddf5ccd41d"}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingShiftTimeSettings"],
    }),

    getShifTimeFilter: builder.query({
      query: () => ({
        url: `/manage-user?page=1&limit=10&roleName=client`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingShiftTimeSettings"],
    }),

    postShifTime: builder.mutation({
      query: ( {payload} : any) => ({
        url: "/shift-time?careHomeId=63f6e4ddf026114fba62745d",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingShiftTimeSettings"],
    }),
    deleteShifTime: builder.mutation({
      query: (id: string) => ({
        url: `/shift-time/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingShiftTimeSettings"],
    }),

    updateShifTime: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/shift-time/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["SettingShiftTimeSettings"],
    }),

    updateCrossAllocation: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/shift-time/${id}`,
        method: "PATCH",
        body: { ...payload, crossAllocation: payload?.croosAllocation },
      }),

      invalidatesTags: ["SettingShiftTimeSettings"],
    }),

  }),
});

export const {
  useGetShifTimeQuery,
  useGetShifTimeFilterQuery,
  usePostShifTimeMutation,
  useDeleteShifTimeMutation,
  useUpdateShifTimeMutation,
  useUpdateCrossAllocationMutation,
} = SettingShiftTimeSettingsApis;