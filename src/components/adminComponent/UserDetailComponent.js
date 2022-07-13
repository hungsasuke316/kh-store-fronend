import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CheckLoginService from '../../services/CheckLoginService';
import Header from "../header/Header";


function UserDetailComponent() {
    const navigate = useNavigate()
    const { usersId } = useParams()
    const [users, setUsers] = useState({})
    const [listRole, setListRole] = useState({})
    const [id, setUserId] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [status, setStatus] = useState("")
    const [roles, setRoles] = useState("")
    const [roleName, setRoleName] = useState("")
    const [selectedRole, setSelectedRole] = useState({})
    const BASE_URL = 'http://localhost:9999/users/with-dto/' + usersId
    const URL = 'http://localhost:9999/roles'
    console.log("ID: ")
    console.log(usersId)
    
    

    useEffect(() => 
        {
            if(usersId) {
                const token = window.localStorage.getItem("accessToken")
                const params = {        
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                axios.get(BASE_URL, params)
                .then(res => {
                    console.log("data: ")
                    console.log(res.data)
                    setUserId(res.data.userId)
                    setUsername(res.data.username)
                    setPassword(res.data.password)
                    setFirstName(res.data.firstName)
                    setLastName(res.data.lastName)
                    setAddress(res.data.address)
                    setPhone(res.data.phone)
                    setStatus(res.data.status)
                    setRoles(res.data.roles.rolesId)                    
                    setUsers(res.data)
                })
                
            }
        }, [])
    
    const updateUser = () =>{

        const token = window.localStorage.getItem("accessToken")
                const params = {        
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

        if(usersId){
            console.log("Name: " + roleName)
            role1.forEach(item => {
                if(item.name === roleName){
                    setSelectedRole(item)
                    console.log("item: ")
                    console.log(item)
                }
            })
            console.log("selected: ")
            console.log(selectedRole)
            const roles = selectedRole
                
            const payload = {roles, username,password, firstName, lastName,address, phone, status}
            console.log(payload)
            const URL= 'http://localhost:9999/users/' + usersId
            axios.put(URL,payload,params)
            
            .then(res => {
                if(res.status===200){
                    alert("success")
                    navigate('/admin/user')
                }
            })
            .catch(e =>
                    console.log(e)
                )
        }
        else{
            console.log("Name: " + roleName)
            role1.forEach(item => {
                if(item.name === roleName){
                    setSelectedRole(item)
                    console.log("item: ")
                    console.log(item)
                }
            })
            console.log("selected: ")
            console.log(selectedRole)
            const roles = selectedRole
                
            const payload = {roles, username,password, firstName, lastName,address, phone, status}
            console.log("payload: ")
            console.log(payload)
            const URL= 'http://localhost:9999/users'
            axios.post(URL,payload,params)
            
            
            .then(res => {
                if(res.status===201){
                    alert("success")
                    navigate('/admin/user')
                }
            })
            .catch(e =>
                    console.log(e)
                )
        }
    
    }

    const deleteUser = () =>{
        const token = window.localStorage.getItem("accessToken")
                const params = {        
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

        if(usersId){            
            const URL= 'http://localhost:9999/users/' + usersId
            axios.delete(URL, params)
            
            .then(res => {
                if(res.status===200){
                    alert("delete success")
                    navigate('/admin/user')
                }
            })
            .catch(e =>
                    console.log(e)
                )
        }
    }

    
    const [role1, setRole1] = useState([])
    const getRole1 = () => {
        const token = window.localStorage.getItem("accessToken")
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(URL, params)
            .then(res => { setRole1(res.data); })
            .catch(e =>
                console.log(e)
            )
    }

    useEffect(() => getRole1(), [])
    console.log("role1:")
    console.log(role1)

    const statusLogin = CheckLoginService.check()

    return (
        <div className="main">
            <Header status={statusLogin}/>
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <form method="POST" id="signup-form" className="signup-form">
                        <h2 className="form-title">Users Info</h2>
                        <div className="form-group">
                            ID---------:
                            <input type="text" className="form-input" name="name" id="name" placeholder="User ID" 
                            value={users.usersId}
                            hidden={usersId? false:true}/>
                        </div>
                        <div className="form-group">
                            Username:
                            <input type="text" className="form-input" name="name" id="name" placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            hidden={usersId? true:false}/>
                        </div>
                        <div className="form-group">
                            Password-:
                            <input type="text" className="form-input" name="name" id="name" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            hidden={usersId? true:false}/>
                        </div>
                        <div className="form-group">                                 
                                    Role-------:
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => {
                                                setRoleName(e.target.value)
                                                console.log(e.target.value)
                                            } }
                                            >
                                    {    
                                        role1.map(role0 =>
                                            <option value={role0.name} >{role0.name}</option>    
                                        )                                       
                                    } 
                                    </select>                                   
                        </div>
                        <div className="form-group">
                            First Name:
                            <input type="text" className="form-input" name="firstName" id="firstName" placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            Last Name:
                            <input type="text" className="form-input" name="lastName" id="lastName" placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            Address---:
                            <input type="text" className="form-input" name="address" id="address" placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            Phone-----:
                            <input type="text" className="form-input" name="phone" id="phone" placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        {/* <div className="form-group">                            
                            <input type="text" className="form-input" name="status" id="status" placeholder="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}/>
                        </div>                    */}
                        <div className="form-group">
                            ------------
                            <input type="button" name="button" id="button" className="form-submit" value="Save" onClick={updateUser}/>
                            <input type="button" name="button" id="button" className="form-submit" value="Delete" onClick={deleteUser}
                            hidden={usersId? false:true}/>
                            -----------------
                        </div>
                    </form>
                </div>
            </div>
        </section>

    </div>
    )
}
export default UserDetailComponent;