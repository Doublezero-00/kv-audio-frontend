import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert(error.response.data?.error || "Unauthorized access");
        } else {
          console.error("Error fetching orders:", error?.response?.data || error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/orders/status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert(error.response.data?.error || "Unauthorized to change order status.");
      } else {
        console.error("Error updating order status:", error?.response?.data || error.message);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Orders Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-red-500">No orders found or you are not authorized to view them.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                Order ID: {order._id}
              </h2>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Duration:</strong> {order.days} days</p>
              <p><strong>Start:</strong> {new Date(order.startingDate).toLocaleDateString()}</p>
              <p><strong>End:</strong> {new Date(order.endingDate).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.totalAmount}</p>
              <p><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>

              <div className="mt-4">
                <strong>Items:</strong>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {order.orderedItems.map((item, index) => (
                    <li key={index}>
                      {item.vehicleId?.name || "Unknown vehicle"} - ${item.vehicleId?.ratePerDay || 0}/day
                    </li>
                  ))}
                </ul>
              </div>

              {order.status === "pending" && (
                <div className="mt-4 flex space-x-3">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    onClick={() => handleOrderStatusChange(order._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => handleOrderStatusChange(order._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
