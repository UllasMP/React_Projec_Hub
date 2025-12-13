import React ,{useContext} from 'react'
import Layout from '../../layout/Layout'
import myContext from '../../../context/data/myContext'
import HeroSection from '../../heroSection/HeroSection'
import Filter from '../../filter/Filter'
import ProductCard from '../../ProductCard/ProductCard'
import Track from '../../track/Track'
import Testimonial from '../../testimonial/Testimonial'

function Home() {

  return (
    <Layout>
     <HeroSection/>
     <Filter/>
     <ProductCard/>
     <Track/>
     <Testimonial/>
    </Layout>
  )
}

export default Home
