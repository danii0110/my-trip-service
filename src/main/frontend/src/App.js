import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import APMain from './pages/AP/APMain/APMain';
import DatePickerModal from './pages/AP/AP2_datePicker/DatePickerModal';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='ai-planner' element={<APMain />}>
          {/* <Route path='areaName' element={<DatePickerModal />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
