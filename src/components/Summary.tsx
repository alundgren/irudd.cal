import Shell from './Shell';
import Calories from "../features/meals/Calories";
import Steps from "../features/steps/Steps";
import Weight from "../features/weight/Weight";
import Training from '../features/training/Training';

export default function Summary() {
    return (
        <Shell activeMenuItem='summary'>
            <section className="d-flex flex-column flex-grow-1" style={{gap: 10}}>
                <Calories />
                <Steps />                
                <Weight />
                <Training />
            </section>
        </Shell>
    )
}