import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import APMain from './pages/AP/APMain/APMain';
import AP2Main from './pages/AP/AP2_timePicker/AP2Main';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/ai-planner' element={<APMain />}>
          {/* <Route path='/ai-planner/areaName' element={<AP2Main />} /> */}
        </Route>
        <Route path='ai-planner/areaName' element={<AP2Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
