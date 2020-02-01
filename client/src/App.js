import React from 'react';
import './App.css';
import {BrowserRouter as  Router,Route,Link} from 'react-router-dom';
import Admin from "./Components/Admin/admin";
import Faculty from "./Components/Faculty/faculty";
import Student from "./Components/Student/student";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }

  render(){
    return (
      <React.Fragment>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/faculty" component={Faculty}></Route>
        <Route path="/" exact component={Student}></Route>
      </React.Fragment>
    )
  }
}

export default App;
