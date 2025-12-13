import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './components/pages/home/Home';
import Order from './components/pages/order/Order';
import Cart from './components/pages/cart/Cart';
import Dashboard from './components/pages/admin/dashboard/Dashboard';
import Nopage from './components/pages/nopage/Nopage';
import MyState from './context/data/Mystate';
import Login from './components/pages/registration/Login';
import Signup from './components/pages/registration/Signup';
import Productinfo from './components/pages/productinfo/Productinfo';
function App() {
  return (
    <MyState>
      
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/order" element={<Order/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/productinfo/:id" element={<Productinfo/>} />
                <Route path="/*" element={<Nopage/>} />
            </Routes> 
        
    </MyState>
 
  )
}

export default App