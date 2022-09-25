import { Route, Routes } from 'react-router-dom';
import './App.css';
import Settings from './components/Settings';
import Summary from "./components/Summary";
import TrainingSession from './features/training/TrainingSession';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/training-session/:trainingSessionId" element={<TrainingSession />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    );
}

export default App;
