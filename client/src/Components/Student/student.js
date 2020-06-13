import React from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import '../Admin/admin.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class Student extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.state.enroll=null;
        this.state.password=null;
        this.state.isAuthenticated=false;
        this.state.decoded=null;
    }
    //***********************NEWLY ADDED CODE STARTS *************************//
    handleLogin = (e) => {
        const credentials = {
            enroll:this.state.enroll,
            password:this.state.password
        };
        axios.post('http://localhost:5000/api/users/login',credentials)
            .then(response=>{
                console.log(response.data); 
                if(response.headers['x-auth-token'])
                    {
                    console.log(response.headers['x-auth-token']);
                    localStorage.setItem("student",JSON.stringify(response.headers));
                    this.setState({
                        decoded:jwtDecode(response.headers['x-auth-token']),
                        isAuthenticated:true
                    })
                    //this.state.decoded = jwtDecode(response.headers['x-auth-token']);
                    console.log(this.state.decoded);
                }
                return response.data;
            })
            .catch(err=>window.alert('Invalid ID or Password.'));
        this.setState({
            enroll:"",
            password:""
        });    
    }

    logout = (e) =>{
        console.log('Logging out...');
        localStorage.removeItem("student");
        this.setState({
            isAuthenticated:false,
            decoded:null
        });
    }

    //*************************NEWLY ADDED CODE ENDS ***************************//

    render(){
        //***********************NEWLY ADDED CODE STARTS *************************/
        if(!localStorage.getItem("student")){ //CAN ALSO BE IMPLEMENTED USING isAuthenticated
            return (
            <div className="login-wrapper">
                <div className="login"> 
                    <input type="text" name="enroll" placeholder="Enter Enrollment No." value={this.state.enroll} onChange={(e)=>this.setState({enroll:e.target.value})}/>
                    <br/>
                    <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                    <br/>
                    <button type="submit" onClick={(e)=>{this.handleLogin()}}>Login</button>
                </div>
            </div>
            )
            }
        //*************************NEWLY ADDED CODE ENDS ***************************//
        else{
        return(
            <React.Fragment>
                <div id="navbar">
                <p>CMS</p>
                    <input type="text" name="Search" placeholder="Search..."/>
                </div>
                <div id="menu">
                    <ul>
                        <Link to="/" className="Link"><li ><i className="fas fa-th fa-lg"></i>Dashboard</li></Link>
                        <Link to="/attendance" className="Link"><li><i className="fas fa-user-graduate fa-lg"></i>Attendance</li></Link>
                        <Link to="/grades" className="Link"><li><i className="fas fa-chalkboard-teacher fa-lg"></i>Faculty</li></Link>
                        <li><i className="fas fa-building fa-lg"></i>Departments</li>
                        <li><i className="fas fa-book fa-lg"></i>Courses</li>
                        <li><i className="fas fa-school fa-lg"></i>Classes</li>
                        <Link to="/student/news" className="Link"><li><i className="fas fa-bell fa-lg"></i>News</li></Link>
                        <li><i className="far fa-clock fa-lg"></i>Timetable</li>
                        <li><i className="fas fa-credit-card fa-lg"></i>Payment</li>
                        <li><i className="fas fa-comment-alt fa-lg"></i>Messages</li>
                        <button onClick={(e)=>this.logout()}>Logout</button>
                    </ul>
                </div>

                <div id="right">
                    <Route path="/" render={(e)=><Dashboard></Dashboard>}></Route>
                </div>
            </React.Fragment>
        )} 
    }
}

function Dashboard(props){
    const decoded = jwtDecode(localStorage.getItem('student'));
    return (
        <React.Fragment>
        <div className="dashboard-head">
            <h2>Dashboard</h2>
        </div>
        <div className="dashboard">
            <div className="banner">
                <div className="banner-info">
                {decoded.name}<b/>
                {decoded.enroll}<b/>
                </div>
            </div>
            {/* <div className="banner">
                <div className="banner-info">
                <span>{props.faculty.length}</span>
                <p>Faculty</p>
                </div>
            </div>
            <div className="banner">
                <div className="banner-info">
                <span>{props.news.length}</span>
                <p>News</p>
                </div>
            </div> */}
        </div>
        </React.Fragment>
    )
}

export default Student;