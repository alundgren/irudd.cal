import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Temporal } from "temporal-polyfill";

export interface CommonState {
    viewDate: string,
    actualDate: string
}

let initialState: CommonState = {
    viewDate: Temporal.Now.plainDateISO().toString(),
    actualDate: Temporal.Now.plainDateISO().toString()
};

let commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setViewDate(state, action: PayloadAction<string>) {
            state.viewDate = action.payload.toString();
        },
        setDates(state, action: PayloadAction<string>) {
            state.viewDate = action.payload;
            state.actualDate = action.payload;
        }
    }
});

export const { setViewDate, setDates } = commonSlice.actions;
export const commonReducer = commonSlice.reducer;