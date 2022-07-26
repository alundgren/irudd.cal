import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonState {
    dateSkew: number
}

let initialState: CommonState = {
    dateSkew: 0
};

let commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setDateSkew(state, action: PayloadAction<number>) {
            state.dateSkew = action.payload
        }
    }
});

export const { setDateSkew } = commonSlice.actions;
export const commonReducer = commonSlice.reducer;