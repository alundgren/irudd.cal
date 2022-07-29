import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CommonState } from "../common/commonSlice";
import { MealsState } from "./mealsSlice";
import DateService from "../../services/DateService";
import TrackingBar from "../../components/TrackingBar";
import MealAdder from "./MealAdder";

export default function Calories() {
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    const mealsData = useSelector((x: { meals: MealsState }) => x.meals);
    const meals = mealsData.meals;
    const dailyCalorieBudget = mealsData.dailyCalorieBudget;

    let [isAddingCalories, setIsAddingCalories] = useState(false);
    let dateService = new DateService(dateSkew);
    let now = dateService.getNow();

    let onCaloriesClicked = () => {
        setIsAddingCalories(!isAddingCalories);
    }
    let totalCalorieCount = 0;
    let today = DateService.getYearMonthDay(now);
    meals.filter(x => x.yearMonthDay === today).forEach(x => totalCalorieCount += x.calorieCount);

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