import React ,{useContext} from 'react'
import Layout from '../../layout/Layout'
import myContext from '../../../context/data/myContext'
import HeroSection from '../../heroSection/HeroSection'
import Filter from '../../filter/Filter'
import ProductCard from '../../ProductCard/ProductCard'
import Track from '../../track/Track'
import Testimonial from '../../testimonial/Testimonial'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../../redux/cartSlice'

function Home() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=>state.cart)
  console.log(cartItem)
  const addCart = () =>{
    dispatch(addToCart("shirt"))
  }

  const deleteCart = () =>{
    dispatch(deleteFromCart("shirt"))
  }

  return (
    <Layout>
      <div className="flex gap-5 justify-center">
        <button className=' bg-gray-300 p-5' onClick={()=> addCart()}>add</button>
        <button className=' bg-gray-300 p-5' onClick={()=> deleteCart()}>del</button>
      </div>
     <HeroSection/>
     <Filter/>
     <ProductCard/>
     <Track/>
     <Testimonial/>
    </Layout>
  )
}

export default Home
