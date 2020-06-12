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
        console.log('Inside Handle Login');
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
                    <Route path="/" render={(e)=><Dashboard decoded={this.state.decoded}></Dashboard>}></Route>
                    <Route path="/admin/faculty" render={(e)=><MngFclt addFaculty={this.addFaculty.bind(this)} faculty={this.state.faculty}></MngFclt>}></Route>
                    <Route path="/admin/student" render={(e)=><MngStd addStudent={this.addStudent.bind(this)} student={this.state.student}></MngStd>}></Route>    
                    <Route path="/admin/news" render={(e)=><AddNews AddNews={this.AddNews.bind(this)}></AddNews>}></Route>
                </div>
            </React.Fragment>
        )} 
    }
}

function Dashboard(props){
    return (
        <React.Fragment>
        <div className="dashboard-head">
            <h2>Dashboard</h2>
        </div>
        <div className="dashboard">
            <div className="banner">
                <div className="banner-info">
                    {console.log(props.name)}
                {props.name}<b/>
                {props.enroll}<b/>
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

function MngStd(props){
    return (
        <div>
            <div> 
            <h2>Manage Student</h2>
            <span style={{float:"right",marginRight:"35px"}}><Link to="/admin/addStudent">Add Student</Link></span>
            </div>
            {/* <Route path="/admin/admin_student/Add_student" render={(e)=><Add_student addStudent={props.addStudent.bind(this)}></Add_student>}></Route> */}
            <div>
                
                <table border="1" className="student_table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Enrollment No.</th>
                            <th>Address</th>
                            <th>DOB</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.student.map((x)=>(
                        <tr>
                            <td>{x.firstName+" "+x.lastName}</td>
                            <td>{x.enroll}</td>
                            <td>{x.address1}</td>
                            <td>{x.dob}</td>
                            <button>Update</button>
                            <button>Delete</button>
                        </tr>
                    ))} 
                    </tbody>
                </table>
            </div>        
        </div>
    )
}

function MngFclt(props){
    return (
        <div>
            <div> 
            <h2>Manage Faculty</h2>
            <Link to="/admin/faculty/Add_faculty">Add Faculty</Link>
            </div>
            <Route path="/admin/faculty/Add_faculty" render={(e)=><Add_faculty addFaculty={props.addFaculty.bind(this)}></Add_faculty>}></Route>
            <div>
            {props.faculty.map((x,i)=>(
                    <div>{x.name} {x.enroll} {x.address} {x.dob} </div>
                    ))}
            </div>        
        </div>
    )
}

function Add_faculty(props){

    const [name, setName] = React.useState("");
    const [id, setId] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [dob, setDob] = React.useState(null);
    const [fname, setFname] = React.useState("");
    const [mname, setMname] = React.useState("");

return (
    <div className="add_student">
       <input type="text" name="name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} value={name}></input> 
       <input type="number" name="id" placeholder="Enrollment Number" onChange={(e)=>{setId(e.target.value)}} value={id}></input> 
       <input type="text" name="address" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}} value={address}></input> 
       <input type="date" name="dob" onChange={(e)=>{setDob(e.target.value)}} value={dob}></input> 
       <input type="text" name="fatherName" placeholder="Father's Name" onChange={(e)=>{setFname(e.target.value)}} value={fname}></input> 
       <input type="text" name="motherName" placeholder="Mother's Name" onChange={(e)=>{setMname(e.target.value)}} value={mname}></input>
     
        <button type="submit" onClick={(e)=>{props.addFaculty({name,id,address,dob,fname,mname});setName("");setId("");setAddress("");setDob(null);setFname("");setMname("")}}>Add</button>
        <Link to="/admin/admin_faculty">Cancel</Link> 
    </div>
)
}

function AddNews(props){
    const [title,setTitle] = React.useState(null);
    const [description,setDescription] = React.useState(null);
    
    return (
        <div>
            <input type="text" name="title" placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input type="text" name="description" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
            <button type="submit" onClick={(e)=>{props.AddNews({title,description})}}>Add</button>
        </div>
    )
}

export default Student;