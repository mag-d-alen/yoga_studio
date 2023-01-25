import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthState,
  BookinClassData,
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
      const token = (getState() as RootState).auth.access_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["YogaClasses", "SingleClass", "Users"],

  endpoints: (builder) => ({
    getYogaClasses: builder.query({
      query: () => "/yoga_classes",
      providesTags: ["YogaClasses"],
    }),
    getClassDetails: builder.query({
      query: (yogaType: string) => `/yoga_class_details/${yogaType}`,
      providesTags: ["SingleClass"],
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

    loginUser: builder.mutation<any, LoginData>({
      query: (body: LoginData) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),

    bookClass: builder.mutation<any, BookinClassData>({
      query: (body: BookinClassData) => ({
        url: `/book_class/${body.classType}`,
        method: "PUT",
        body: { email: body.email },
      }),
      invalidatesTags: ["SingleClass"],
    }),
  }),
});

export const {
  useGetYogaClassesQuery,
  useGetClassDetailsQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useBookClassMutation,
} = api;
