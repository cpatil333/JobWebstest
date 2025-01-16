import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: [],
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
  },
});

export const { setSingleCompany } = companySlice.actions;
export default companySlice.reducer;
