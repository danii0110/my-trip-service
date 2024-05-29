import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import APMain from './pages/AP/APMain/APMain';
import AP2Main from './pages/AP/AP2_timePicker/AP2Main';
import AP5Main from './pages/AP/AP5_planList/AP5Main';
import AP6Main from './pages/AP/AP6_itinerary/AP6Main';
import SearchPage from './pages/Search/SearchPage';
import OAuth2Redirection from './modules/api/Login/OAuth2Redirection';
import MyTripMain from './pages/MyTrip/MyTripMain';
import Profile from './pages/MyTrip/Profile/Profile';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './modules/api/Login/userActions';
import TripPlanPage from './pages/TripPlan/TripPlanPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/planning' element={<APMain />} />
        <Route path='planning/areaName' element={<AP2Main />} />
        <Route path='plan-list/areaName' element={<AP5Main />} />
        <Route path='itinerary/areaName' element={<AP6Main />} />
        <Route path='callback/kakao' element={<OAuth2Redirection />} />
        <Route path='my-trip' element={<MyTripMain />} />
        <Route path='my-trip/profile' element={<Profile />} />
        <Route path='trip-plan' element={<TripPlanPage />}></Route>
        <Route path='/search' element={<SearchPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
