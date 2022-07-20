import { useState } from 'react';
import MealAdder, { Meal } from './MealAdder';
import Shell from './Shell';
import TrackingBar from './TrackingBar';
import { formatShortDate } from '../services/localization';

export default function Day() {
    let [isAddingCalories, setIsAddingCalories] = useState(true)
    let [meals, setMeals] = useState([] as Meal[])

    let onCaloriesClicked = () => {
        setIsAddingCalories(!isAddingCalories)
    }

    let onMealAdded = (meal: Meal) => {
        setMeals([...meals, meal])
    }

    let totalCalorieCount = 0
    meals.forEach(x => totalCalorieCount += x.calorieCount)


    let today = formatShortDate(new Date())

    return (
        <Shell activeMenuItem='day' titleText={today}>
            <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
                <h2>Daily calories</h2>
                <TrackingBar currentValue={totalCalorieCount} maxValue={2500} onClick={onCaloriesClicked} />
                {isAddingCalories ? <MealAdder meals={meals} onMealAdded={onMealAdded} /> : null}
            </section>
        </Shell>
    )
}