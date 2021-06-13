import React, { Component } from 'react';
import MyAppDataService from '../services/myApp.service';
import { Link } from 'react-router-dom';

export default class MyAppsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMyApps = this.retrieveMyApps.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMyApp = this.setActiveMyApp.bind(this);
    this.removeAllMyApps = this.removeAllMyApps.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      myapps: [],
      currentMyApp: null,
      currentIndex: -1,
      searchTitle: "",
      counttTrue: 0
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
      console.log("jeste tutaj")
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
    MyAppDataService.findByTitle(this.state.searchTitle)
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

  markCompleted(myapp, id) {
    const newElements = myapp;
    if(newElements.isCompleted === false) {
      newElements.isCompleted = true;
      this.setState({myapp: newElements});
    }else {
      newElements.isCompleted = false;
      this.setState({myapp: newElements});
    }
  }

  countIsCompletedTrue(myapp) {
    //this.retrieveMyApps();
    //Zthis.retrieveMyApps();
    const tabb = myapp;
    console.log("asdfasdf" + myapp);
    var temp = 0;
    tabb.forEach((element) => {
      if(element.isCompleted === true) {
        temp = temp + 1;
      }
    });
    console.log("count: " + temp);
    this.setState({counttTrue: temp});
  }
  // countIsCompletedFalse() {
  //   const allItems = this.retrieveMyApps();
  //   let countFalse = 0;
  //   allItems.forEach(element => {
  //     if(element.isCompleted===false) {
  //       countFalse+=1;
  //     }
  //   });
  //   console.log("false ilosc: " + true);
  //   return countFalse;
  // }

  render() {
    const { searchTitle, myapps, currentMyApp, currentIndex, counttTrue } = this.state;
    const countsTrue = this.countIsCompletedTrue(myapps);
    //const countsFalse = this.countIsCompletedFalse();
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

          <div className="row">
            true {countsTrue}
          </div>

          <ul className="list-group">
            {myapps && myapps.map((myapp, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active " : "")
                }
                onClick={() => this.setActiveMyApp(myapp, index)}
                key={index}
              >
                {myapp.title}
              </li>
            ))}
          </ul>

          <button 
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMyApps}
          >
            Remove All
          </button>
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
                  <strong>Description:</strong>
                </label>{" "}
                {currentMyApp.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentMyApp.published ? "Published" : "Pending"}
              </div>
              <div>
                <strong>{currentMyApp.isCompleted ? "Done" : "Not done"}</strong>
              </div>

              <Link
                to={"/myapps/" + currentMyApp.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
              <button className="btn btn-secondary" onClick={() => this.markCompleted(currentMyApp, currentMyApp.id)}>Zakończone</button>
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
