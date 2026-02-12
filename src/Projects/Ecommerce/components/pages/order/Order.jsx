import React, { useContext } from "react";
import Layout from "../../layout/Layout";
import myContext from "@/Projects/Ecommerce/context/data/myContext";


function Order() {
  const { user, loading, order, mode } = useContext(myContext);

  if (loading) {
    return (
      <Layout>
        <h2 className="text-center mt-10">Loading...</h2>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <h2 className="text-center text-xl">Please login to view orders</h2>
      </Layout>
    );
  }

  const userid = user.uid;

  const userOrders = order.filter((obj) => obj.userid === userid);

  return (
    <Layout>
      {userOrders.length > 0 ? (
        <div className="h-full pt-10">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="mx-auto max-w-5xl px-6 md:flex md:space-x-6"
            >
              {order.cartItems.map((item) => (
                <div key={item.id} className="rounded-lg md:w-2/3">
                  <div
                    className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex"
                    style={{
                      backgroundColor: mode === "dark" ? "#282c34" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt="product"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4">
                      <h2 className="text-lg font-bold">{item.title}</h2>
                      <p className="text-xs">{item.description}</p>
                      <p className="text-xs">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl">No Orders</h2>
      )}
    </Layout>
  );
}

export default Order;
