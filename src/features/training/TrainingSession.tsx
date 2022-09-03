import { faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Shell from "../../components/Shell";
import generateItemId from "../../services/generateItemId";
import { addOrEditTrainingSessionNote, removeTrainingSessionNote, setTrainingSessionTitle, TrainingSessionNote, TrainingState } from "./trainingSlice";

export default function TrainingSession() {
    const params = useParams<{ trainingSessionId : string}>();
    const training = useSelector((x: { training: TrainingState }) => x.training);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        };

        const handleJournalTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if(e.key !== 'Enter') {
                return;
            }
            e.preventDefault();
            handleJournalTextAdded();
        };

        const handleJournalTextRemoved = (note: TrainingSessionNote) => {
            dispatch(removeTrainingSessionNote({ trainingSessionId: trainingSessionId, noteId: note.id }));
        };

        const handleTrainingSessionTitleChange = (newTitle: string) => {
            dispatch(setTrainingSessionTitle({ trainingSessionId: trainingSessionId, title: newTitle }))
        };

        const handleEndSession = () => {
            navigate(`/`);
        };

        content = (<>
            <h3>Title</h3>
            <input className="form-control" value={currentTrainingSession.title} onChange={e => handleTrainingSessionTitleChange(e.currentTarget.value)} />
            <h3>Notes</h3>
            {currentTrainingSession?.notes.map(note => (
            <div className="input-group" key={note.id}>
                <input className="form-control" value={note.noteText} onChange={e => handleJournalNoteChange(e.currentTarget.value, note)} />
                <button className="btn" onClick={e => handleJournalTextRemoved(note)}>
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </div>
            ))}
            <div className="input-group">
                <input className="form-control"  type="text" value={newNoteText} onChange={e => setNewNoteText(e.currentTarget.value)} onKeyDown={handleJournalTextKeyDown} />
                <button className="btn" onClick={e => handleJournalTextAdded()}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div style={{ display:'flex', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={e => handleEndSession()}>
                    Return
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