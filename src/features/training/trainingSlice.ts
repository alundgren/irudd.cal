import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatedItem } from "../../services/DateService";

export interface TrainingState {
    trainingSessions: TrainingSession[],
}

export interface TrainingSession extends DatedItem {
    notes: string[]
}

let initialState: TrainingState = {
    trainingSessions: []
};

let trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        createTrainingSession(state, action: PayloadAction<{ fullIsoDate: string, yearMonthDay: number, notes: string[], id: string }>) {
            state.trainingSessions =[...state.trainingSessions, { 
                fullIsoDate: action.payload.fullIsoDate,
                yearMonthDay: action.payload.yearMonthDay,
                notes: action.payload.notes, 
                id: action.payload.id }];
        },
        setTrainingSessionNotes(state, action: PayloadAction<{ id: string, notes: string[] }>) {
            let session = state.trainingSessions.find(x => x.id === action.payload.id);
            if(!session) {
                return
            }
            session.notes = action.payload.notes;
        },
        setTrainingState(state, action: PayloadAction<TrainingState>) {
            return action.payload ?? initialState;
        }
    }
});

export const { createTrainingSession, setTrainingSessionNotes, setTrainingState } = trainingSlice.actions;
export const trainingsSliceReducer = trainingSlice.reducer;