import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LandingHome from "../pages/LandingHome"
import StoreOrders from "../pages/StoreOrders"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<LandingHome />} />

      
        <Route path="/store-orders" element={<StoreOrders />} />

       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}