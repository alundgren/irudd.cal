import { faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommonState } from "../common/commonSlice";
import { addMeal, Meal, MealsState, removeMeal } from "./mealsSlice";
import DateService from "../../services/DateService";
import { formatShortTime } from "../../services/localization";

export default function MealAdder() {
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    const mealsData = useSelector((x: { meals: MealsState }) => x.meals);
    const meals = mealsData.meals;
    
    const dispatch = useDispatch();
    const dateService = new DateService(dateSkew);

    let [calorieCount, setCalorieCount] = useState('');
    let onCalorieCountChanged = (evt : React.ChangeEvent<HTMLInputElement>) => {
        setCalorieCount(evt.currentTarget.value)
    }
    let calorieCountParsed = parseInt(calorieCount)
    let isCalorieCountValid = !Number.isNaN(calorieCountParsed)

    let handleMealAdded = () => {
        let dateAdded = dateService.getNow();
        dispatch(addMeal({
            fullIsoDate: DateService.toIsoString(dateAdded),
            yearMonthDay: DateService.getYearMonthDay(dateAdded),
            calorieCount: calorieCountParsed
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

    let now = dateService.getNow();
    let dayMeals = DateService.getItemsForDate(meals, now);
    
    let caloriesRemaining = mealsData.dailyCalorieBudget - dayMeals.reduce((sum, meal) => sum + meal.calorieCount, 0);

    const weeklyMeals = DateService.getItemsForWeek(meals, now);
    let uniqueDateCount = DateService.getUniqueDateCount(weeklyMeals);
    let weeklyAverageCalories = 0;
    if(uniqueDateCount > 0) {
        weeklyMeals.forEach(x => weeklyAverageCalories += x.calorieCount);
        weeklyAverageCalories = Math.round(weeklyAverageCalories / uniqueDateCount);
    }
    
    return (
        <>
            <div className="input-group">
                <input className="form-control"  type="number" pattern="[0-9]*" inputMode="numeric" placeholder="Nr of calories" value={calorieCount}
                       onChange={onCalorieCountChanged} onKeyDown={handleInputKeyDown} />
                <button className="btn" disabled={!isCalorieCountValid} onClick={handleAddClicked}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {dayMeals.map(meal => (
                <div key={meal.id} className='d-flex align-items-center mt-2'>
                    <span style={{ width: 160 }}>{formatShortTime(new Date(meal.fullIsoDate))}</span>
                    <span style={{ width: 170 }}>
                        <strong>+{meal.calorieCount}</strong> 
                    </span>
                    <FontAwesomeIcon className="text-danger" icon={faRemove} onClick={x => { handleRemoveClicked(x, meal) }}/> 
                </div>
            ))}
            <div className='d-flex align-items-center mt-2'>
                <span style={{ width: 160 }}>Remaining today</span>
                <span style={{ width: 170 }}>
                    <strong>{caloriesRemaining}</strong> 
                </span>                
            </div>
            <div className='d-flex align-items-center mt-2'>
                <span style={{ width: 160 }}>Weekly average</span>
                <span style={{ width: 170 }}>
                    <strong>{weeklyAverageCalories}</strong> 
                </span>
            </div>           
            
        </>
    )
}