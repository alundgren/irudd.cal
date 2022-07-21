import { faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SyntheticEvent, useState } from "react";
import { addDaysToDate, formatShortTime, getYearMonthDay } from "../services/localization";

export interface Meal {
    id: string,
    fullDate: string,
    yearMonthDay: number,
    type: string,
    calorieCount: number
}
export interface MealAdderProps {
    meals: Meal[],
    onMealAdded: (meal: Meal) => void,
    onMealRemoved: (id: string) => void,
    dateSkew: number
}

export default function MealAdder({meals, onMealAdded, dateSkew, onMealRemoved}: MealAdderProps) {
    let [mealType, setMealType] = useState('breakfast')
    let options = ['breakfast', 'lunch', 'dinner', 'treats', 'drinks']

    let [calorieCount, setCalorieCount] = useState('')
    let onCalorieCountChanged = (evt : React.ChangeEvent<HTMLInputElement>) => {
        setCalorieCount(evt.currentTarget.value)
    }
    let calorieCountParsed = parseInt(calorieCount)
    let isCalorieCountValid = !Number.isNaN(calorieCountParsed)

    const generateItemId = () => Math.random().toString(36).substring(2, 8);

    let handleMealAdded = () => {
        let now = addDaysToDate(new Date(), dateSkew);
        onMealAdded({
            id: generateItemId(),
            fullDate: now.toISOString(),
            yearMonthDay: getYearMonthDay(now),
            type: mealType,
            calorieCount: calorieCountParsed
        })
        setCalorieCount('')
    }
    let handleAddClicked = (evt: SyntheticEvent) => {
        evt.preventDefault()
        handleMealAdded()
    }

    let handleRemoveClicked = (evt: SyntheticEvent, meal: Meal) => {
        evt.preventDefault();
        onMealRemoved(meal.id);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') {
            return;
        }
        e.preventDefault();
        if(!isCalorieCountValid) {
            return
        }
        handleMealAdded()
    };

    let today = getYearMonthDay(addDaysToDate(new Date(), dateSkew));
    let todaysMeals = meals.filter(x =>  x.yearMonthDay === today);

    return (
        <>
            <div className="input-group">
                <select className="form-select" value={mealType} key={mealType} onChange={e => setMealType(e.currentTarget.value)} style={{textTransform: 'capitalize', maxWidth:130}}>
                    {options.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
                <input className="form-control"  type="number" pattern="[0-9]*" inputMode="numeric" placeholder="Nr of calories" value={calorieCount}
                       onChange={onCalorieCountChanged} onKeyDown={handleInputKeyDown} />
                <button className="btn" disabled={!isCalorieCountValid} onClick={handleAddClicked}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {todaysMeals.map(meal => (
                <div key={meal.id} className='d-flex align-items-center mt-2'>
                    <span style={{ width: 130 }}>{formatShortTime(new Date(meal.fullDate))}</span>
                    <span style={{ width: 200 }}>
                        <strong>+{meal.calorieCount}</strong> 
                        <small className="ms-1">({meal.type})</small>                       
                    </span>
                    <FontAwesomeIcon className="text-danger" icon={faRemove} onClick={x => { handleRemoveClicked(x, meal) }}/> 
                </div>
            ))}
        </>
    )
}