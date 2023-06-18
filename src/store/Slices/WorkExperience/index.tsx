import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getWorkExperienceRequestById: builder.query({
      query: ({id}:any) => ({
        url: `user/experience?Id=${id}`,
        method: "GET",
      }),

      providesTags: ["experience"],
    }),
    getUnEmploymentRequestById: builder.query({
      query: ({id}:any) => ({
        url: `user/un-employee?Id=${id}`,
        method: "GET",
      }),

      providesTags: ["unemployement"],
    }),
    postUnEmployementRequest: builder.mutation({
      query: ({ payload ,id}: any) => ({
        url: `user/un-employement?userId=${id}`, // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["unemployement"],
    }),
    updateUnEmployementRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/un-employee?unEmployeeId=${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["unemployement"],
    }),
    postWorkExperienceRequest: builder.mutation({
        query: ({ payload ,id}: any) => ({
          url: `user/experience?userId=${id}`, // use the endpoint URL from the argument
          method: "post",
          body: payload,
        }),
  
        invalidatesTags: ["result"],
      }),
      postTrainingCertificatesRequest: builder.mutation({
        query: ({ payload ,id}: any) => ({
          url: `user/certificates?userId=${id}`, // use the endpoint URL from the argument
          method: "post",
          body: payload,
        }),
  
        invalidatesTags: ["result"],
      }),
      getAddAdditionalDetailsRequest: builder.query({
        query: ({ id}: any) => ({
          url: `user/training-detail?Id=${id}`, // use the endpoint URL from the argument
          method: "GET",
          
        }),
  
        providesTags: ["result"],
      }),
      postAddAdditionalDetailsRequest: builder.mutation({
        query: ({ payload ,id}: any) => ({
          url: `user/training-details?userId=${id}`, // use the endpoint URL from the argument
          method: "post",
          body: payload,
        }),
  
        invalidatesTags: ["result"],
      }),
      updateAdditionalDetailsRequest: builder.mutation({
        query: ({ payload ,id}: any) => ({
          url: `user/training-detail?TrainingId=${id}`, // use the endpoint URL from the argument
          method: "put",
          body: payload,
        }),
  
        invalidatesTags: ["result"],
      }),
    deleteWorkExperienceRequest: builder.mutation({
      query: (id: string) => ({
        url: `user/reference/${id}`, // use the endpoint URL from the argument
        method: "DELETE",
      }),
      invalidatesTags: ["experience",],
    }),
    updateWorkExperienceRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/experience?experienceId=${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),
    updateSpecialitiesRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/specialities?userId=${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["result"],
    }),
  
  }),
});

export const {
  useUpdateSpecialitiesRequestMutation,
  usePostAddAdditionalDetailsRequestMutation,
useGetWorkExperienceRequestByIdQuery,
  useDeleteWorkExperienceRequestMutation,
  useUpdateWorkExperienceRequestMutation,
  usePostWorkExperienceRequestMutation,
  usePostTrainingCertificatesRequestMutation,
  useGetAddAdditionalDetailsRequestQuery,
  useUpdateAdditionalDetailsRequestMutation,
  useGetUnEmploymentRequestByIdQuery,
  usePostUnEmployementRequestMutation,
  useUpdateUnEmployementRequestMutation
  
  
  // useGetRequestViewDetailsQuery
} = extendedApi;
