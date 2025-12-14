import React, { useState } from 'react'
import myContext from './myContext';
import { Timestamp } from 'firebase/firestore';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from "react-toastify";

import { useEffect } from 'react';

function MyState(props) {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode == 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }
 const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState({
    title: null,
    price:  null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })

   // ********************** Add Product Section  **********************
  const addProduct = async () => {
    if (products.title == ""||
       products.price == ""|| 
       products.imageUrl =="" || 
       products.category == "" || 
       products.description == "") {
      return toast.error('Please fill all fields')
    }
    
    setLoading(true)
    try {
      const productRef = collection(fireDB, "products")
      await addDoc(productRef, products)
      toast.success("Product Add successfully")
      setTimeout(() => {
        window.location.href = '/hello/dashboard'
        
      }, 800);
      getProductData()
      closeModal()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("")
  }

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);


  return (
      <myContext.Provider value={{ 
      mode, toggleMode, loading,setLoading,
      products, setProducts,addProduct , product}}>
      {props.children}
    </myContext.Provider>
  )
}

export default MyState