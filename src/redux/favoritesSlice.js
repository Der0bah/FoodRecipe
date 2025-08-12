import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriterecipes: [], // array of recipe objects
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;

      // Prefer idFood, fall back to id if needed
      const targetId = item?.idFood ?? item?.id;

      // Find existing by idFood (or id fallback)
      const idx = state.favoriterecipes.findIndex(
        (r) => (r.idFood ?? r.id) === targetId
      );

      if (idx !== -1) {
        // Already in favorites → remove it
        state.favoriterecipes.splice(idx, 1);
      } else {
        // Not in favorites → add it
        state.favoriterecipes.push(item);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

// Optional selectors
export const selectFavorites = (state) => state.favorites.favoriterecipes;
export const selectIsFavoriteById = (idFood) => (state) =>
  state.favorites.favoriterecipes.some((r) => (r.idFood ?? r.id) === idFood);

export default favoritesSlice.reducer;
