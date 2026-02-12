import React, { useEffect, useState } from 'react'
import myContext from "@/Projects/Ecommerce/context/data/myContext";

import { Timestamp } from 'firebase/firestore'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
  getDocs
} from "firebase/firestore"
import { fireDB } from '../../firebase/FirebaseConfig'
import { auth } from '../../firebase/FirebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from "react-toastify"

function MyState(props) {

  /* ================= GLOBAL LOADING ================= */
  const [loading, setLoading] = useState(false)

  /* ================= THEME ================= */
  const [mode, setMode] = useState('light')

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = 'rgb(17, 24, 39)'
    } else {
      setMode('light')
      document.body.style.backgroundColor = 'white'
    }
  }

  /* ================= AUTH USER ================= */
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  /* ================= PRODUCTS ================= */
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  })

  const [product, setProduct] = useState([])

  const addProduct = async () => {
    if (
      products.title === "" ||
      products.price === "" ||
      products.imageUrl === "" ||
      products.category === "" ||
      products.description === ""
    ) {
      return toast.error('Please fill all fields')
    }

    setLoading(true)
    try {
      await addDoc(collection(fireDB, "products"), products)
      toast.success("Product added successfully")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getProductData = () => {
    setLoading(true)
    try {
      const q = query(collection(fireDB, "products"), orderBy("time", "desc"))
      return onSnapshot(q, (snapshot) => {
        const productsArray = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        setProduct(productsArray)
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsub = getProductData()
    return () => unsub && unsub()
  }, [])

  const edithandle = (item) => setProducts(item)

  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products)
      toast.success("Product updated successfully")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const deleteProduct = async (item) => {
    setLoading(true)
    try {
      await deleteDoc(doc(fireDB, "products", item.id))
      toast.success("Product deleted successfully")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  /* ================= ORDERS ================= */
  const [order, setOrder] = useState([])

  const getOrderData = async () => {
    setLoading(true)
    try {
      const snapshot = await getDocs(collection(fireDB, "orders"))
      const ordersArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setOrder(ordersArray)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrderData()
  }, [])

  /* ================= USERS ================= */
  const [users, setUsers] = useState([])

  const getUserData = async () => {
    setLoading(true)
    try {
      const snapshot = await getDocs(collection(fireDB, "users"))
      const usersArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setUsers(usersArray)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  /*Filter logic */
  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  /* ================= PROVIDER ================= */
  return (
    <myContext.Provider value={{
      mode,
      toggleMode,
      loading,
      setLoading,

      authUser,

      products,
      setProducts,
      addProduct,
      product,
      edithandle,
      updateProduct,
      deleteProduct,

      order,
      users,
      searchkey,setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice
    }}>
      {props.children}
    </myContext.Provider>
  )
}

export default MyState
