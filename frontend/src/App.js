import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/myapps" className="navbar-brand">
            Michal Wojciech
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/myapps"} className="nav-link">
                My apps
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
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
