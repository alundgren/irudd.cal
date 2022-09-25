import { useDispatch, useSelector } from "react-redux";
import { MealsState, setDailyCalorieBudget } from "../features/meals/mealsSlice";
import { setDailyStepsTargetCount, StepsState } from "../features/steps/stepsSlice";
import { setWeightTarget, WeightState } from "../features/weight/weightSlice";
import Shell from "./Shell";

export default function Settings() {
    const dispatch = useDispatch();
    const weightData = useSelector((x: { weight: WeightState }) => x.weight);
    const stepsData = useSelector((x: { steps: StepsState }) => x.steps);
    const mealsData = useSelector((x: { meals: MealsState }) => x.meals);

    return  <Shell activeMenuItem='settings'>
                <div className="d-flex flex-column" style={{gap: 30}}>
                    <div className="form-group">
                            <label>Weight target</label>
                            <input className="form-control"  type="number" pattern="[0-9]*" inputMode="numeric" placeholder="Todays total steps" value={weightData.dailyWeightTarget}
                                onChange={e => dispatch(setWeightTarget(parseInt(e.currentTarget.value)))} />
                        </div>
                        <div className="form-group">
                            <label>Daily steps target</label>
                            <input className="form-control"  type="number" pattern="[0-9]*" inputMode="numeric" placeholder="Todays total steps" value={stepsData.dailyStepsTargetCount}
                                onChange={e => dispatch(setDailyStepsTargetCount(parseInt(e.currentTarget.value)))} />
                        </div>
                        <div className="form-group">
                            <label>Daily calories target</label>
                            <input className="form-control"  type="number" pattern="[0-9]*" inputMode="numeric" placeholder="Todays total steps" value={mealsData.dailyCalorieBudget}
                                onChange={e => dispatch(setDailyCalorieBudget(parseInt(e.currentTarget.value)))} />
                        </div>
                </div>              
            </Shell>    
}
