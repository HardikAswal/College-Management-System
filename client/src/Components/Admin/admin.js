import React from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
// import admin_to_student from "./admin_to_student"

class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <React.Fragment>
                <div id="menu">
                    <ul>
                        <Link to="/admin"><li>Admin</li></Link>
                        <Link to="/admin/admin_student"><li>Dashboard</li></Link>
                        <li>Student</li>
                        <li>Faculty</li>
                        <li>Department</li>
                        <li>Courses</li>
                        <li>Dashboard</li>
                        <li>Dashboard</li>
                    </ul>
                </div>

                <div id="right">
                    <Route path="/admin/admin_student" component={admin_to_student}></Route>
                </div>
            </React.Fragment>
        )
    }
}

export default Admin;

function admin_to_student(){
    return (
        <div>
            Hi admin to studnent module
        </div>
    )
}

