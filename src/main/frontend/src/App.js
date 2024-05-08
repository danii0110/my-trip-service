import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import APMain from './pages/AP/APMain/APMain';
import PageModal from './pages/AP/AP1_pickRegion/PageModal';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/ai-planner' element={<APMain />}></Route>
        <Route path='/community' element={<PageModal />}></Route>
      </Routes>
    </div>
  );
}

export default App;
