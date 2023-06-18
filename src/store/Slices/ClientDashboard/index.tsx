import { emptySplitApi } from "../../Services";
export const ClientDashboard = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getShiftsList: builder.query({
      query: (shiftStatus: any) => ({
        url: `shifts?limit=100${shiftStatus && `&shiftStatus=${shiftStatus}`}`,
        method: "GET",
      }),
    }),
    getLastShiftDetails: builder.query({
      query: () => ({
        url: `shifts/last-shift-detail`,
        method: "GET",
      }),
    }),
    getOverAllRating: builder.query({
      query: () => ({
        url: `ratings/overall-ratings`,
        method: "GET",
      }),
    }),
    getOverAllReviews: builder.query({
      query: () => ({
        url: `ratings/all`,
        method: "GET",
      }),
    }),
    getCarersPerMonth: builder.query({
      query: (currentYear) => ({
        url: `profile/client-dashboard?year=${currentYear}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetShiftsListQuery, useGetLastShiftDetailsQuery, useGetOverAllRatingQuery, useGetOverAllReviewsQuery, useGetCarersPerMonthQuery } = ClientDashboard;
