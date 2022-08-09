import TrackingBar from "../../components/TrackingBar";
import React from "react";
import { useSelector } from "react-redux";
import { StepsState } from "./stepsSlice";
import DateService from "../../services/DateService";
import { CommonState } from "../common/commonSlice";


export default function Steps() {
    const stepsData = useSelector((x: { steps: StepsState }) => x.steps);
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    
    let dateService = new DateService(dateSkew);
    let now = dateService.getNow();

    let onStepsClicked = () => {
        
    }
    let totalStepCount = 0;
    let todaySteps = DateService.getItemsForDate(stepsData.dailySteps, now);
    todaySteps.forEach(x => totalStepCount += x.stepCount);    
    
    return (<>
        <h3>Steps</h3>
        <TrackingBar currentValue={totalStepCount} maxValue={stepsData.dailyStepsTargetCount} onClick={onStepsClicked}/>
    </>);
}