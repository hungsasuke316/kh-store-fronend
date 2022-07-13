
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,  useNavigate} from 'react-router-dom';

function Header(props) {

    const token = window.localStorage.getItem("accessToken")
    const navigate = useNavigate()
    
    
    
    const logout = () => {
        window.localStorage.removeItem("accessToken")
        alert("logout success")
        window.location.href="/login"

    }  

    const BASE_URL= 'http://localhost:9999/category'
    const [categories, setCategories] = useState([])
    const getCategory = () => {
        axios.get(BASE_URL).then(res => {setCategories(res.data); })
               
    }
    useEffect(() => getCategory(), [])
    console.log(categories)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand">KH Store</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><Link className="nav-link active" aria-current="page" to={"/"}>Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" role="button" to={"/login"}>Login</Link></li>
                        <li className="nav-item"><a className="nav-link" role="button" onClick={logout} >{props.status? "Logout":""}</a></li>
                        
                                <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown"  role="button" data-bs-toggle="dropdown" aria-expanded="false">Category</a>
                            
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {
                                        categories.map(category =>
                                        <li><a className="dropdown-item" href="">{category.name}</a></li>  
                                        )
                                    }                                 
                                    </ul>                             
                                </li>
                                
                          
                    </ul>
                    {/* <form className="d-flex">
                        <button className="btn btn-outline-dark" type="submit">
                            <i className="bi-cart-fill me-1"></i>
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>
                    </form> */}
                </div>
            </div>
        </nav>
  );
}
export default Header;