import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      fetchUsers();
    }
  }, [loading]);

  function handleBlockUser(email) {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${encodeURIComponent(email)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(true); // Refresh the users list
      })
      .catch((err) => {
        console.error("Failed to block/unblock user:", err.response || err);
        alert(
          err.response?.data?.error ||
            "Failed to block/unblock user. Please try again."
        );
      });
  }

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-700">
        Admin Users
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-red-600 text-lg font-semibold">
          No users found.
        </p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="px-4 py-3 text-left">Profile</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className={`border-t hover:bg-indigo-50 cursor-pointer transition-colors duration-200 ${
                  user.isBlocked ? "bg-red-50" : ""
                }`}
                onClick={() => handleBlockUser(user.email)}
                title="Click to block/unblock user"
              >
                <td className="px-4 py-3">
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/50"}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-medium">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-3 lowercase">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">{user.phone || user.phoneNumber || "N/A"}</td>
                <td className="px-4 py-3 max-w-xs truncate" title={user.address}>
                  {user.address || "N/A"}
                </td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    user.isBlocked ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
