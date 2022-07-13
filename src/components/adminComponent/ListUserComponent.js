import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import CheckLoginService from '../../services/CheckLoginService';
import Header from "../header/Header";


function ListUserComponent() {

    const BASE_URL = 'http://localhost:9999/users'
    const [users, setUsers] = useState([])
    const getUsers = () => {
        const token = window.localStorage.getItem("accessToken")
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(BASE_URL, params)
            .then(res => { setUsers(res.data); })
            .catch(e =>
                console.log(e)
            )



    }

    useEffect(() => getUsers(), [])
    console.log(users)

    const statusLogin = CheckLoginService.check()
	console.log(statusLogin)

    return (

        <div>
            <Header status={statusLogin}/>
            <div className="form-group">
                <Link to="/admin/user/add" className="btn btn-primary mb-2" > Add new user </Link>
                <Link to="/admin/category" className="btn btn-primary mb-2" > Category Management </Link>
                <Link to="/admin/product" className="btn btn-primary mb-2" > Product  Management</Link>
            </div>            

            <table className="table">
                <thead>
                    <tr>
                        <th >ID</th>
                        <th >Username</th>
                        {/* <th >Password</th> */}
                        <th >First Name</th>
                        <th >Last Name</th>
                        <th >Address</th>
                        <th >Phone</th>
                        <th >Status</th>
                        <th >Role</th>
                        <th >Create Date</th>
                        <th >Update Date</th>
                        <th >Action</th>
                    </tr>
                </thead>

                {
                    users.map(users =>
                        <tbody>
                            <td>{users.usersId}</td>
                            <td>{users.username}</td>
                            {/* <td>{users.password}</td> */}
                            <td>{users.firstName}</td>
                            <td>{users.lastName}</td>
                            <td>{users.address}</td>
                            <td>{users.phone}</td>
                            <td>{users.status}</td>
                            <td>{users.roles.name}</td>
                            <td>{users.createdDate}</td>
                            <td>{users.updatedDate}</td>
                            <button className="btn btn-warning"><Link to={"/admin/user/" + users.usersId}>Edit</Link></button>
                            
                        </tbody>
                    )
                }
            </table>
        </div>

    )
}
export default ListUserComponent