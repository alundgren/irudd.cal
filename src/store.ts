import { configureStore } from "@reduxjs/toolkit";
import { mealSliceReducer, MealsState, setMeals } from "./features/meals/mealsSlice";
import { commonReducer, CommonState } from "./features/common/commonSlice";
import { get, set } from 'idb-keyval';

function createStore() {
    return configureStore({
        reducer: {
            meals: mealSliceReducer,
            common: commonReducer
        }
    })
}

export interface StoreSlices {
    meals: MealsState,
    common: CommonState
}

export function createStoreAndSetupIndexedDb() {
    let store = createStore();
    let dbKey = 'meals.20220722.01';
    return get(dbKey).then(x => {
        if (x) {
            let parsed = JSON.parse(x);
            store.dispatch(setMeals(parsed.meals || []));
        }
        store.subscribe(() => {
            set(dbKey, JSON.stringify({meals: store.getState().meals.meals}));
        });        
        return store;
    });
}