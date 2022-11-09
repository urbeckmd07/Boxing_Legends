import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectNewBoxerOpen: false,
  selectEditInfoOpen: false,
  selectCurrentBoxerOpen: {
    id: "",
    name: "",
    debut: "",
    retire: "",
    wins: "",
    losses: "",
    draws: "",
    imageName: "",
    info: "",
  },
  newInfotoAppend: "",
};

export const selectBoxerSlice = createSlice({
  name: "selectBoxer",
  initialState,
  reducers: {
    selectViewBoxer: (state, action) => {
      state.selectNewBoxerOpen = true;
      state.selectCurrentBoxerOpen = action.payload;
    },
    deselectViewBoxer: (state, action) => {
      state.selectNewBoxerOpen = false;
      state.selectEditInfoOpen = false;
      state.selectCurrentBoxerOpen = {
        id: "",
        name: "",
        debut: "",
        retire: "",
        wins: "",
        losses: "",
        draws: "",
        imageName: "",
        info: "",
      };
    },
    boxerBeingViewed: (state, action) => {
      state.selectCurrentBoxerOpen = action.payload;
    },
    toggleEditInfoBar: (state, action) => {
      state.selectEditInfoOpen = !state.selectEditInfoOpen;
    },
    setInfoBeingAdded: (state, action) => {
      state.newInfotoAppend = action.payload;
    },
  },
});

export const { selectViewBoxer, deselectViewBoxer, boxerBeingViewed, toggleEditInfoBar, setInfoBeingAdded } =
  selectBoxerSlice.actions;

export const selectToViewBoxer = (state) =>
  state.selectBoxer.selectNewBoxerOpen;
export const selectToEditInfo = (state) => 
  state.selectBoxer.selectEditInfoOpen;
export const selectCurrentBoxer = (state) =>
  state.selectBoxer.selectCurrentBoxerOpen;
export const selectNewInfoToAppend = (state) => 
  state.selectBoxer.newInfotoAppend;

export default selectBoxerSlice.reducer;
