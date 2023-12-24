// src/App.tsx
import React from 'react';
import Header from './Components/Header';
import CommunityList1 from './Components/CommunityList1';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Components/About';
import Houses from './Components/Houses';


const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/"  Component={CommunityList1} />
        <Route path="/houses"  Component={Houses} />
        <Route path='/aboutus' Component={About}/>
      </Routes>
    </Router>
  );
};

export default App;
