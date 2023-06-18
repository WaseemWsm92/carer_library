import { emptySplitApi } from "../../../Services";

export const SettingEmailTemplateSettingsApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getEmailTemplateSettings: builder.query({
      query: () => ({
        url: `/manage-user?roleName=client`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingEmailTemplateSettings"],
    }),

    postEmailTemplateSettings: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/manage-user",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingEmailTemplateSettings"],
    }),
    deleteEmailTemplateSettings: builder.mutation({
      query: (id: string) => ({
        url: `/manage-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingEmailTemplateSettings"],
    }),

    updateEmailTemplateSettings: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/manage-user/${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["SettingEmailTemplateSettings"],
    }),
  }),
});

export const {
  useGetEmailTemplateSettingsQuery,
  usePostEmailTemplateSettingsMutation,
  useDeleteEmailTemplateSettingsMutation,
  useUpdateEmailTemplateSettingsMutation,
} = SettingEmailTemplateSettingsApis;