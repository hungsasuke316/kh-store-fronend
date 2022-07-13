import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import CheckLoginService from '../../services/CheckLoginService';
import Header from "../header/Header";


function ListProductComponent() {

    const BASE_URL = 'http://localhost:9999/product'
    const [products, setProducts] = useState([])
    const getProducts = () => {
        const token = window.localStorage.getItem("accessToken")
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(BASE_URL, params)
            .then(res => { setProducts(res.data); })
            .catch(e =>
                console.log(e)
            )



    }

    useEffect(() => getProducts(), [])
    console.log(products)

    const statusLogin = CheckLoginService.check()
	console.log(statusLogin)

    return (

        <div>
            <Header status={statusLogin}/>
            <div className="form-group">
                <Link to="/admin/product/add" className="btn btn-primary mb-2" > Add new product </Link>
                <Link to="/admin/category" className="btn btn-primary mb-2" > Category Management </Link>
                <Link to="/admin/user" className="btn btn-primary mb-2" > Users  Management</Link>
            </div>            

            <table className="table">
                <thead>
                    <tr>
                        <th >ID</th>
                        <th >Name</th>
                        <th >Description</th>
                        <th >Thumbnail</th>
                        <th >Price</th>
                        <th >Category</th>
                        <th >Status</th>
                        <th >Create Date</th>
                        <th >Update Date</th>
                        <th >Action</th>
                    </tr>
                </thead>

                {
                    products.map(product =>
                        <tbody>
                            <td>{product.productId}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td><img className="card-img-top" src={product.thumbnail}/></td>
                            <td>{product.price} $</td>
                            <td>{product.category.name}</td>
                            <td>{product.status}</td>
                            <td>{product.createdDate}</td>
                            <td>{product.updatedDate}</td>
                            <button className="btn btn-warning"><Link to={"/admin/product/" + product.productId}>Edit</Link></button>
                            
                        </tbody>
                    )
                }
            </table>
        </div>

    )
}
export default ListProductComponent