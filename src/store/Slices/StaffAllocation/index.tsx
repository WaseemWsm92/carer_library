import { url } from "inspector";
import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getCarerWidgetsData: builder.query({
      query: () => ({
        url: "/staff/widget-staff-allocation",
        method: "GET",
      }),

      invalidatesTags: ["carerWidgets"],
    }),

    getStaffAllocationList: builder.query({
      query: ({ id, query,pagination }: any) => {
        const url = `/staff/staff-allocation-list?page=${pagination.page}&limit=${pagination.limit}&clientId=${id}`;
        return {
          url: `${url}${query}`,
          method: "GET",
        };
      },

      providesTags: ["staffAllocationList"],
    }),

    deleteStaff: builder.mutation({
      query: ({id,payload}:{id:string,payload:[string]}) => ({
        url: `staff/delete-allocate-carer?clientId=${id}`,
        method: "DELETE",
        body: payload
      }),
      invalidatesTags: ["staffAllocationList"],
    }),

    downloadStaffRecord: builder.query({
      query: ({ id,type,query }: any) => {
        console.log(id)
        const url = `staff/download?downloadType=${type}&clientId=${id}`
        return {
          url: `${url}`,
          method: "GET",
        }
      },

    }),

    getCareHomes: builder.query({
      query: ({ id }: {id:string}) => ({
        url: `staff/view-care-homes?page=1&limit=10&userId=${id}`,
        method: "GET",
      }),

      providesTags: ["staffAllocationList"],
    }),

    allocateCarers: builder.mutation({
      query: (payload:any) => ({
        url: `staff/allocate-carers`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["staffAllocationList"],
    }),

    getStaffList: builder.query({
      query: () => ({
        url: "/manage-user?page=1&limit=1000&roleName=client",
        method: "GET",
      }),
    }),
    getAllClient: builder.query({
      query: ({id}:any) => ({
        url: `staff/dropdown-carehomes?staffId=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCarerWidgetsDataQuery,
  useGetStaffAllocationListQuery,
  useGetCareHomesQuery,
  useGetStaffListQuery,
  useDeleteStaffMutation,
  useGetAllClientQuery,
  useAllocateCarersMutation,
  useDownloadStaffRecordQuery
} = extendedApi;
