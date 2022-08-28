import { useParams } from "react-router-dom";

export default function TrainingSession() {
    const params = useParams<{ trainingSessionId : string}>();

    return (<div>Test: {params.trainingSessionId}</div>);
}