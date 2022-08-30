import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Shell from "../../components/Shell";
import { TrainingState } from "./trainingSlice";

export default function TrainingSession() {
    const params = useParams<{ trainingSessionId : string}>();
    const training = useSelector((x: { training: TrainingState }) => x.training);
    let currentTrainingSession = training.trainingSessions.find(x => x.id === params.trainingSessionId);

    return (<Shell activeMenuItem='training-session'>
        <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
            <h3>Notes</h3>
            {currentTrainingSession?.notes.map((x, index) => (<input className="form-control" type="text" value={x} key={index} />))}
            <input className="form-control"  type="text" />
        </section>
    </Shell>);
}