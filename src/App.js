import logo from './logo.svg';
import './App.css';
import './index.css';
import UserData from './Component/MainPage';
import Reprosatry from './Component/RepoPage';

import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<UserData />} />
            <Route path='/Reprosatry/:name' element={<Reprosatry />} />
            {/* <Route path='/EditData' element={<EditData />} /> */}
          </Routes>
        </BrowserRouter>
      </>


      {/* <UserData/> */}
    </div>
  );
}

export default App;
