import Shell from './Shell';
import Calories from "../features/meals/Calories";
import Steps from "../features/steps/Steps";

export default function Summary() {

    return (
        <Shell activeMenuItem='summary'>
            <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
                <Calories />
                <Steps />
            </section>
        </Shell>
    )
}