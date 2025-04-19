import { createSlice } from '@reduxjs/toolkit';

//* Slice
const slice = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = slice.actions;
export default slice.reducer;

//* Selectors
export const selectFilter = state => state.filter.filter;
