import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define API service
export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({
        page = 1,
        name = "",
        status = "",
        gender = "",
        species = "",
        type = "",
      }) => {
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        if (status) params.append("status", status);
        if (gender) params.append("gender", gender);
        if (species) params.append("species", species);
        if (type) params.append("type", type);
        params.append("page", page);

        return `character?${params.toString()}`;
      },
    }),
    getCharacterById: builder.query({
      query: (id) => `character/${id}`,
    }),

    getLocationByUrl: builder.query({
      query: (url) => url.replace("https://rickandmortyapi.com/api/", ""),
    }),

    getEpisodesByUrls: builder.query({
      query: (urls) => {
        const ids = urls.map((url) => url.split("/").pop()).join(",");
        return `episode/${ids}`;
      },
    }),
    getAllEpisodes: builder.query({
      query: (page = 1) => `episode?page=${page}`,
    }),

    getEpisodeById: builder.query({
      query: (id) => `episode/${id}`,
    }),
    getAllLocations: builder.query({
      query: (page = 1) => `location?page=${page}`,
    }),
    getLocationById: builder.query({
      query: (id) => `location/${id}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetEpisodesByUrlsQuery,
  useGetLocationByUrlQuery,
  useGetAllEpisodesQuery,
  useGetEpisodeByIdQuery,
  useLazyGetCharacterByIdQuery,
  useGetAllLocationsQuery,
  useGetLocationByIdQuery,
} = characterApi;
