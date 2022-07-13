import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CheckLoginService from '../../services/CheckLoginService';
import Header from "../header/Header";


function ProductDetailComponent() {
    const navigate = useNavigate()
    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const [listCategory, setListCategory] = useState({})
    const [id, setProductId] = useState("")
    const [name, setProductName] = useState("")
    const [category, setCategory] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [description, setProductDescription] = useState("")
    const [price, setProductPrice] = useState("")
    const [thumbnail, setProductThumbnail] = useState("")
    const [status, setProductStatus] = useState("")
    const [selectedCategory, setSelectedCategory] = useState({})
    const BASE_URL = 'http://localhost:9999/product/' + productId
    const URL = 'http://localhost:9999/category'
    
    console.log(productId)

    useEffect(() => 
        {
            if(productId) {
                const token = window.localStorage.getItem("accessToken")
                const params = {        
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                axios.get(BASE_URL, params)
                .then(res => {
                    console.log(res.data)
                    setProductId(res.data.productId)
                    setProductName(res.data.name)
                    setCategory(res.data.category.categoryId)
                    setProductDescription(res.data.description)
                    setProductPrice(res.data.price)
                    setProductThumbnail(res.data.thumbnail)
                    setProductStatus(res.data.status)
                    setProduct(res.data)
                })
                
            }
        }, [])
    
    const updateProduct = () =>{

        const token = window.localStorage.getItem("accessToken")
                const params = {        
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

        if(productId){
            console.log("Name: " + categoryName)
            categories.forEach(item => {
                if(item.name === categoryName){
                    setSelectedCategory(item)
                    console.log("item: ")
                    console.log(item)
                }
            })
            console.log("selected: ")
            console.log(selectedCategory)
            const category = selectedCategory
                
            const payload = {name,category, description, price,thumbnail, status}
            console.log(payload)
            const URL= 'http://localhost:9999/product/' + productId
            axios.put(URL,payload,params)
            
            .then(res => {
                if(res.status===200){
                    alert("success")
                    navigate('/admin/product')
                }
            })
            .catch(e =>
                    console.log(e)
                )
        }
        else{
            console.log("Name: " + categoryName)
            categories.forEach(item => {
                if(item.name === categoryName){
                    setSelectedCategory(item)
                    console.log("item: ")
                    console.log(item)
                }
            })
            console.log("selected: ")
            console.log(selectedCategory)
            const category = selectedCategory
                
            const payload = {name,category, description, price,thumbnail, status}
            console.log("payload: ")
            console.log(payload)
            const URL= 'http://localhost:9999/product/'
            axios.post(URL,payload,params)
            
            
            .then(res => {
                if(res.status===201){
                    alert("success")
                    navigate('/admin/product')
                }
            })
            .catch(e =>
                    console.log(e)
                )
        }
    
    }

    const deleteProduct = () =>{
        const token = window.localStorage.getItem("accessToken")
                const params = {        
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

        if(productId){            
            const URL= 'http://localhost:9999/product/' + productId
            axios.delete(URL, params)
            
            .then(res => {
                if(res.status===200){
                    alert("delete success")
                    navigate('/admin/product')
                }
            })
            .catch(e =>
                    console.log(e)
                )
        }
    }

    
    const [categories, setCategories] = useState([])
    const getCategories = () => {
        const token = window.localStorage.getItem("accessToken")
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(URL, params)
            .then(res => { setCategories(res.data); })
            .catch(e =>
                console.log(e)
            )
    }

    useEffect(() => getCategories(), [])
    console.log(categories)

    const statusLogin = CheckLoginService.check()

    return (
        <div className="main">
            <Header status={statusLogin}/>
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <form method="POST" id="signup-form" className="signup-form">
                        <h2 className="form-title">Product Info</h2>
                        <div className="form-group">
                            ID----------:
                            <input type="text" className="form-input" name="name" id="name" placeholder="Product ID" 
                            value={product.productId}
                            hidden={productId? false:true}/>
                        </div>
                        <div className="form-group">
                            Name------:
                            <input type="text" className="form-input" name="name" id="name" placeholder="Product Name"
                            value={name}
                            onChange={(e) => setProductName(e.target.value)}/>
                        </div>
                        <div className="form-group">                                 
                                    Category---:
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => {
                                                setCategoryName(e.target.value)
                                                console.log(e.target.value)
                                            } }>
                                    {    
                                        categories.map(category =>
                                            <option value={category.name} >{category.name}</option>    
                                        )                                       
                                    } 
                                    </select>                                   
                        </div>
                        <div className="form-group">
                            Description:
                            <input type="text" className="form-input" name="description" id="description" placeholder="Description"
                            value={description}
                            onChange={(e) => setProductDescription(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            Thumbnail-:
                            <input type="text" className="form-input" name="thumbnail" id="thumbnail" placeholder="Thumbnail"
                            value={thumbnail}
                            onChange={(e) => setProductThumbnail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            Price-------:
                            <input type="text" className="form-input" name="price" id="price" placeholder="Price"
                            value={price}
                            onChange={(e) => setProductPrice(e.target.value)}/>
                        </div>
                        {/* <div className="form-group">
                            Status------:
                            <input type="text" className="form-input" name="status" id="status" placeholder="Status"
                            value={status}
                            onChange={(e) => setProductStatus(e.target.value)}
                            hidden={productId? true:false}/>
                        </div>                    */}
                        <div className="form-group">
                            -------------
                            <input type="button" name="button" id="button" className="form-submit" value="Save" onClick={updateProduct}/>
                            <input type="button" name="button" id="button" className="form-submit" value="Delete" onClick={deleteProduct}
                            hidden={productId? false:true}/>
                            -------------
                        </div>
                    </form>
                </div>
            </div>
        </section>

    </div>
    )
}
export default ProductDetailComponent;