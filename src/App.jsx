import React, { useState } from 'react';
import './App.css';
import { Button, Switch } from '@material-tailwind/react';
import Sidnav from './components/Sidnav';
import Logicgates from './components/Logicgates';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

const GATES = ['AND', 'OR', 'NOT'];

  function App()
  {
  
  return (
    <div className="container">
      <BrowserRouter>
<Routes>    
    <Route  path='/*' element={<Home/>}></Route>
          <Route  path='/nav' element={<Sidnav/>}></Route>

      <Route  path='/logic' element={<Logicgates/>}></Route>


</Routes>
      </BrowserRouter>
    
    </div>
  );
};

export default App;
// #333d51 to
// #212834