import { createSlice } from "@reduxjs/toolkit";

interface IFilters {
  sort: string;
  numberGames: number;
}

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    sort: "Saldo de gols (melhor)",
    numberGames: 5,
  },
  reducers: {
    setSort: (state: IFilters, action) => {
      state.sort = action.payload;
    },
    setGamesNumber: (state: IFilters, action) => {
      state.numberGames = action.payload;
    },
  },
});

export const { setSort, setGamesNumber } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
