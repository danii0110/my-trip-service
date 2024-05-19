import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import TripPlanPage from "./pages/TripPlan/TripPlanPage";
import AIChatPage from "./pages/AIChat/AIChatPage";
import LocationPage from "./pages/TripPlan/LocationPage";
import SearchPage from "./pages/Search/SearchPage";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/trip-plan' element={<TripPlanPage />}></Route>
        <Route path='/search' element={<SearchPage />}></Route>
        <Route path='/ai-chat' element={<AIChatPage />}></Route>
        <Route path='/location' element={<LocationPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
