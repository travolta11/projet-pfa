import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppComponents from './AppComponents';
import Login from './Pages/Login';
function App() {
  const [token, setToken] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/*"
          element={token ? <AppComponents token={token} /> : <Login setToken={setToken} />}
        />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
