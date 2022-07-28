import Shell from './Shell';
import Calories from "../features/meals/Calories";

export default function Summary() {

    return (
        <Shell activeMenuItem='summary'>
            <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
                <Calories />
            </section>
        </Shell>
    )
}