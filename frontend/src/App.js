import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Marvel from './components/Marvel';
import Dc from './components/Dc';
import Character from './components/Character';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/marvel" component={Marvel} />
            <Route exact path="/dc" component={Dc} />
            <Route exact path="/character" component={Character} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
