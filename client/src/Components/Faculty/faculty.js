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

    //*************************NEWLY ADDED CODE ENDS ***************************//


    render(){
         //***********************NEWLY ADDED CODE STARTS *************************/
         if(!localStorage.getItem("faculty")){ //CAN ALSO BE IMPLEMENTED USING isAuthenticated
            return (
            <div className="login-wrapper">
                <div className="login"> 
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
                    <Link to="/admin/student" className="Link"><li><i className="fas fa-user-graduate fa-lg"></i>Students</li></Link>
                    <Link to="/faculty/attendance" className="Link"><li><i className="fas fa-chalkboard-teacher fa-lg"></i>Attendance</li></Link>
                    <li><i class="fas fa-building fa-lg"></i>Departments</li>
                    <li><i class="fas fa-book fa-lg"></i>Courses</li>
                    <li><i class="fas fa-school fa-lg"></i>Classes</li>
                    <Link to="/admin/news" className="Link"><li><i class="fas fa-bell fa-lg"></i>News</li></Link>
                    <li><i class="far fa-clock fa-lg"></i>Timetable</li>
                    <li><i class="fas fa-credit-card fa-lg"></i>Payment</li>
                    <li><i class="fas fa-comment-alt fa-lg"></i>Messages</li>
                    <button onClick={(e)=>this.logout()}>Logout</button>
                </ul>
            </div>

            <div id="right">
                <Route path="/faculty" exact render={(e)=><Dashboard decoded={this.state.decoded} student={this.state.student} faculty={this.state.faculty} news={this.state.news}></Dashboard>}></Route>
                <Route path="/faculty/attendance" render={e=><Attendance student={this.props.student}></Attendance>}></Route>
                <Route path="/admin/faculty" render={(e)=><MngFclt addFaculty={this.addFaculty.bind(this)} faculty={this.state.faculty}></MngFclt>}></Route>
                <Route path="/admin/student" render={(e)=><MngStd addStudent={this.addStudent.bind(this)} student={this.state.student}></MngStd>}></Route>    
                <Route path="/admin/news" render={(e)=><AddNews AddNews={this.AddNews.bind(this)}></AddNews>}></Route>
                <Route path="/admin/addStudent" render={(e)=><AddStudent addStudent={this.addStudent.bind(this)}></AddStudent>}></Route>
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
                    {jwtDecode(localStorage.getItem('faculty')).firstName +" "+jwtDecode(localStorage.getItem('faculty')).lastName}
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}

function Attendance(props){
    const decoded = jwtDecode(localStorage.getItem('faculty'));
    console.log("Decoded:",decoded);
    return (
        <React.Fragment>
        <div className="attendance-head">
            <h2>Attendance</h2>
        </div>
        <div className="attendance">
    {props.student.map((x)=>(x.branch == decoded.branch.toLowerCase()) ? <div>{x.firstName+" "+x.lastName}<br/>{x.enroll}</div>:console.log(x.branch+" "+decoded.branch))}
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
    const [course,setCourse] = React.useState(null);
    const [branch,setBranch] = React.useState(null);

return (
    <div className="add_student">
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
       <select value={course} onChange={(e)=>setCourse(e.target.value)}>
           <option value="">Course</option>
           <option value="btech">Bachelor of Technology (B.Tech)</option>
           <option value="bba">Bachelor of Business Administration (BBA)</option>
           <option value="bsc">Bachelor of Science (B.Sc)</option>
           <option value="bcomm">Bachelor of Commerce (B.Comm)</option>
           <option value="ba">Bachelor of Arts (B.A)</option>
           <option value="bjmc">Bachelor of Journalism & Mass Communication (B.J.M.C)</option>
           <option value="mtech">Masters of Technology (M.Tech)</option>
           <option value="mba">Masters of Business Administration (MBA)</option>
           <option value="msc">Masters of Science (M.Sc)</option>
           <option value="mcomm">Masters of Commerce (M.Comm)</option>
           <option value="ma">Masters of Arts (M.A)</option>
       </select>

       {course == "btech" ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option value="btech-auto">Automobile</option>
            <option value="btech-it">IT</option>
            <option value="btech-cse">CSE</option>
            <option value="btech-ece">ECE</option>
            <option value="btech-ee">EE</option>
            <option value="btech-civ">Cvil</option>
            <option value="btech-chem">Chemical</option>
            <option value="btech-mech">Mechanical</option>
            <option value="btech-mech">Mechatronics</option>
           </select>
       </span> : null}

       {course == "bsc" ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option value="bsc-phy">Physics</option>
            <option value="bsc-chem">Chemistry</option>
            <option value="bsc-math">Mathematics</option>
            <option value="bsc-bio">Biology</option>
            <option value="bsc-evs">Environmental Science</option>
            <option value="bsc-hs">Home Science</option>
           </select>
       </span> : null}

       {course == "ba" ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option value="ba-eng">English</option>
            <option value="ba-psy">Psychology</option>
            <option value="ba-psc">Political Science</option>
            <option value="ba-pr">Public Relations</option>
            <option value="ba-soc">Sociology</option>
            <option value="ba-eco">Economics</option>
            <option value="ba-geo">Geography</option>
           </select>
       </span> : null}

       {course == "mtech" ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option value="mtech-auto">Automobile</option>
            <option value="mtech-it">IT</option>
            <option value="mtech-cse">CSE</option>
            <option value="mtech-ece">ECE</option>
            <option value="mtech-ee">EE</option>
            <option value="mtech-civ">Cvil</option>
            <option value="mtech-chem">Chemical</option>
            <option value="mtech-mech">Mechanical</option>
            <option value="mtech-mech">Mechatronics</option>
           </select>
       </span> : null}
       
       {course == "msc" ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option value="msc-phy">Physics</option>
            <option value="msc-chem">Chemistry</option>
            <option value="msc-math">Mathematics</option>
            <option value="msc-bio">Biology</option>
            <option value="msc-evs">Environmental Science</option>
            <option value="msc-hs">Home Science</option>
           </select>
       </span> : null}

       {course == "ma" ? 
       <span>
           <select value={branch} onChange={(e=>setBranch(e.target.value))}>
            <option value="">Branch</option>
            <option value="ma-eng">English</option>
            <option value="ma-psy">Psychology</option>
            <option value="ma-psc">Political Science</option>
            <option value="ma-pr">Public Relations</option>
            <option value="ma-soc">Sociology</option>
            <option value="ma-eco">Economics</option>
            <option value="ma-geo">Geography</option>
           </select>
       </span> : null}
    </div>
       <br/>
       <button type="submit" onClick={(e)=>{props.addStudent({ firstName,middleName,lastName,gender,
        dob,mob_no,email,altEmail,address1,address2,city,pincode,state,country,fname,fat_mob_no,fth_email,fOccu,mname,mth_mob_no,
        mth_email,mOccu,enroll,course,branch});
        setFirstName("");setMiddleName("");setLastName("");setGender("");setDob("");setMob_no("");setEmail("");setAltEmail("");
        setAddress1("");setAddress2("");setCity("");setPincode("");setstate("");setCountry("");setFname("");setFatMob_no("");setFthEmail("");
        setfOccu("");setMname("");setMthMob_no("");setMthEmail("");setmOccu("");setEnroll("");setCourse("");setBranch("")}}>Add</button>
        <br/>
        <br/>
        <br/>
    </div>
)}

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

export default Faculty;