import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import Home from "./Home";
import Gallery from "./Gallery";
import Items from "./Items";
import Contact from "./Contact";
import Error from "./Error";

export default function Homepage() {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh - 100px)] w-full bg-red-50">
        <Routes path="/*">
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/items" element={<Items />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}
