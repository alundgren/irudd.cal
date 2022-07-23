import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DateService from "../../services/DateService";

export interface MealsState {
    meals: Meal[]
}

export interface Meal {
    id: string,
    fullIsoDate: string,
    yearMonthDay: number,
    type: string,
    calorieCount: number
}

let generateItemId = () => Math.random().toString(36).substring(2, 8);

let initialState: MealsState = {
    meals: []
};

let mealSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        addMeal(state, action: PayloadAction<{ date: Date, calorieCount: number, type: string }>) {
            state.meals =[...state.meals, { 
                fullIsoDate: DateService.toIsoString(action.payload.date),
                yearMonthDay: DateService.getYearMonthDay(action.payload.date), 
                calorieCount: action.payload.calorieCount, 
                type: action.payload.type,
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