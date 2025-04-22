import { useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios.post(`${backendUrl}/api/users/`,{
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        address: address,
        phone: phone
    }).then((res)=>{
        toast.success("User registered successfully");
        navigate("/login");

    }).catch((err)=>{
        toast.error("Error registering user");
    })


  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-picture">
      <div className="w-[400px] h-[600px] flex justify-center items-center flex-col backdrop-blur-lg rounded-2xl relative">
        <img src="/logo1.png" className="w-[100px] h-[100px] absolute top-1" />

        <form className="mt-28 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white placeholder-white"
            value={email}
          />
          <input
            type="text"
            placeholder="First Name"
            onChange={(e)=>{setFirstName(e.target.value)}}
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white placeholder-white"
            value={firstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e)=>{setLastName(e.target.value)}}
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white placeholder-white"
            value={lastName}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>{setPassword(e.target.value)}}
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white placeholder-white"
            value={password}
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e)=>{setAddress(e.target.value)}}
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white placeholder-white"
            value={address}
          />
          <input
            type="tel"
            placeholder="Phone"
            onChange={(e)=>{setPhone(e.target.value)}}
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white placeholder-white"
            value={phone}
          />

          <button onClick={handleOnSubmit}
            type="submit"
            className="w-[300px] h-[50px] bg-[#f0ad38] text-white rounded-lg mt-4 hover:bg-[#e19a2f]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
