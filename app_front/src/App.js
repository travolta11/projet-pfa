import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppComponents from './AppComponents';
import Login from './Pages/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppComponents />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/*" element={<AppRoutes />} /> */}
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
