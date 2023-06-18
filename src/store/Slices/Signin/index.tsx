import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    signInPostRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/auth/login",
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["signin"],
    }),
  }),
});

export const { 
  useSignInPostRequestMutation, 
} = extendedApi;
