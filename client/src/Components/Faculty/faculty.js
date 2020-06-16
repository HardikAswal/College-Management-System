import React from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import '../Admin/admin.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class Faculty extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.state.id=null;
        this.state.password=null;
        this.state.isAuthenticated=false;
        this.state.decoded=null;
        this.state.view=false;
    }
    //*************************************NEWLY ADDED CODE STARTS***************************************// 

    handleLogin = (e) => {
        const credentials = {
            id:this.state.id,
            password:this.state.password
        };
        axios.post('http://localhost:5000/api/faculty/login',credentials)
            .then(response=>{
                console.log(response.data); 
                if(response.headers['x-auth-token'])
                    {
                    console.log(response.headers['x-auth-token']);
                    localStorage.setItem("faculty",JSON.stringify(response.headers));
                    this.setState({
                        decoded:jwtDecode(response.headers['x-auth-token']),
                        isAuthenticated:true
                    })
                    console.log(this.state.decoded);
                }
                return response.data;
            })
            .catch(err=>window.alert('Invalid ID or Password.'));
        this.setState({
            id:"",
            password:""
        });    
    }

    logout = (e) =>{
        console.log('Logging out...');
        localStorage.removeItem("faculty");
        this.setState({
            isAuthenticated:false,
            decoded:null
        });
    }

    toggleView = () => {
        let view=this.state.view;
        view=!view;
        this.setState({
            view:view
        });
    }

    //*************************NEWLY ADDED CODE ENDS ***************************//


    render(){
         //***********************NEWLY ADDED CODE STARTS *************************/
         if(!localStorage.getItem("faculty")){ //CAN ALSO BE IMPLEMENTED USING isAuthenticated
            return (
            <div className="login-wrapper">
                <div className="login"> 
                    <h4 style={{color:"#fff",fontWeight:"300"}}>Faculty Login</h4>
                    <input type="text" name="enroll" placeholder="Enter ID" value={this.state.id} onChange={(e)=>this.setState({id:e.target.value})}/>
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
        const decoded = jwtDecode(localStorage.getItem('faculty'));
        return(
            <React.Fragment>
            <div id="navbar">
                <p>CMS</p>
                <input type="text" name="Search" placeholder="Search..."/>
            </div>
            <div id="menu">
                <ul>
                    <Link to="/faculty" className="Link"><li ><i className="fas fa-th fa-lg"></i>Dashboard</li></Link>
                    <Link to="/faculty/course" className="Link"><li><i className="fas fa-user-graduate fa-lg"></i>Courses</li></Link>
                    <Link to="/faculty/attendance" className="Link"><li><i className="fas fa-chalkboard-teacher fa-lg"></i>Attendance</li></Link>
                    <li><i class="fas fa-building fa-lg"></i>Departments</li>
                    <li><i class="fas fa-book fa-lg"></i>Courses</li>
                    <li><i class="fas fa-school fa-lg"></i>Classes</li>
                    <Link to="/faculty/news" className="Link"><li><i class="fas fa-bell fa-lg"></i>News</li></Link>
                    <Link to="/faculty/timetable" className="Link"><li><i className="far fa-clock fa-lg"></i>Timetable</li></Link>
                    {/* <li><i class="fas fa-credit-card fa-lg"></i>Payment</li> */}
                    <li><i class="fas fa-comment-alt fa-lg"></i>Messages</li>
                    <button onClick={(e)=>this.logout()}>Logout</button>
                </ul>
            </div>

            <div id="right">
                <Route path="/faculty" exact render={(e)=><Dashboard decoded={this.state.decoded} student={this.state.student} faculty={this.state.faculty} news={this.state.news}></Dashboard>}></Route>
                <Route path="/faculty/course" render={(e)=><Course course={this.props.course}></Course>}></Route>
                <Route path="/faculty/attendance" render={e=><Attendance view={this.state.view} toggleView={this.toggleView.bind(this)} student={this.props.student} course={this.props.course}></Attendance>}></Route>
                <Route path="/faculty/attendance/mark" render={e=><MarkAttendance student={this.props.student} course={this.props.course}></MarkAttendance>}></Route>
                <Route path="/faculty/news" render={(e)=><News news={this.props.news}></News>}></Route> 
                <Route path="/student/timetable"  render={(e)=><Timetable branch={this.props.branch}></Timetable>}></Route>
                {/* <Route path="/admin/faculty" render={(e)=><MngFclt addFaculty={this.addFaculty.bind(this)} faculty={this.state.faculty}></MngFclt>}></Route>
                <Route path="/admin/student" render={(e)=><MngStd addStudent={this.addStudent.bind(this)} student={this.state.student}></MngStd>}></Route>    
                <Route path="/admin/addStudent" render={(e)=><AddStudent addStudent={this.addStudent.bind(this)}></AddStudent>}></Route> */}
            </div>
        </React.Fragment>
        )}
    }
}

function Dashboard(props){
    const decoded = jwtDecode(localStorage.getItem('faculty'));
    return (
        <React.Fragment>
        <div className="dashboard-head">
            <h2>Dashboard</h2>
        </div>
        <div className="dashboard">
            <table className="std-infoTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                            <td>{decoded.faculty_id}</td>
                            <td>{decoded.firstName+" "+decoded.lastName}</td>
                            <td>{decoded.email}</td>
                            <td>{decoded.dept}</td>
                            <td>{decoded.branch}</td>
                    </tbody>
                </table>
        </div>
        </React.Fragment>
    )
}

function Course(props){
    const decoded = jwtDecode(localStorage.getItem('faculty'));
    return (
        <React.Fragment>
        <div className="attendance-head">
            <h2>Courses</h2>
        </div>
        <div className="attendance">
        Please add courses as discussed.
        <br/>
        {props.course.map((x)=>x.courseBranch == decoded.branch ? 
            <div>
                <div>{x.courseName}<button>Add</button></div>
            </div>:null)}
        </div>
        </React.Fragment>
    )
}

function Attendance(props){
    const decoded = jwtDecode(localStorage.getItem('faculty'));
    console.log("Decoded:",decoded);

    const [showMe, setShowMe] = React.useState([]);

    const isShown = el => showMe.includes(el.id);

    const toggleShown = el => {
        setShowMe(shown => {
          if (shown.includes(el.id)) {
            return shown.filter(id => id !== el.id);
          }
          return [...shown, el.id];
        });
      };

    return (
        <React.Fragment>
        <div className="attendance-head">
            <h2>Attendance</h2>
        </div>
        <div className="attendance">
            {decoded.coursesTaught.map((x,i)=>
            <Link className="Link" style={{color:"#000",fontWeight:"400"}}>
                <div className="courseAttendance" onClick={(e)=>toggleShown(x)}>{x}</div>
                {isShown(x) ? 
                <span>
                <input type="date" name="date"/>
                {props.student.map((y)=>y.branch == decoded.branch && y.coursesEnrolledIn.find(m=>m.courseName == x) ? 
                <div>{y.firstName+" "+y.lastName}<button>P</button><button>A</button></div>:null)}
                </span>:null}
            </Link>)}
        </div>
        </React.Fragment>
    )
}

function MarkAttendance(props){
    const decoded = jwtDecode(localStorage.getItem('faculty'));
    
    return (
        <React.Fragment>
            <div>
               
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

export default Faculty;