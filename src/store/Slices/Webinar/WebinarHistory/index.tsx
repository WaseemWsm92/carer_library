import { emptySplitApi } from "../../../Services";
export const WebinarHistory = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    //Get main course
    getWebinarHistoryData: builder.query({
      query: ({query}:any) => ({
        url: `/webinar-history?page=1&limit=10${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["webinar-history"],
    }),

    getWebinarHistoryAttendes: builder.query({
      query: ({id, query}:any) => ({
        url: `/webinar-history/attendees?page=1&limit=10&webinarId=${id}${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["webinar-history"],
    }),
    


  }),
});

export const {
 useGetWebinarHistoryDataQuery,
 useGetWebinarHistoryAttendesQuery,
} = WebinarHistory;
