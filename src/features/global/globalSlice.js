import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    episodes: [],
    locations: [],
  },
  reducers: {
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
  },
});

export const { setEpisodes, setLocations } = globalSlice.actions;
export default globalSlice.reducer;
