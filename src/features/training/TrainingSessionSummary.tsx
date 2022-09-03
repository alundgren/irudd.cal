import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrainingSession } from "./trainingSlice";

export default function TrainingSessionSummary({trainingSession}: { trainingSession: TrainingSession }) {
    let [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const handleToggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    const handleEditSession = () => {
        navigate(`/training-session/${trainingSession.id}`);
    }

    return <li className="list-group-item" key={trainingSession.id}>
        <div className="d-flex justify-content-center align-items-center">
            <div className="flex-grow-1">{trainingSession.title}</div>
            <button className="btn" onClick={e => handleToggleExpanded()}>
                <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} />
            </button>                    
        </div>
        {isExpanded ? 
        <ul className="list-group list-group-flush" style={{ height: 200}}>
            {trainingSession.notes.map(noteText => 
                <li className="list-group-item" key={noteText.id}>{noteText.noteText}</li>
            )}
            <li className="list-group-item d-flex align-items-center justify-content-end"><button onClick={e => handleEditSession()} className="btn btn-primary">Edit</button></li>
        </ul> : null}
    </li>
}