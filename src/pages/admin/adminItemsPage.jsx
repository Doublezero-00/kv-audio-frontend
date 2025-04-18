import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { Link } from "react-router-dom";

const simpleArr = [
    {
      key: "PROD001",
      name: "Wireless Mouse",
      price: 25.99,
      category: "Electronics",
      dimensions: "10x6x4 cm",
      description: "Ergonomic wireless mouse with 2.4GHz connection.",
      availability: true,
      image: ["https://via.placeholder.com/150?text=Mouse"],
    },
    {
      key: "PROD002",
      name: "Bluetooth Speaker",
      price: 45.50,
      category: "Electronics",
      dimensions: "15x10x10 cm",
      description: "Portable Bluetooth speaker with bass boost.",
      availability: true,
      image: ["https://via.placeholder.com/150?text=Speaker"],
    },
    {
      key: "PROD003",
      name: "Notebook",
      price: 5.99,
      category: "Stationery",
      dimensions: "21x29.7 cm",
      description: "A4 size ruled notebook, 200 pages.",
      availability: true,
      image: ["https://via.placeholder.com/150?text=Notebook"],
    },
    {
      key: "PROD004",
      name: "Water Bottle",
      price: 12.00,
      category: "Home & Kitchen",
      dimensions: "25x7x7 cm",
      description: "Stainless steel insulated water bottle.",
      availability: true,
      image: ["https://via.placeholder.com/150?text=Bottle"],
    },
    {
      key: "PROD005",
      name: "Yoga Mat",
      price: 20.99,
      category: "Fitness",
      dimensions: "183x61x0.6 cm",
      description: "Non-slip yoga mat for all types of yoga and exercise.",
      availability: true,
      image: ["https://via.placeholder.com/150?text=Yoga+Mat"],
    },
  ];
export default function AdminItemsPage() {

    const [Items,setItem] = useState(simpleArr);

    return(
        <div className="w-full h-full relative">

            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                </thead>
                <tbody>
                    {
                        Items.map((product)=>{
                            console.log(product);
                            return(
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability ? "Available" : "Not Available"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Link to="/admin/items/add">
            <GoPlusCircle className="text-[70px] absolute right-2 bottom-2 hover:text-red-900" />
            </Link>
        </div>
    )
}