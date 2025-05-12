import { useState } from "react";

export default function AdminBookingPage(){

    const[orders, setOrders] = useState([]);
    const[loading, setLoading] = useState(true);
    const[activeOrder, setActiveOrder] = useState(null);
    const[modalOpened, setModalOpened] = useState(false);

    

}