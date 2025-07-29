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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow-md">
        Admin Orders Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-red-600 text-lg font-semibold">
          No orders found or you are not authorized to view them.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4 truncate">
                Order ID: <span className="font-mono">{order._id}</span>
              </h2>
              <div className="space-y-1 text-gray-700 text-sm">
                <p>
                  <span className="font-semibold">Email:</span> {order.email}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span> {order.days} days
                </p>
                <p>
                  <span className="font-semibold">Start:</span>{" "}
                  {new Date(order.startingDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">End:</span>{" "}
                  {new Date(order.endingDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Total:</span>{" "}
                  <span className="text-green-600 font-bold">${order.totalAmount.toFixed(2)}</span>
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`capitalize font-semibold ${
                      order.status === "approved"
                        ? "text-green-600"
                        : order.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Order Date:</span>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-5">
                <strong className="block mb-1 text-gray-800">Items:</strong>
                <ul className="list-disc list-inside text-gray-700 text-sm max-h-32 overflow-auto">
                  {order.orderedItems.length > 0 ? (
                    order.orderedItems.map((item, index) => (
                      <li key={index}>
                        {item.vehicleId?.name || "Unknown vehicle"} - $
                        {item.vehicleId?.ratePerDay?.toFixed(2) || "0.00"}/day
                      </li>
                    ))
                  ) : (
                    <li className="italic text-gray-400">No items found.</li>
                  )}
                </ul>
              </div>

              {order.status === "pending" && (
                <div className="mt-6 flex space-x-4 justify-center">
                  <button
                    onClick={() => handleOrderStatusChange(order._id, "approved")}
                    className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleOrderStatusChange(order._id, "rejected")}
                    className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
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
