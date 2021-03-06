import React from 'react'
import {BrowserRouter as Router,Route,Link, Redirect} from "react-router-dom";
import "./admin.css";
import Login from './login.js'; 
import axios from 'axios';
import jwtDecode from 'jwt-decode';


class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        // this.state.student=this.props.student;
        // this.state.faculty=this.props.faculty;
        // this.state.news=[];
        // this.state.department=[];
        // this.state.course=[];
        // this.state.id=null; 
        this.state.password=null; //NEW
        this.state.isAuthenticated=false; //NEW
        this.state.decoded={}
    }

    // componentDidMount(props){
    //     this.setState({
    //         student:this.props.student
    //     })
    // }

    componentDidMount(){
        // axios.get('http://localhost:5000/api/users')
        //      .then(res => {
        //         const students = res.data;
        //         this.setState({
        //             student:students
        //         });
        //      });
        // axios.get('http://localhost:5000/api/faculty')
        //     .then(res => {
        //     const faculty = res.data;
        //     this.setState({
        //         faculty:faculty
        //     });
        // });  
        // axios.get('http://localhost:5000/api/admin/department')
        //     .then(res => {
        //     const departments = res.data;
        //     this.setState({
        //         department:departments
        //     });
        // });   
        // axios.get('http://localhost:5000/api/admin/news')
        //     .then(res => {
        //     const news = res.data;
        //     this.setState({
        //         news:news
        //     });
        // });   
    }

    //***********************NEWLY ADDED CODE STARTS ******************************//
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
                        decoded:jwtDecode(response.headers['x-auth-token']),
                        isAuthenticated:true
                    })
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

    //*************************************NEWLY ADDED CODE ENDS ****************************************//

    // addStudent(student_info){
    //     console.log(student_info);
    //     let {student}=this.state;
    //     student.push(student_info);
    //     console.log(student);

    //     axios.post('http://localhost:5000/api/users/register',student_info)
    //     .then(res => {
    //         this.setState({
    //             student:student
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
       
    //     console.log(this.state.student);
    // }
    
    // addFaculty(faculty_info){
    //     console.log(faculty_info);
    //     let {faculty}=this.state;
    //     faculty.push(faculty_info);
    //     console.log(faculty)
    //     axios.post('http://localhost:5000/api/faculty/register',faculty_info)
    //     .then(res => {
    //         this.setState({
    //             faculty:faculty
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    //     console.log(this.state.faculty);
    // }

    // addNews(info){
    //     console.log(info);
    //     let {news} = this.state;
    //     news.push(info);
    //     axios.post('http://localhost:5000/api/admin/news',info)
    //         .then(res=>{
    //             this.setState({
    //                 news:news
    //             })
    //         })
    //         .catch(err=>console.log(err));
    //     console.log(this.state.news);
    // }

    // addDepartment(dept){
    //  let department=this.state.department;
    //  department.push(dept);
    //  axios.post('http://localhost:5000/api/admin/department',dept)
    //  .then(res=>{
    //      this.setState({
    //         department:dept
    //      });
    //  }) 
    //  .catch(err => console.log(err));  
    // }

    // addCourse(info){
    //     let course = this.state.course;
    //     course.push(info);
    //     axios.post('http://localhost:5000/api/admin/course',info)
    //     .then(res=>{
    //         this.setState({
    //             course:course
    //         });
    //     })
    //     .catch(err=> console.log(err));
    // }

    render(){ 
        //***********************NEWLY ADDED CODE ***************************//
        if(!localStorage.getItem("admin")){
            return (
            <div className="login-wrapper">
                <div className="login"> 
                    <h4 style={{color:"#fff"}}>Login as Administrator</h4>
                    <input type="text" name="id" placeholder="Enter ID" value={this.state.id} onChange={(e)=>this.setState({id:e.target.value})}/>
                    <br/>
                    <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                    <br/>
                    <button type="submit" onClick={(e)=>{this.handleLogin(e)}}>Login</button>
                </div>
            </div>
            )
            }
        else{ //NEWLY ADDED 
        return(
            <React.Fragment>
                <div id="navbar">
                    <p>CMS</p>
                    <input type="text" name="Search" placeholder="Search..."/>
                </div>
                <div id="menu">
                    <ul>
                        <Link to="/admin" className="Link"><li ><i className="fas fa-th fa-lg"></i>Dashboard</li></Link>
                        <Link to="/admin/student" className="Link"><li><i className="fas fa-user-graduate fa-lg"></i>Students</li></Link>
                        <Link to="/admin/faculty" className="Link"><li><i className="fas fa-chalkboard-teacher fa-lg"></i>Faculty</li></Link>
                        <Link to="/admin/department" className="Link"><li><i className="fas fa-building fa-lg"></i>Departments</li></Link> 
                        <Link to="/admin/branch" className="Link"><li><i className="fas fa-book fa-lg"></i>Branch</li></Link>
                        <Link to="/admin/course" className="Link"><li><i className="fas fa-school fa-lg"></i>Course</li></Link>
                        <Link to="/admin/news" className="Link"><li><i className="fas fa-bell fa-lg"></i>News</li></Link>
                        <Link to="/admin/timetable" className="Link"><li><i className="far fa-clock fa-lg"></i>Timetable</li></Link>
                        <li><i className="fas fa-credit-card fa-lg"></i>Payment</li>
                        <li><i className="fas fa-comment-alt fa-lg"></i>Messages</li>
                        <Link to="/admin"><button onClick={(e)=>this.logout()}>Logout</button></Link>
                    </ul>
                </div>

                <div id="right">
                    <Route path="/admin" exact render={(e)=><Dashboard branch={this.props.branch} course={this.props.course} department={this.props.department} student={this.props.student} faculty={this.props.faculty} news={this.props.news}></Dashboard>}></Route>
                    <Route path="/admin/faculty" render={(e)=><MngFclt addFaculty={this.props.addFaculty.bind(this)} faculty={this.props.faculty}></MngFclt>}></Route>
                    <Route path="/admin/student" render={(e)=><MngStd addStudent={this.props.addStudent.bind(this)} student={this.props.student}></MngStd>}></Route>    
                    <Route path="/admin/news" render={(e)=><AddNews news={this.props.news} addNews={this.props.addNews.bind(this)}></AddNews>}></Route>
                    <Route path="/admin/course" render={(e)=><AddCourse branch={this.props.branch} department={this.props.department} course={this.props.course} addCourse={this.props.addCourse.bind(this)}></AddCourse>}></Route>
                    <Route path="/admin/addStudent" render={(e)=><AddStudent department={this.props.department} branch={this.props.branch} addStudent={this.props.addStudent.bind(this)}></AddStudent>}></Route>
                    <Route path="/admin/addFaculty" render={(e)=><Add_faculty course={this.props.course} department={this.props.department} branch={this.props.branch} addFaculty={this.props.addFaculty.bind(this)}></Add_faculty>}></Route>
                    <Route path="/admin/department" render={(e)=><AddDepartment department={this.props.department} addDepartment={this.props.addDepartment.bind(this)}></AddDepartment>}></Route>
                    <Route path="/admin/branch" render={(e)=><AddBranch branch={this.props.branch} department={this.props.department} addBranch={this.props.addBranch.bind(this)}></AddBranch>}></Route>
                    <Route path="/admin/timetable" render={(e)=><TimeTable branch={this.props.branch} timetable={this.props.timetable} AddTimetable={this.props.addTimetable.bind(this)}></TimeTable>}></Route>
                </div>
            </React.Fragment>
        )}
    }
}


export default Admin;

function MngStd(props){
    return (
        <div>
            <div className="student-head"> 
            <h2>Manage Student</h2>
            <Link className="Link" to="/admin/addStudent"><span className="addBtn" style={{float:"right",marginRight:"35px"}}><i class="fas fa-plus"></i> Add Student</span></Link>
            </div>
            <div> 
                <table border="1" className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Enrollment No.</th>
                            <th>Department</th>
                            <th>Branch</th>
                            <th>Phone No.</th>
                            <th>Dob</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.student.map((x)=>(
                        <tr>
                            <td>{x.firstName+" "+x.lastName}</td>
                            <td>{x.enroll}</td>
                            <td>{x.department}</td>
                            <td>{x.branch}</td>
                            <td>{x.mob_no}</td>
                            <td>{JSON.stringify(x.dob).slice(1,11)}</td>
                            <button className="updateBtn">Update</button>
                            <button className="deleteBtn">Delete</button>
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
            <div className="faculty-head"> 
            <h2>Manage Faculty</h2>
            <Link className="Link" to="/admin/addFaculty"><span className="addBtn" style={{float:"right",marginRight:"35px"}}><i class="fas fa-plus"></i> Add Faculty</span></Link>
            </div>
            <div> 
                <table border="1" className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Phone No.</th>
                            <th>Department</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.faculty.map((x)=>(
                        <tr>
                            <td>{x.firstName+" "+x.lastName}</td>
                            <td>{x.id}</td>
                            <td>{x.mob_no}</td>
                            <td>{x.dept}</td>
                            <td>{x.branch}</td>
                            <button className="updateBtn">Update</button>
                            <button className="deleteBtn">Delete</button>
                        </tr>
                    ))} 
                    </tbody>
                </table>
            </div>        
        </div>
    )
}

function AddStudent(props){

    const [firstName, setFirstName] = React.useState("");
    const [middleName, setMiddleName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [gender,setGender] = React.useState(null);
    const [dob, setDob] = React.useState("");
    const [mob_no,setMob_no] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [altEmail,setAltEmail] = React.useState("");
    const [address1, setAddress1] = React.useState("");
    const [address2, setAddress2] = React.useState("");
    const [city, setCity] = React.useState("");
    const [pincode, setPincode] = React.useState("");
    const [state, setstate] = React.useState("");
    const [country, setCountry] = React.useState("");

    const [fname, setFname] = React.useState("");
    const [fat_mob_no,setFatMob_no] = React.useState("");
    const [fth_email,setFthEmail] = React.useState("");
    const [fOccu, setfOccu] = React.useState("");
    const [mname, setMname] = React.useState("");
    const [mth_mob_no,setMthMob_no] = React.useState("");
    const [mth_email,setMthEmail] = React.useState("");
    const [mOccu, setmOccu] = React.useState("");

    const [enroll, setEnroll] = React.useState("");
    const [department,setDept] = React.useState(null);
    const [branch,setBranch] = React.useState(null);

return (
    <div className="add_detail">
        {console.log(props.branch)}
        <br/>
        <h2>Add Student <Link style={{float:"right",marginRight:"25px"}} to="/admin/student"><i style={{color:"#707070" }}class="fas fa-window-close"></i></Link> </h2> 
        <br/>
        <span className="tag">Personal Details</span>

    <div className="form-top">
       <input type="text" name="firstName" placeholder="First Name" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}></input> 
       <input type="text" name="middleName" placeholder="Middle Name" onChange={(e)=>{setMiddleName(e.target.value)}} value={middleName}></input> 
       <input type="text" name="lastName" placeholder="Last Name" onChange={(e)=>{setLastName(e.target.value)}} value={lastName}></input> 
       <select value={gender} onChange={(e)=>setGender(e.target.value)}>
           <option value="">Gender</option>
           <option value="Male">Male</option>
           <option value="Female">Female</option>
           <option value="Other">Other</option>
       </select>
       <input type="date" name="dob" onChange={(e)=>{setDob(e.target.value)}} value={dob}></input> 
       <input type="tel" name="mob_no" placeholder="Mobile No." onChange={(e)=>setMob_no(e.target.value)} value={mob_no} ></input>
    </div>

    <div className="form-mid">
       <input type="email" name="email" placeholder="Email id" onChange={(e) => setEmail(e.target.value)} value={email} ></input>
       <input type="email" name="altEmail" placeholder="Alternate Email id" onChange={(e) => setAltEmail(e.target.value)} value={altEmail}></input>
    </div>

    <div className="form-address">
       <input type="text" name="Address1" placeholder="Address Line 1" onChange={(e)=>{setAddress1(e.target.value)}} value={address1}></input> 
       <input type="text" name="Address2" placeholder="Address Line 2" onChange={(e)=>{setAddress2(e.target.value)}} value={address2}></input> 
    </div>

    <div className="form-bottom">
       <input type="text" name="city" placeholder="City" onChange={(e)=>{setCity(e.target.value)}} value={city}></input> 
       <input type="text" name="pincode" placeholder="Pincode" onChange={(e)=>{setPincode(e.target.value)}} value={pincode}></input> 
       <input type="text" name="state" placeholder="State" onChange={(e)=>{setstate(e.target.value)}} value={state}></input> 
       <select value={country} onChange={(e)=>setCountry(e.target.value)}>
            <option value="AFG">Afghanistan</option>
            <option value="ALA">Åland Islands</option>
            <option value="ALB">Albania</option>
            <option value="DZA">Algeria</option>
            <option value="ASM">American Samoa</option>
            <option value="AND">Andorra</option>
            <option value="AGO">Angola</option>
            <option value="AIA">Anguilla</option>
            <option value="ATA">Antarctica</option>
            <option value="ATG">Antigua and Barbuda</option>
            <option value="ARG">Argentina</option>
            <option value="ARM">Armenia</option>
            <option value="ABW">Aruba</option>
            <option value="AUS">Australia</option>
            <option value="AUT">Austria</option>
            <option value="AZE">Azerbaijan</option>
            <option value="BHS">Bahamas</option>
            <option value="BHR">Bahrain</option>
            <option value="BGD">Bangladesh</option>
            <option value="BRB">Barbados</option>
            <option value="BLR">Belarus</option>
            <option value="BEL">Belgium</option>
            <option value="BLZ">Belize</option>
            <option value="BEN">Benin</option>
            <option value="BMU">Bermuda</option>
            <option value="BTN">Bhutan</option>
            <option value="BOL">Bolivia, Plurinational State of</option>
            <option value="BES">Bonaire, Sint Eustatius and Saba</option>
            <option value="BIH">Bosnia and Herzegovina</option>
            <option value="BWA">Botswana</option>
            <option value="BVT">Bouvet Island</option>
            <option value="BRA">Brazil</option>
            <option value="IOT">British Indian Ocean Territory</option>
            <option value="BRN">Brunei Darussalam</option>
            <option value="BGR">Bulgaria</option>
            <option value="BFA">Burkina Faso</option>
            <option value="BDI">Burundi</option>
            <option value="KHM">Cambodia</option>
            <option value="CMR">Cameroon</option>
            <option value="CAN">Canada</option>
            <option value="CPV">Cape Verde</option>
            <option value="CYM">Cayman Islands</option>
            <option value="CAF">Central African Republic</option>
            <option value="TCD">Chad</option>
            <option value="CHL">Chile</option>
            <option value="CHN">China</option>
            <option value="CXR">Christmas Island</option>
            <option value="CCK">Cocos (Keeling) Islands</option>
            <option value="COL">Colombia</option>
            <option value="COM">Comoros</option>
            <option value="COG">Congo</option>
            <option value="COD">Congo, the Democratic Republic of the</option>
            <option value="COK">Cook Islands</option>
            <option value="CRI">Costa Rica</option>
            <option value="CIV">Côte d'Ivoire</option>
            <option value="HRV">Croatia</option>
            <option value="CUB">Cuba</option>
            <option value="CUW">Curaçao</option>
            <option value="CYP">Cyprus</option>
            <option value="CZE">Czech Republic</option>
            <option value="DNK">Denmark</option>
            <option value="DJI">Djibouti</option>
            <option value="DMA">Dominica</option>
            <option value="DOM">Dominican Republic</option>
            <option value="ECU">Ecuador</option>
            <option value="EGY">Egypt</option>
            <option value="SLV">El Salvador</option>
            <option value="GNQ">Equatorial Guinea</option>
            <option value="ERI">Eritrea</option>
            <option value="EST">Estonia</option>
            <option value="ETH">Ethiopia</option>
            <option value="FLK">Falkland Islands (Malvinas)</option>
            <option value="FRO">Faroe Islands</option>
            <option value="FJI">Fiji</option>
            <option value="FIN">Finland</option>
            <option value="FRA">France</option>
            <option value="GUF">French Guiana</option>
            <option value="PYF">French Polynesia</option>
            <option value="ATF">French Southern Territories</option>
            <option value="GAB">Gabon</option>
            <option value="GMB">Gambia</option>
            <option value="GEO">Georgia</option>
            <option value="DEU">Germany</option>
            <option value="GHA">Ghana</option>
            <option value="GIB">Gibraltar</option>
            <option value="GRC">Greece</option>
            <option value="GRL">Greenland</option>
            <option value="GRD">Grenada</option>
            <option value="GLP">Guadeloupe</option>
            <option value="GUM">Guam</option>
            <option value="GTM">Guatemala</option>
            <option value="GGY">Guernsey</option>
            <option value="GIN">Guinea</option>
            <option value="GNB">Guinea-Bissau</option>
            <option value="GUY">Guyana</option>
            <option value="HTI">Haiti</option>
            <option value="HMD">Heard Island and McDonald Islands</option>
            <option value="VAT">Holy See (Vatican City State)</option>
            <option value="HND">Honduras</option>
            <option value="HKG">Hong Kong</option>
            <option value="HUN">Hungary</option>
            <option value="ISL">Iceland</option>
            <option value="IND">India</option>
            <option value="IDN">Indonesia</option>
            <option value="IRN">Iran, Islamic Republic of</option>
            <option value="IRQ">Iraq</option>
            <option value="IRL">Ireland</option>
            <option value="IMN">Isle of Man</option>
            <option value="ISR">Israel</option>
            <option value="ITA">Italy</option>
            <option value="JAM">Jamaica</option>
            <option value="JPN">Japan</option>
            <option value="JEY">Jersey</option>
            <option value="JOR">Jordan</option>
            <option value="KAZ">Kazakhstan</option>
            <option value="KEN">Kenya</option>
            <option value="KIR">Kiribati</option>
            <option value="PRK">Korea, Democratic People's Republic of</option>
            <option value="KOR">Korea, Republic of</option>
            <option value="KWT">Kuwait</option>
            <option value="KGZ">Kyrgyzstan</option>
            <option value="LAO">Lao People's Democratic Republic</option>
            <option value="LVA">Latvia</option>
            <option value="LBN">Lebanon</option>
            <option value="LSO">Lesotho</option>
            <option value="LBR">Liberia</option>
            <option value="LBY">Libya</option>
            <option value="LIE">Liechtenstein</option>
            <option value="LTU">Lithuania</option>
            <option value="LUX">Luxembourg</option>
            <option value="MAC">Macao</option>
            <option value="MKD">Macedonia, the former Yugoslav Republic of</option>
            <option value="MDG">Madagascar</option>
            <option value="MWI">Malawi</option>
            <option value="MYS">Malaysia</option>
            <option value="MDV">Maldives</option>
            <option value="MLI">Mali</option>
            <option value="MLT">Malta</option>
            <option value="MHL">Marshall Islands</option>
            <option value="MTQ">Martinique</option>
            <option value="MRT">Mauritania</option>
            <option value="MUS">Mauritius</option>
            <option value="MYT">Mayotte</option>
            <option value="MEX">Mexico</option>
            <option value="FSM">Micronesia, Federated States of</option>
            <option value="MDA">Moldova, Republic of</option>
            <option value="MCO">Monaco</option>
            <option value="MNG">Mongolia</option>
            <option value="MNE">Montenegro</option>
            <option value="MSR">Montserrat</option>
            <option value="MAR">Morocco</option>
            <option value="MOZ">Mozambique</option>
            <option value="MMR">Myanmar</option>
            <option value="NAM">Namibia</option>
            <option value="NRU">Nauru</option>
            <option value="NPL">Nepal</option>
            <option value="NLD">Netherlands</option>
            <option value="NCL">New Caledonia</option>
            <option value="NZL">New Zealand</option>
            <option value="NIC">Nicaragua</option>
            <option value="NER">Niger</option>
            <option value="NGA">Nigeria</option>
            <option value="NIU">Niue</option>
            <option value="NFK">Norfolk Island</option>
            <option value="MNP">Northern Mariana Islands</option>
            <option value="NOR">Norway</option>
            <option value="OMN">Oman</option>
            <option value="PAK">Pakistan</option>
            <option value="PLW">Palau</option>
            <option value="PSE">Palestinian Territory, Occupied</option>
            <option value="PAN">Panama</option>
            <option value="PNG">Papua New Guinea</option>
            <option value="PRY">Paraguay</option>
            <option value="PER">Peru</option>
            <option value="PHL">Philippines</option>
            <option value="PCN">Pitcairn</option>
            <option value="POL">Poland</option>
            <option value="PRT">Portugal</option>
            <option value="PRI">Puerto Rico</option>
            <option value="QAT">Qatar</option>
            <option value="REU">Réunion</option>
            <option value="ROU">Romania</option>
            <option value="RUS">Russian Federation</option>
            <option value="RWA">Rwanda</option>
            <option value="BLM">Saint Barthélemy</option>
            <option value="SHN">Saint Helena, Ascension and Tristan da Cunha</option>
            <option value="KNA">Saint Kitts and Nevis</option>
            <option value="LCA">Saint Lucia</option>
            <option value="MAF">Saint Martin (French part)</option>
            <option value="SPM">Saint Pierre and Miquelon</option>
            <option value="VCT">Saint Vincent and the Grenadines</option>
            <option value="WSM">Samoa</option>
            <option value="SMR">San Marino</option>
            <option value="STP">Sao Tome and Principe</option>
            <option value="SAU">Saudi Arabia</option>
            <option value="SEN">Senegal</option>
            <option value="SRB">Serbia</option>
            <option value="SYC">Seychelles</option>
            <option value="SLE">Sierra Leone</option>
            <option value="SGP">Singapore</option>
            <option value="SXM">Sint Maarten (Dutch part)</option>
            <option value="SVK">Slovakia</option>
            <option value="SVN">Slovenia</option>
            <option value="SLB">Solomon Islands</option>
            <option value="SOM">Somalia</option>
            <option value="ZAF">South Africa</option>
            <option value="SGS">South Georgia and the South Sandwich Islands</option>
            <option value="SSD">South Sudan</option>
            <option value="ESP">Spain</option>
            <option value="LKA">Sri Lanka</option>
            <option value="SDN">Sudan</option>
            <option value="SUR">Suriname</option>
            <option value="SJM">Svalbard and Jan Mayen</option>
            <option value="SWZ">Swaziland</option>
            <option value="SWE">Sweden</option>
            <option value="CHE">Switzerland</option>
            <option value="SYR">Syrian Arab Republic</option>
            <option value="TWN">Taiwan, Province of China</option>
            <option value="TJK">Tajikistan</option>
            <option value="TZA">Tanzania, United Republic of</option>
            <option value="THA">Thailand</option>
            <option value="TLS">Timor-Leste</option>
            <option value="TGO">Togo</option>
            <option value="TKL">Tokelau</option>
            <option value="TON">Tonga</option>
            <option value="TTO">Trinidad and Tobago</option>
            <option value="TUN">Tunisia</option>
            <option value="TUR">Turkey</option>
            <option value="TKM">Turkmenistan</option>
            <option value="TCA">Turks and Caicos Islands</option>
            <option value="TUV">Tuvalu</option>
            <option value="UGA">Uganda</option>
            <option value="UKR">Ukraine</option>
            <option value="ARE">United Arab Emirates</option>
            <option value="GBR">United Kingdom</option>
            <option value="USA">United States</option>
            <option value="UMI">United States Minor Outlying Islands</option>
            <option value="URY">Uruguay</option>
            <option value="UZB">Uzbekistan</option>
            <option value="VUT">Vanuatu</option>
            <option value="VEN">Venezuela, Bolivarian Republic of</option>
            <option value="VNM">Viet Nam</option>
            <option value="VGB">Virgin Islands, British</option>
            <option value="VIR">Virgin Islands, U.S.</option>
            <option value="WLF">Wallis and Futuna</option>
            <option value="ESH">Western Sahara</option>
            <option value="YEM">Yemen</option>
            <option value="ZMB">Zambia</option>
            <option value="ZWE">Zimbabwe</option>
        </select>
    </div>
        <br/>
        <br/>
       <span className="tag">Family Details</span>

    <div className="form-bottom">
       <input type="text" name="fatherName" placeholder="Father's Name" onChange={(e)=>{setFname(e.target.value)}} value={fname}></input>
       <input type="text" name="fatherOccu" placeholder="Occupation" onChange={(e)=>setfOccu(e.target.value)} value={fOccu}></input> 
       <input type="tel" name="fth_mob_no" placeholder="Mobile No." onChange={(e) => setFatMob_no(e.target.value)} value={fat_mob_no}></input>
       <input type="email" name="fth_email" placeholder="Email id" onChange={(e) => setFthEmail(e.target.value)} value={fth_email} ></input>
    </div>

       <br/>

    <div className="form-bottom">
       <input type="text" name="motherName" placeholder="Mother's Name" onChange={(e)=>{setMname(e.target.value)}} value={mname}></input>
       <input type="text" name="mothersOccu" placeholder="Occupation" onChange={(e)=>setmOccu(e.target.value)} value={mOccu}></input> 
       <input type="tel" name="mth_mob_no" placeholder="Mobile No." onChange={(e) => setMthMob_no(e.target.value)} value={mth_mob_no}></input>
       <input type="email" name="mth_email" placeholder="Email id" onChange={(e) => setMthEmail(e.target.value)} value={mth_email} ></input>
    </div>

       <br/>
       <br/>

       <span className="tag">Academic Details</span>

    <div className="form-acad">
       <input type="text" name="enroll_no" placeholder="Enrollment Number" onChange={(e)=>{setEnroll(e.target.value)}} value={enroll}></input> 
       <select value={department} onChange={(e)=>setDept(e.target.value)}>
           <option value="">Department</option>
            {props.department.map((x)=>(<option>{x.dept_name}</option>))}  
       </select>

       {/* {props.branch.map((x)=>x.branchDept) === department ?  */}
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            {props.branch.map((x)=>x.branchDept === department ? <option>{x.branchName}</option>:"")}
           </select>
       </span> 
        {/* //  : null} */}

       {/* {department == "B.Sc" ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
           <option value="">Branch</option>
           <option>{props.branch[0].branchDept===department ? props.branch[0].branchName:null}</option>
           </select>
       </span> : null}

       {department == "B.A." ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option>{props.branch[0].branchDept===department ? props.branch[0].branchName:null}</option>
           </select>
       </span> : null}

       {department == "M.Tech" ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option>{props.branch[0].branchDept===department ? props.branch[0].branchName:null}</option>
           </select>
       </span> : null}
       
       {department == "M.Sc" ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option>{props.branch[0].branchDept===department ? props.branch[0].branchName:null}</option>
           </select>
       </span> : null}

       {department == "M.A." ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option>{props.branch[0].branchDept===department ? props.branch[0].branchName:null}</option>
           </select>
       </span> : null} */}
    </div>
       <br/>
       <br/>
       <br/>
       <button type="submit" onClick={(e)=>{props.addStudent({ firstName,middleName,lastName,gender,
        dob,mob_no,email,altEmail,address1,address2,city,pincode,state,country,fname,fat_mob_no,fth_email,fOccu,mname,mth_mob_no,
        mth_email,mOccu,enroll,department,branch});
        setFirstName("");setMiddleName("");setLastName("");setGender("");setDob("");setMob_no("");setEmail("");setAltEmail("");
        setAddress1("");setAddress2("");setCity("");setPincode("");setstate("");setCountry("");setFname("");setFatMob_no("");setFthEmail("");
        setfOccu("");setMname("");setMthMob_no("");setMthEmail("");setmOccu("");setEnroll("");setDept("");setBranch("")}}>Add</button>
        <br/>
        <br/>
        <br/>
    </div>
)}

function Dashboard(props){
    return (
        <React.Fragment>
        <div className="dashboard-head">
            <h2>Dashboard</h2>
        </div>
        <div className="dashboard">
            <div className="banner">
                <div className="banner-img"><img src="/images/student2.png" style={{width:"90px"}}></img></div>
                <div className="banner-info">
                <span>{props.student.length}</span>
                <p>{props.student.length === 1 ? " Student":" Students"}</p>
                </div>
            </div>
            <div className="banner">
                <div className="banner-img"><img src="/images/teacher.png" style={{width:"90px"}}></img></div>
                <div className="banner-info">
                <span>{props.faculty.length}</span>
                <p>Faculty</p>
                </div>
            </div>
            <div className="banner">
                <div className="banner-img"><img src="/images/news.png" style={{width:"90px"}}></img></div>
                <div className="banner-info">
                <span>{props.news.length}</span>
                <p>News</p>
                </div>
            </div>
        </div>
        <div className="banner2">
        <div className="newsBlock">
            <div>
                {props.news.map((x)=>(
                    <div className="news">
                        <b>{x.title}</b><br></br>{x.description}
                    </div>
                ))}
            </div>
        </div>
        <div className="management">
            <div className="mgmt mgmt-1"><span>Departments</span><br/><p>{props.department.length}</p></div>
            <div className="mgmt mgmt-2"><span>Branch</span><br/><p>{props.branch.length}</p></div>
            <div className="mgmt mgmt-3"><span>Courses</span><br/><p>{props.course.length}</p></div>
            <div className="mgmt mgmt-4"><span>Day & Date</span><br/><p>{new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()}</p></div>
        </div>
        </div>
        </React.Fragment>
    )
}

function Add_faculty(props){

    const [firstName, setFirstName] = React.useState("");
    const [middleName, setMiddleName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [gender,setGender] = React.useState(null);
    const [dob, setDob] = React.useState("");
    const [mob_no,setMob_no] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [altEmail,setAltEmail] = React.useState("");
    const [address1, setAddress1] = React.useState("");
    const [address2, setAddress2] = React.useState("");
    const [city, setCity] = React.useState("");
    const [pincode, setPincode] = React.useState("");
    const [state, setstate] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [id, setId] = React.useState("");
    const [dept,setDept] = React.useState(null);
    const [branch,setBranch] = React.useState(null);
    const [coursesTaught,setCoursesTaught]=React.useState([])

    let addCourseTaught = (checked,value) => {
       console.log(checked+" "+value)
       var index=coursesTaught.indexOf(value);
       console.log("Index: ",index);
       if(index==-1)
            setCoursesTaught(coursesTaught.concat(value))
       else
           setCoursesTaught(coursesTaught.splice(coursesTaught.indexOf(value),1))
        console.log(coursesTaught);    
    }

return (
    <div className="add_detail">
        <br/>
        <h2>Add Faculty <Link style={{float:"right",marginRight:"25px"}} to="/admin/faculty"><i style={{color:"#707070" }}class="fas fa-window-close"></i></Link> </h2> 
        <br/>
        <span className="tag">Personal Details</span>

    <div className="form-top">
       <input type="text" name="firstName" placeholder="First Name" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}></input> 
       <input type="text" name="middleName" placeholder="Middle Name" onChange={(e)=>{setMiddleName(e.target.value)}} value={middleName}></input> 
       <input type="text" name="lastName" placeholder="Last Name" onChange={(e)=>{setLastName(e.target.value)}} value={lastName}></input> 
       <select value={gender} onChange={(e)=>setGender(e.target.value)}>
           <option value="">Gender</option>
           <option value="Male">Male</option>
           <option value="Female">Female</option>
           <option value="Other">Other</option>
       </select>
       <input type="date" name="dob" onChange={(e)=>{setDob(e.target.value)}} value={dob}></input> 
       <input type="tel" name="mob_no" placeholder="Mobile No." onChange={(e)=>setMob_no(e.target.value)} value={mob_no} ></input>
    </div>

    <div className="form-mid">
       <input type="email" name="email" placeholder="Email id" onChange={(e) => setEmail(e.target.value)} value={email} ></input>
       <input type="email" name="altEmail" placeholder="Alternate Email id" onChange={(e) => setAltEmail(e.target.value)} value={altEmail}></input>
    </div>

    <div className="form-address">
       <input type="text" name="Address1" placeholder="Address Line 1" onChange={(e)=>{setAddress1(e.target.value)}} value={address1}></input> 
       <input type="text" name="Address2" placeholder="Address Line 2" onChange={(e)=>{setAddress2(e.target.value)}} value={address2}></input> 
    </div>

    <div className="form-bottom">
       <input type="text" name="city" placeholder="City" onChange={(e)=>{setCity(e.target.value)}} value={city}></input> 
       <input type="text" name="pincode" placeholder="Pincode" onChange={(e)=>{setPincode(e.target.value)}} value={pincode}></input> 
       <input type="text" name="state" placeholder="State" onChange={(e)=>{setstate(e.target.value)}} value={state}></input> 
       <select value={country} onChange={(e)=>setCountry(e.target.value)}>
            <option value="AFG">Afghanistan</option>
            <option value="ALA">Åland Islands</option>
            <option value="ALB">Albania</option>
            <option value="DZA">Algeria</option>
            <option value="ASM">American Samoa</option>
            <option value="AND">Andorra</option>
            <option value="AGO">Angola</option>
            <option value="AIA">Anguilla</option>
            <option value="ATA">Antarctica</option>
            <option value="ATG">Antigua and Barbuda</option>
            <option value="ARG">Argentina</option>
            <option value="ARM">Armenia</option>
            <option value="ABW">Aruba</option>
            <option value="AUS">Australia</option>
            <option value="AUT">Austria</option>
            <option value="AZE">Azerbaijan</option>
            <option value="BHS">Bahamas</option>
            <option value="BHR">Bahrain</option>
            <option value="BGD">Bangladesh</option>
            <option value="BRB">Barbados</option>
            <option value="BLR">Belarus</option>
            <option value="BEL">Belgium</option>
            <option value="BLZ">Belize</option>
            <option value="BEN">Benin</option>
            <option value="BMU">Bermuda</option>
            <option value="BTN">Bhutan</option>
            <option value="BOL">Bolivia, Plurinational State of</option>
            <option value="BES">Bonaire, Sint Eustatius and Saba</option>
            <option value="BIH">Bosnia and Herzegovina</option>
            <option value="BWA">Botswana</option>
            <option value="BVT">Bouvet Island</option>
            <option value="BRA">Brazil</option>
            <option value="IOT">British Indian Ocean Territory</option>
            <option value="BRN">Brunei Darussalam</option>
            <option value="BGR">Bulgaria</option>
            <option value="BFA">Burkina Faso</option>
            <option value="BDI">Burundi</option>
            <option value="KHM">Cambodia</option>
            <option value="CMR">Cameroon</option>
            <option value="CAN">Canada</option>
            <option value="CPV">Cape Verde</option>
            <option value="CYM">Cayman Islands</option>
            <option value="CAF">Central African Republic</option>
            <option value="TCD">Chad</option>
            <option value="CHL">Chile</option>
            <option value="CHN">China</option>
            <option value="CXR">Christmas Island</option>
            <option value="CCK">Cocos (Keeling) Islands</option>
            <option value="COL">Colombia</option>
            <option value="COM">Comoros</option>
            <option value="COG">Congo</option>
            <option value="COD">Congo, the Democratic Republic of the</option>
            <option value="COK">Cook Islands</option>
            <option value="CRI">Costa Rica</option>
            <option value="CIV">Côte d'Ivoire</option>
            <option value="HRV">Croatia</option>
            <option value="CUB">Cuba</option>
            <option value="CUW">Curaçao</option>
            <option value="CYP">Cyprus</option>
            <option value="CZE">Czech Republic</option>
            <option value="DNK">Denmark</option>
            <option value="DJI">Djibouti</option>
            <option value="DMA">Dominica</option>
            <option value="DOM">Dominican Republic</option>
            <option value="ECU">Ecuador</option>
            <option value="EGY">Egypt</option>
            <option value="SLV">El Salvador</option>
            <option value="GNQ">Equatorial Guinea</option>
            <option value="ERI">Eritrea</option>
            <option value="EST">Estonia</option>
            <option value="ETH">Ethiopia</option>
            <option value="FLK">Falkland Islands (Malvinas)</option>
            <option value="FRO">Faroe Islands</option>
            <option value="FJI">Fiji</option>
            <option value="FIN">Finland</option>
            <option value="FRA">France</option>
            <option value="GUF">French Guiana</option>
            <option value="PYF">French Polynesia</option>
            <option value="ATF">French Southern Territories</option>
            <option value="GAB">Gabon</option>
            <option value="GMB">Gambia</option>
            <option value="GEO">Georgia</option>
            <option value="DEU">Germany</option>
            <option value="GHA">Ghana</option>
            <option value="GIB">Gibraltar</option>
            <option value="GRC">Greece</option>
            <option value="GRL">Greenland</option>
            <option value="GRD">Grenada</option>
            <option value="GLP">Guadeloupe</option>
            <option value="GUM">Guam</option>
            <option value="GTM">Guatemala</option>
            <option value="GGY">Guernsey</option>
            <option value="GIN">Guinea</option>
            <option value="GNB">Guinea-Bissau</option>
            <option value="GUY">Guyana</option>
            <option value="HTI">Haiti</option>
            <option value="HMD">Heard Island and McDonald Islands</option>
            <option value="VAT">Holy See (Vatican City State)</option>
            <option value="HND">Honduras</option>
            <option value="HKG">Hong Kong</option>
            <option value="HUN">Hungary</option>
            <option value="ISL">Iceland</option>
            <option value="IND">India</option>
            <option value="IDN">Indonesia</option>
            <option value="IRN">Iran, Islamic Republic of</option>
            <option value="IRQ">Iraq</option>
            <option value="IRL">Ireland</option>
            <option value="IMN">Isle of Man</option>
            <option value="ISR">Israel</option>
            <option value="ITA">Italy</option>
            <option value="JAM">Jamaica</option>
            <option value="JPN">Japan</option>
            <option value="JEY">Jersey</option>
            <option value="JOR">Jordan</option>
            <option value="KAZ">Kazakhstan</option>
            <option value="KEN">Kenya</option>
            <option value="KIR">Kiribati</option>
            <option value="PRK">Korea, Democratic People's Republic of</option>
            <option value="KOR">Korea, Republic of</option>
            <option value="KWT">Kuwait</option>
            <option value="KGZ">Kyrgyzstan</option>
            <option value="LAO">Lao People's Democratic Republic</option>
            <option value="LVA">Latvia</option>
            <option value="LBN">Lebanon</option>
            <option value="LSO">Lesotho</option>
            <option value="LBR">Liberia</option>
            <option value="LBY">Libya</option>
            <option value="LIE">Liechtenstein</option>
            <option value="LTU">Lithuania</option>
            <option value="LUX">Luxembourg</option>
            <option value="MAC">Macao</option>
            <option value="MKD">Macedonia, the former Yugoslav Republic of</option>
            <option value="MDG">Madagascar</option>
            <option value="MWI">Malawi</option>
            <option value="MYS">Malaysia</option>
            <option value="MDV">Maldives</option>
            <option value="MLI">Mali</option>
            <option value="MLT">Malta</option>
            <option value="MHL">Marshall Islands</option>
            <option value="MTQ">Martinique</option>
            <option value="MRT">Mauritania</option>
            <option value="MUS">Mauritius</option>
            <option value="MYT">Mayotte</option>
            <option value="MEX">Mexico</option>
            <option value="FSM">Micronesia, Federated States of</option>
            <option value="MDA">Moldova, Republic of</option>
            <option value="MCO">Monaco</option>
            <option value="MNG">Mongolia</option>
            <option value="MNE">Montenegro</option>
            <option value="MSR">Montserrat</option>
            <option value="MAR">Morocco</option>
            <option value="MOZ">Mozambique</option>
            <option value="MMR">Myanmar</option>
            <option value="NAM">Namibia</option>
            <option value="NRU">Nauru</option>
            <option value="NPL">Nepal</option>
            <option value="NLD">Netherlands</option>
            <option value="NCL">New Caledonia</option>
            <option value="NZL">New Zealand</option>
            <option value="NIC">Nicaragua</option>
            <option value="NER">Niger</option>
            <option value="NGA">Nigeria</option>
            <option value="NIU">Niue</option>
            <option value="NFK">Norfolk Island</option>
            <option value="MNP">Northern Mariana Islands</option>
            <option value="NOR">Norway</option>
            <option value="OMN">Oman</option>
            <option value="PAK">Pakistan</option>
            <option value="PLW">Palau</option>
            <option value="PSE">Palestinian Territory, Occupied</option>
            <option value="PAN">Panama</option>
            <option value="PNG">Papua New Guinea</option>
            <option value="PRY">Paraguay</option>
            <option value="PER">Peru</option>
            <option value="PHL">Philippines</option>
            <option value="PCN">Pitcairn</option>
            <option value="POL">Poland</option>
            <option value="PRT">Portugal</option>
            <option value="PRI">Puerto Rico</option>
            <option value="QAT">Qatar</option>
            <option value="REU">Réunion</option>
            <option value="ROU">Romania</option>
            <option value="RUS">Russian Federation</option>
            <option value="RWA">Rwanda</option>
            <option value="BLM">Saint Barthélemy</option>
            <option value="SHN">Saint Helena, Ascension and Tristan da Cunha</option>
            <option value="KNA">Saint Kitts and Nevis</option>
            <option value="LCA">Saint Lucia</option>
            <option value="MAF">Saint Martin (French part)</option>
            <option value="SPM">Saint Pierre and Miquelon</option>
            <option value="VCT">Saint Vincent and the Grenadines</option>
            <option value="WSM">Samoa</option>
            <option value="SMR">San Marino</option>
            <option value="STP">Sao Tome and Principe</option>
            <option value="SAU">Saudi Arabia</option>
            <option value="SEN">Senegal</option>
            <option value="SRB">Serbia</option>
            <option value="SYC">Seychelles</option>
            <option value="SLE">Sierra Leone</option>
            <option value="SGP">Singapore</option>
            <option value="SXM">Sint Maarten (Dutch part)</option>
            <option value="SVK">Slovakia</option>
            <option value="SVN">Slovenia</option>
            <option value="SLB">Solomon Islands</option>
            <option value="SOM">Somalia</option>
            <option value="ZAF">South Africa</option>
            <option value="SGS">South Georgia and the South Sandwich Islands</option>
            <option value="SSD">South Sudan</option>
            <option value="ESP">Spain</option>
            <option value="LKA">Sri Lanka</option>
            <option value="SDN">Sudan</option>
            <option value="SUR">Suriname</option>
            <option value="SJM">Svalbard and Jan Mayen</option>
            <option value="SWZ">Swaziland</option>
            <option value="SWE">Sweden</option>
            <option value="CHE">Switzerland</option>
            <option value="SYR">Syrian Arab Republic</option>
            <option value="TWN">Taiwan, Province of China</option>
            <option value="TJK">Tajikistan</option>
            <option value="TZA">Tanzania, United Republic of</option>
            <option value="THA">Thailand</option>
            <option value="TLS">Timor-Leste</option>
            <option value="TGO">Togo</option>
            <option value="TKL">Tokelau</option>
            <option value="TON">Tonga</option>
            <option value="TTO">Trinidad and Tobago</option>
            <option value="TUN">Tunisia</option>
            <option value="TUR">Turkey</option>
            <option value="TKM">Turkmenistan</option>
            <option value="TCA">Turks and Caicos Islands</option>
            <option value="TUV">Tuvalu</option>
            <option value="UGA">Uganda</option>
            <option value="UKR">Ukraine</option>
            <option value="ARE">United Arab Emirates</option>
            <option value="GBR">United Kingdom</option>
            <option value="USA">United States</option>
            <option value="UMI">United States Minor Outlying Islands</option>
            <option value="URY">Uruguay</option>
            <option value="UZB">Uzbekistan</option>
            <option value="VUT">Vanuatu</option>
            <option value="VEN">Venezuela, Bolivarian Republic of</option>
            <option value="VNM">Viet Nam</option>
            <option value="VGB">Virgin Islands, British</option>
            <option value="VIR">Virgin Islands, U.S.</option>
            <option value="WLF">Wallis and Futuna</option>
            <option value="ESH">Western Sahara</option>
            <option value="YEM">Yemen</option>
            <option value="ZMB">Zambia</option>
            <option value="ZWE">Zimbabwe</option>
        </select>
    </div>
        <br/>
        <br/>

    <span className="tag">University Details</span>

    <div className="form-acad">
       <input type="text" name="id" placeholder="ID" onChange={(e)=>{setId(e.target.value)}} value={id}></input> 
       <select value={dept} onChange={(e)=>setDept(e.target.value)}>
           <option value="">Department</option>
            {props.department.map((x)=>(<option>{x.dept_name}</option>))}  
       </select>
 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            {props.branch.map((x)=>x.branchDept === dept ? <option>{x.branchName}</option>:"")}
           </select>
       </span> 

       <br/>
    </div>
       <span>
            {props.course.map((x)=>x.courseBranch === branch ? 
            <div><input type="checkbox" style={{display:"inline"}} value={x.courseName} name={x.courseName} onChange={(e)=>addCourseTaught(e.target.checked,e.target.value)}/>{x.courseName}</div>:null)}
       </span>
       <br/>
       <button type="submit" onClick={(e)=>{props.addFaculty({ firstName,middleName,lastName,gender,
        dob,mob_no,email,altEmail,address1,address2,city,pincode,state,country,id,dept,branch,coursesTaught});
        setFirstName("");setMiddleName("");setLastName("");setGender("");setDob("");setMob_no("");setEmail("");setAltEmail("");
        setAddress1("");setAddress2("");setCity("");setPincode("");setstate("");setCountry("");
        setId("");setDept("");setBranch("");setCoursesTaught([])}}>Add</button>
        <br/>
        <br/>
        <br/>
    </div>
)
}

function AddNews(props){
    const [title,setTitle] = React.useState(null);
    const [description,setDescription] = React.useState(null);
    
    return (
        <div className="news-head">
            <h2>News</h2>
            <input type="text" name="title" placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input type="text" name="description" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
            <button type="submit" onClick={(e)=>{props.addNews({title,description});setTitle("");setDescription("")}}>Add</button>
            <div>
                    <div className="news">
                        <table className="table news-table">
                        <thead>
                            <tr>
                                <th className="news-no">Sr. No.</th>
                                <th className="news-title">Title</th>
                                <th className="news-desc">News</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.news.map((x,i)=>(    
                            <tr>
                                <td className="news-no">{i+1}</td>
                                <td className="news-title"><b>{x.title}</b></td>
                                <td className="news-desc">{x.description}</td>
                                <td><button  className="deleteBtn">Delete</button></td>
                            </tr> 
                        ))}
                        </tbody>
                        </table>
                    </div>
            </div>
            <br/>
            <br/>
        </div>
    )
}

function AddDepartment(props){
    const [dept_name,setDeptName]=React.useState(null);

     return (
        <React.Fragment>
            <div className="department-head">
            <h2>Departments</h2>
            <input type="text" name="Department Name" placeholder="Department Name" value={dept_name} onChange={(e)=>{setDeptName(e.target.value)}}></input>
            <button type="submit" onClick={(e)=>{props.addDepartment({dept_name});setDeptName("")}}>Add</button>
            <div>
                    <div className="department">
                        <table className="table dept-table">
                        <thead>
                            <tr>
                                <th>Departments</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.department.map((x)=>(    
                            <tr>
                                <td>{x.dept_name}</td>
                            </tr> 
                        ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
            </div>
        </React.Fragment>
     )   
}

function AddBranch(props){
    const [branchName,setBranchName]=React.useState("");
    const [branchDept,setBranchDept] = React.useState("");
     return (
        <React.Fragment>
            <div className="course-head">
            <h2>Branch</h2>
            <input type="text" name="Branch Name" placeholder="Branch Name" value={branchName} onChange={(e)=>{setBranchName(e.target.value)}}></input>
            <select value={branchDept} onChange={(e)=>setBranchDept(e.target.value)}>
                <option value={null}>Select Department</option>
                {props.department.map((x)=>(
                    <option value={x.dept_name}>{x.dept_name}</option>
                ))}
            </select>
            <button type="submit" onClick={(e)=>{props.addBranch({branchName,branchDept});setBranchName("");setBranchDept("")}}>Add</button>
            <div>
                    <div className="courses">
                        <table className="table course-table">
                        <thead>
                            <tr>
                                <th>Branch</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.branch.map((x)=>(    
                            <tr>
                                <td>{x.branchName}</td>
                                <td>{x.branchDept}</td>
                            </tr> 
                        ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
            </div>
        </React.Fragment>
     )   
}

function AddCourse(props){
    const [courseName,setCourseName]=React.useState("");
    const [courseCode,setCourseCode]=React.useState("");
    const [courseDept,setCourseDept]=React.useState("");
    const [courseBranch,setCourseBranch]=React.useState("");
     return (
        <React.Fragment>
            <div className="course-head">
            <h2>Courses</h2>
            <input type="text" name="Course Name" placeholder="Course Name" value={courseName} onChange={(e)=>{setCourseName(e.target.value)}}></input>
            <input type="text" name="Course Code" placeholder="Course Code" value={courseCode} onChange={(e)=>{setCourseCode(e.target.value)}}></input>
            <select value={courseDept} onChange={(e)=>setCourseDept(e.target.value)}>
                <option value={null}>Select Department</option>
                {props.department.map((x)=>(
                    <option value={x.dept_name}>{x.dept_name}</option>
                ))}
            </select>
            <select value={courseBranch} onChange={(e)=>setCourseBranch(e.target.value)}>
                <option value={null}>Select Branch</option>
                {props.branch.map((x)=>x.branchDept === courseDept ? <option value={x.branchName}>{x.branchName}</option>:null)}
            </select>
            <button type="submit" onClick={(e)=>{props.addCourse({courseName,courseCode,courseDept,courseBranch});setCourseName("");setCourseDept("");setCourseCode("")}}>Add</button>
            <div>
                    <div className="courses">
                        <table className="table course-table">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Course Code</th>
                                <th>Branch</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.course.map((x)=>(    
                            <tr>
                                <td>{x.courseName}</td>
                                <td>{x.courseCode}</td>
                                <td>{x.courseBranch}</td>
                                <td>{x.courseDept}</td>
                            </tr> 
                        ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
            </div>
        </React.Fragment>
     )   
}

function TimeTable(props){
    const [timetable,setTimetable]=React.useState({file:null});
    const [section,setSection]=React.useState(null);
    const setImage = (e) => {
        //console.log(e.target.files[0].name);
        let file = e.target.files[0];  //Capture the file in variable otherwise event gets nullified and you won't get file.
        console.log(file);
        setTimetable(prevState=>({
            ...prevState,
         //    file:URL.createObjectURL(file)
         file:file
         }))
      }

    return (
        <React.Fragment>
            <div className="news-head">
                <h2>Timetable</h2>
            </div>
            <div>
            <input type="file" name="timetable" onChange={setImage}/>
            <select value={section} onChange={(e)=>setSection(e.target.value)}>
                <option value="">Branch</option>
                {props.branch.map((x)=><option value={x.branchName}>{x.branchName}</option>)}
            </select>
            <button onClick={(e)=>props.AddTimetable({timetable,section})}>Add</button>
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

