import { emptySplitApi } from "../../Services";

const getLocalStorage: any | string | null = localStorage.getItem("careUserData");
const { id: getUserId } = JSON.parse(getLocalStorage);

export const ClientShiftManage: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getShiftData: builder.query({
      query: ({filter, search}: any) => ({
        url: `shifts?page=1&limit=10&shiftStatus=${filter}&clientName=${search}`,
        method: "GET",
      }),
      providesTags: ["shiftManager"],
    }),

    requestNewShift: builder.mutation({
      query: (payload: any) => ({
        url: `shifts`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["shiftManager"],
    }),

    updateCancelShift: builder.mutation({
      query: ({ clientId, payload }: any) => ({
        url: `shifts/cancel/${clientId}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["shiftManager"],
    }),

    updateModifyStaff: builder.mutation({
      query: ({ clientId, payload, }: any) => ({
        url: `shifts/${clientId}`,
        method: "PUT",
        body: { staffRequired: payload }
      }),
      invalidatesTags: ["shiftManager"],
    }),

    getShiftDepartment: builder.query({
      query: (params: any) => ({
        url: `profile/client-departments?userId=${getUserId}`,
        methos: "GET",
      })
    }),

    getShiftCarerType: builder.query({
      query: () => ({
        url: 'job-roles',
        method: "GET"
      })
    }),

    // upcoming shift
    getUpComingShift: builder.query({
      query: () => ({
        url: `shifts/allocate?careHomeId=${getUserId}&shiftStatus=${'ACCEPTED'}`,
        method: "GET"
      })
    }),

    // completed shift
    getCompletedShift: builder.query({
      query: () => ({
        url: `/shifts/allocate?shiftStatus=${'COMPLETED'}&shiftStatus=${'SIGNEDOFF'}`,
        method: "GET"
      })
    }),

    // signoff shift
    getSignOffShift: builder.query({
      query: () => ({
        url: `/shifts/allocate?careHomeId=${getUserId}&shiftStatus=COMPLETED`,
        method: "GET"
      })
    }),

    getShiftAllocate: builder.mutation({
      query: (payload: any) => ({
        url: `/shifts/allocate`,
        method: "PUT",
        body: payload
      }),
      providesTags: ["shift-allocated"],
    }),

    addSignOffShiftRating: builder.mutation({
      query: (payload: any) => ({
        url: `/ratings/add`,
        method: "POST",
        body: payload
      }),
      providesTags: ["shift-allocated"],
    })
  }),
})

export const { useGetShiftDataQuery, useUpdateCancelShiftMutation, useUpdateModifyStaffMutation, useRequestNewShiftMutation, useGetShiftDepartmentQuery, useGetShiftCarerTypeQuery, useGetCompletedShiftQuery, useGetUpComingShiftQuery, useGetSignOffShiftQuery, useGetShiftAllocateMutation, useAddSignOffShiftRatingMutation } = ClientShiftManage;
