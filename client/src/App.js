import React from 'react';
import './App.css';
import {BrowserRouter as  Router,Route,Link} from 'react-router-dom';
import Admin from "./Components/Admin/admin";
import Faculty from "./Components/Faculty/faculty";
import Student from "./Components/Student/student";
import noMatch from  "./nomatch";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    return (
      <React.Fragment>
        <Route path="/admin" render={(e)=><Admin handleLogin={this.handleLogin.bind(this)} id={this.state.id} password={this.state.password}></Admin>}></Route>
        <Route path="/faculty" render={e=><Faculty></Faculty>}></Route>
        <Route path="/" exact render={e=><Student></Student>}></Route>
        <Route component={noMatch}></Route>
      </React.Fragment>
    )
  }
}

export default App;
