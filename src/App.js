import React from 'react';
import Game from "./Game";
import Home from "./Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";



function App(){
    return (
          <BrowserRouter>
              <div>
                      <Switch>
                          <Route exact path="/" component={Home}/>
                          <Route path="/Game" component={Game}/>
                      </Switch>
              </div>
          </BrowserRouter>

    );
}

export default App;
