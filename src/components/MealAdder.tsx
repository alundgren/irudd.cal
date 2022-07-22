import { faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SyntheticEvent, useState } from "react";
import { formatShortTime } from "../services/localization";
import { useDispatch, useSelector } from "react-redux";
import { CommonState } from "../features/common/commonSlice";
import { addMeal, Meal, MealsState, removeMeal } from "../features/meals/mealsSlice";
import DateService from "../services/DateService";

export default function MealAdder() {
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    const meals = useSelector((x: { meals: MealsState }) => x.meals.meals);
    const dispatch = useDispatch();
    const dateService = new DateService(dateSkew);
    
    let [mealType, setMealType] = useState('breakfast')
    let options = ['breakfast', 'lunch', 'dinner', 'treats', 'drinks']

    let [calorieCount, setCalorieCount] = useState('')
    let onCalorieCountChanged = (evt : React.ChangeEvent<HTMLInputElement>) => {
        setCalorieCount(evt.currentTarget.value)
    }
    let calorieCountParsed = parseInt(calorieCount)
    let isCalorieCountValid = !Number.isNaN(calorieCountParsed)

    let handleMealAdded = () => {
        dispatch(addMeal({
            date: dateService.getNow(),
            calorieCount: calorieCountParsed,
            type: mealType
        }))
        setCalorieCount('')
    }
    let handleAddClicked = (evt: SyntheticEvent) => {
        evt.preventDefault()
        handleMealAdded()
    }

    let handleRemoveClicked = (evt: SyntheticEvent, meal: Meal) => {
        evt.preventDefault();
        dispatch(removeMeal(meal.id));
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

    let today = DateService.getYearMonthDay(dateService.getNow());
    let dayMeals = meals.filter(x =>  x.yearMonthDay === today);

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
            {dayMeals.map(meal => (
                <div key={meal.id} className='d-flex align-items-center mt-2'>
                    <span style={{ width: 130 }}>{formatShortTime(new Date(meal.fullIsoDate))}</span>
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