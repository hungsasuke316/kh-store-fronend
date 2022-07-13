import React, {useState} from "react";
import axios from 'axios';

function RegisterComponent(){

    const BASE_URL= 'http://localhost:9999/api/sign-up'
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    const signUp =() =>{
        const user = {username,password, firstName, lastName, address, phone}
        
        axios.post(BASE_URL, user)
        .then(res => {                        
                alert("register success")
                window.location.href="/login"            		
        })
        .catch(
            e => {
                console.log(e)
                alert("register failed")                
            }
        )
    }


    return(
        <div className="main">

        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <form method="POST" id="signup-form" className="signup-form">
                        <h2 className="form-title">Create Account</h2>
                        <div className="form-group">
                            <input type="text" className="form-input" name="name" id="name" placeholder="Username"                             
                            onChange={(e)=> setUsername(e.target.value) }/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" name="name" id="name" placeholder="Password"
                            
                            onChange={(e)=> setPassword(e.target.value) }/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-input" name="email" id="email" placeholder="First Name"
                            
                            onChange={(e)=> setFirstName(e.target.value) }/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" name="status" id="status" placeholder="Last Name"
                            
                            onChange={(e)=> setLastName(e.target.value) }/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" name="status" id="status" placeholder="Address"
                            
                            onChange={(e)=> setAddress(e.target.value) }/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" name="status" id="status" placeholder="Phone"
                            
                            onChange={(e)=> setPhone(e.target.value) }/>
                        </div>                   
                        <div className="form-group">
                            <input type="button" name="button" id="button" className="form-submit" value="Save" onClick={signUp}/>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    </div>
    )
}

export default RegisterComponent