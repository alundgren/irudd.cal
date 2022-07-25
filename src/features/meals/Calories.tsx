import React, { useState } from "react";
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
    return (<>
            <h3>Calories</h3>
            <TrackingBar currentValue={totalCalorieCount} maxValue={dailyCalorieBudget} onClick={onCaloriesClicked}/>
            {isAddingCalories ? <MealAdder/> : null}
    </>);
}