import React, { useEffect, useState } from 'react'
import myContext from './myContext'
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
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
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
      getProductData()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"))
      onSnapshot(q, (snapshot) => {
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
    getProductData()
  }, [])

  const edithandle = (item) => setProducts(item)

  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products)
      toast.success("Product updated successfully")
      getProductData()
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
      getProductData()
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
      const ordersArray = snapshot.docs.map(doc => doc.data())
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

  /* ================= PROVIDER ================= */
  return (
    <myContext.Provider value={{
      mode,
      toggleMode,
      loading,
      setLoading,
      user,            // 🔥 VERY IMPORTANT
      products,
      setProducts,
      addProduct,
      product,
      edithandle,
      updateProduct,
      deleteProduct,
      order
    }}>
      {props.children}
    </myContext.Provider>
  )
}

export default MyState
