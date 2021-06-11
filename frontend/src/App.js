import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddMyApps from "./component/add-myApp.component";
import MyApps from "./component/myApp.component";
import MyAppsList from './component/myApps-list.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/api/myapps" className="navbar-brand">
            MichalWojciech
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/api/myapps"} className="nav-link">
                My apps
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/api/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/myapps"]} component={MyAppsList} />
            <Route exact path="/add" component={AddMyApps} />
            <Route path="/myapps/:id" component={MyApps} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
