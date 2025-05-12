'use client';

import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
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

        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            setLoading(true); // Refresh data after blocking
        }).catch((err) => {
            console.error(err);
        });
    }

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Users</h1>

            {loading ? (
                <div className="text-center text-gray-600 text-lg mt-20">Loading...</div>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                    <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
                        <thead className="bg-blue-500 text-gray-800 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Profile</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Address</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-t hover:bg-gray-100 transition">
                                    <td className="px-6 py-4">
                                        <img
                                            src={user.profilePicture || "https://via.placeholder.com/50"}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4 capitalize">{user.role}</td>
                                    <td className="px-6 py-4">{user.phone || user.phoneNumber}</td>
                                    <td className="px-6 py-4">{user.address}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleBlockUser(user.email)}
                                            className={`px-3 py-1 text-xs font-semibold rounded-full 
                                                ${user.isBlocked
                                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                    : 'bg-green-100 text-green-600 hover:bg-green-200'}
                                            transition`}
                                        >
                                            {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
