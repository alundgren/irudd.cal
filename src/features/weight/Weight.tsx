import TrackingBar from "../../components/TrackingBar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateService from "../../services/DateService";
import { CommonState } from "../common/commonSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getDailyWeight, setDailyWeight, WeightState } from "./weightSlice";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


export default function Weight() {
    const weightData = useSelector((x: { weight: WeightState }) => x.weight);
    const dateService = new DateService(useSelector((x: { common: CommonState }) => x.common));
    const dispatch = useDispatch();
    const [isWeightInvalid, setIsWeightInvalid] = useState(false);
    
    const [isEditingWeight, setIsEditingWeight] = useState(false);    
        
    let now = dateService.getActiveDate();

    let onWeightClicked = () => {
        setIsEditingWeight(lastValue => !lastValue);
    }
    let todayWeight = getDailyWeight(weightData.dailyWeights, now);    

    const [editWeight, setEditWeight] = useState('');

    const changeDailyWeight = () => {
        let newWeight = parseFloat(editWeight)
        if(Number.isNaN(newWeight)) {
            setIsWeightInvalid(true);
        } else {       
            dispatch(setDailyWeight({ fullIsoDate: DateService.toIsoString(now), yearMonthDay: DateService.getYearMonthDay(now), weight: newWeight }));
            setIsEditingWeight(false);
            setEditWeight('');
            setIsWeightInvalid(false);
        } 
    };

    const handleSetClicked = (e : React.SyntheticEvent) => {
        changeDailyWeight();
    };
    
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return;
        e.preventDefault();
        changeDailyWeight();
    };

    let monthlyWeightGraphData = DateService
        .getItemsForMonth(weightData.dailyWeights, now, true).map(x => ({
            name: 'Weight',
            weight: x.weight,
            targetWeight: weightData.dailyWeightTarget,
            yearMonthDay : x.yearMonthDay
        }));    
    monthlyWeightGraphData = monthlyWeightGraphData.sort((x, y) => x.yearMonthDay - y.yearMonthDay);
    
    return (<>
        <h3>Weight</h3>
        <TrackingBar currentValue={todayWeight} maxValue={weightData.dailyWeightTarget} onClick={onWeightClicked} noWarnings={true} />
        {isEditingWeight ? <div className="input-group">            
            <input className="form-control"  type="number" inputMode="decimal" placeholder="Todays weight" value={editWeight}
                   onChange={e => setEditWeight(e.currentTarget.value)} onKeyDown={handleInputKeyDown} />
            <button className="btn" disabled={isWeightInvalid} onClick={handleSetClicked}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div> : null}
        {isEditingWeight ? <div>
            <h4>Monthly trend</h4>
            <ResponsiveContainer width="100%" height={150}>
                <LineChart data={monthlyWeightGraphData}>
                    <XAxis dataKey="name" tick={false}/>
                    <YAxis domain={['auto', 'auto']}/>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                    <Line type="monotone" dataKey="targetWeight" stroke="#28a745" dot={false} />
                    #28a745
                </LineChart>
            </ResponsiveContainer>
        </div> : null}       
    </>);
}