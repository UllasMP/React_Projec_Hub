import React, { Children } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Navigate } from "react-router-dom";

import Home from './components/pages/home/Home';
import Order from './components/pages/order/Order';
import Cart from './components/pages/cart/Cart';
import Dashboard from './components/pages/admin/dashboard/Dashboard';
import Nopage from './components/pages/nopage/Nopage';
import MyState from './context/data/Mystate';
import Login from './components/pages/registration/Login';
import Signup from './components/pages/registration/Signup';
import Productinfo from './components/pages/productinfo/Productinfo';
import AddProduct from './components/pages/admin/pages/AddProduct';
import UpdateProduct from './components/pages/admin/pages/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <MyState>
      
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/order" element={
                  <ProtectedRoute>
                    <Order/>
                  </ProtectedRoute>
                } />
                <Route path="/cart" element={<Cart/>} />

                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard/>
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />

                <Route path="/addproduct" element={
                  <ProtectedRoute>
                    <AddProduct/>
                  </ProtectedRoute>
                } />
                 <Route path="/updateproduct" element={
                  <ProtectedRoute>
                    <UpdateProduct/>
                  </ProtectedRoute>
                 } />
                <Route path="/productinfo/:id" element={<Productinfo/>} />
                <Route path="/*" element={<Nopage/>} />
            </Routes> 
            <ToastContainer/>
        
    </MyState>
 
  )
}

export default App
//user
const ProtectedRoute = ({children}) =>{
  const user = localStorage.getItem('user')
  if(user){
    return children
  }
  else
  {
    return <Navigate to={'/Ecommerce/login'}/>

  }
}

//admin
export const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  if (admin.user.email === 'ullasmpu@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/Ecommerce/login' />
  }
}