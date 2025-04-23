export default function ProductCard({ item }) {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden m-4 hover:shadow-xl transition-shadow duration-300 relative">
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
        <p className="text-lg text-blue-600 font-semibold mb-2">{item.price}</p>
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>

        <div className="flex flex-wrap text-sm text-gray-500 gap-2 mb-4">
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            Category: {item.category}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            Dimensions: {item.dimensions}
          </span>
          <span
            className={`px-2 py-1 rounded-full ${
              item.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {item.availability ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors absolute mx-auto bottom-[30px]">
          View Details
        </button>
      </div>
    </div>
  );
}
