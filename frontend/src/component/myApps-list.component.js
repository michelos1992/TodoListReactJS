import React, { Component } from 'react';
import MyAppDataService from '../services/myApp.service';
import { Link } from 'react-router-dom';

export default class MyAppsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      myapps: [],
      currentMyApp: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveMyApps();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveMyApps() {
    MyAppDataService.getAll()
      .then(response => {
        this.setState({
          myapps: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMyApps();
    this.setState({
      currentMyApp: null,
      currentIndex: -1
    });
  }

  setActiveMyApp(myapp, index) {
    this.setState({
      currentMyApp: myapp,
      currentIndex: index
    });
  }

  removeAllMyApps() {
    MyAppDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    // MyAppDataService.findByTitle(this.state.searchTitle)
    //   .then(response => {
    //     this.setState({
    //       myapps: response.data
    //     });
    //     console.log(response.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }

  render() {
    const { searchTitle, myapps, currentMyApp, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input 
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>My apps List</h4>
          <ul className="list-group">
            {(
              <li>
                {myapps.data}
              </li>
            )}
          </ul>

        </div>

        <div className="col-md-6">
          {currentMyApp ? (
            <div>
              <h4>Details</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentMyApp.title}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentMyApp.completed ? "Published" : "Pending"}
              </div>

              <Link
                to={"/" + currentMyApp.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>
                Please click on an item...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
