import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import CheckLoginService from '../../services/CheckLoginService';


function LoginComponent() {

	const token = window.localStorage.getItem("accessToken")
    const BASE_URL= 'http://localhost:9999/api/sign-in'
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

	const statusLogin = CheckLoginService.check()
	console.log(statusLogin)

    const loginHandle =() =>{
        const user = {username,password}
        
        axios.post(BASE_URL, user)
        .then(res => {
            let roleName = res.data.roles[0]
            console.log(roleName)
            if (roleName === "ROLE_ADMIN"){
                const token = res.data.token
                window.localStorage.setItem("accessToken", token)
                alert("login success")
                window.location.href="/admin/category"
            }
			if (roleName === "ROLE_CUSTOMER"){
                const token = res.data.token
                window.localStorage.setItem("accessToken", token)
                alert("login success")
                window.location.href="/"
            }

        })
        .catch(
            e => {
                console.log(e)
                alert("login failed")                
            }
        )
    }

	
    return (
		<div><Header status={statusLogin}/>
        <div className="img js-fullheight" style={{backgroundImage: "url(https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-electronic-technology-website-texture-background-banner-image_156039.jpg)"}}>
		<section className="ftco-section">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-5">
					<h2 className="heading-section">Login</h2>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-4">
					<div className="login-wrap p-0">
		      	<h3 className="mb-4 text-center">Have an account?</h3>
		      	<form action="#" className="signin-form">
		      		<div className="form-group">
		      			<input type="text" className="form-control" placeholder="Username" 
                        onChange={(e)=> setUsername(e.target.value) } />
		      		</div>
	            <div className="form-group">
	              <input id="password-field" type="password" className="form-control" placeholder="Password" 
                  onChange={(e)=> setPassword(e.target.value) } />
	              <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
	            </div>
	            <div className="form-group">
	            	<button type="button" className="form-control btn btn-primary submit px-3" 
                    onClick={loginHandle}>Sign In</button>
	            </div>
	            <div className="form-group d-md-flex">
	            	
								<div className="w-50 text-md-right">
									<Link to={"/register"} style={{color: "#fff"}}>Register</Link>
								</div>
	            </div>
	          </form>
	          
	          
		      </div>
				</div>
			</div>
		</div>
	</section>
	</div>
	</div>
    )
}
export default LoginComponent;