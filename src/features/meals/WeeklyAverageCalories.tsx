import { useSelector } from "react-redux";
import { CommonState } from "../common/commonSlice";
import { MealsState } from "./mealsSlice";
import DateService from "../../services/DateService";
import TrackingBar from "../../components/TrackingBar";

export default function WeeklyAverageCalories() {
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    const mealsData = useSelector((x: { meals: MealsState }) => x.meals);
    const meals = mealsData.meals;
    const dailyCalorieBudget = mealsData.dailyCalorieBudget;
    const dateService = new DateService(dateSkew);
    
    const now = dateService.getNow();
    const today = DateService.getYearMonthDay(now);
    const aWeekAgo = DateService.getYearMonthDay(DateService.addDaysToDate(now, -7));
    
    const weeklyMeals = meals.filter(x => x.yearMonthDay >= aWeekAgo && x.yearMonthDay < today);
    let uniqueDateCount = new Set(weeklyMeals.map(x => x.yearMonthDay)).size;
    let weeklyAverageCalories = 0;
    if(uniqueDateCount > 0) {
        weeklyMeals.forEach(x => weeklyAverageCalories += x.calorieCount);
        weeklyAverageCalories = Math.round(weeklyAverageCalories / uniqueDateCount);
    }

    return (<>           
        <h2>Weekly average calories</h2>
        <TrackingBar currentValue={weeklyAverageCalories} maxValue={dailyCalorieBudget} />
    </>);
}