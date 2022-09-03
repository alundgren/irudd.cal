import { useSelector } from "react-redux";
import DateService from "../../services/DateService";
import { CommonState } from "../common/commonSlice";
import TrainingSessionSummary from "./TrainingSessionSummary";
import { TrainingState } from "./trainingSlice";

export default function Training() {
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    const training = useSelector((x: { training: TrainingState }) => x.training);
        
    const dateService = new DateService(dateSkew);

    let trainingSessionsToday = DateService.getItemsForDate(training.trainingSessions, dateService.getNow());

    return (<>
        <h3>Training</h3>
        <ul className="list-group">
            {trainingSessionsToday.map(trainingSession => 
                <TrainingSessionSummary trainingSession={trainingSession} key={trainingSession.id} />)}
        </ul>     
    </>);
}

