// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NormaApp from "./Normal"
import ContextApiFun from "./ContextApi"
import Header from './Header';

function App() {

  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<NormaApp />} />
          <Route path='/1' element={<ContextApiFun />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
