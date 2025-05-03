import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-[100px] w-screen flex justify-center items-center relative bg-[#3D90D7]">
      <img
        src="/logo.svg"
        className="w-[50px] h-[50px] border-[1px] object-cover absolute left-1 rounded-full"
      />
      <Link to="/" className="text-[25px] font-bold  m-1">
        Home
      </Link>
      <Link to="/contact" className="text-[25px] font-bold m-1">
        Conatct
      </Link>
      <Link to="/gallery" className="text-[25px] font-bold  m-1">
        Gallery
      </Link>
      <Link to="/items" className="text-[25px] font-bold m-1">
        Items
      </Link>
    </header>
  );
}
