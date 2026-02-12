import React, { useContext } from 'react'
import myContext from "@/Projects/Ecommerce/context/data/myContext";


function Filter() {

  const context = useContext(myContext)
  const {
    mode,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    product
  } = context

  // Unique Categories
  const uniqueCategories = [...new Set(product.map(item => item.category))]

  // Unique & Sorted Prices
  const uniquePrices = [...new Set(product.map(item => item.price))]
    .sort((a, b) => a - b)

  return (
    <div className='container mx-auto px-4 mt-5'>
      <div
        className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
        style={{
          backgroundColor: mode === 'dark' ? '#282c34' : '',
          color: mode === 'dark' ? 'white' : '',
        }}
      >

        {/* 🔍 Search */}
        <div className="relative">
          <input
            type="text"
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
            placeholder="Search here"
            className="px-4 py-3 w-full rounded-md border outline-0 text-sm"
            style={{
              backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
              color: mode === 'dark' ? 'white' : '',
            }}
          />
        </div>

        {/* Filter Header */}
        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Filters</p>

          <button
            onClick={() => {
              setSearchkey('')
              setFilterType('')
              setFilterPrice('')
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-medium rounded-md"
          >
            Reset Filter
          </button>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">

          {/* Category Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 w-full rounded-md border outline-0 text-sm"
            style={{
              backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
              color: mode === 'dark' ? 'white' : '',
            }}
          >
            <option value="">All Category</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Price Dropdown */}
          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="px-4 py-3 w-full rounded-md border outline-0 text-sm"
            style={{
              backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
              color: mode === 'dark' ? 'white' : '',
            }}
          >
            <option value="">All Price</option>
            {uniquePrices.map((price, index) => (
              <option key={index} value={price}>
                ₹ {price}
              </option>
            ))}
          </select>

        </div>
      </div>
    </div>
  )
}

export default Filter
