import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/Home';
import StarWars from './pages/StarWars';
import Brewer from './pages/Brewer';

export default function Routes(){
  return(
    <BrowserRouter>
      <Route path='/' exact component={Home}/>
      <Route path='/star-wars' component={StarWars}/>
      <Route path='/brewer' component={Brewer}/>
    </BrowserRouter>
  );
}