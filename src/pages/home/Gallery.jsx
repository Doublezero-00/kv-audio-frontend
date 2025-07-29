export default function Gallery() {
  const images = [
  "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
  "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
  "https://images.pexels.com/photos/690779/pexels-photo-690779.jpeg",
  "https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg",
  "https://images.pexels.com/photos/164716/pexels-photo-164716.jpeg",
  "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg",
];


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src={src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-60 object-cover transform hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
