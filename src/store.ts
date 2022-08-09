import { configureStore } from "@reduxjs/toolkit";
import { mealSliceReducer, MealsState, setMeals } from "./features/meals/mealsSlice";
import { commonReducer, CommonState } from "./features/common/commonSlice";
import { get, set } from 'idb-keyval';
import { stepsSliceReducer } from "./features/steps/stepsSlice";

function createStore() {
    return configureStore({
        reducer: {
            meals: mealSliceReducer,
            common: commonReducer,
            steps: stepsSliceReducer
        }
    })
}

export interface StoreSlices {
    meals: MealsState,
    common: CommonState
}

export function createStoreAndSetupIndexedDb() {
    let store = createStore();
    const dbLegacyKey = 'meals.20220722.01';
    const dbKey = 'irudd.cal.store.20020801.01'
    return get(dbLegacyKey).then(x => {
        if (x) {
            let parsed = JSON.parse(x);
            store.dispatch(setMeals(parsed.meals || []));
        }
        store.subscribe(() => {
            let storeState = store.getState();
            set(dbKey, storeState).then(() => {
                set(dbLegacyKey, JSON.stringify({meals: storeState.meals.meals}));
            })            
        });        
        return store;
    });
}