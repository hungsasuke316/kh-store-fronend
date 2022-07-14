import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CheckLoginService from '../../../services/CheckLoginService';
import Header from '../../header/Header';


function HomeComponent() {
    const BASE_URL= 'http://localhost:9999/product/enable'
    const [products, setProducts] = useState([])
    const getProduct = () => {
        axios.get(BASE_URL).then(res => {setProducts(res.data); })
        
        
    }

    useEffect(() => getProduct(), [])
    console.log(products)

    const statusLogin = CheckLoginService.check()

    return (
        <div>
            <Header status={statusLogin}/>
            <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {
                    products.map(product => 
                        <div className="col mb-5">
                        <div className="card h-100">
                            <img className="card-img-top" src={product.thumbnail} alt="..." />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">{product.name}</h5>
                                    {product.price} $
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><Link className="btn btn-outline-dark mt-auto" to={"/product/" + product.productId}>View</Link></div>
                            </div>
                        </div>
                    </div>

                    )
                }
                    
                </div>
            </div>
        </section>
        </div>
    )
}
export default HomeComponent;