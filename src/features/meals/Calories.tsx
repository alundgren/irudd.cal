import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CommonState } from "../common/commonSlice";
import { MealsState } from "./mealsSlice";
import DateService from "../../services/DateService";
import TrackingBar from "../../components/TrackingBar";
import MealAdder from "./MealAdder";

export default function Calories() {
    const dateService = new DateService(useSelector((x: { common: CommonState }) => x.common));
    const mealsData = useSelector((x: { meals: MealsState }) => x.meals);
    const meals = mealsData.meals;
    const dailyCalorieBudget = mealsData.dailyCalorieBudget;

    let [isAddingCalories, setIsAddingCalories] = useState(false);

    let now = dateService.getActiveDate();

    let onCaloriesClicked = () => {
        setIsAddingCalories(!isAddingCalories);
    }
    let totalCalorieCount = 0;    
    let todayMeals = DateService.getItemsForDate(meals, now);
    todayMeals.forEach(x => totalCalorieCount += x.calorieCount);

    useEffect(() => {
        /*
        * Go back to the default view after a few minutes. Mainly so the app is always in the default state in the morning.
        */
        const FiveMinutesAsMilliseconds = 5 * 1000 * 60;
        if(isAddingCalories) {
            const timer = setTimeout(() => {
                setIsAddingCalories(false);
            }, FiveMinutesAsMilliseconds);
            return () => clearTimeout(timer);            
        }
    });
    
    return (<>
            <h3>Calories</h3>
            <TrackingBar currentValue={totalCalorieCount} maxValue={dailyCalorieBudget} onClick={onCaloriesClicked}/>
            {isAddingCalories ? <MealAdder/> : null}
    </>);
}