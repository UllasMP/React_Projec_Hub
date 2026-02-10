import React, { useContext, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import myContext from '../../../../context/data/myContext'

import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { FaUser, FaCartPlus } from 'react-icons/fa'
import { AiFillShopping } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function DashboardTab() {
  const context = useContext(myContext)
  const { mode, product, edithandle, deleteProduct, order } = context

  const goToAdd = () => {
    window.location.href = '/addproduct'
  }

  return (
    <div className="container mx-auto">
      <Tabs defaultIndex={0}>
        <TabList className="md:flex md:space-x-8 grid grid-cols-2 text-center gap-4 mb-10">
          <Tab>
            <button className="text-xl text-purple-500">
              <MdOutlineProductionQuantityLimits /> Products
            </button>
          </Tab>
          <Tab>
            <button className="text-xl text-pink-500">
              <AiFillShopping /> Orders
            </button>
          </Tab>
          <Tab>
            <button className="text-xl text-green-500">
              <FaUser /> Users
            </button>
          </Tab>
        </TabList>

        {/* ================= PRODUCTS ================= */}
        <TabPanel>
          <h1 className="text-center text-3xl font-semibold underline mb-6"
            style={{ color: mode === 'dark' ? 'white' : '' }}>
            Product Details
          </h1>

          <div className="flex justify-end mb-4">
            <button
              onClick={goToAdd}
              className="bg-pink-600 text-white px-5 py-2 rounded flex gap-2">
              Add Product <FaCartPlus />
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {product.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.imageUrl} className="w-14" alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>₹{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td className="flex gap-2">
                    <button onClick={() => deleteProduct(item)}>❌</button>
                    <Link to="/updateproduct" onClick={() => edithandle(item)}>
                      ✏️
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        {/* ================= ORDERS ================= */}
        <TabPanel>
          <h1 className="text-center text-3xl font-semibold underline mb-6"
            style={{ color: mode === 'dark' ? 'white' : '' }}>
            Order Details
          </h1>

          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th>Payment ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {order.map((allorder, index) => (
                <tr key={index}>
                  <td>{allorder.paymentId}</td>
                  <td>{allorder.cartItems?.[0]?.title}</td>
                  <td>₹{allorder.cartItems?.[0]?.price}</td>
                  <td>{allorder.addressInfo?.name}</td>
                  <td>{allorder.addressInfo?.email}</td>
                  <td>{allorder.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        {/* ================= USERS ================= */}
        <TabPanel>
          <h1 className="text-center text-3xl font-semibold underline mb-6"
            style={{ color: mode === 'dark' ? 'white' : '' }}>
            User Details
          </h1>

          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Demo User</td>
                <td>demo@gmail.com</td>
                <td>9999999999</td>
                <td>12 Aug 2019</td>
              </tr>
            </tbody>
          </table>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default DashboardTab
