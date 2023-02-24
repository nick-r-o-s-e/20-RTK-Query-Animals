import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Animal from "../Types/Animal";

export const animalsApi = createApi({
  reducerPath: "animalsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/" }),
  tagTypes: ["Animals"],
  endpoints: (builder) => ({
    getAnimals: builder.query<Animal[], string>({
      query: (group) => `animals/${group || ""}`,
      providesTags: ["Animals"],
    }),
    addAnimal: builder.mutation<Animal[], Animal>({
      query: (animal) => ({
        url: "new-animal",
        method: "POST",
        body: animal,
      }),
      invalidatesTags: ["Animals"],
    }),
    deleteAnimal: builder.mutation<string, string>({
      query: (id) => ({
        url: `animals/id/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Animals"],
    }),
  }),
});

export const {
  useGetAnimalsQuery,
  useAddAnimalMutation,
  useDeleteAnimalMutation,
} = animalsApi;
