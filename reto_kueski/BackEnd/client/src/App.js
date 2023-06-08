import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Main from './components/Main/main';
import Login from './components/Login/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
