import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatedItem } from "../../services/DateService";

export interface MealsState {
    meals: Meal[],
    dailyCalorieBudget: number
}

export interface Meal extends DatedItem {
    calorieCount: number
}

let generateItemId = () => Math.random().toString(36).substring(2, 8);

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
        setMeals(state, action: PayloadAction<Meal[]>) {
            state.meals = action.payload;
        }
    }
});

export const { addMeal, removeMeal, setMeals } = mealSlice.actions;
export const mealSliceReducer = mealSlice.reducer;