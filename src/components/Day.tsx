import React, { useState } from 'react';
import Shell from './Shell';
import TrackingBar from './TrackingBar';
import { formatShortDate } from '../services/localization';
import { useSelector } from "react-redux";
import { CommonState } from "../features/common/commonSlice";
import { MealsState } from "../features/meals/mealsSlice";
import MealAdder from "./MealAdder";
import DateService from "../services/DateService";

const dailyCalorieBudget = 2600;

export default function Day() {
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    const meals = useSelector((x: { meals: MealsState }) => x.meals.meals);
     
    let [isAddingCalories, setIsAddingCalories] = useState(true);
    
    let dateService = new DateService(dateSkew);

    let content: JSX.Element = <p>Loading...</p>;
    let content2: JSX.Element = <p>Loading...</p>;

    let now = dateService.getNow();
    if (meals !== null) {
        let onCaloriesClicked = () => {
            setIsAddingCalories(!isAddingCalories);
        }
        let totalCalorieCount = 0;        
        let today = DateService.getYearMonthDay(now);
        meals.filter(x => x.yearMonthDay === today).forEach(x => totalCalorieCount += x.calorieCount);
        content = (<>
            <TrackingBar currentValue={totalCalorieCount} maxValue={dailyCalorieBudget} onClick={onCaloriesClicked}/>
            {isAddingCalories ? <MealAdder/> : null}
        </>);
/*
        let aWeekAgo = getYearMonthDay(addDaysToDate(now, -7));
        let weeklyMeals = meals.filter(x => x.yearMonthDay <= today && x.yearMonthDay >= aWeekAgo);
 */
        //TODO: Sum by date and compute rolling average
        content2 = (<>

        </>);
    }

    return (
        <Shell activeMenuItem='day' titleText={formatShortDate(now)}>
            <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
                <h2>Daily calories</h2>
                {content}
                <h2>Weekly average calories</h2>
                {content2}
            </section>
        </Shell>
    )
}