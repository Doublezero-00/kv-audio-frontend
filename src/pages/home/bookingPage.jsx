import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cart";
import BookingItem from "../../components/BoookingItem";

export default function BookingPage() {

    const [cart, setCart] = useState(loadCart());
    const [status, setStatus] = useState("loading");

    function reloadCart(){
        setCart(loadCart());
    }

    return(
        <div className="w-full h-screen flex flex-col items-center">
            <h1>Create Booking</h1>
            <div className="flex flex-col items-center justify-center">
                {
                    cart.orderedItems.map((item)=>{
                        return(
                            <BookingItem key={item.key} itemKey={item.key} qty={item.key} refresh={reloadCart} />
                        )
                    })
                }
            </div>
        </div>

    )
}