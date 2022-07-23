import DailyCalories from "./DailyCalories";
import WeeklyAverageCalories from "./WeeklyAverageCalories";

export default function MealsSummary() {        
    return (<>
        <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
            <DailyCalories />
            <WeeklyAverageCalories />
        </section>

    </>);
}