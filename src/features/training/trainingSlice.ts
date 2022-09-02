import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatedItem } from "../../services/DateService";

export interface TrainingState {
    trainingSessions: TrainingSession[],
}

export interface TrainingSession extends DatedItem {
    title: string
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
        createTrainingSession(state, action: PayloadAction<{ fullIsoDate: string, yearMonthDay: number, title: string, notes: TrainingSessionNote[], id: string }>) {
            state.trainingSessions =[...state.trainingSessions, { 
                fullIsoDate: action.payload.fullIsoDate,
                yearMonthDay: action.payload.yearMonthDay,
                notes: action.payload.notes, 
                id: action.payload.id,
                title: action.payload.title 
            }];
        },
        addOrEditTrainingSessionNote(state, action: PayloadAction<{ trainingSessionId: string, note: TrainingSessionNote }>) {
            let session = state.trainingSessions.find(x => x.id === action.payload.trainingSessionId);
            if(!session) {
                return;
            }
            let existingNote = session.notes.find(x => x.id === action.payload.note.id);
            if(existingNote) {
                existingNote.noteText = action.payload.note.noteText
            } else {
                session.notes = [...session.notes, action.payload.note];
            }
        },
        removeTrainingSessionNote(state, action: PayloadAction<{ trainingSessionId: string, noteId: string }>) {
            let session = state.trainingSessions.find(x => x.id === action.payload.trainingSessionId);
            if(!session) {
                return;
            }
            session.notes = session.notes.filter(x => x.id !== action.payload.noteId)
        },
        setTrainingState(state, action: PayloadAction<TrainingState>) {
            return action.payload ?? initialState;
        },
        setTrainingSessionTitle(state, action :PayloadAction<{ trainingSessionId: string, title: string }>) {
            let session = state.trainingSessions.find(x => x.id === action.payload.trainingSessionId);
            if(!session) {
                return;
            }
            session.title = action.payload.title;            
        }
    }
});

export const { createTrainingSession, addOrEditTrainingSessionNote, setTrainingState, removeTrainingSessionNote, setTrainingSessionTitle } = trainingSlice.actions;
export const trainingsSliceReducer = trainingSlice.reducer;