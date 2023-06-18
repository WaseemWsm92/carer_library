import { emptySplitApi } from "../../Services";

const getLocalStorage: any | string | null = localStorage.getItem("careUserData");
const { id: getUserId } = JSON.parse(getLocalStorage);

export const ClientBookingCalendar: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    addRequestShift: builder.mutation({
      query: (payload: any) => ({
        url: '/shifts',
        method: 'POST',
        body: payload
      })
    }),
    getCarerType: builder.query({
      query: () => ({
        url: 'job-roles',
        method: 'GET'
      })
    }),
    getShiftDepartment: builder.query({
      query: (params: any) => ({
        url: `profile/client-departments?userId=${getUserId}`,
        method: "GET",
      })
    }),
    getShiftCalendarData: builder.query({
      query: (query : any) => {
        const url = `/shifts?shiftStatus=${'UNPUBLISHED'}&shiftStatus=${'PUBLISHED'}&shiftStatus=${'BOOKED'}&shiftStatus=${'COMPLETED'}&shiftStatus=${'INPROCESS'}`;
        return {
          url: `${url}${query}`,
          method: "GET",
          keepUnusedDataFor: 1,
        }
      }
    }),
    getShiftDetailsData: builder.query({
      query: ({ userId, query }: any) => ({
        url: `/shifts/allocate?page=1&limit=10&shiftId=${userId}${query}`,
        method: 'GET'
      })
    })
  })
})

export const { useAddRequestShiftMutation, useGetCarerTypeQuery, useGetShiftDepartmentQuery, useGetShiftCalendarDataQuery, useGetShiftDetailsDataQuery } = ClientBookingCalendar;