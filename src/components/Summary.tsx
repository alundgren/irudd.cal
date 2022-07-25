import Shell from './Shell';
import { formatShortDate } from '../services/localization';
import { useSelector } from "react-redux";
import { CommonState } from "../features/common/commonSlice";
import DateService from "../services/DateService";
import Calories from "../features/meals/Calories";

export default function Summary() {
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    let dateService = new DateService(dateSkew);

    return (
        <Shell activeMenuItem='summary' titleText={formatShortDate(dateService.getNow())}>
            <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
                <Calories />
            </section>
        </Shell>
    )
}