import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios
      .post(`${backendUrl}/api/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        toast.success("Login Successful");

        const user = res.data?.user;

        localStorage.setItem("token", res.data.token);

        if (user && user.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        toast.error("Login Failed");
      });
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-picture bg-cover bg-center p-4">
      <div className="w-full max-w-md bg-black/50 backdrop-blur-lg rounded-2xl p-6 sm:p-10 flex flex-col items-center shadow-lg">
        <img
          src="/logo1.png"
          alt="Logo"
          className="w-20 h-20 mb-6 sm:w-24 sm:h-24"
        />

        <form className="w-full" onSubmit={handleOnSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 bg-transparent border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-yellow-400 mb-5 text-base sm:text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 bg-transparent border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-yellow-400 mb-8 text-base sm:text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-semibold text-base sm:text-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
