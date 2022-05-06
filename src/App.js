import './App.css';
import Customerlist from './components/Customerlist';
import {Routes, Route} from "react-router-dom";
import Traininglist from './components/Traininglist';
import ResponsiveAppBar from './components/Nav';
import Calendar from './components/Calendar';
import Trainingchart from './components/Trainingchart';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/"  element={<Customerlist />} />
        <Route path="/customers" element={<Customerlist />} />
        <Route path="/trainings" element={<Traininglist/>} />
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/statistics" element={<Trainingchart/>}/>
      </Routes>
    </div>
  );
}

export default App;

