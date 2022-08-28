import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatedItem } from "../../services/DateService";
import generateItemId from "../../services/generateItemId";

export interface StepsState {
    dailySteps: DailySteps[],
    dailyStepsTargetCount: number
}

export interface DailySteps extends DatedItem {
    stepCount: number
}

let initialState: StepsState = {
    dailySteps: [],
    dailyStepsTargetCount: 10000
};

let stepsSlice = createSlice({
    name: 'steps',
    initialState,
    reducers: {
        setDailySteps(state, action: PayloadAction<{ fullIsoDate: string, yearMonthDay: number, stepCount: number }>) {
            state.dailySteps =[...state.dailySteps.filter(x => x.yearMonthDay !== action.payload.yearMonthDay), { 
                fullIsoDate: action.payload.fullIsoDate,
                yearMonthDay: action.payload.yearMonthDay,
                stepCount: action.payload.stepCount, 
                id: generateItemId() }];
        },
        removeDailySteps(state, action: PayloadAction<string>) {
            state.dailySteps = state.dailySteps.filter(x => x.id !== action.payload);
        },
        setStepsState(state, action: PayloadAction<StepsState>) {
            return action.payload ?? initialState;
        }
    }
});

export const { setDailySteps, removeDailySteps, setStepsState } = stepsSlice.actions;
export const stepsSliceReducer = stepsSlice.reducer;