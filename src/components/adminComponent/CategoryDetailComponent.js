import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CheckLoginService from '../../services/CheckLoginService';
import Header from "../header/Header";


function CategoryDetailComponent() {
    const navigate = useNavigate()
    const { categoryId } = useParams()
    const [category, setCategory] = useState({})
    const [id, setCategoryId] = useState("")
    const [name, setCategoryName] = useState("")
    const [description, setCategoryDescription] = useState("")
    const [status, setCategoryStatus] = useState("")
    const BASE_URL = 'http://localhost:9999/category/with-dto/' + categoryId
    
    console.log(categoryId)
    

    useEffect(() => 
        {
            if(categoryId) {
                const token = window.localStorage.getItem("accessToken")
                const params = {        
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                axios.get(BASE_URL, params)
                .then(res => {
                    console.log(res.data)
                    setCategoryId(res.data.categoryId)
                    setCategoryName(res.data.name)
                    setCategoryDescription(res.data.description)
                    setCategoryStatus(res.data.status)
                    setCategory(res.data)
                })
            }
        }, [])
    
    const updateCategory = () =>{

        const token = window.localStorage.getItem("accessToken")
                const params = {        
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

        if(categoryId){
            const payload = {name, description, status}
            console.log(payload)
            const URL= 'http://localhost:9999/category/' + categoryId
            axios.put(URL,payload,params)
            
            .then(res => {
                if(res.status===200){
                    alert("update success")
                    navigate('/admin/category')
                }
            })
            .catch(e =>
                    console.log(e)
                )
        }
        else{
            const payload = {name, description, status}
            console.log(payload)
            const URL= 'http://localhost:9999/category/'
            axios.post(URL,payload,params)
            
            .then(res => {
                if(res.status===201){
                    alert("create success")
                    navigate('/admin/category')
                }
            })
            .catch(e =>
                    console.log(e)
                )
        }
           
    }

    const deleteCategory = () =>{
        const token = window.localStorage.getItem("accessToken")
                const params = {        
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

        if(categoryId){            
            const URL= 'http://localhost:9999/category/' + categoryId
            axios.delete(URL, params)
            
            .then(res => {
                if(res.status===200){
                    alert("delete success")
                    navigate('/admin/category')
                }
            })
            .catch(e =>
                    console.log(e)
                )
        }
    }

    const statusLogin = CheckLoginService.check()

    return (
        <div className="main">
        <Header status={statusLogin}/>
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <form method="POST" id="signup-form" className="signup-form">
                        <h2 className="form-title">Category Info</h2>
                        <div className="form-group">
                            ID----------:
                            <input type="text" className="form-input" name="name" id="name" placeholder="Category ID" 
                            value={category.categoryId}
                            hidden={categoryId? false:true}/>
                        </div>
                        <div className="form-group">
                            Name------:      
                            <input type="text" className="form-input" name="name" id="name" placeholder="Category Name"
                            value={name}
                            onChange={(e) => setCategoryName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            Description: 
                            <input type="text" className="form-input" name="description" id="description" placeholder="Description"
                            value={description}
                            onChange={(e) => setCategoryDescription(e.target.value)}/>
                        </div>
                        {/* <div className="form-group">
                            Status------:
                            <input type="text" className="form-input" name="status" id="status" placeholder="Status"
                            value={status}
                            onChange={(e) => setCategoryStatus(e.target.value)}
                            hidden={categoryId? true:false}/>
                        </div>                    */}
                        <div className="form-group">
                            -------------            
                            <input type="button" name="button" id="button" className="form-submit" value="Save" onClick={updateCategory}/>
                            <input type="button" name="button" id="button" className="form-submit" value="Delete" onClick={deleteCategory}
                            hidden={categoryId? false:true}/>
                            ----------------------
                        </div>
                    </form>
                </div>
            </div>
        </section>

    </div>
    )
}
export default CategoryDetailComponent;