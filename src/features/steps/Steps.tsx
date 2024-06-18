import TrackingBar from "../../components/TrackingBar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDailySteps, StepsState } from "./stepsSlice";
import DateService from "../../services/DateService";
import { CommonState } from "../common/commonSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default function Steps() {
    const stepsData = useSelector((x: { steps: StepsState }) => x.steps);
    const dateService = new DateService(useSelector((x: { common: CommonState }) => x.common));
    const dispatch = useDispatch();
    const [isStepsInvalid, setIsStepsInvalid] = useState(false);
    
    const [isEditingStepCount, setIsEditingStepCount] = useState(false);    
        
    let now = dateService.getActiveDate();

    let onStepsClicked = () => {
        setIsEditingStepCount(lastValue => !lastValue);
    }
    let totalStepCount = 0;
    let todaySteps = DateService.getItemsForDate(stepsData.dailySteps, now);
    todaySteps.forEach(x => totalStepCount += x.stepCount);
    let initialEditStepCount = '';
    const [editStepCount, setEditStepCount] = useState(initialEditStepCount);
    if(!isEditingStepCount && editStepCount !== initialEditStepCount) {
        //Makes sure that if you timetravel with the editor closed it will recalculate the initial value
        //to be for that day instead of the last you edited.
        setEditStepCount(initialEditStepCount);
    }

    const changeDailySteps = () => {
        let newTotalSteps = parseInt(editStepCount)
        if(Number.isNaN(newTotalSteps)) {
            setIsStepsInvalid(true);
        } else {       
            dispatch(setDailySteps({ fullIsoDate: DateService.toIsoString(now), yearMonthDay: DateService.getYearMonthDay(now), stepCount: newTotalSteps }));
            setIsEditingStepCount(false);
            setEditStepCount(initialEditStepCount);
            setIsStepsInvalid(false);
        } 
    };

    const handleSetClicked = (e : React.SyntheticEvent) => {
        changeDailySteps();
    };
    
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return;
        e.preventDefault();
        changeDailySteps();
    };    
    
    return (<>
        <h3>Steps</h3>
        <TrackingBar currentValue={totalStepCount} maxValue={stepsData.dailyStepsTargetCount} onClick={onStepsClicked} moreIsBetter={true}/>
        {isEditingStepCount ? <div className="input-group">
            <input className="form-control"  type="number" pattern="[0-9]*" inputMode="numeric" placeholder="Todays total steps" value={editStepCount}
                   onChange={e => setEditStepCount(e.currentTarget.value)} onKeyDown={handleInputKeyDown} />
            <button className="btn" disabled={isStepsInvalid} onClick={handleSetClicked}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div> : null}
    </>);
}