import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatedItem } from "../../services/DateService";

export interface TrainingState {
    trainingSessions: TrainingSession[],
}

export interface TrainingSession extends DatedItem {
    journalText: string
    isClosed: boolean
}

let initialState: TrainingState = {
    trainingSessions: []
};

let trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        createTrainingSession(state, action: PayloadAction<{ fullIsoDate: string, yearMonthDay: number, journalText: string, id: string }>) {
            state.trainingSessions =[...state.trainingSessions, { 
                fullIsoDate: action.payload.fullIsoDate,
                yearMonthDay: action.payload.yearMonthDay,
                journalText: action.payload.journalText, 
                id: action.payload.id, isClosed: false }];
        },
        updateTrainingSessionJournalText(state, action: PayloadAction<{ id: string, journalText: string }>) {
            let session = state.trainingSessions.find(x => x.id === action.payload.id);
            if(!session) {
                return
            }
            session.journalText = action.payload.journalText;
        },
        setIsTrainingSessionClosed(state, action: PayloadAction<{ id: string, isClosed: boolean }>) {
            let session = state.trainingSessions.find(x => x.id === action.payload.id);
            if(!session) {
                return
            }
            session.isClosed = action.payload.isClosed;
        },
        setTrainingState(state, action: PayloadAction<TrainingState>) {
            return action.payload ?? initialState;
        }
    }
});

export const { createTrainingSession, updateTrainingSessionJournalText, setTrainingState } = trainingSlice.actions;
export const trainingsSliceReducer = trainingSlice.reducer;