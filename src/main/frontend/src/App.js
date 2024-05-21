import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import APMain from './pages/AP/APMain/APMain';
import AP2Main from './pages/AP/AP2_timePicker/AP2Main';
import AP5Main from './pages/AP/AP5_planList/AP5Main';
import AP6Main from './pages/AP/AP6_itinerary/AP6Main';
import TripPlanPage from "./pages/TripPlan/TripPlanPage";
import AIChatPage from "./pages/AIChat/AIChatPage";
import LocationPage from "./pages/TripPlan/LocationPage";
import SearchPage from "./pages/Search/SearchPage";
import OAuth2Redirection from './modules/api/Login/OAuth2Redirection';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/planning' element={<APMain />}>
          {/* <Route path='/ai-planner/areaName' element={<AP2Main />} /> */}
        </Route>
        <Route path='planning/areaName' element={<AP2Main />}></Route>
        <Route path='plan-list/areaName' element={<AP5Main />}></Route>
        <Route path='itinerary/areaName' element={<AP6Main />}></Route>
        <Route path='callback/kakao' element={<OAuth2Redirection />} />
          <Route path='/trip-plan' element={<TripPlanPage />}></Route>
          <Route path='/search' element={<SearchPage />}></Route>
          <Route path='/ai-chat' element={<AIChatPage />}></Route>
          <Route path='/location' element={<LocationPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
