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
                        <Link to="/student" className="Link"><li ><i className="fas fa-th fa-lg"></i>Dashboard</li></Link>
                        <Link to="/attendance" className="Link"><li><i className="fas fa-user-graduate fa-lg"></i>Attendance</li></Link>
                        <Link to="/grades" className="Link"><li><i className="fas fa-chalkboard-teacher fa-lg"></i>Grades</li></Link>
                        {/* <li><i className="fas fa-building fa-lg"></i>Departments</li> */}
                        <Link to="/student/course" className="Link"><li><i className="fas fa-book fa-lg"></i>Courses</li></Link>
                        <li><i className="fas fa-school fa-lg"></i>Classes</li>
                        <Link to="/student/news" className="Link"><li><i className="fas fa-bell fa-lg"></i>News</li></Link>
                        <Link to="/student/timetable" className="Link"><li><i className="far fa-clock fa-lg"></i>Timetable</li></Link>
                        <li><i className="fas fa-credit-card fa-lg"></i>Payment</li>
                        <li><i className="fas fa-comment-alt fa-lg"></i>Messages</li>
                        <Link to="/"><button onClick={(e)=>this.logout()}>Logout</button></Link>
                    </ul>
                </div>

                <div id="right">
                    <Route path="/student" exact render={(e)=><Dashboard news={this.props.news}></Dashboard>}></Route>
                    <Route path="/student/course" render={(e)=><Course course={this.props.course} EnrollInCourse={this.props.EnrollInCourse.bind(this)}></Course>}></Route>
                    <Route path="/student/news"  render={(e)=><News news={this.props.news}></News>}></Route>
                    <Route path="/student/timetable"  render={(e)=><Timetable branch={this.props.branch}></Timetable>}></Route>

                </div>
            </React.Fragment>
        )} 
    }
}

function Dashboard(props){
    const decoded = jwtDecode(localStorage.getItem('student'));
    console.log(decoded)
    return (
        <React.Fragment>
        <div className="dashboard-head">
            <h2>Dashboard</h2>
        </div>
        <div className="dashboard">
            <div className="std-info">
                <table className="std-infoTable">
                    <thead>
                        <tr>
                            <th>Enrollment Number</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                            <td>{decoded.enroll}</td>
                            <td>{decoded.name}</td>
                            <td>{decoded.dob.slice(0,10)}</td>
                            <td>{decoded.email}</td>
                            <td>{decoded.department}</td>
                            <td>{decoded.branch}</td>
                    </tbody>
                </table>
            </div>
            <br/>
            
        </div>
        </React.Fragment>
    )
}

function News(props){
    return (
        <div>
            <div className="news-head">
                <h2>News</h2>
            </div>
            <table className="table news-table">
                        <thead>
                            <tr>
                                <th className="news-no">Sr. No.</th>
                                <th className="news-title">Title</th>
                                <th className="news-desc">News</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.news.map((x,i)=>(    
                            <tr>
                                <td className="news-no">{i+1}</td>
                                <td className="news-title"><b>{x.title}</b></td>
                                <td className="news-desc">{x.description}</td>
                            </tr> 
                        ))}
                        </tbody>
                        </table>
        </div>
    )
}

function Course(props){
    const decoded = jwtDecode(localStorage.getItem('student'));
    console.log(decoded);
    return (
        <React.Fragment>
        <div className="std-course-head">
            <h2>Courses</h2>
        </div>
        <div className="std-course">
            <h3>Enrolled Courses</h3>
            <span>{props.course.map((x)=>x.courseBranch == decoded.branch && x.courseStudents.find(std=>std.id===decoded.id) ? 
            <div><p>{x.courseName}</p><button disabled>Enrolled</button></div>:null)}</span>

            <h3>More {decoded.branch ? decoded.branch:decoded.department} Courses</h3>
            <span>{props.course.map((x)=>x.courseBranch == decoded.branch && !x.courseStudents.find(std=>std.id===decoded.id) ? 
            <div><p>{x.courseName}</p><button onClick={e=>props.EnrollInCourse(x,decoded.id,decoded.name)}>Enroll</button></div>:null)}</span>

            <h3>Other Courses</h3>
            <span>{props.course.map((x)=>x.courseBranch != decoded.branch && !x.courseStudents.find(std=>std.id===decoded.id) ? 
            <div><p>{x.courseName}</p><button onClick={e=>props.EnrollInCourse(x,decoded.id,decoded.name)}>Enroll</button></div>:null)}</span>
        </div>
        </React.Fragment>
    )
}

function Timetable(props){
    
    return (
        <React.Fragment>
            <div className="news-head">
                <h2>Timetable</h2>
            </div>

            <div className="timetable-list">
            {props.branch.map((x)=><img src={'/images/'+x.branchName+".png"}></img> ? 
            <span style={{textAlign:'center',width:"250px"}}>
                <img src={'/images/'+x.branchName+".png"} alt="" style={{width:"250px",height:"auto"}}></img>
                    <br/>
                <p>{x.branchName}</p>
            </span>:null)}
            </div>
        </React.Fragment>
    )
}


export default Student;