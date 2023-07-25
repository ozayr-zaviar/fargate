import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Widget from './components/widgets';
import Static from "./components/static";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Widget />} />
        <Route path="/static" element={<Static />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;