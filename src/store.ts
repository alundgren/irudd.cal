import { configureStore } from "@reduxjs/toolkit";
import { mealSliceReducer, MealsState, setMealsState } from "./features/meals/mealsSlice";
import { commonReducer, CommonState, setDates } from "./features/common/commonSlice";
import { get, set } from 'idb-keyval';
import { setStepsState, stepsSliceReducer, StepsState } from "./features/steps/stepsSlice";
import { setWeightState, weightSliceReducer, WeightState } from "./features/weight/weightSlice";
import { setTrainingState, trainingsSliceReducer, TrainingState } from "./features/training/trainingSlice";
import { Temporal } from "temporal-polyfill";

export function createStore() {
    return configureStore({
        reducer: {
            meals: mealSliceReducer,
            common: commonReducer,
            steps: stepsSliceReducer,
            weight: weightSliceReducer,
            training: trainingsSliceReducer
        }
    })
}

export interface StoreSlices {
    meals: MealsState,
    common: CommonState,
    steps: StepsState,
    weight: WeightState,
    training: TrainingState
}

export function createStoreAndSetupIndexedDb() {
    let store = createStore();
    const dbKey = 'irudd.cal.store.20240618.02'
    return get(dbKey).then(y => {
        if(y) {
            let parsed = JSON.parse(y) as StoreSlices;
            store.dispatch(setDates(Temporal.Now.plainDateISO().toString()));
            store.dispatch(setMealsState(parsed.meals));
            store.dispatch(setStepsState(parsed.steps));            
            store.dispatch(setWeightState(parsed.weight));
            store.dispatch(setTrainingState(parsed.training));            
        }
        store.subscribe(() => {
            let storeState = store.getState();
            set(dbKey, JSON.stringify(storeState));
        });
        return store;
    });    
}