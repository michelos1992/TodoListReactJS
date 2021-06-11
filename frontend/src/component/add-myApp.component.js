import { response } from 'express';
import React, { Component } from 'react';
import MyAppDataService from '../services/myApp.service';

export default class AddMyApp extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveMyApp = this.saveMyApp.bind(this);
    this.newMyApp = this.newMyApp.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  
  saveMyApp() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    MyAppDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMyApp() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>U submitted success</h4>
            <button className="btn btn-success" onClick={this.newMyApp}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.state.title}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.state.description}
                name="description"
              />
            </div>

            <button onClick={this.saveMyApp} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
