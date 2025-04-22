import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(e){
        
        e.preventDefault();
        console.log(email,password);
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        axios.post(`${backendUrl}/api/users/login`,{

            email:email,
            password:password
        }
        ).then((res)=>{
            console.log(res);
            toast.success("Login Successfull");

            const user = res.data.user;
            localStorage.setItem("token",res.data.token);

            if(user.role === "admin"){
                navigate("/admin/");
            }
            else{
                navigate("/");
            }

        }).catch((err)=>{
            console.log(err);
            toast.error("Login Failed");
        })
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-picture">

            <div className="w-[400px] h-[400px] flex justify-center items-center flex-col backdrop-blur-lg rounded-2xl relative">

                <img src="/logo1.png" className="w-[100px] h-[100px] absolute top-1" />

                <form onSubmit={handleOnSubmit}>

                <input type="email" placeholder="Email" className="w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white" value={email} onChange={(e)=>{
                    setEmail(e.target.value);
                }} />

                <input type="password" placeholder="Password" className="w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white mt-6" value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                }} />

                <button className="w-[300px] h-[50px] bg-[#f0ad38] text-white rounded-lg mt-8">Login</button>
                </form>

            </div>
        </div>
    )
}