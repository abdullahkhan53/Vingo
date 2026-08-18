import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/forgotPassword'
import useGenCurrUser from './hooks/useGenCurrUser'
import {useSelector} from "react-redux";
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
import useGetMyShop from './hooks/useGetMyShop'
import AddShop from './pages/shop/AddShop'
import AddItem from './pages/item/AddItem'
import EditItem from './pages/item/EditItem'
import Cart from './pages/item/Cart'
import Checkout from './pages/order/Checkout'
import OrderPlaced from './pages/order/OrderPlaced'
import MyOrders from './pages/order/MyOrders'
import useGetMyOrders from './hooks/useGetMyOrders'
import useGetCurrLocation from './hooks/useGetCurrLocation'
// import useGetShopsByCity from './hooks/useGetShopsByCity'
// import UserDashboard from './components/UserDashboard'

function App() {

  useGenCurrUser()
  useGetCurrLocation()
  useGetCity()
  useGetMyShop()
  useGetMyOrders()
  // useGetShopsByCity()
  const userData = useSelector((state) => state.user?.userData);

  return (
    <>
    <Routes>
      <Route path="/signup" element={!userData? <SignUp/> : <Home/>}/>
      <Route path="/signIn" element={userData ? <Home/> : <SignIn/>}/>
      <Route path="/forgot-password" element={!userData? <ForgotPassword/> : <Home/>}/>
      <Route path="/" element={userData? <Home/> : <SignIn/>}/>
      <Route path="/create-edit-shop" element={userData? <AddShop/> : <Home/>}/>
      <Route path="/add-item" element={userData? <AddItem/> : <Home/>}/>  
      <Route path="/edit-item/:itemId" element={userData? <EditItem/> : <Home/>}/>
      <Route path="/cart" element={userData? <Cart/> : <SignIn/>}/>
      <Route path="/checkout" element={userData? <Checkout/> : <SignIn/>}/>
      <Route path="/order-placed" element={userData? <OrderPlaced/> : <SignIn/>}/>
      <Route path="/my-orders" element={userData? <MyOrders/> : <SignIn/>}/>
      

    </Routes>
    </>
  )
}

export default App
