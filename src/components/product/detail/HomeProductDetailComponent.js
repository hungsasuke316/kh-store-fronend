import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CheckLoginService from '../../../services/CheckLoginService';
import Header from '../../header/Header';





function HomeProductDetailComponent() {
    const {productId} = useParams()
    const BASE_URL= 'http://localhost:9999/product/'+ productId
    console.log(productId)
    const [product, setProduct] = useState({})

    const getProduct = () => {
        
        axios.get(BASE_URL)
            .then(res => { setProduct(res.data); })
            .catch(e =>
                console.log(e)
            )
    }

    useEffect(() => getProduct(), [])
    console.log(product)
    
    // useEffect(() => {
    //     axios.get(BASE_URL).then(res => {setProduct(res.data) })
    // }, [])
    // console.log(product)

    const statusLogin = CheckLoginService.check()

    return (
        <div>
            <Header status={statusLogin}/>
            <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={product.thumbnail} alt="..." /></div>
                    <div className="col-md-6">
                        <div className="small mb-1">ID: {product.productId}</div>
                        <h1 className="display-5 fw-bolder">Name: {product.name}</h1>
                        {/* <h4 className="display-5 fw-bolder">Category: {product.category.name}</h4> */}
                        <div className="fs-5 mb-5">                           
                            <span>Price: {product.price} $</span>
                        </div>
                        <p className="lead">Description: {product.description}</p>
                        {/* <p className="lead">Category: {product}</p> */}
                        <div className="d-flex">
                            <input className="form-control text-center me-3" id="inputQuantity" type="num" value="1" style={{maxWidth:"3rem"}}/>
                            
                            <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}
export default HomeProductDetailComponent;