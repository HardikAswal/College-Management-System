import React from "react";
import {BrowserRouter as Router,Route,Link,Redirect} from "react-router-dom";
import '../../App.css';
import Admin from "./admin";
import axios from 'axios';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={};
        this.state.id=null;
        this.state.password=null;
        this.state.isAuthenticated=false;
    }

    handleLogin = (e) =>{
        console.log("Inside Handle login");
        const credentials = {
            id:this.state.id,
            password:this.state.password
        }
        if(!credentials.id || !credentials.password) return console.log('Invalid');
        axios.post('http://localhost:5000/api/admin/login',credentials)
             .then(response=>{
                console.log(response.data); 
                if(response.headers['x-auth-token'])
                    {
                    console.log(response.headers['x-auth-token']);
                    localStorage.setItem("admin",JSON.stringify(response.headers));
                    this.setState({
                        isAuthenticated:true
                    });
                }
                return response.data;
             })
             .catch(err => window.alert('Invalid ID or Password.'));
        this.setState({
            id:"",
            password:""
        });
    }

    
    logout = (e) =>{
        console.log('Logging out...');
        localStorage.removeItem("admin");
        this.setState({
            isAuthenticated:false
        });
    }

    render(){
        if(!this.state.isAuthenticated){
        return (
        <div className="login-wrapper">
            <div className="login"> 
                <input type="text" name="id" placeholder="Enter ID" value={this.state.id} onChange={(e)=>this.setState({id:e.target.value})}/>
                <br/>
                <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                <br/>
                <button type="submit" onClick={(e)=>{this.handleLogin(e)}}>Login</button>
            </div>
        </div>
        )
        }
        else{
            return(
            <div>
            <Route path="/admin" render={(e)=><Admin isAuthenticated={this.state.isAuthenticated} logout={this.logout}></Admin>}></Route>
            <Redirect to="/admin"></Redirect>
            </div>
        )}
}
}

export default Login;
