import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getReferenceRequest: builder.query({
      query: ({id}:any) => ({
        url: `/user/references?userId=${id}`,
        method: "GET",
      }),

      providesTags: ["reference"],
    }),
    postReferenceRequest: builder.mutation({
        query: ({ id,payload }: any) => ({
          url: `user/reference?userId=${id}`, // use the endpoint URL from the argument
          method: "post",
          body: payload,
        }),
  
        invalidatesTags: ["reference"],
      }),
    deleteReferenceRequest: builder.mutation({
      query: (id: string) => ({
        url: `user/reference/${id}`, // use the endpoint URL from the argument
        method: "DELETE",
      }),
      invalidatesTags: ["reference"],
    }),
    updateReferenceRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/reference/${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["reference"],
    }),
    upadteReferenceRequestTableFilter: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/reference/${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["reference"],
    }),
    getClientsRequest: builder.query({
      query: ({id}:any) => ({
        url: `assign-carehome?page=1&limit=10&careCoordinatorId=${id}`,
        method: "GET",
      }),

      providesTags: ["carerCordinatorClients"],
    }),
  
  }),
});

export const {
 useGetReferenceRequestQuery,
  useDeleteReferenceRequestMutation,
  useUpdateReferenceRequestMutation,
  usePostReferenceRequestMutation,
  useGetClientsRequestQuery
  // useGetRequestViewDetailsQuery
} = extendedApi;
