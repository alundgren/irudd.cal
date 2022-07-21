import React, { useEffect, useState } from 'react';
import MealAdder, { Meal } from './MealAdder';
import Shell from './Shell';
import TrackingBar from './TrackingBar';
import { formatShortDate } from '../services/localization';
import { get, update } from 'idb-keyval';

const dailyCalorieBudget = 2600;
const mealsKey = 'meals.v1';

export default function Day({dateSkew, setDateSkew}: { dateSkew: number, setDateSkew: React.Dispatch<React.SetStateAction<number>> }) {
    let [isAddingCalories, setIsAddingCalories] = useState(true);
    let [meals, setMeals] = useState(null as Meal[] | null);
    let now = new Date();
    now.setDate(now.getDate() + dateSkew)

    let parseStoredMeals = (x : string) => (x ? JSON.parse(x) : []) as Meal[];

    useEffect(() => {
        get(mealsKey).then(x => setMeals(parseStoredMeals(x)));
    }, [])

    let content : JSX.Element = <p>Loading...</p>;

    if(meals !== null) {
        let onCaloriesClicked = () => {
            setIsAddingCalories(!isAddingCalories);
        }    
    
        let onMealAdded = (meal: Meal) => {
            update(mealsKey, oldValue => {
                let currentStoredMeals = parseStoredMeals(oldValue);
                currentStoredMeals = [...currentStoredMeals, meal];
                setMeals(currentStoredMeals);
                return JSON.stringify(currentStoredMeals);
            })
        }

        let totalCalorieCount = 0;
        meals.forEach(x => totalCalorieCount += x.calorieCount);
        content = (<>
            <TrackingBar currentValue={totalCalorieCount} maxValue={dailyCalorieBudget} onClick={onCaloriesClicked} />
            {isAddingCalories ? <MealAdder meals={meals} onMealAdded={onMealAdded} dateSkew={dateSkew} /> : null}        
        </>);
    }

    let today = formatShortDate(now)

    return (
        <Shell activeMenuItem='day' titleText={today} dateSkew={dateSkew} setDateSkew={setDateSkew}>
            <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
                <h2>Daily calories</h2>
                {content}
            </section>
        </Shell>
    )
}