import { useState } from 'react';
import './App.css';
import Day from "./components/Day";

function App() {
    let [dateSkew, setDateSkew] = useState(0);
    return (
        <Day dateSkew={dateSkew} setDateSkew={setDateSkew} />
    );
}

export default App;
