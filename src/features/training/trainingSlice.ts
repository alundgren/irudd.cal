import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { DatedItem } from "../../services/DateService";

export interface TrainingState {
    trainingSessions: TrainingSession[],
}

export interface TrainingSession extends DatedItem {
    notes: TrainingSessionNote[]
}

export interface TrainingSessionNote {
    noteText: string
    id: string
}

let initialState: TrainingState = {
    trainingSessions: []
};

let trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        createTrainingSession(state, action: PayloadAction<{ fullIsoDate: string, yearMonthDay: number, notes: TrainingSessionNote[], id: string }>) {
            state.trainingSessions =[...state.trainingSessions, { 
                fullIsoDate: action.payload.fullIsoDate,
                yearMonthDay: action.payload.yearMonthDay,
                notes: action.payload.notes, 
                id: action.payload.id }];
        },
        addOrEditTrainingSessionNote(state, action: PayloadAction<{ trainingSessionId: string, note: TrainingSessionNote }>) {
            let session = state.trainingSessions.find(x => x.id === action.payload.trainingSessionId);
            if(!session) {
                return
            }
            let existingNote = session.notes.find(x => x.id === action.payload.note.id);
            if(existingNote) {
                existingNote.noteText = action.payload.note.noteText
            } else {
                session.notes = [...session.notes, action.payload.note];
            }
        },
        setTrainingState(state, action: PayloadAction<TrainingState>) {
            return action.payload ?? initialState;
        }
    }
});

export const { createTrainingSession, addOrEditTrainingSessionNote, setTrainingState } = trainingSlice.actions;
export const trainingsSliceReducer = trainingSlice.reducer;