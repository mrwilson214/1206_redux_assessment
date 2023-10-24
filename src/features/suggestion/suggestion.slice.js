import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSuggestion = createAsyncThunk(
  "suggestion/fetchSuggestion",
  async (thunkAPI) => {
    const res = await fetch("http://localhost:3004/api/suggestion").then(
      (data) => data.json()
    );
    return res.data;
  }
);

const initialState = {
  suggestion: "",
  loading: false,
  error: true,
};

const options = {
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSuggestion.pending]: (state) => {
      state.loading = true;
    },
    [fetchSuggestion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.suggestion = payload;
      state.error = false;
    },
    [fetchSuggestion.rejected]: (state) => {
      state.loading = false;
    },
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;
export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
