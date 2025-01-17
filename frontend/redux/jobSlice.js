import Job from "@/components/Job";
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: [],
    searchJobsByText: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchJobsByText: (state, action) => {
      state.searchJobsByText = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobsByText,
} = jobSlice.actions;
export default jobSlice.reducer;
