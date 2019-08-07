import React from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./Screens/Login/Login";
import Home from "./Screens/Home/Home";
import GamePlay from "./Screens/Gameplay/GamePlay";
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;



export default class App extends React.Component {

  render() {
    return (
      <div>
        <div className="app">
          <BrowserRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route exact path="/" name="Login Page" component={Login} />
                <Route path="/home" name="Home" component={Home} />
                <Route path="/game" name="Game" component={GamePlay} />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

