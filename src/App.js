
import './App.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeProductDetailComponent from './components/product/detail/HomeProductDetailComponent';
import HomeComponent from './components/product/home/HomeComponent';

import LoginComponent from './components/login/login';
import RegisterComponent from './components/register/RegisterComponent';

import ListCategoryComponent from './components/adminComponent/ListCategoryComponent';
import CategoryDetailComponent from './components/adminComponent/CategoryDetailComponent';

import ListProductComponent from './components/adminComponent/ListProductComponent';
import ProductDetailComponent from './components/adminComponent/ProductDetailComponent';

import ListUserComponent from './components/adminComponent/ListUserComponent';
import UserDetailComponent from './components/adminComponent/UserDetailComponent';



// Lazy load - Code splitting

function App() {
  return (
    <BrowserRouter>
    
      <div className='h-100'>
      <Routes>
        <Route path="/" element={<HomeComponent />}/>
        <Route path="/product/:productId" element={<HomeProductDetailComponent />}/>

        <Route path="/login" element={<LoginComponent />}/>
        <Route path="/register" element={<RegisterComponent />}/>

        <Route path="/admin/category" element={<ListCategoryComponent />}/>
        <Route path="/admin/category/:categoryId" element={<CategoryDetailComponent />}/>
        <Route path="/admin/category/add" element={<CategoryDetailComponent />}/>

        <Route path="/admin/product" element={<ListProductComponent />}/>
        <Route path="/admin/product/:productId" element={<ProductDetailComponent />}/>
        <Route path="/admin/product/add" element={<ProductDetailComponent />}/>

        <Route path="/admin/user" element={<ListUserComponent />}/>
        <Route path="/admin/user/:usersId" element={<UserDetailComponent />}/>
        <Route path="/admin/user/add" element={<UserDetailComponent />}/>

        {/* <Route path="/product/:brand" element={<HomeComponent />}/> */}
 
      </Routes>
      </div>
    <Footer/>
  </BrowserRouter>
  )
}
export default App;