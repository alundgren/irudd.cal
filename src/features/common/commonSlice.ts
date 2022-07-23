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
        changeDateSkew(state, action: PayloadAction<number>) {
            state.dateSkew = state.dateSkew + action.payload
        }
    }
});

export const { changeDateSkew } = commonSlice.actions;
export const commonReducer = commonSlice.reducer;