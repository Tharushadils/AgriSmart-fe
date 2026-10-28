import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LandingHome from "../pages/LandingHome"
import StoreOrders from "../pages/StoreOrders"
import JoinUs from "../pages/JoinUs"
import Harvest from "../pages/FarmerHarvest"
import Farms from "../pages/Farm"
import Stores from "../pages/Store"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<LandingHome />} />

      
        <Route path="/store-orders" element={<StoreOrders />} />

        <Route path="/join-us" element={<JoinUs />} />

        <Route path="/farmer-harvest" element={<Harvest />} />

        <Route path="/farms" element={<Farms />} />

        <Route path="/stores" element={<Stores />} />

       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}