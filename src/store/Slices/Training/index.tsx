import { emptySplitApi } from "../../Services";
export const TrainingApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    //Get main course
    getCoursesStats: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/courses-stats`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getCararTrainingStats: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/carer-trainings-stats`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getCourseCompletion: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/competion-progress`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getTrainingProgress: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/carer-training-progress`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getMandatoryProgress: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/self-mandatory-course`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    // Carer Training  

    getCarerInfo: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/carer-trainings/carer`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getCarerCourses: builder.query({
      query: ({carerId, status}:any) => ({
        url: `/trainings/carer-trainings/carer-courses?carerId=${carerId}&status=${status}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getCarerCoursesCompleted: builder.query({
      query: ({courseId, carerId}:any) => ({
        url: `/trainings/carer-trainings/carer-courses/completed/{id}?courseId=${courseId}&carerId=${carerId}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),


    patchMyResultRating: builder.mutation({
      query: ({ id, payload}: any) => ({
        url: `/my-results/rating/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["trainings"],
    }),


    getViewAllCoursesByCategory: builder.query({
      query: ({courseType}:any) => ({
        url: `view-courses?courseType=${courseType}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),
    

  }),
});

export const {
  useGetCoursesStatsQuery,
  useGetCourseCompletionQuery,
  useGetTrainingProgressQuery,
  useGetMandatoryProgressQuery,

  useGetCarerInfoQuery,
  useGetCarerCoursesQuery,
  useGetCarerCoursesCompletedQuery,

  usePatchMyResultRatingMutation,
  useGetCararTrainingStatsQuery,

  useGetViewAllCoursesByCategoryQuery,

} = TrainingApi;
