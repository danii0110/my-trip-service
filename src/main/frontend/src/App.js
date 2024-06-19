import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import APMain from './pages/AP/APMain/APMain';
import AP2Main from './pages/AP/AP2_timePicker/AP2Main';
import AP5Main from './pages/AP/AP5_planList/AP5Main';
import AP6Main from './pages/AP/AP6_itinerary/AP6Main';
import TripPlanPage from './pages/TripPlan/TripPlanPage';
// import AIChatPage from './pages/AIChat/AIChatPage';
import LocationPage from './pages/Location/LocationPage';
import SearchPage from './pages/Search/SearchPage';
import OAuth2Redirection from './modules/api/Login/OAuth2Redirection';
import MyTripMain from './pages/MyTrip/MyTripMain';
import Profile from './pages/MyTrip/Profile/Profile';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './modules/api/Login/userActions';

import CommunityMainPage from "./pages/Community/CommunityMainPage";
import CommunityPost from "./pages/Community/CommunityPost";
import CommunityDetail from "./pages/Community/CommunityDetail";
import CommunityDetailPlan from "./pages/Community/CommunityDetailPlan";

// import TripPlanPage from './pages/TripPlan/TripPlanPage';
import Scrap from './pages/MyTrip/Scrap/Scrap';
import axios from 'axios';

// Axios 인터셉터 설정
const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post('http://localhost:8080/api/refresh', { refresh_token });
    localStorage.setItem('access_token', response.data.access_token);
  } catch (error) {
    console.error('토큰 재발급 실패', error);
  }
};

//토큰이 만료되었을 때 자동으로 갱신
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await refreshToken();
      error.config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/callback/kakao' element={<OAuth2Redirection />} />
        <Route path='/planning' element={<APMain />} />
        <Route path='planning/areaName' element={<AP2Main />} />
        <Route path='plan-list/areaName' element={<AP5Main />} />
        <Route path='itinerary/areaName' element={<AP6Main />} />
        <Route path='my-trip' element={<MyTripMain />} />
        <Route path='my-trip/profile' element={<Profile />} />
          
        <Route path='my-trip/scrap' element={<Scrap />} />
        <Route path='trip-plan' element={<TripPlanPage />}></Route>
        <Route path='/search' element={<SearchPage />}></Route>

        //<Route path='/trip-plan' element={<TripPlanPage />}></Route>
        //<Route path='/search' element={<SearchPage />}></Route>
        {/* <Route path='/ai-chat' element={<AIChatPage />}></Route> */}
        <Route path='/location' element={<LocationPage />}></Route>
        <Route path='/community' element={<CommunityMainPage />}></Route>
        <Route path='/community/post' element={<CommunityPost />}></Route>
        <Route path='/community/edit' element={<CommunityPost />}></Route>
        <Route path='/community/detail' element={<CommunityDetail />}></Route>
        <Route path='/community/detail/plan' element={<CommunityDetailPlan />}></Route>
      </Routes>
    </div>
  );
}

export default App;
