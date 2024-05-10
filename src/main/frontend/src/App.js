import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import APMain from './pages/AP/APMain/APMain';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/ai-planner' element={<APMain />}></Route>
      </Routes>
    </div>
  );
}

export default App;
