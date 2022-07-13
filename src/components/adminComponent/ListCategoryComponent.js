import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import CheckLoginService from '../../services/CheckLoginService';
import Header from "../header/Header";





function ListCategoryComponent() {

    const BASE_URL = 'http://localhost:9999/category'
    const [categories, setCategories] = useState([])
    const getCategories = () => {
        const token = window.localStorage.getItem("accessToken")
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(BASE_URL, params)
            .then(res => { setCategories(res.data); })
            .catch(e =>
                console.log(e)
            )



    }

    useEffect(() => getCategories(), [])
    console.log(categories)

    

    const statusLogin = CheckLoginService.check()
	console.log(statusLogin)




    return (

        <div>
            <Header status={statusLogin}/>
            <div className="form-group">
                <Link to="/admin/category/add" className="btn btn-primary mb-2" > Add new category </Link>
                <Link to="/admin/product" className="btn btn-primary mb-2" > Products  Management </Link>
                <Link to="/admin/user" className="btn btn-primary mb-2" > Users Management</Link>
            </div>
            
            <table className="table">
                <thead>
                    <tr>
                        <th >ID</th>
                        <th >Name</th>
                        <th >Description</th>
                        <th >Status</th>
                        <th >Create Date</th>
                        <th >Update Date</th>
                        <th >Action</th>
                    </tr>
                </thead>

                {
                    categories.map(category =>
                        <tbody>
                            <td>{category.categoryId}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{category.status}</td>
                            <td>{category.createdDate}</td>
                            <td>{category.updatedDate}</td>
                            <button className="btn btn-warning"><Link to={"/admin/category/" + category.categoryId}>Edit</Link></button>
                            
                        </tbody>
                    )
                }
            </table>
        </div>

    )
}
export default ListCategoryComponent