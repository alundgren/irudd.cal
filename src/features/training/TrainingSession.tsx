import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Shell from "../../components/Shell";
import generateItemId from "../../services/generateItemId";
import { addOrEditTrainingSessionNote, TrainingSessionNote, TrainingState } from "./trainingSlice";

export default function TrainingSession() {
    const params = useParams<{ trainingSessionId : string}>();
    const training = useSelector((x: { training: TrainingState }) => x.training);
    const dispatch = useDispatch();
    let [newNoteText, setNewNoteText] = useState('');

    let currentTrainingSession = training.trainingSessions.find(x => x.id === params.trainingSessionId);    
    let content = <></>
    if(!currentTrainingSession) {
        content = <div>No such session exists</div>
    } else {
        let trainingSessionId = currentTrainingSession.id
        let handleJournalNoteChange = (newText: string, note: TrainingSessionNote) => {
            dispatch(addOrEditTrainingSessionNote({
                trainingSessionId: trainingSessionId,
                note: {
                    noteText: newText,
                    id: note.id
                }
            }))
        };
        let handleJournalTextAdded = () => {
            if(!newNoteText) {
                return;
            }
            dispatch(addOrEditTrainingSessionNote({
                trainingSessionId: trainingSessionId,
                note: {
                    noteText: newNoteText,
                    id:  generateItemId()
                }
            }));
            setNewNoteText('');
        }
//TODO: On keydown add note
        content = (<>
            <h3>Notes</h3>
            {currentTrainingSession?.notes.map(note => (<input className="form-control" type="text" value={note.noteText} key={note.id} onChange={e => handleJournalNoteChange(e.currentTarget.value, note)} />))}
            <div className="input-group">
                <input className="form-control"  type="text" value={newNoteText} onChange={e => setNewNoteText(e.currentTarget.value)} />
                <button className="btn" onClick={e => handleJournalTextAdded()}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>            
        </>);
    }


    return (<Shell activeMenuItem='training-session'>
        <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
            {content}
        </section>
    </Shell>);
}