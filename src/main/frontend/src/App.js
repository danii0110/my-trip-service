import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import APMain from './pages/AP/APMain/APMain';
import DatePickerModal from './pages/AP/AP2_datePicker/DatePickerModal';
import AP3Main from './pages/AP/AP3_timePicker/AP3Main.jsx';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='ai-planner' element={<APMain />}>
          <Route path='areaName' element={<DatePickerModal />}>
            {/* <Route path='time-checker' element={<AP3Main />} /> */}
          </Route>
        </Route>
        <Route path='ai-planner/areaName/time-checker' element={<AP3Main />} />
      </Routes>
    </div>
  );
}

export default App;
