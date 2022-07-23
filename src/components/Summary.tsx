import Shell from './Shell';
import { formatShortDate } from '../services/localization';
import MealsSummary from "../features/meals/MealsSummary";
import { useSelector } from "react-redux";
import { CommonState } from "../features/common/commonSlice";
import DateService from "../services/DateService";

export default function Summary() {
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    let dateService = new DateService(dateSkew);

    return (
        <Shell activeMenuItem='summary' titleText={formatShortDate(dateService.getNow())}>
            <MealsSummary/>
        </Shell>
    )
}