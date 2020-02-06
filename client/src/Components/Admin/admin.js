import React from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import "./admin.css";
// import Add_student from "./addStudent"

class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.state.student=[];
        this.state.faculty=[]
    }

    addInfo(student_info){
        console.log(student_info);
        let student=this.state.student;
        student.push(student_info);
        console.log(student)
        this.setState({
            student:student
        })
        console.log(this.state.student);
    }
    
    addFaculty(faculty_info){
        console.log(faculty_info);
        let faculty=this.state.faculty;
        faculty.push(faculty_info);
        console.log(faculty)
        this.setState({
            faculty:faculty
        })
        console.log(this.state.faculty);
    }

    render(){
        return(
            <React.Fragment>
                <div id="menu">
                    <ul>
                        <Link to="/admin"><li>Admin</li></Link>
                        <li>Dashboard</li>
                        <Link to="/admin/admin_student"><li>Student</li></Link>
                        <Link to="/admin/admin_faculty"><li>Faculty</li></Link>
                        <li>Department</li>
                        <li>Courses</li>
                        <li>Dashboard</li>
                        <li>Dashboard</li>
                    </ul>
                </div>

                <div id="right">
                    <Route path="/admin/admin_faculty" render={(e)=><Admin_to_faculty addFaculty={this.addFaculty.bind(this)} faculty={this.state.faculty}></Admin_to_faculty>}></Route>
                    <Route path="/admin/admin_student" render={(e)=><Admin_to_student addInfo={this.addInfo.bind(this)} student={this.state.student}></Admin_to_student>}></Route>    
                    {/* <Route path="/admin/admin_student/Add_student" render={(e)=><Add_student addInfo={this.addInfo.bind(this)}></Add_student>}></Route> */}
                </div>
            </React.Fragment>
        )
    }
}

export default Admin;

function Admin_to_student(props){
    return (
        <div>
            <div> 
            <h2>Manage Student</h2>
            <Link to="/admin/admin_student/Add_student">Add Student</Link>
            </div>
            <Route path="/admin/admin_student/Add_student" render={(e)=><Add_student addInfo={props.addInfo.bind(this)}></Add_student>}></Route>
            <div>
            {props.student.map((x)=>(
                    <div>{x.name} {x.enroll} {x.address} {x.dob} </div>
                    ))}
            </div>        
        </div>
    )
}

function Admin_to_faculty(props){
    return (
        <div>
            <div> 
            <h2>Manage Faculty</h2>
            <Link to="/admin/admin_faculty/Add_faculty">Add Faculty</Link>
            </div>
            <Route path="/admin/admin_faculty/Add_faculty" render={(e)=><Add_faculty addFaculty={props.addFaculty.bind(this)}></Add_faculty>}></Route>
            <div>
            {props.faculty.map((x)=>(
                    <div>{x.name} {x.enroll} {x.address} {x.dob} </div>
                    ))}
            </div>        
        </div>
    )
}

function Add_student(props){

    const [name, setName] = React.useState("");
    const [enroll, setEnroll] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [dob, setDob] = React.useState(null);
    const [fname, setFname] = React.useState("");
    const [mname, setMname] = React.useState("");

return (
    <div className="add_student">
       <input type="text" name="name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} value={name}></input> 
       <input type="number" name="enroll_no" placeholder="Enrollment Number" onChange={(e)=>{setEnroll(e.target.value)}} value={enroll}></input> 
       <input type="text" name="address" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}} value={address}></input> 
       <input type="date" name="dob" onChange={(e)=>{setDob(e.target.value)}} value={dob}></input> 
       <input type="text" name="fatherName" placeholder="Father's Name" onChange={(e)=>{setFname(e.target.value)}} value={fname}></input> 
       <input type="text" name="motherName" placeholder="Mother's Name" onChange={(e)=>{setMname(e.target.value)}} value={mname}></input>
     
        <button type="submit" onClick={(e)=>{props.addInfo({name,enroll,address,dob,fname,mname});setName("");setEnroll("");setAddress("");setDob(null);setFname("");setMname("")}}>Add</button>
        <Link to="/admin/admin_student">Cancel</Link> 
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

