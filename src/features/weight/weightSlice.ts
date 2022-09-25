import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DateService, { DatedItem } from "../../services/DateService";

export interface WeightState {
    dailyWeights: DailyWeight[],
    dailyWeightTarget: number
}

export interface DailyWeight extends DatedItem {
    weight: number
}

let generateItemId = () => Math.random().toString(36).substring(2, 8);

let initialState: WeightState = {
    dailyWeights: [],
    dailyWeightTarget: 58
};

export function getDailyWeight(weights: DailyWeight[], date: Date) {
    let dailyItems = DateService.getItemsForDate(weights, date);
    return dailyItems.length > 0 ? dailyItems[0].weight : 0;
}

let weightSlice = createSlice({
    name: 'weight',
    initialState,
    reducers: {
        setDailyWeight(state, action: PayloadAction<{ fullIsoDate: string, yearMonthDay: number, weight: number }>) {
            state.dailyWeights =[...state.dailyWeights.filter(x => x.yearMonthDay !== action.payload.yearMonthDay), { 
                fullIsoDate: action.payload.fullIsoDate,
                yearMonthDay: action.payload.yearMonthDay,
                weight: action.payload.weight, 
                id: generateItemId() }];
        },
        removeDailyWeight(state, action: PayloadAction<string>) {
            state.dailyWeights = state.dailyWeights.filter(x => x.id !== action.payload);
        },
        setWeightState(state, action: PayloadAction<WeightState>) {
            return action.payload ?? initialState;
        },
        setWeightTarget(state, action: PayloadAction<number>) {
            state.dailyWeightTarget = action.payload
        }
    }
});

export const { setDailyWeight, removeDailyWeight, setWeightState, setWeightTarget } = weightSlice.actions;
export const weightSliceReducer = weightSlice.reducer;