import React, {Component} from 'react';
import MyAppDataService from '../services/myApp.service';

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    // this.onChangeTitle = this.onChangeTitle.bind(this);
    // this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getMyApp = this.getMyApp.bind(this);
    // this.updatePublished = this.updatePublished.bind(this);
    // this.updateMyApp = this.updateMyApp.bind(this);
    // this.deleteMyApp = this.deleteMyApp.bind(this);

    this.state = {
      currentMyApp: {
        id: null,
        title: "",
        completed: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMyApp(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMyApp: {
          ...prevState.currentMyApp,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentMyApp:{
        ...prevState.currentMyApp,
        description: description
      }
    }));
  }

  getMyApp(id) {
    MyAppDataService.get(id)
      .then(response => {
        this.setState({
          currentMyApp: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentMyApp.id,
      title: this.state.currentMyApp.title,
      description: this.state.currentMyApp.description,
      published: status
    };

    MyAppDataService.update(this.state.currentMyApp.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentMyApp: {
            ...prevState.currentMyApp,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMyApp() {
    MyAppDataService.update(
      this.state.currentMyApp.id,
      this.state.currentMyApp
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The app was updated success!!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMyApp() {
    MyAppDataService.delete(
      this.state.currentMyApp.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/myapps')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMyApp } = this.state;

    return (
      <div>
        {currentMyApp ? (
          <div className="edit-form">
            <h4>My app</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMyApp.title}
                  //onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentMyApp.description}
                  //onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMyApp.completed ? "Published" : "Pending"}
              </div>
            </form>

            {currentMyApp.published ? (
              <button 
                className="badge badge-primary mr-2"
                //onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button 
                className="badge badge-primary mr-2"
                //onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a myapp...</p>
          </div>
        )}
      </div>
    );
  }
}