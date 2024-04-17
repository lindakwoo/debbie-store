import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  ideas: [],
  idea: null,
  pagination: {},
};

export const ideasSlice = createSlice({
  name: "ideas",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setIdeas: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.ideas = payload;
    },
    setIdea: (state, { payload }) => {
      state.idea = payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setPagination: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.pagination = payload;
    },

    resetError: (state) => {
      state.error = null;
      state.reviewed = false;
      state.ideaUpdate = false;
    },
 
  },
});

export const {
  setLoading,
  setError,
  setIdeas,
  setIdea,

  setPagination,
 
  resetError,

} = ideasSlice.actions;

export default ideasSlice.reducer;
export const ideaSelector = (state) => state.ideas;

