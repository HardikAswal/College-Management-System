import React from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";

class Student extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <React.Fragment>
                Hello from Student
            </React.Fragment>
        )  
    }
}

export default Student;