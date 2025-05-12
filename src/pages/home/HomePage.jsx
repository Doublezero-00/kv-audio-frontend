import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import Home from "./Home";
import Gallery from "./Gallery";
import Items from "./Items";
import Contact from "./Contact";
import Error from "./Error";
import Testing from "../../components/Testing";
import ProductOverview from "./productOverview";
import BookingPage from "./bookingPage";

export default function Homepage() {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh - 100px)] w-full ">
        <Routes path="/*">
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/items" element={<Items />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/product/:key" element={<ProductOverview />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}
