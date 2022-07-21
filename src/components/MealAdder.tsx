import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SyntheticEvent, useState } from "react";
import { addDaysToDate, getYearMonthDay } from "../services/localization";

export interface Meal {
    id: string,
    fullDate: Date,
    yearMonthDay: number,
    type: string,
    calorieCount: number
}
export interface MealAdderProps {
    meals: Meal[],
    onMealAdded: (meal: Meal) => void,
    dateSkew: number
}

export default function MealAdder({meals, onMealAdded, dateSkew}: MealAdderProps) {
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
            fullDate: now,
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
                <div key={meal.id}>
                    <span>{meal.type}</span>
                    <span>{meal.calorieCount}</span>
                    <span>{meal.fullDate.toLocaleString('short')}</span>
                </div>
            ))}
        </>
    )
}