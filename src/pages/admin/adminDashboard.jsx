export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome to the admin dashboard! Here you can manage users, bookings, items, and more.
        </p>

        {/* Placeholder for stats/cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-800">Total Users</h2>
            <p className="text-2xl font-bold text-green-900">120</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-800">Total Bookings</h2>
            <p className="text-2xl font-bold text-blue-900">45</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-yellow-800">Total Items</h2>
            <p className="text-2xl font-bold text-yellow-900">87</p>
          </div>
        </div>
      </div>
    </div>
  );
}
