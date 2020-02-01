import React from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";

class Faculty extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <React.Fragment>
                Hello from Faculty
            </React.Fragment>
        )
    }
}

export default Faculty;