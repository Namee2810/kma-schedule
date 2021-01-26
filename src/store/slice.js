import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "kma",
  initialState: {
    studentProfile: {},
    schedule: [],
    signed: false
  },
  reducers: {
    SET_STUDENT_PROFILE(state, action) {
      const studentProfile = action.payload.studentProfile;
      state.studentProfile = studentProfile;
    },
    SET_SCHEDULE(state, action) {
      const schedule = action.payload.schedule;
      state.schedule = schedule;
    },
  }
});

const { actions, reducer } = slice;
export const { SET_STUDENT_PROFILE, SET_SCHEDULE } = actions;
export default reducer;