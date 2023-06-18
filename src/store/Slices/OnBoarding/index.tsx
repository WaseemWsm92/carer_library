import { emptySplitApi } from "../../Services";

export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getRequest: builder.query({
      query: ({ pagination, query, role }: any) => ({
        url: `/manage-user?page=${pagination?.page}&limit=${pagination?.limit}&roleName=${role}${query}`,
        method: "GET",
      }),

      providesTags: ["result"],
    }), 
    getRequestById: builder.query({
      query: ({ id, detail }: any) => ({
        url: `/users-info/profile?userId=${id}&detail=${detail}`,
        method: "GET",
      }),
      providesTags: ["result"],
    }),

    postClientsRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: `assign-carehome`,
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),
    deleteClientsRequest: builder.mutation({
      query: ({ id }: any) => ({
        url: `assign-carehome?careHomeId=${id}`,
        method: "delete",
      }),

      invalidatesTags: ["result"],
    }),
    postBckgroundChecksRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `profile/bg-checks/${id}`, // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),

    postOtherInformationRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `users-info/profile?userId=${id}`, // use the endpoint URL from the argument
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),
    postAdditionalDocumentsRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `users-info/additional-docs/{docId}?docId=${id}`, // use the endpoint URL from the argument
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),

    updateBankDetailsRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `users-info/bank-details/${id}`, // use the endpoint URL from the argument
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),
    updateAdditionalDocsRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `users-info/additional-docs/${id}`, // use the endpoint URL from the argument
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),

    postphotoRequest: builder.mutation({
      query: ( payload : any) => {
        let formData = new FormData();
        formData.append("file", payload?.file);
        return {  url: `media/upload`,
        method: "post",
        body: formData}
      
      },

      invalidatesTags: ["result"],
    }),
    postRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "auth/onboarding", // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),

    deleteRequest: builder.mutation({
      query: (id: string) => ({
        url: `result/${id}`, // use the endpoint URL from the argument
        method: "DELETE",
      }),
      invalidatesTags: ["result"],
    }),
    updateRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `profile/update-personalInfo?userId=${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),
  }),
});

export const {
  usePostAdditionalDocumentsRequestMutation,
  usePostBckgroundChecksRequestMutation,
  useGetRequestQuery,
  useGetRequestByIdQuery,
  useDeleteClientsRequestMutation,
  usePostRequestMutation,
  useDeleteRequestMutation,
  useUpdateRequestMutation,
  usePostphotoRequestMutation,
  usePostOtherInformationRequestMutation,
  usePostClientsRequestMutation,
  useUpdateBankDetailsRequestMutation,
  useUpdateAdditionalDocsRequestMutation,

  // useGetRequestViewDetailsQuery
} = extendedApi;
