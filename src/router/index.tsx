import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LandingHome from "../pages/LandingHome"
import StoreOrders from "../pages/StoreOrders"
// import JoinUs from "../pages/JoinUs"
import Harvest from "../pages/FarmerHarvest"
import Farms from "../pages/Farm"
import Stores from "../pages/Store"
import Products from "../pages/Products"
import Center from "../pages/CollectionCenter"
import User from "../pages/User"
// import Buy from "../pages/Buy"
import Inventory from "../pages/CenterInventory"
import Transfer from "../pages/CenterTransfer"
import DistrictPrice from "../pages/DistrictPrice"
import Allocation from "../pages/Allocation"
import Login from "../pages/login"
import Farmdashboard from "../pages/FarmDashboard"
import Managerdashboard from "../pages/ManagerDashboard"
import Storedashboard from "../pages/StoreDashboard"
import ConfirmPrices from "../pages/FarmerPriceConfirm"
import Procurement from "../pages/ProcurementPlan"
import FinalOrder from "../pages/StoreOrderConfirmation"
import PurchaseAllocation from "../pages/FarmerProcurementStatus"
import ManagerStoreOrders from "../pages/ManagerStoreOrders"
import ManagerHarvestView from "../pages/ManagerHarvestView"
import ManagerFarmsView from "../pages/ManagerFarmsView"
import ManagerStoresView from "../pages/ManagerStoresView"
import UserSettings from "../pages/UserSetting"
import StoreOwnerSetting from "../pages/StoreOwnerSetting"
import FarmOwnerSetting from "../pages/FarmOwnerSetting"
import OrderHistory from "../pages/StoreOrderHistory"
import HarvestHistory from "../pages/FarmHarvestHistory"


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<LandingHome />} />

      
        <Route path="/store-orders" element={<StoreOrders />} />//store

        {/* <Route path="/join-us" element={<JoinUs />} /> */}

        <Route path="/farmer-harvest" element={<Harvest />} />//farm

        <Route path="/farms" element={<Farms />} />//farm

        <Route path="/stores" element={<Stores />} />//store

        <Route path="/products" element={<Products />} />//manager

        <Route path="/center" element={<Center />} />//manager

        <Route path="/user" element={<User />} />//manager

        {/* <Route path="/buy" element={<Buy />} /> */}

        <Route path="/inventory" element={<Inventory />} />//manager

        {/* <Route path="/transfer" element={<Transfer />} /> */}

        <Route path="/district-price" element={<DistrictPrice />} />//manager

        <Route path="/allocation" element={<Allocation />} />//manager

        <Route path="/login" element={<Login />} />

        <Route path="/farmdashboard" element={<Farmdashboard />} />//farm

        <Route path="/managerdashboard" element={<Managerdashboard />} />//manager

        <Route path="/storedashboard" element={<Storedashboard />} />//store

        <Route path="price-confirm" element={<ConfirmPrices />} />//farm

        <Route path="/procurement" element={<Procurement />} />//manager

        <Route path="/final-order" element={<FinalOrder />} />//store

        <Route path="/farmer-procurement" element={<PurchaseAllocation />} />//manager

        <Route path="/order-history" element={<OrderHistory />} />//store

        <Route path="/harvest-history" element={<HarvestHistory />} />

        <Route path="/center-transfer" element={<Transfer />} />//manager

        <Route path="/manager-orders" element={<ManagerStoreOrders />} />//manager

        <Route path="/manager-harvests" element={<ManagerHarvestView />} />//manager


        <Route path="/manager-farms" element={<ManagerFarmsView />} />//manager



 <Route path="/manager-stores" element={<ManagerStoresView />} />//manager

  <Route path="/user-setting" element={<UserSettings />} />//manager

   <Route path="/store-owner-setting" element={<StoreOwnerSetting />} />//store

   <Route path="/farm-owner-setting" element={<FarmOwnerSetting />} />//farm




        

       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}