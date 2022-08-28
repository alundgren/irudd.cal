import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatedItem } from "../../services/DateService";
import generateItemId from "../../services/generateItemId";

export interface MealsState {
    meals: Meal[],
    dailyCalorieBudget: number
}

export interface Meal extends DatedItem {
    calorieCount: number
}

let initialState: MealsState = {
    meals: [],
    dailyCalorieBudget: 2600
};

let mealSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        addMeal(state, action: PayloadAction<{ fullIsoDate: string, yearMonthDay: number, calorieCount: number }>) {
            state.meals =[...state.meals, { 
                fullIsoDate: action.payload.fullIsoDate,
                yearMonthDay: action.payload.yearMonthDay,
                calorieCount: action.payload.calorieCount, 
                id: generateItemId() }];
        },
        removeMeal(state, action: PayloadAction<string>) {
            state.meals = state.meals.filter(x => x.id !== action.payload);
        },
        setMealsState(state, action: PayloadAction<MealsState>) {
            return action.payload ?? initialState;
        }
    }
});

export const { addMeal, removeMeal, setMealsState } = mealSlice.actions;
export const mealSliceReducer = mealSlice.reducer;