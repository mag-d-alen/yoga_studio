import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthState,
  GenericResponse,
  LoginData,
  UserType,
  YogaClassType,
} from "../types";
import { RootState } from "./store";

export const api = createApi({
  //   reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.access_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["YogaClasses", "Users"],
  endpoints: (builder) => ({
    getYogaClasses: builder.query({
      query: () => "/yoga_classes",
      providesTags: ["YogaClasses"],
    }),
    getClassDetails: builder.query({
      query: (yogaType: string) => `/yoga_class_details/${yogaType}`,
    }),

    registerUser: builder.mutation<
      GenericResponse | Partial<GenericResponse>,
      UserType
    >({
      query: (body: UserType) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    loginUser: builder.mutation<any, any>({
      query: (body: LoginData) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetYogaClassesQuery,
  useGetClassDetailsQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = api;
