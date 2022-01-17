import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import AddNote from "./components/add-note.component";
import Note from "./components/note.component";
import NotesList from "./components/notes-list.component";

import FileUpload from "./components/FileUpload";

import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,

      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-success" >
          <Link to={"/"} className="navbar-brand">
            A&O
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>


            {currentUser && (
              <li className="nav-item">
                <Link to={"/notes"} className="nav-link">
                  Notes
                </Link>
    
              </li>
              
            )}
                 {currentUser && (
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  AddNote
                </Link>
                </li>
                
                )}
                {currentUser && (
           
               <li className="nav-item">
               <Link to={"/files"} className="nav-link">
               File Upload
                     </Link>
                </li>
              
            )}
          </div>
          

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            
           </div>

          )}
        </nav>

       



        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path={ "/notes"} component={NotesList} />
            <Route exact path="/add" component={AddNote} />
            <Route path="/notes/:id" component={Note} />
            <Route path="/files" component={FileUpload} />
          
            
          </Switch>
        </div>

      
      </div>
    );
  }
}

export default App;