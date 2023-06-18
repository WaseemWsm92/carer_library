import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({


    getRequest: builder.query({
      query: ({pagination, query,role}:any) => ({
        // url: `/manage-user?page=1&limit=50&roleName=client${query}`,
        url: `/manage-user?page=${pagination?.page}&limit=${pagination?.limit}&roleName=${role}${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["addClient"],
    }),

    getClientRequest: builder.query({
      query: ({query}:any) => ({
        url: `/manage-user?page=1&limit=50&roleName=client`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["addClient"],
    }),

    // manage group get data start here
    getManageGroupData: builder.query({
      query: () => ({
        url: `/client-groups?page=1&limit=999`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["getManangeGroupData"],
    }),


    getRequestById: builder.query({
      query: (id: any) => ({
        url: `/result${id}`,
        method: "GET",
      }),

    }),

    // get manage department

    getManageDepartment: builder.query({
      query: ({userId}: any) => ({
        url: `/profile/client-departments?userId=${userId}`, // use the endpoint URL from the argument
        method: "GET",
      }),
      providesTags: ["getClient"],

    }),

    //  ********************************* get api slice end here ************************************************


    

    //  ****************************** post api slice start here **********************************************
    postAddNewClient: builder.mutation({


      query: ({ payload }: any) => ({
        url: "auth/signup-client", // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["addClient"],
    }),

    postClientProfileInfo: builder.mutation({
      query: ({userId, payload}:any) => ({
        url: `/profile/client-profile/${userId}`, // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["addClient"],
    }),

       // UPDATE PRIMARY EMAIL AND PHONE  slice start here
       postUpdateEmailPhone: builder.mutation({
        query: ({ payload }: any) => ({
          url: "/profile/change-email-phone", // use the endpoint URL from the argument
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["updateEmailPhone"],
      }),
  
   
    // manage department slice start here
    postManageDepartment: builder.mutation({
      query: ({userId, payload}:any) => ({
        url: `/profile/client-department/${userId}`, // use the endpoint URL from the argument
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getClient"],
    }),



    // client admin user slice start here
    postClientAdminUser: builder.mutation({
      query: ({userId, payload}:any) => ({
        url: `/profile/admin-user/${userId}`, // use the endpoint URL from the argument
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["clientAdminUser"],
    }),


     // comments slice start here
     postClientComment: builder.mutation({
      query: ({userId, payload}:any) => ({
        url: `/profile/comments/${userId}`, // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["clientComment"],
    }),


    postCreateGroup: builder.mutation({
      query: ({ payload }: any) => ({
        url: "client-groups", // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["getManangeGroupData"],
    }),


    //  ****************************** post api slice end here **********************************************


    //  ****************************** delete api slice start here **********************************************

    deleteRequest: builder.mutation({
      query: (id: string) => ({
        url: `result/${id}`, // use the endpoint URL from the argument
        method: "DELETE",
      }),
      invalidatesTags: ["addClient"],
    }),

    deleteManageDepartmentRequest: builder.mutation({
      query: (id: string) => ({
        url: `/profile/delete-department?departmentId=${id}`, // use the endpoint URL from the argument
        method: "DELETE",
      }),
      invalidatesTags: ["getClient"],
    }),

    //  ****************************** delete api slice end here **********************************************


    updateRequest: builder.mutation({
      query: ({ id, payload }: any) => ({

        url: `/result/${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["addClient"],
    }),

    // manage group update start here

    updateManageGroupRequest: builder.mutation({
      query: ({ id, payload }: any) => ({

        url: `/client-groups/${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["getManangeGroupData"],
    }),

    // declartion update start here
    updateDeclarationRequest: builder.mutation({
      query: ({ id, payload }: any) => ({

        url: `/profile/update-personalInfo?userId=${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["updateDeclaration"],
    }),


  }),
});

export const {
  useGetRequestQuery,
  useGetClientRequestQuery,
  useGetManageGroupDataQuery,
  useGetRequestByIdQuery,
  useGetManageDepartmentQuery,
  usePostAddNewClientMutation,
  usePostClientProfileInfoMutation,
  usePostClientCommentMutation,
  usePostManageDepartmentMutation,
  usePostClientAdminUserMutation,
  usePostCreateGroupMutation,
  usePostUpdateEmailPhoneMutation,
  useDeleteRequestMutation,
  useDeleteManageDepartmentRequestMutation,
  useUpdateRequestMutation,
  useUpdateManageGroupRequestMutation,
  useUpdateDeclarationRequestMutation,
} = extendedApi;
