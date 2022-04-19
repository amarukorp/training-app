import './App.css';
import Customerlist from './components/Customerlist';
import {Routes, Route} from "react-router-dom";
import Traininglist from './components/Traininglist';
import ResponsiveAppBar from './components/Nav';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Routes>
        <Route exact path="/customers" element={<Customerlist />} />
        <Route path="/trainings" element={<Traininglist/>} />
      </Routes>
    </div>
  );
}

export default App;

