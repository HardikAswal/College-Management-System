import React from 'react';
import './App.css';
import {BrowserRouter as  Router,Route,Link, Redirect} from 'react-router-dom';
import Admin from "./Components/Admin/admin";
import Faculty from "./Components/Faculty/faculty";
import Student from "./Components/Student/student";
import noMatch from  "./nomatch";
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    //************NEW ***********/
    this.state.student=[];
    this.state.faculty=[];
    this.state.news=[];
    this.state.department=[];
    this.state.branch=[];
    this.state.course=[];
    this.state.timetable=[];
    this.state.id=null; //NEW
    this.state.password=null; //NEW
    this.state.isAuthenticated=false; //NEW
    this.state.decoded={}
    //*********** NEW*******************/
  }

  //*****************NEW **********************************//
  componentDidMount(){
    axios.get('http://localhost:5000/api/users')
         .then(res => {
            const students = res.data;
            this.setState({
                student:students
            });        
      });
    axios.get('http://localhost:5000/api/faculty')
        .then(res => {
            const faculty = res.data;
            this.setState({
                faculty:faculty
            });
      });  
    axios.get('http://localhost:5000/api/admin/department')
        .then(res => {
            const departments = res.data;
            this.setState({
                department:departments
            });
      }); 
    axios.get('http://localhost:5000/api/admin/branch')
        .then(res => {
            const branch = res.data;
            this.setState({
                branch:branch
            });
      });
    axios.get('http://localhost:5000/api/admin/course')
    .then(res => {
        const course = res.data;
        this.setState({
            course:course
        });
      });   
    axios.get('http://localhost:5000/api/admin/news')
        .then(res => {
            const news = res.data;
            this.setState({
                news:news
            });
      });  
}
  
  addStudent(student_info){
    console.log(student_info);
    let {student}=this.state;
    student.push(student_info);
    console.log(student);

    axios.post('http://localhost:5000/api/users/register',student_info)
    .then(res => {
        this.setState({
            student:student
        })
    })
    .catch(err => {
        console.log(err)
    });
    console.log(this.state.student);
  }

  addFaculty(faculty_info){
    console.log(faculty_info);
    let {faculty}=this.state;
    faculty.push(faculty_info);
    console.log(faculty)
    axios.post('http://localhost:5000/api/faculty/register',faculty_info)
    .then(res => {
        this.setState({
            faculty:faculty
        })
    })
    .catch(err => {
        console.log(err)
    })
    console.log(this.state.faculty);
  }

  addNews(info){
    console.log(info);
    let {news} = this.state;
    news.push(info);
    axios.post('http://localhost:5000/api/admin/news',info)
        .then(res=>{
            this.setState({
                news:news
            })
        })
        .catch(err=>console.log(err));
    console.log(this.state.news);
  }

  addDepartment(dept){
    let department=this.state.department;
    department.push(dept);
    axios.post('http://localhost:5000/api/admin/department',dept)
    .then(res=>{
        this.setState({
           department:dept
        });
    }) 
    .catch(err => console.log(err));  
   }

   addBranch(info){
       let branch = this.state.branch;
       branch.push(info);
       axios.post('http://localhost:5000/api/admin/branch',info)
       .then(res=>{
           this.setState({
               branch:branch
           });
       })
       .catch(err=> console.log(err));
   }

   addCourse(course){
     let courses = this.state.course;
     courses.push(course);
     axios.post('http://localhost:5000/api/admin/course',course)
          .then(res=>{
            this.setState({
              course:courses
            });
          })
          .catch(err=>console.log(err));  
   }

   
    EnrollInCourse = (coursesEnrolled,id,name) => {
      console.log(coursesEnrolled);

      axios.put(`http://localhost:5000/api/users/update/${id}`,coursesEnrolled)
           .then(res=>{
              console.log(res.data);
              let students = this.state.student;
              students[id]=res.data;
              this.setState({
                student:students
              });
              console.log(this.state.student);
            })
            .catch(err => console.log(err));

      axios.put(`http://localhost:5000/api/admin/course/${coursesEnrolled._id}`,{id,name})
      .then(res=>{
          console.log(res.data);
          let course = this.state.course;
          course[id]=res.data;
          this.setState({
            course:course
          });
          console.log(this.state.course);
        })
        .catch(err => console.log(err));      
    }
    
    addTimetable = (info) => {
      console.log(info);
      if(!info) return;

      const data = new FormData();
      data.append('timetable',info.timetable.file);

      axios.post('http://localhost:5000/api/admin/timetable',data)
           .then(res => {
             console.log(res.data)
           })
           .catch(err=>console.log(err));
    }

    
//*******************NEW ENDS ***********************************//

  render(){
    return (
      <React.Fragment>
        <Route path="/admin" render={(e)=><Admin 
                                  student={this.state.student} 
                                  addStudent={this.addStudent.bind(this)}  
                                  faculty={this.state.faculty} 
                                  addFaculty={this.addFaculty.bind(this)} 
                                  news={this.state.news} 
                                  addNews={this.addNews.bind(this)}
                                  department={this.state.department}
                                  addDepartment={this.addDepartment.bind(this)}
                                  branch={this.state.branch}
                                  addBranch={this.addBranch.bind(this)}
                                  course={this.state.course}
                                  addCourse={this.addCourse.bind(this)}
                                  timetable={this.state.timetable}
                                  addTimetable={this.addTimetable.bind(this)}>
        </Admin>}></Route>
        <Route path="/faculty" render={e=><Faculty branch={this.state.branch} student={this.state.student} news={this.state.news} course={this.state.course} faculty={this.state.faculty}></Faculty>}></Route>
        <Route path="/student" render={e=><Student branch={this.state.branch} course={this.state.course} news={this.state.news} EnrollInCourse={this.EnrollInCourse.bind(this)}></Student>}></Route>
        <Route path="/" exact><Redirect to="/student"></Redirect></Route>
        <Route component={noMatch}></Route>
      </React.Fragment>
    )
  }
}

export default App;
